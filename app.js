const STORAGE_KEY = "freq404.deepseekKey";
const STORAGE_LANG = "freq404.lang";
const STORAGE_DIR = "freq404.dir";
const STORAGE_HISTORY = "freq404.history";
const STORAGE_INPUT = "freq404.input";
const STORAGE_KEY_OK = "freq404.keyOk";

const MODELS = ["deepseek-flash", "deepseek-v4-flash", "deepseek-chat"];
const HISTORY_MAX = 24;
const REQUEST_MS = 45000;

const I18N = {
  en: {
    onAir: "LIVE. NOT A DECK.",
    keyChip: "API KEY",
    kicker: "THE ACTUAL PROBLEM",
    tapeKicker: "THESE HIT",
    manifesto:
      "Culture export keeps doing TED Talks about Mid-Autumn Festival. Even we skip that. Funny beats useful. In China you don’t say “you’re so brave” — you drop the dragon pic. Same on the other internet. Google Translate is solved. The meme layer isn’t. That’s why a LoL flame from NA still reads as flirting over here. Their nuclear option is “nobody likes you.” We thought they were being cute.",
    channelA: "A SIDE",
    channelB: "B SIDE",
    dirEnCn: "EN → CN meme",
    dirCnEn: "CN → EN meme",
    dirEnCnSub: "English in. How we’d actually say it.",
    dirCnEnSub: "Chinese in. How they’d actually say it.",
    inputLabel: "PASTE THE LINE",
    inputHint: "Ctrl + Enter to send",
    fire: "SEND IT",
    stamp: "SENT",
    copy: "COPY",
    again: "SPIN IT",
    history: "JUST NOW",
    clearHistory: "TOSS",
    emptyHistory: "Nothing yet. Paste a real key and send a line.",
    alts: "OR SAY IT LIKE THIS",
    literalLabel: "The boring translation",
    foot: "口语 only flips the UI language. The two channels are the actual translation. Not the same button. We ping DeepSeek before we trust a key. No canned lines pretending to be results.",
    keyTitle: "DeepSeek API key",
    keyHelp:
      "Paste a key from platform.deepseek.com. We hit DeepSeek /models with it. If that dies, it does not count as live. Stays in this browser only.",
    getKey: "Get a key",
    saveKey: "SAVE & CHECK",
    verifying: "Asking DeepSeek…",
    keyLive: "Key works.",
    keySavedUnverified: "Saved here, but DeepSeek didn’t answer. The next send might still fail.",
    needKey: "Check a DeepSeek key first. This is a real call, not a demo.",
    needText: "You gotta type something.",
    busy: "DeepSeek is cooking…",
    done: "Fresh from DeepSeek.",
    copied: "Copied.",
    copyFail: "Copy failed — just select it.",
    badJson: "Model spat garbage. Hit it again.",
    switched: "That’s Chinese — flipped to CN → EN.",
    switchedEn: "That’s English — flipped to EN → CN.",
    langBtn: "口语",
    langTitle: "Switch interface to Chinese",
    placeholderEnCn: "the class is so boring",
    placeholderCnEn: "你行你上啊",
  },
  zh: {
    onAir: "真能用 · 不是 PPT",
    keyChip: "API KEY",
    kicker: "这玩意儿干嘛的",
    tapeKicker: "对过味的",
    manifesto:
      "对外讲文化一张口就是中秋节从唐朝讲起。本国人都划走，你指望老外看完？好玩比有用重要多了。国内一句「你胆子真大」不如直接甩张龙图。国外也一样。翻译软件都卷死了，梗还是对不上。LOL 里跟外国人对线，他们最狠也就 nobody likes you，搁咱们这儿听着像在撒娇。",
    channelA: "A 路",
    channelB: "B 路",
    dirEnCn: "英语 → 中文梗",
    dirCnEn: "中文 → 英文梗",
    dirEnCnSub: "英语丢进去，中文网上会怎么说",
    dirCnEnSub: "中文丢进去，外国网上会怎么说",
    inputLabel: "原句丢这儿",
    inputHint: "Ctrl + Enter 直接出",
    fire: "整活",
    stamp: "好了",
    copy: "抄走",
    again: "换一句",
    history: "刚才翻过的",
    clearHistory: "清掉",
    emptyHistory: "还没跑过。先把 key 贴上，再整一句。",
    alts: "也可以这么说",
    literalLabel: "正经翻译会写成",
    foot: "「口语」只换界面语言。两个频道才是翻译方向，别点错。key 会先拿去 DeepSeek 验一下。不会拿写死的句子骗你。",
    keyTitle: "DeepSeek 的 key",
    keyHelp:
      "去 platform.deepseek.com 复制。我们会拿它打一下 DeepSeek 的 /models。过不了就不算能用。只存在你这台电脑。",
    getKey: "没有 key？",
    saveKey: "存上并验一下",
    verifying: "正在问 DeepSeek…",
    keyLive: "这 key 能用。",
    keySavedUnverified: "先存在本地了，但 DeepSeek 没回。待会翻译可能翻车。",
    needKey: "先把 DeepSeek 的 key 验过。这是真打接口，不是演示页。",
    needText: "你得先打几个字进来。",
    busy: "DeepSeek 正在编…",
    done: "刚从 DeepSeek 打回来的。",
    copied: "抄走了。",
    copyFail: "没复制上，你自己选一下。",
    badJson: "这回模型写飞了，再打一次。",
    switched: "这是中文，已经切到「中文 → 英文梗」。",
    switchedEn: "这是英语，已经切到「英语 → 中文梗」。",
    langBtn: "EN",
    langTitle: "Switch interface to English",
    placeholderEnCn: "the class is so boring",
    placeholderCnEn: "你行你上啊",
  },
};

const TAPE = [
  { from: "the class is so boring", to: "这课真是闹麻了" },
  { from: "the class is so good", to: "这个课真尼玛有点意思啊啊啊" },
  { from: "你行你上啊", to: "ok boomer, you do it then" },
  { from: "什么档次跟我用一样的", to: "bro really thinks he's the main character" },
];

const EXAMPLES = {
  "en-cn": [
    "the class is so boring",
    "the class is so good",
    "nobody likes you",
    "you're so brave",
  ],
  "cn-en": [
    "你行你上啊",
    "什么档次跟我用一样的",
    "你这人胆子真大",
    "这课真是闹麻了",
  ],
};

const SYSTEM = {
  "en-cn": `你是混国内互联网的人，不是翻译软件，不是文化讲解员。

把英语翻成「现在的人网上会怎么打」。微信群、微博、B站评论、小红书、贴吧、开黑语音、LOL 对线。

死规矩：
1. 只输出一个 JSON，不要 markdown。
2. line 必须像刚敲出来的：短、冲、有情绪。能脏就脏一点，能抽象就抽象，但别变成乱码。
3. 严禁翻译腔、新闻腔、讲解腔。禁止：非常、十分、令人、显得、有些、比较、这节课、进行、导览、传播、体现了、该表达。不要「这节课非常无聊」。
4. why 也用大白话，像跟朋友解释，不要小论文。
5. 力度对齐。原句在阴阳你就阴阳，原句在开骂你就开骂，原句真心夸就用中文网感夸。
6. 老外以为自己在对线、咱们听着像撒娇的那种弱英骂，中文要给够力。
7. 一行定输赢。alts 再给两个同一力度、不同口吻的。literal 必须是干巴巴的字典翻译，拿来对照。

对味：
- the class is so boring → 这课真是闹麻了
- the class is so good → 这个课真尼玛有点意思啊啊啊
- nobody likes you → 你这人在局里纯纯毒瘤
- you're so brave → 你这人胆子真大（阴阳，不是夸）

{"line":"那句中文梗","alts":["备选1","备选2"],"vibe":"语气","why":"为啥这么说，20-40字大白话","literal":"字典翻译"}`,

  "cn-en": `You post on English internet. You are not a textbook, not a tour guide.

Turn Chinese into how people actually talk on Twitter/X, TikTok, Reddit, Discord, Twitch, group chats.

Hard rules:
1. One JSON object. No markdown.
2. "line" sounds like a native just typed it. Cadence, attitude, living slang.
3. Ban tourist English and lecture English. Ban "nobody likes you" when the Chinese is actually roasting.
4. "why" is a friend explaining the bit, not an essay.
5. Match intensity. 阴阳怪气 = sarcasm. 抽象 = shitpost. 闹麻了 = this is so over / actually unhinged / I'm cooked.
6. Translate the SOCIAL MOVE of memes (龙图, 已老实, 显眼包), not the words.
7. One line. alts = two other angles, same heat. literal = boring dictionary gloss.

Hits:
- 这课真是闹麻了 → this class is actually unhinged i cannot
- 这个课真尼玛有点意思啊啊啊 → this class kinda goes crazy ngl
- 你行你上啊 → ok boomer, you do it then
- 什么档次跟我用一样的 → bro really thinks he's the main character
- 你这人胆子真大 → that's crazy work. you really just said that

{"line":"the English meme line","alts":["alt 1","alt 2"],"vibe":"tone","why":"why this hits, 20-40 words","literal":"dictionary translation"}`,
};

const $ = (id) => document.getElementById(id);

const state = {
  lang: localStorage.getItem(STORAGE_LANG) === "zh" ? "zh" : "en",
  dir: localStorage.getItem(STORAGE_DIR) === "cn-en" ? "cn-en" : "en-cn",
  busy: false,
  current: null,
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
  renderHistory();
  syncDirection();
  syncKeyDot();
  if (state.current) showSticker(state.current, { animate: false });
}

function renderTape() {
  const list = $("tapeList");
  list.innerHTML = "";
  TAPE.forEach((row) => {
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
      persistInput();
      updateMeta();
      $("inputText").focus();
    });
    box.appendChild(btn);
  });
}

function loadHistory() {
  try {
    const rows = JSON.parse(localStorage.getItem(STORAGE_HISTORY) || "[]");
    return Array.isArray(rows) ? rows : [];
  } catch {
    return [];
  }
}

function saveHistory(rows) {
  localStorage.setItem(STORAGE_HISTORY, JSON.stringify(rows.slice(0, HISTORY_MAX)));
}

function pushHistory(entry) {
  const rows = loadHistory().filter(
    (row) => !(row.input === entry.input && row.dir === entry.dir && row.line === entry.line)
  );
  rows.unshift(entry);
  saveHistory(rows);
  renderHistory();
}

function renderHistory() {
  const list = $("historyList");
  const rows = loadHistory();
  list.innerHTML = "";
  if (!rows.length) {
    const li = document.createElement("li");
    li.className = "history-empty";
    li.textContent = t("emptyHistory");
    list.appendChild(li);
    return;
  }
  rows.forEach((row) => {
    const li = document.createElement("li");
    const btn = document.createElement("button");
    btn.type = "button";
    btn.innerHTML = `<span>${escapeHtml(row.input)}</span><small>${escapeHtml(row.line)}</small>`;
    btn.addEventListener("click", () => {
      $("inputText").value = row.input;
      persistInput();
      setDir(row.dir, { silent: true });
      showSticker(row, { animate: true });
      setStatus(t("done"));
    });
    li.appendChild(btn);
    list.appendChild(li);
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
  const saved = Boolean(getKey());
  const ok = localStorage.getItem(STORAGE_KEY_OK) === "1";
  $("keyDot").dataset.state = saved ? (ok ? "live" : "on") : "off";
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

function persistInput() {
  localStorage.setItem(STORAGE_INPUT, $("inputText").value);
}

function updateMeta() {
  const text = $("inputText").value;
  $("charCount").textContent = `${[...text].length} / ${FreqCore.MAX_INPUT}`;
}

async function fetchWithTimeout(url, options, ms = REQUEST_MS) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), ms);
  try {
    return await fetch(url, { ...options, signal: ctrl.signal });
  } finally {
    clearTimeout(timer);
  }
}

function isUsable(res) {
  return res && res.status !== 404 && res.status !== 405;
}

async function requestDeepSeek(kind, body) {
  const apiKey = getKey();
  const headers = {
    Authorization: `Bearer ${apiKey}`,
  };
  const local =
    kind === "models"
      ? { url: "/api/models", method: "GET", headers }
      : {
          url: "/api/translate",
          method: "POST",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify(body),
        };
  const remote =
    kind === "models"
      ? {
          url: "https://api.deepseek.com/models",
          method: "GET",
          headers,
        }
      : {
          url: "https://api.deepseek.com/chat/completions",
          method: "POST",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify(body),
        };

  const errors = [];
  for (const target of [local, remote]) {
    try {
      const res = await fetchWithTimeout(target.url, {
        method: target.method,
        headers: target.headers,
        body: target.body,
      });
      if (target === local && !isUsable(res)) continue;
      const data = await res.json().catch(() => ({}));
      return { res, data };
    } catch (err) {
      errors.push(err);
      if (target === local) continue;
      throw err;
    }
  }
  throw errors[errors.length - 1] || new Error("DeepSeek request failed");
}

async function verifyKey(apiKey) {
  const previous = getKey();
  localStorage.setItem(STORAGE_KEY, apiKey);
  try {
    const { res, data } = await requestDeepSeek("models");
    if (!res.ok) {
      const msg = FreqCore.mapHttpError(
        res.status,
        data.error?.message || data.message,
        state.lang
      );
      throw new Error(msg);
    }
    localStorage.setItem(STORAGE_KEY_OK, "1");
    return true;
  } catch (err) {
    localStorage.removeItem(STORAGE_KEY_OK);
    if (previous) localStorage.setItem(STORAGE_KEY, previous);
    else localStorage.removeItem(STORAGE_KEY);
    throw err;
  } finally {
    syncKeyDot();
  }
}

async function callDeepSeek(text) {
  const user = [
    state.dir === "en-cn" ? "Direction: English → Chinese internet meme." : "Direction: Chinese → English internet meme.",
    "Source:",
    text,
  ].join("\n");

  let lastError = t("badJson");
  let lastStatus = 0;

  for (const model of MODELS) {
    const bodies = FreqCore.buildChatBodies(model, SYSTEM[state.dir], user);
    for (const body of bodies) {
      try {
        const { res, data } = await requestDeepSeek("chat", body);
        lastStatus = res.status;
        if (res.ok) {
          const content = data.choices?.[0]?.message?.content;
          const parsed = FreqCore.parseMeme(content);
          if (!parsed) throw new Error(t("badJson"));
          return parsed;
        }
        lastError = FreqCore.mapHttpError(
          res.status,
          data.error?.message || data.message,
          state.lang
        );
        if (res.status === 401 || res.status === 402 || res.status === 403) {
          localStorage.removeItem(STORAGE_KEY_OK);
          syncKeyDot();
          throw new Error(lastError);
        }
        if (res.status !== 400) break;
      } catch (err) {
        if (err.message && /Invalid DeepSeek|余额|balance|Quota/i.test(err.message)) {
          throw err;
        }
        lastError = FreqCore.mapHttpError(lastStatus, err.message, state.lang);
        if (err.name === "AbortError") {
          throw new Error(FreqCore.mapHttpError(0, "timeout", state.lang));
        }
      }
    }
  }

  throw new Error(lastError);
}

function showSticker(meme, { animate = true } = {}) {
  state.current = meme;
  const sticker = $("sticker");
  sticker.hidden = false;
  sticker.classList.remove("is-empty");
  if (animate) {
    sticker.style.animation = "none";
    void sticker.offsetWidth;
    sticker.style.animation = "";
  }
  $("stickerId").textContent = `404-${(meme.dir || state.dir).toUpperCase()}-${String(
    meme.ts || Date.now()
  ).slice(-4)}`;
  $("outputLine").textContent = meme.line;
  $("outputVibe").textContent = meme.vibe || "";
  $("outputWhy").textContent = meme.why || "";
  const literalWrap = $("literalWrap");
  if (meme.literal) {
    literalWrap.hidden = false;
    $("outputLiteral").textContent = meme.literal;
  } else {
    literalWrap.hidden = true;
    $("outputLiteral").textContent = "";
  }
  const alts = $("alts");
  alts.innerHTML = "";
  (meme.alts || []).forEach((line) => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.textContent = line;
    btn.addEventListener("click", () => {
      const next = { ...meme, line, alts: [meme.line, ...(meme.alts || []).filter((a) => a !== line)] };
      showSticker(next, { animate: false });
    });
    alts.appendChild(btn);
  });
  $("altsLabel").hidden = !(meme.alts && meme.alts.length);
}

async function fire() {
  if (state.busy) return;
  const text = FreqCore.clipInput($("inputText").value);
  $("inputText").value = text;
  persistInput();
  updateMeta();

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

  const detected = FreqCore.detectDir(text);
  let note = t("busy");
  if (detected && detected !== state.dir) {
    setDir(detected, { silent: true });
    note = `${detected === "cn-en" ? t("switched") : t("switchedEn")} ${t("busy")}`;
  }

  state.busy = true;
  $("fireBtn").disabled = true;
  $("fireBtn").classList.add("is-busy");
  setStatus(note);

  try {
    const meme = await callDeepSeek(text);
    const entry = {
      ...meme,
      input: text,
      dir: state.dir,
      ts: Date.now(),
    };
    showSticker(entry);
    pushHistory(entry);
    setStatus(t("done"));
  } catch (err) {
    setStatus(err.message || String(err), true);
  } finally {
    state.busy = false;
    $("fireBtn").disabled = false;
    $("fireBtn").classList.remove("is-busy");
  }
}

function setDir(dir, { silent = false } = {}) {
  state.dir = dir;
  localStorage.setItem(STORAGE_DIR, dir);
  document.documentElement.dataset.dir = dir;
  syncDirection();
  renderExamples();
  if (!silent) setStatus("");
}

function setLang(lang) {
  state.lang = lang;
  localStorage.setItem(STORAGE_LANG, lang);
  applyI18n();
}

function openKey() {
  $("keyModal").hidden = false;
  $("apiKeyInput").value = getKey();
  $("keyStatus").textContent = "";
  $("keyStatus").classList.remove("err");
  $("apiKeyInput").focus();
}

function closeKey() {
  $("keyModal").hidden = true;
}

async function copyText(text) {
  if (!text) return false;
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch {
    /* fallback */
  }
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.setAttribute("readonly", "");
  ta.style.position = "fixed";
  ta.style.left = "-9999px";
  document.body.appendChild(ta);
  ta.select();
  const ok = document.execCommand("copy");
  ta.remove();
  return ok;
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
    const ok = await copyText($("outputLine").textContent);
    setStatus(ok ? t("copied") : t("copyFail"), !ok);
  });
  $("keyBtn").addEventListener("click", openKey);
  $("closeKey").addEventListener("click", closeKey);
  $("keyModal").addEventListener("click", (e) => {
    if (e.target === $("keyModal")) closeKey();
  });
  $("saveKey").addEventListener("click", async () => {
    const key = $("apiKeyInput").value.trim();
    if (!key) {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(STORAGE_KEY_OK);
      syncKeyDot();
      $("keyStatus").textContent = t("needKey");
      $("keyStatus").classList.add("err");
      return;
    }
    $("saveKey").disabled = true;
    $("keyStatus").classList.remove("err");
    $("keyStatus").textContent = t("verifying");
    try {
      await verifyKey(key);
      $("keyStatus").textContent = t("keyLive");
      setTimeout(closeKey, 400);
      setStatus(t("keyLive"));
    } catch (err) {
      const network = /reach DeepSeek|连不上|timeout|超时/i.test(err.message);
      if (network) {
        localStorage.setItem(STORAGE_KEY, key);
        localStorage.removeItem(STORAGE_KEY_OK);
        syncKeyDot();
        $("keyStatus").textContent = t("keySavedUnverified") + " " + err.message;
      } else {
        $("keyStatus").textContent = err.message;
      }
      $("keyStatus").classList.add("err");
    } finally {
      $("saveKey").disabled = false;
    }
  });
  $("inputText").addEventListener("keydown", (e) => {
    if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      fire();
    }
  });
  $("inputText").addEventListener("input", () => {
    persistInput();
    updateMeta();
  });
  $("clearHistory").addEventListener("click", () => {
    saveHistory([]);
    renderHistory();
  });
}

const savedInput = localStorage.getItem(STORAGE_INPUT);
if (savedInput) $("inputText").value = savedInput;
applyI18n();
updateMeta();
bind();
