export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "authorization,content-type");
  res.setHeader("Access-Control-Allow-Methods", "GET,OPTIONS");

  if (req.method === "OPTIONS") {
    res.status(204).end();
    return;
  }
  if (req.method !== "GET") {
    res.status(405).json({ error: { message: "GET only" } });
    return;
  }

  const apiKey = String(req.headers.authorization || "")
    .replace(/^Bearer\s+/i, "")
    .trim();
  if (!apiKey) {
    res.status(401).json({ error: { message: "Missing API key" } });
    return;
  }

  try {
    const upstream = await fetch("https://api.deepseek.com/models", {
      headers: { Authorization: `Bearer ${apiKey}` },
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
