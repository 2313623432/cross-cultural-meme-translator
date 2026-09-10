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
    onAir: "LIVE TOOL · NOT A MOCK",
    keyChip: "API KEY",
    kicker: "WHY THIS EXISTS",
    tapeKicker: "CALIBRATION SAMPLES",
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
    history: "THIS BROWSER · RECENT",
    clearHistory: "CLEAR",
    emptyHistory: "No live runs yet. Fire a line with a real key.",
    alts: "OTHER ANGLES",
    literalLabel: "Dictionary would say",
    foot: "口语 is UI language. The two channels are translation direction. Not the same knob. Key is verified against DeepSeek before it is trusted. Nothing here is a canned demo result.",
    keyTitle: "DeepSeek API key",
    keyHelp:
      "Paste a key from platform.deepseek.com. We ping DeepSeek /models with it. If that call fails, the key is not saved as live. Stored only in this browser.",
    getKey: "Get a key",
    saveKey: "SAVE & VERIFY",
    verifying: "Pinging DeepSeek…",
    keyLive: "Key is live.",
    keySavedUnverified: "Saved locally, but DeepSeek did not answer. Translation may still fail.",
    needKey: "Verify a DeepSeek key first. This is a live call, not a demo.",
    needText: "Give me a line to transmute.",
    busy: "Calling DeepSeek…",
    done: "Live result from DeepSeek.",
    copied: "Copied.",
    copyFail: "Copy failed — select it yourself.",
    badJson: "DeepSeek returned noise instead of a meme. Try again.",
    switched: "Detected Chinese — switched to CN → EN.",
    switchedEn: "Detected English — switched to EN → CN.",
    langBtn: "口语",
    langTitle: "Switch interface to Chinese",
    placeholderEnCn: "the class is so boring",
    placeholderCnEn: "你行你上啊",
  },
  zh: {
    onAir: "真调用 · 不是演示",
    keyChip: "API KEY",
    kicker: "为什么做这个",
    tapeKicker: "校准样例",
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
    history: "本机记录",
    clearHistory: "清空",
    emptyHistory: "还没有真跑过。贴密钥后开整一句。",
    alts: "别的说法",
    literalLabel: "字典会译成",
    foot: "「口语」只切界面语言。两个频道才是翻译方向。不是同一个按钮。密钥会先向 DeepSeek 做真实验证。这里不会拿写死的句子冒充结果。",
    keyTitle: "DeepSeek API 密钥",
    keyHelp:
      "从 platform.deepseek.com 复制密钥。我们会用它请求 DeepSeek /models。验证失败就不会标成可用。只存在本机。",
    getKey: "去申请密钥",
    saveKey: "保存并验证",
    verifying: "正在请求 DeepSeek…",
    keyLive: "密钥可用。",
    keySavedUnverified: "已保存在本地，但 DeepSeek 没应答。翻译仍可能失败。",
    needKey: "先验证 DeepSeek 密钥。这是真调用，不是演示。",
    needText: "先丢一句进来。",
    busy: "正在请求 DeepSeek…",
    done: "这是 DeepSeek 的实时结果。",
    copied: "已复制。",
    copyFail: "复制失败，请手动选中。",
    badJson: "模型这次没按格式返回，再打一次。",
    switched: "检测到中文，已切到 中文 → 英文梗。",
    switchedEn: "检测到英语，已切到 英语 → 中文梗。",
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
  "en-cn": `你是「跨文化梗翻译器」的中文网感通道。

任务：把英语句子翻成「中国互联网会怎么说」，不是字典翻译。
目标平台：微信群、微博、B站评论区、小红书、贴吧、游戏语音、英雄联盟对线。

硬规则：
1. 只输出一个 JSON 对象，不要 markdown，不要解释。
2. line 必须像真人刚打出来的：有网感、节奏、情绪。可以脏一点、抽象一点、夸张一点，但不要无意义乱码。
3. 禁止书面腔、新闻腔、翻译腔。不要「这节课非常无聊」。
4. 强度对齐：原句轻嘲就轻嘲，原句开骂就开骂，原句真心夸就真心夸——但用中文网感夸。
5. 优先用当下仍活着的说法。不要堆砌，选一个最准的语气一锤定音。
6. 外国网友以为在认真吵架、中国网友听着像撒娇的弱英骂，翻成中文时要给够力道。
7. line 尽量一行。alts 给两个不同角度、同一强度的备选。literal 必须是普通字典翻译，用来对照。

校准：
- the class is so boring → 这课真是闹麻了
- the class is so good → 这个课真尼玛有点意思啊啊啊
- nobody likes you → 你这人在局里纯纯毒瘤
- you're so brave → 你这人胆子真大（阴阳，不是夸奖）

JSON 形状：
{"line":"最终那句中文梗","alts":["备选1","备选2"],"vibe":"语气标签","why":"为什么这么说才对味，20-40字","literal":"字典翻译"}`,

  "cn-en": `You are the English-internet channel of a Cross-Culture Meme Translator.

Job: turn Chinese into how English-speaking internet would actually say it — not dictionary English.
Target register: Twitter/X, TikTok comments, Reddit, Discord, Twitch chat, group chats.

Hard rules:
1. Output one JSON object only. No markdown. No extra text.
2. "line" must sound like a native poster, not a language learner.
3. Ban textbook English. Ban weak insults like "nobody likes you" when the Chinese is roasting.
4. Match intensity. 阴阳怪气 is sarcasm. 抽象 is shitpost energy.
5. Use living register only when it fits. Do not dump a slang salad.
6. If the Chinese is a meme (龙图, 已老实, 显眼包), translate the SOCIAL MOVE, not the words.
7. One line. "alts" = two other angles, same intensity. "literal" = a boring dictionary translation for contrast.

Calibration:
- 这课真是闹麻了 → this class is actually unhinged i cannot
- 这个课真尼玛有点意思啊啊啊 → this class kinda goes crazy ngl
- 你行你上啊 → ok boomer, you do it then
- 什么档次跟我用一样的 → bro really thinks he's the main character
- 你这人胆子真大 → that's crazy work. you really just said that

JSON shape:
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
