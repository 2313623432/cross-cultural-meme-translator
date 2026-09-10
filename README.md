# CHENJIAHE 26053017G · Cross-Cultural Meme Translator

This folder is the **full product**: a live tool, not a mock.

- `index.html` / `styles.css` / `app.js` / `core.js` — frontend
- `api/translate.js` / `api/models.js` — Vercel proxy to DeepSeek (same-origin, real upstream)
- `Cross-Cultural Meme Translator.pptx` — pitch deck
- `scripts/verify.mjs` — checks parsers, language detect, and that results are not hardcoded

## What is real

1. Paste a DeepSeek key. The app **pings** `GET /models` before marking it live.
2. Fire a line. The app calls DeepSeek chat completions. There is no canned output path.
3. Each result shows the meme line **and** the boring dictionary gloss, so you can see it is not Google Translate.
4. History is stored in this browser only. Click a row to restore a **previous live run**.

## Two different knobs

- **口语** (top right): UI language. Default English.
- **CHANNEL A / B**: translation direction.

## Run

```bash
npm test
npx --yes serve .
```

On Vercel, `/api/translate` and `/api/models` proxy to `api.deepseek.com`. Locally without `vercel dev`, the browser talks to DeepSeek directly (CORS is enabled by DeepSeek).

## Live

Permanent GitHub Pages:

https://2313623432.github.io/cross-cultural-meme-translator/

## Deploy

GitHub Pages is enabled from the `master` branch root.

To also put it on Vercel (needs a Vercel login):

```bash
npx vercel login
npx vercel --yes --prod
```
