(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.FreqCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const MAX_INPUT = 500;

  function parseMeme(content) {
    const trimmed = String(content || "").trim();
    const tryParse = (raw) => normalizeMeme(JSON.parse(raw));
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
    if (trimmed) return normalizeMeme({ line: trimmed });
    return null;
  }

  function normalizeMeme(obj) {
    if (!obj || typeof obj !== "object") return null;
    const line = String(obj.line || obj.text || obj.meme || "").trim();
    if (!line) return null;
    const alts = []
      .concat(obj.alts || obj.alternatives || [])
      .map((item) => String(item || "").trim())
      .filter((item, i, arr) => item && item !== line && arr.indexOf(item) === i)
      .slice(0, 2);
    return {
      line,
      alts,
      vibe: String(obj.vibe || obj.tone || "").trim(),
      why: String(obj.why || obj.reason || "").trim(),
      literal: String(obj.literal || obj.dictionary || "").trim(),
    };
  }

  function detectDir(text) {
    const src = String(text || "");
    const han = (src.match(/[\u4e00-\u9fff]/g) || []).length;
    const latin = (src.match(/[A-Za-z]/g) || []).length;
    if (han === 0 && latin === 0) return null;
    if (han >= 2 && han > latin) return "cn-en";
    if (latin >= 3 && latin > han) return "en-cn";
    return null;
  }

  function mapHttpError(status, message, lang) {
    const zh = lang === "zh";
    if (status === 401 || status === 403) {
      return zh
        ? "密钥无效。打开 platform.deepseek.com/api_keys 复制一颗新的。"
        : "Invalid DeepSeek key. Copy a fresh one from platform.deepseek.com/api_keys.";
    }
    if (status === 402) {
      return zh
        ? "密钥是真的，但余额不足。去 DeepSeek 平台充值后再试。"
        : "Key is real, but the DeepSeek balance is empty. Top up and retry.";
    }
    if (status === 429) {
      return zh
        ? "请求太快，DeepSeek 限流了。等几秒再开整。"
        : "Rate limited by DeepSeek. Wait a few seconds and fire again.";
    }
    if (status === 500 || status === 502 || status === 503) {
      return zh
        ? "DeepSeek 暂时抽风。不是这个页面坏了，稍后再试。"
        : "DeepSeek is down right now. This page is fine — retry in a moment.";
    }
    const raw = String(message || "").trim();
    if (/insufficient|balance|quota|billing/i.test(raw)) {
      return zh
        ? "额度或余额不够。去 DeepSeek 平台充值。"
        : "Quota or balance too low. Top up on the DeepSeek platform.";
    }
    if (/timeout|abort/i.test(raw)) {
      return zh ? "请求超时。网络或模型太慢，再打一次。" : "Request timed out. Try again.";
    }
    if (/failed to fetch|networkerror|load failed/i.test(raw)) {
      return zh
        ? "浏览器连不上 DeepSeek。检查网络，或确认没有插件拦截。"
        : "Browser could not reach DeepSeek. Check the network or a blocker extension.";
    }
    return raw || (zh ? "翻译失败，请再试一次。" : "Translation failed. Try again.");
  }

  function clipInput(text) {
    return String(text || "").trim().slice(0, MAX_INPUT);
  }

  function buildChatBodies(model, system, user) {
    const base = {
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.9,
      max_tokens: 500,
    };
    return [
      {
        ...base,
        thinking: { type: "disabled" },
        response_format: { type: "json_object" },
      },
      { ...base, thinking: { type: "disabled" } },
      base,
    ];
  }

  return {
    MAX_INPUT,
    parseMeme,
    normalizeMeme,
    detectDir,
    mapHttpError,
    clipInput,
    buildChatBodies,
  };
});
