export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "authorization,content-type");
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "POST") {
    res.status(405).json({ error: { message: "POST only" } });
    return;
  }

  const apiKey = String(req.headers.authorization || "")
    .replace(/^Bearer\s+/i, "")
    .trim();
  if (!apiKey) {
    res.status(401).json({ error: { message: "Missing API key" } });
    return;
  }

  const body = req.body;
  if (!body || typeof body !== "object" || !Array.isArray(body.messages)) {
    res.status(400).json({ error: { message: "Invalid chat payload" } });
    return;
  }

  try {
    const upstream = await fetch("https://api.deepseek.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    });
    const data = await upstream.json().catch(() => ({
      error: { message: `DeepSeek returned ${upstream.status}` },
    }));
    res.status(upstream.status).json(data);
  } catch (err) {
    res.status(502).json({
      error: { message: "DeepSeek unreachable: " + (err.message || String(err)) },
    });
  }
}
