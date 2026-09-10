(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.FreqCore = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const MAX_INPUT = 500;

  function looksLikeJson(text) {
    const src = String(text || "").trim();
    if (!src) return false;
    return (
      src.startsWith("{") ||
      src.startsWith("[") ||
      src.startsWith("```") ||
      /"line"\s*:/.test(src)
    );
  }

  function stripFences(text) {
    return String(text || "")
      .replace(/```(?:json)?/gi, "")
      .trim();
  }

  function extractJsonObjects(text) {
    const src = String(text || "");
    const out = [];
    let start = -1;
    let depth = 0;
    let inStr = false;
    let escape = false;
    for (let i = 0; i < src.length; i += 1) {
      const ch = src[i];
      if (inStr) {
        if (escape) {
          escape = false;
          continue;
        }
        if (ch === "\\") {
          escape = true;
          continue;
        }
        if (ch === '"') inStr = false;
        continue;
      }
      if (ch === '"') {
        inStr = true;
        continue;
      }
      if (ch === "{") {
        if (depth === 0) start = i;
        depth += 1;
      } else if (ch === "}") {
        if (depth === 0) continue;
        depth -= 1;
        if (depth === 0 && start >= 0) {
          out.push(src.slice(start, i + 1));
          start = -1;
        }
      }
    }
    return out;
  }

  function unescapeJsonString(raw) {
    try {
      return JSON.parse('"' + raw + '"');
    } catch {
      return raw.replace(/\\n/g, "\n").replace(/\\"/g, '"');
    }
  }

  function lineFromLooseText(text) {
    const match = String(text || "").match(/"line"\s*:\s*"((?:\\.|[^"\\])*)"/);
    if (!match) return "";
    return unescapeJsonString(match[1]).trim();
  }

  function cleanDisplay(text) {
    const src = String(text || "").trim();
    if (!src || looksLikeJson(src)) return "";
    return src.replace(/^["'`]+|["'`]+$/g, "").trim();
  }

  function parseMeme(content) {
    const trimmed = stripFences(content);
    if (!trimmed) return null;

    const tryObj = (raw) => {
      try {
        return normalizeMeme(JSON.parse(raw));
      } catch {
        return null;
      }
    };

    let meme = tryObj(trimmed);
    if (meme) return meme;

    const blobs = extractJsonObjects(trimmed);
    for (let i = blobs.length - 1; i >= 0; i -= 1) {
      meme = tryObj(blobs[i]);
      if (meme) return meme;
    }

    const loose = lineFromLooseText(trimmed);
    if (loose && !looksLikeJson(loose)) {
      return normalizeMeme({ line: loose });
    }

    if (!looksLikeJson(trimmed)) return normalizeMeme({ line: trimmed });
    return null;
  }

  function normalizeMeme(obj) {
    if (!obj || typeof obj !== "object") return null;
    let line = cleanDisplay(obj.line || obj.text || obj.meme || "");
    if (!line && typeof obj.line === "string" && looksLikeJson(obj.line)) {
      const nested = parseMeme(obj.line);
      if (nested) return nested;
    }
    if (!line) return null;
    const alts = []
      .concat(obj.alts || obj.alternatives || [])
      .map((item) => cleanDisplay(item))
      .filter((item, i, arr) => item && item !== line && arr.indexOf(item) === i)
      .slice(0, 8);
    return {
      line,
      alts,
      vibe: cleanDisplay(obj.vibe || obj.tone || ""),
      why: cleanDisplay(obj.why || obj.reason || ""),
      literal: cleanDisplay(obj.literal || obj.dictionary || ""),
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

  function extractResponseText(data) {
    if (!data || typeof data !== "object") return "";
    if (typeof data.output_text === "string" && data.output_text.trim()) {
      return data.output_text.trim();
    }
    const choice = data.choices?.[0]?.message?.content;
    if (typeof choice === "string" && choice.trim()) return choice.trim();
    const chunks = [];
    const output = Array.isArray(data.output) ? data.output : [];
    output.forEach((item) => {
      if (!item || typeof item !== "object") return;
      if (item.type && item.type !== "message" && item.type !== "output_text") return;
      const content = item.content;
      if (typeof content === "string") chunks.push(content);
      if (Array.isArray(content)) {
        content.forEach((part) => {
          if (!part) return;
          if (part.type && part.type !== "output_text" && part.type !== "text") return;
          if (typeof part.text === "string") chunks.push(part.text);
        });
      }
    });
    return chunks.join("\n").trim();
  }

  function buildChatBodies(model, system, user) {
    const base = {
      model,
      messages: [
        { role: "system", content: system },
        { role: "user", content: user },
      ],
      temperature: 0.95,
      max_tokens: 900,
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

  function buildSearchBodies(model, system, user) {
    const input = [
      { role: "system", content: system },
      { role: "user", content: user },
    ];
    const base = {
      model,
      input,
      temperature: 0.95,
      thinking: { type: "disabled" },
    };
    return [
      {
        ...base,
        tools: [{ type: "web_search" }],
        tool_choice: { type: "web_search" },
      },
      {
        ...base,
        tools: [{ type: "web_search" }],
      },
    ];
  }

  return {
    MAX_INPUT,
    parseMeme,
    normalizeMeme,
    looksLikeJson,
    cleanDisplay,
    detectDir,
    mapHttpError,
    clipInput,
    extractResponseText,
    buildChatBodies,
    buildSearchBodies,
  };
});
