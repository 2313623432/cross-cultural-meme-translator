# CHENJIAHE 26053017G · Cross-Cultural Meme Translator

This folder is the **full product**:

- `index.html` / `styles.css` / `app.js` — live web app (FREQ.404)
- `Cross-Cultural Meme Translator.pptx` — pitch deck
- `vercel.json` — Vercel static deploy

Funny beats useful. Translation is solved. The meme layer is not.

## Use the site

1. Open the deployed URL, or run locally with `npx --yes serve .`
2. Click **API KEY**, paste a [DeepSeek](https://platform.deepseek.com/api_keys) key. It stays in this browser (`localStorage`) and is sent only to DeepSeek.
3. Two different knobs:
   - **口语** (top right) — UI language. Default English. Click to switch to Chinese.
   - **CHANNEL A / B** — translation direction, not UI language.
4. Channels:
   - **EN → CN meme** — `the class is so boring` → `这课真是闹麻了`
   - **CN → EN meme** — `你行你上啊` → `ok boomer, you do it then`

## Deploy

```bash
npx vercel login
npx vercel --yes --prod
```
