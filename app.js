const STORAGE_KEY = "freq404.deepseekKey";
const STORAGE_LANG = "freq404.lang";
const STORAGE_DIR = "freq404.dir";

const MODELS = ["deepseek-flash", "deepseek-v4-flash", "deepseek-chat"];

const I18N = {
  en: {
    onAir: "ON AIR · MEME LAYER",
    keyChip: "API KEY",
    kicker: "WHY THIS EXISTS",
    manifesto:
      "Most culture work is a museum tour. Mid-Autumn history puts even locals to sleep — foreigners never stood a chance. Funny beats useful. In China, “you’re so brave” loses to posting the dragon pic. Same on the other internet. Translation is solved. The meme layer is not. That’s why a Western LoL flame still reads as flirting on our side. Their heaviest line is “nobody likes you.” We thought they were being cute.",
    channelA: "CHANNEL A",
    channelB: "CHANNEL B",
    dirEnCn: "EN → CN meme",
    dirCnEn: "CN → EN meme",
    dirEnCnSub: "English in. Chinese internet out.",
    dirCnEnSub: "Chinese in. Western internet out.",
    inputLabel: "DROP THE LINE",
    inputHint: "Ctrl + Enter to fire",
    fire: "FIRE THE MEME",
    stamp: "DROPPED",
    copy: "COPY LINE",
    again: "AGAIN",
    foot: "The 口语 button is UI language. The two channels are translation direction. Not the same knob. Your key stays in this browser and is sent only to DeepSeek.",
    keyTitle: "DeepSeek API key",
    keyHelp:
      "Paste a key from platform.deepseek.com. Stored only in this browser (localStorage), sent only to DeepSeek. We never keep it.",
    getKey: "Get a key",
    saveKey: "SAVE KEY",
    needKey: "Paste a DeepSeek key first.",
    needText: "Give me a line to transmute.",
    busy: "Tuning the meme layer…",
    done: "Dropped.",
    copied: "Copied.",
    copyFail: "Copy failed — select it yourself.",
    badJson: "The model returned noise. Try again.",
    langBtn: "口语",
    langTitle: "Switch interface to Chinese",
    placeholderEnCn: "the class is so boring",
    placeholderCnEn: "你这人胆子真大",
  },
  zh: {
    onAir: "直播中 · 梗频",
    keyChip: "API KEY",
    kicker: "为什么做这个",
    manifesto:
      "严肃传播经常是博物馆导览。中秋节历史连本国人都不爱看，更别提外国人。有趣比有用更重要。在中国，一句「你胆子真大」不如直接发张龙图。外国互联网一个道理。翻译已经够发达了，梗还没有。所以英雄联盟里和外国人对骂，他们最重的一句也就是 nobody likes you，我们听着还以为在撒娇。",
    channelA: "A 频",
    channelB: "B 频",
    dirEnCn: "英语 → 中文梗",
    dirCnEn: "中文 → 英文梗",
    dirEnCnSub: "英语进去，中文网感出来。",
    dirCnEnSub: "中文进去，外国网感出来。",
    inputLabel: "把原句丢进来",
    inputHint: "Ctrl + Enter 开整",
    fire: "开整",
    stamp: "已转",
    copy: "复制这句",
    again: "再来一句",
    foot: "「口语」只切界面语言。两个频道才是翻译方向。不是同一个按钮。密钥只存在你的浏览器，请求直达 DeepSeek。",
    keyTitle: "DeepSeek API 密钥",
    keyHelp:
      "从 platform.deepseek.com 复制密钥。只存在本机 localStorage，只发给 DeepSeek，我们不留。",
    getKey: "去申请密钥",
    saveKey: "保存密钥",
    needKey: "先贴一个 DeepSeek 密钥。",
    needText: "先丢一句进来。",
    busy: "正在调频…",
    done: "落地了。",
    copied: "已复制。",
    copyFail: "复制失败，请手动选中。",
    badJson: "模型这次抽风了，再打一次。",
    langBtn: "EN",
    langTitle: "Switch interface to English",
    placeholderEnCn: "the class is so boring",
    placeholderCnEn: "你这人胆子真大",
  },
};

const TAPE = {
  en: [
    { from: "the class is so boring", to: "这课真是闹麻了" },
    { from: "the class is so good", to: "这个课真尼玛有点意思啊啊啊" },
    { from: "nobody likes you", to: "你这人在局里纯纯毒瘤" },
  ],
  zh: [
    { from: "the class is so boring", to: "这课真是闹麻了" },
    { from: "the class is so good", to: "这个课真尼玛有点意思啊啊啊" },
    { from: "nobody likes you", to: "你这人在局里纯纯毒瘤" },
  ],
};

const EXAMPLES = {
  "en-cn": [
    "the class is so boring",
    "the class is so good",
    "nobody likes you",
    "you're so brave",
    "this is crazy",
  ],
  "cn-en": [
    "你这人胆子真大",
    "这课真是闹麻了",
    "已老实",
    "纯纯毒瘤",
    "这谁顶得住",
  ],
};

const SYSTEM = {
  "en-cn": `你是「跨文化梗翻译器」的中文网感通道。

任务：把英语句子翻成「中国互联网会怎么说」，不是字典翻译。
目标平台：微信群、微博、B站评论区、小红书、贴吧、游戏语音、英雄联盟对线。

硬规则：
1. 只输出一个 JSON 对象，不要 markdown，不要解释。
2. line 必须像真人刚打出来的：有网感、节奏、情绪。可以脏一点、抽象一点、夸张一点，但不要无意义乱码。
3. 禁止书面腔、新闻腔、翻译腔。不要「这节课非常无聊」。
4. 强度对齐：原句轻嘲就轻嘲，原句开骂就开骂，原句真心夸就真心夸——但用中文网感夸。
5. 优先用当下仍活着的说法，例如：闹麻了、哈人、绷不住、典、纯纯、已老实、这谁顶得住、有点东西、真尼玛有点意思、笑不活了、救命、显眼包、老登、抽象、绝了、属于是。不要堆砌，选一个最准的语气一锤定音。
6. 外国网友以为在认真吵架、中国网友听着像撒娇的弱英骂，翻成中文时要给够力道。
7. line 尽量一行。偶尔可用重复字或拉长音（啊啊啊）加强情绪。

校准：
- the class is so boring → 这课真是闹麻了
- the class is so good → 这个课真尼玛有点意思啊啊啊
- nobody likes you → 你这人在局里纯纯毒瘤
- you're so brave → 你这人胆子真大（阴阳，不是夸奖）

JSON 形状：
{"line":"最终那句中文梗","vibe":"语气标签，短","why":"为什么这么说才对味，20-40字"}`,

  "cn-en": `You are the English-internet channel of a Cross-Culture Meme Translator.

Job: turn Chinese into how English-speaking internet would actually say it — not dictionary English.
Target register: Twitter/X, TikTok comments, Reddit, Discord, Twitch chat, group chats.

Hard rules:
1. Output one JSON object only. No markdown. No extra text.
2. "line" must sound like a native poster, not a language learner. Cadence, attitude, living slang.
3. Ban textbook English and tourist English. Ban weak insults like "nobody likes you" when the Chinese is actually roasting.
4. Match intensity. 阴阳怪气 is sarcasm, not a compliment. 抽象 is shitpost energy. 闹麻了 is "this is so over / this is actually unhinged / I'm cooked".
5. Use living register only when it fits: cooked, mid, slaps, it's giving, skill issue, we stay losing, we're so back, that's crazy work, I'm deceased, lowkey, highkey, touch grass, main character, ratio, L, W, down bad, it's so over. Do not dump a slang salad.
6. If the Chinese is a meme (龙图, 已老实, 显眼包, 尊嘟假嘟), translate the SOCIAL MOVE, not the words.
7. One line. Caps, missing punctuation, or stretched letters are fine if that platform talks that way.

Calibration:
- 这课真是闹麻了 → this class is actually unhinged i cannot
- 这个课真尼玛有点意思啊啊啊 → this class kinda goes crazy ngl
- 你这人胆子真大 → that's crazy work. you really just said that
- 已老实 → he folded. logged off and touched grass
- 纯纯毒瘤 → actual lobby parasite, report this guy

JSON shape:
{"line":"the English meme line","vibe":"tone in 2-5 words","why":"why this hits, 20-40 words"}`,
};

const $ = (id) => document.getElementById(id);

const state = {
  lang: localStorage.getItem(STORAGE_LANG) === "zh" ? "zh" : "en",
  dir: localStorage.getItem(STORAGE_DIR) === "cn-en" ? "cn-en" : "en-cn",
  busy: false,
};

function t(key) {
  return I18N[state.lang][key] || I18N.en[key] || key;
}

function applyI18n() {
  document.documentElement.lang = state.lang === "zh" ? "zh" : "en";
  document.documentElement.dataset.dir = state.dir;
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    el.textContent = t(el.dataset.i18n);
  });
  $("langBtn").textContent = t("langBtn");
  $("langBtn").title = t("langTitle");
  $("inputText").placeholder =
    state.dir === "en-cn" ? t("placeholderEnCn") : t("placeholderCnEn");
  renderTape();
  renderExamples();
  syncDirection();
  syncKeyDot();
}

function renderTape() {
  const list = $("tapeList");
  list.innerHTML = "";
  TAPE[state.lang].forEach((row) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${escapeHtml(row.from)}</span><small>→ ${escapeHtml(row.to)}</small>`;
    list.appendChild(li);
  });
}

function renderExamples() {
  const box = $("examplePills");
  box.innerHTML = "";
  EXAMPLES[state.dir].forEach((line) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = line;
    btn.addEventListener("click", () => {
      $("inputText").value = line;
      $("inputText").focus();
    });
    box.appendChild(btn);
  });
}

function syncDirection() {
  const en = $("dirEnCn");
  const cn = $("dirCnEn");
  const isEn = state.dir === "en-cn";
  en.classList.toggle("is-on", isEn);
  cn.classList.toggle("is-on", !isEn);
  en.setAttribute("aria-selected", String(isEn));
  cn.setAttribute("aria-selected", String(!isEn));
  $("inputText").placeholder =
    isEn ? t("placeholderEnCn") : t("placeholderCnEn");
}

function syncKeyDot() {
  $("keyDot").dataset.state = getKey() ? "on" : "off";
}

function getKey() {
  return (localStorage.getItem(STORAGE_KEY) || "").trim();
}

function setStatus(msg, err = false) {
  const el = $("status");
  el.textContent = msg || "";
  el.classList.toggle("err", Boolean(err));
}

function escapeHtml(s) {
  return String(s)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function parseMeme(content) {
  const trimmed = String(content || "").trim();
  const tryParse = (raw) => {
    const obj = JSON.parse(raw);
    if (obj && typeof obj.line === "string" && obj.line.trim()) return obj;
    throw new Error("no line");
  };
  try {
    return tryParse(trimmed);
  } catch {
    const match = trimmed.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return tryParse(match[0]);
      } catch {
        /* fall through */
      }
    }
  }
  if (trimmed) return { line: trimmed, vibe: "", why: "" };
  return null;
}

async function callDeepSeek(text) {
  const apiKey = getKey();
  let lastError = "DeepSeek request failed";

  for (const model of MODELS) {
    const attempts = [
      {
        model,
        messages: [
          { role: "system", content: SYSTEM[state.dir] },
          { role: "user", content: String(text).slice(0, 800) },
        ],
        temperature: 0.95,
        max_tokens: 400,
        thinking: { type: "disabled" },
        response_format: { type: "json_object" },
      },
      {
        model,
        messages: [
          { role: "system", content: SYSTEM[state.dir] },
          { role: "user", content: String(text).slice(0, 800) },
        ],
        temperature: 0.95,
        max_tokens: 400,
      },
    ];

    for (const body of attempts) {
      const res = await fetch("https://api.deepseek.com/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        const content = data.choices?.[0]?.message?.content;
        const parsed = parseMeme(content);
        if (!parsed) throw new Error(t("badJson"));
        return parsed;
      }

      lastError =
        data.error?.message ||
        data.message ||
        `DeepSeek ${res.status}`;

      if (res.status === 401 || res.status === 402 || res.status === 403) {
        throw new Error(lastError);
      }
      if (res.status !== 400) {
        break;
      }
    }
  }

  throw new Error(lastError);
}

function showSticker(meme) {
  const sticker = $("sticker");
  sticker.hidden = false;
  sticker.classList.remove("is-empty");
  sticker.style.animation = "none";
  void sticker.offsetWidth;
  sticker.style.animation = "";
  $("stickerId").textContent = `404-${state.dir.toUpperCase()}-${Date.now()
    .toString()
    .slice(-4)}`;
  $("outputLine").textContent = meme.line;
  $("outputVibe").textContent = meme.vibe || "";
  $("outputWhy").textContent = meme.why || "";
}

async function fire() {
  if (state.busy) return;
  const text = $("inputText").value.trim();
  if (!getKey()) {
    setStatus(t("needKey"), true);
    openKey();
    return;
  }
  if (!text) {
    setStatus(t("needText"), true);
    $("inputText").focus();
    return;
  }

  state.busy = true;
  $("fireBtn").disabled = true;
  $("fireBtn").classList.add("is-busy");
  setStatus(t("busy"));

  try {
    const meme = await callDeepSeek(text);
    showSticker(meme);
    setStatus(t("done"));
  } catch (err) {
    setStatus(err.message || String(err), true);
  } finally {
    state.busy = false;
    $("fireBtn").disabled = false;
    $("fireBtn").classList.remove("is-busy");
  }
}

function setDir(dir) {
  state.dir = dir;
  localStorage.setItem(STORAGE_DIR, dir);
  document.documentElement.dataset.dir = dir;
  syncDirection();
  renderExamples();
}

function setLang(lang) {
  state.lang = lang;
  localStorage.setItem(STORAGE_LANG, lang);
  applyI18n();
}

function openKey() {
  $("keyModal").hidden = false;
  $("apiKeyInput").value = getKey();
  $("apiKeyInput").focus();
}

function closeKey() {
  $("keyModal").hidden = true;
}

function bind() {
  $("langBtn").addEventListener("click", () => {
    setLang(state.lang === "en" ? "zh" : "en");
  });
  $("dirEnCn").addEventListener("click", () => setDir("en-cn"));
  $("dirCnEn").addEventListener("click", () => setDir("cn-en"));
  $("swapBtn").addEventListener("click", () => {
    setDir(state.dir === "en-cn" ? "cn-en" : "en-cn");
  });
  $("fireBtn").addEventListener("click", fire);
  $("againBtn").addEventListener("click", fire);
  $("copyBtn").addEventListener("click", async () => {
    const line = $("outputLine").textContent;
    if (!line) return;
    try {
      await navigator.clipboard.writeText(line);
      setStatus(t("copied"));
    } catch {
      setStatus(t("copyFail"), true);
    }
  });
  $("keyBtn").addEventListener("click", openKey);
  $("closeKey").addEventListener("click", closeKey);
  $("keyModal").addEventListener("click", (e) => {
    if (e.target === $("keyModal")) closeKey();
  });
  $("saveKey").addEventListener("click", () => {
    const key = $("apiKeyInput").value.trim();
    if (key) localStorage.setItem(STORAGE_KEY, key);
    else localStorage.removeItem(STORAGE_KEY);
    syncKeyDot();
    closeKey();
    setStatus(key ? (state.lang === "zh" ? "密钥已保存。" : "Key saved.") : "");
  });
  $("inputText").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      fire();
    }
  });
}

applyI18n();
bind();
