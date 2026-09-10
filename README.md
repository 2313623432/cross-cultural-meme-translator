# FREQ.404 · Cross-Culture Meme Translator / 跨文化梗翻译器

Not a dictionary. A meme-layer radio between Chinese internet and English internet.

Funny beats useful. Translation is solved. The meme layer is not.

## Use

1. Open the site.
2. Click **API KEY**, paste a [DeepSeek](https://platform.deepseek.com/api_keys) key. It stays in your browser (`localStorage`) and is sent only to DeepSeek.
3. Pick a channel:
   - **EN → CN meme** — English in, Chinese internet out (`the class is so boring` → `这课真是闹麻了`)
   - **CN → EN meme** — Chinese in, Western internet out
4. The **口语** button is UI language (default English). It is **not** the translation-direction switch.

## Stack

Pure frontend. Static HTML / CSS / JS. No server, no build step.

Calls `https://api.deepseek.com/chat/completions` from the browser (`deepseek-flash`, with fallbacks).

## Local

Any static server:

```bash
npx --yes serve .
```

## Deploy to Vercel

```bash
npx vercel login
npx vercel --yes --prod
```

Or push this folder to GitHub and import the repo in the Vercel dashboard (Framework Preset: Other, output is the repo root).
