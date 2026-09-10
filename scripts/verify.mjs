import { createRequire } from "node:module";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const core = require(join(root, "core.js"));

let failed = 0;
function check(name, fn) {
  try {
    fn();
    console.log("OK  " + name);
  } catch (err) {
    failed += 1;
    console.log("FAIL  " + name);
    console.log("     " + err.message);
  }
}

check("parse strict JSON", () => {
  const meme = core.parseMeme(
    '{"line":"这课真是闹麻了","vibe":"roast","why":"网感","literal":"这节课很无聊","alts":["这课纯纯坐牢"]}'
  );
  assert.equal(meme.line, "这课真是闹麻了");
  assert.equal(meme.literal, "这节课很无聊");
  assert.deepEqual(meme.alts, ["这课纯纯坐牢"]);
});

check("parse fenced JSON", () => {
  const meme = core.parseMeme('```json\n{"line":"ok boomer, you do it then"}\n```');
  assert.equal(meme.line, "ok boomer, you do it then");
});

check("parse raw line fallback", () => {
  const meme = core.parseMeme("bro really thinks he's the main character");
  assert.equal(meme.line, "bro really thinks he's the main character");
});

check("reject empty", () => {
  assert.equal(core.parseMeme("   "), null);
  assert.equal(core.normalizeMeme({ vibe: "x" }), null);
});

check("detect Chinese → cn-en", () => {
  assert.equal(core.detectDir("你行你上啊"), "cn-en");
  assert.equal(core.detectDir("什么档次跟我用一样的"), "cn-en");
});

check("detect English → en-cn", () => {
  assert.equal(core.detectDir("the class is so boring"), "en-cn");
  assert.equal(core.detectDir("nobody likes you"), "en-cn");
});

check("detect ignores punctuation-only", () => {
  assert.equal(core.detectDir("!!!"), null);
});

check("401 maps to invalid key", () => {
  const msg = core.mapHttpError(401, "Unauthorized", "en");
  assert.match(msg, /Invalid DeepSeek key/i);
});

check("402 maps to balance", () => {
  const msg = core.mapHttpError(402, "Payment", "zh");
  assert.match(msg, /余额/);
});

check("network error maps", () => {
  const msg = core.mapHttpError(0, "Failed to fetch", "en");
  assert.match(msg, /could not reach DeepSeek/i);
});

check("clip input", () => {
  assert.equal(core.clipInput("  hi  "), "hi");
  assert.equal(core.clipInput("x".repeat(800)).length, 500);
});

check("chat bodies degrade", () => {
  const bodies = core.buildChatBodies("deepseek-flash", "sys", "user");
  assert.equal(bodies.length, 3);
  assert.equal(bodies[0].response_format.type, "json_object");
  assert.equal(bodies[2].response_format, undefined);
});

check("HTML has both knobs", () => {
  const html = readFileSync(join(root, "index.html"), "utf8");
  assert.match(html, /id="langBtn"/);
  assert.match(html, /口语/);
  assert.match(html, /id="dirEnCn"/);
  assert.match(html, /id="dirCnEn"/);
  assert.match(html, /id="fireBtn"/);
  assert.match(html, /core\.js/);
  assert.match(html, /memes\.js/);
});

check("app never hardcodes a live result for fire()", () => {
  const js = readFileSync(join(root, "app.js"), "utf8");
  assert.match(js, /callDeepSeek/);
  assert.match(js, /FreqCore\.parseMeme/);
  assert.doesNotMatch(js, /showSticker\(\s*\{\s*line:\s*"这课真是闹麻了"/);
});

check("proxy talks to DeepSeek, not a stub", () => {
  const proxy = readFileSync(join(root, "api/translate.js"), "utf8");
  assert.match(proxy, /api\.deepseek\.com\/chat\/completions/);
  assert.match(proxy, /api\.deepseek\.com\/responses/);
  assert.doesNotMatch(proxy, /mock|fake|todo result/i);
});

check("extract responses output_text", () => {
  assert.equal(
    core.extractResponseText({ output_text: '{"line":"你的胆子真是肥嘟嘟的"}' }),
    '{"line":"你的胆子真是肥嘟嘟的"}'
  );
});

check("extract chat completions content", () => {
  assert.equal(
    core.extractResponseText({
      choices: [{ message: { content: '{"line":"这课真是闹麻了"}' } }],
    }),
    '{"line":"这课真是闹麻了"}'
  );
});

check("live pack maps you're so brave to 肥嘟嘟的", () => {
  const memes = require(join(root, "memes.js"));
  assert.match(memes.SYSTEM["en-cn"], /你的胆子真是肥嘟嘟的/);
  assert.match(memes.userPrompt("en-cn", "you're so brave"), /你的胆子真是肥嘟嘟的/);
  assert.equal(memes.TAPE[0].to, "你的胆子真是肥嘟嘟的");
  assert.doesNotMatch(memes.SYSTEM["en-cn"], /你胆子真大（阴阳/);
});

check("search bodies force web_search", () => {
  const bodies = core.buildSearchBodies("deepseek-flash", "sys", "user");
  assert.equal(bodies[0].tools[0].type, "web_search");
  assert.equal(bodies[0].tool_choice.type, "web_search");
});

if (failed) {
  console.log("\n" + failed + " failed");
  process.exit(1);
}
console.log("\nall checks passed");
