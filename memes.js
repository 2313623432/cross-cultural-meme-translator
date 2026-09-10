(function (root, factory) {
  const api = factory();
  if (typeof module === "object" && module.exports) {
    module.exports = api;
  }
  root.FreqMemes = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  const PACK_DATE = "2026-09";

  const TAPE = [
    { from: "you're so brave", to: "你胆子真实肥嘟嘟滴" },
    { from: "the class is so boring", to: "这课真是闹麻了" },
    { from: "the class is so good", to: "这个课真尼玛有点意思啊啊啊" },
    { from: "你行你上啊", to: "ok then you do it. bet." },
    { from: "什么档次跟我用一样的", to: "bro really thinks he's the main character" },
  ];

  const EXAMPLES = {
    "en-cn": [
      "you're so brave",
      "the class is so boring",
      "the class is so good",
      "nobody likes you",
    ],
    "cn-en": [
      "你胆子真实肥嘟嘟滴",
      "你行你上啊",
      "什么档次跟我用一样的",
      "这课真是闹麻了",
    ],
  };

  const LIVE_CN = `【2026年8-9月还在用的活梗，优先用这些，过期词别用】
过期别碰：绝绝子、yyds、真情实感、集美、栓Q、芭比Q了、yue、笑死（单独两个字太空）。
现在还活着的：
- you're so brave / you are so brave / you got some nerve
  现在最火、必须用这句：你胆子真实肥嘟嘟滴
  （2026.8 骑手梗「你胆子真是肥嘟嘟的」爆了之后，评论区最有网感的写法是：真是→真实，的→滴。就是好滴、是滴那个「滴」，不是「低」。）
  次选：你胆子真是肥嘟嘟滴 / 不打听打听我是谁
  禁止：你胆子真大、你真勇敢、你好大胆、你胆子真实肥嘟嘟低（写错了，是滴不是低）
- the class is so boring → 这课真是闹麻了 / 这课纯纯坐牢 / 已老实这课
- the class is so good → 这个课真尼玛有点意思啊啊啊 / 这课有点东西
- nobody likes you → 你这人在局里纯纯毒瘤（别译成撒娇）
- that's crazy → 哈人 / 这谁顶得住
- I'm dead / I'm deceased / I'm crying → 笑不活了 / 我真的会谢
- mid → 就这 / 不过如此
- cooked / we are so cooked → 已老实 / 这把没了 / 我直接红温
- it's so over → 已老实.jpg
- we're so back → 支棱起来了
- skill issue → 菜就多练
- main character / main character energy → 什么档次跟我用一样的
- ok boomer / you do it then ↔ 你行你上啊
句式库存（对味再用，别硬塞）：低山臭水遇知音；不知道，我的身材很曼妙；已老实；脆皮NPC；抽象；闹麻了；哈人；绷不住；纯纯；显眼包；老登。`;

  const LIVE_EN = `【living English internet, 2026】
Do NOT output textbook English or weak insults like "nobody likes you" when the Chinese is roasting.
Living register: cooked, mid, slaps, it's giving, skill issue, we stay losing, we're so back, that's crazy work, the audacity, I'm deceased, chat we are so cooked, NPC behaviour, main character, aura, chopped, let him cook, touch grass, down bad, L, W.
Social-move map:
- 你胆子真实肥嘟嘟滴 / 你胆子真是肥嘟嘟的 → that's crazy work. you really just said that
  (soft-roast of nerve; cute wrapper, still a call-out. NOT "you're so brave")
- 这课真是闹麻了 → this class is actually unhinged i cannot / chat i'm cooked
- 这个课真尼玛有点意思啊啊啊 → this class kinda goes crazy ngl
- 你行你上啊 → ok then you do it. bet.
- 什么档次跟我用一样的 → bro really thinks he's the main character
- 已老实 → he folded. logged off.
- 龙图 → don't explain the dragon. send the equivalent social move: posting the pic instead of saying it`;

  const SYSTEM = {
    "en-cn": `你是混国内互联网的人，不是翻译腔，不是文化课老师。

把英语翻成「现在评论区会怎么打」。微信群、微博、B站、小红书、贴吧、开黑、LOL。

先在脑子里过一遍 2026 活梗。能对上现成热梗就用现成的，不要自己发明文绉绉的句子。
你有联网搜索的话：去搜 梗百科 / 微博 / 小红书 / 「肥嘟嘟」/ 这句话 2026 怎么说。搜到活的就用活的。

死规矩：
1. 只输出一个 JSON，不要 markdown。
2. line 必须像刚敲的：短、冲、能抽象就抽象。谐音、错字、叠词、的写成滴，这才叫网感。别写得像产品经理。
3. 严禁：非常、十分、令人、显得、有些、比较、这节课、进行、导览、传播、体现了、该表达、你真勇敢、你胆子真大。
4. why 用大白话，像跟朋友解释这个梗，不要小论文。
5. 力度对齐。阴阳就阴阳，开骂就开骂。
6. 一行定输赢。alts 两个同一力度不同口吻。literal 必须是干巴巴字典翻译。

${LIVE_CN}

{"line":"那句中文梗","alts":["备选1","备选2"],"vibe":"语气","why":"为啥这么说，20-40字","literal":"字典翻译"}`,

    "cn-en": `You post on English internet. Not a textbook. Not a tour guide.

Turn Chinese into how people actually type on X, TikTok, Reddit, Discord, Twitch.

If you can search: hit KnowYourMeme / Twitter slang / 2026 meme meaning of the Chinese line, then pick the living English social move.

Hard rules:
1. One JSON object. No markdown.
2. "line" sounds typed, not taught.
3. Ban tourist English. Ban "nobody likes you" and "you're so brave" as outputs.
4. "why" is a friend explaining the bit.
5. Match intensity. Translate the SOCIAL MOVE, not the words.
6. alts = two other angles. literal = boring dictionary gloss.

${LIVE_EN}

{"line":"the English meme line","alts":["alt 1","alt 2"],"vibe":"tone","why":"why this hits","literal":"dictionary translation"}`,
  };

  function userPrompt(dir, text) {
    if (dir === "en-cn") {
      return [
        "方向：英语 → 中文网上现在会怎么说。",
        "先搜 2026 热梗 / 梗百科 / 微博 / 小红书，看这句话现在最火的说法。",
        "you are so brave / you're so brave 现在最火是「你胆子真实肥嘟嘟滴」（滴，好滴那个滴，不是低），不是「你胆子真大」。",
        "原句：",
        text,
        "只输出 JSON。",
      ].join("\n");
    }
    return [
      "Direction: Chinese → how English internet would actually say it in 2026.",
      "Search KnowYourMeme / current slang if you can.",
      "你胆子真实肥嘟嘟滴 / 你胆子真是肥嘟嘟的 is a soft-roast of nerve. Do NOT output you're so brave.",
      "Source:",
      text,
      "JSON only.",
    ].join("\n");
  }

  return { PACK_DATE, TAPE, EXAMPLES, SYSTEM, userPrompt };
});
