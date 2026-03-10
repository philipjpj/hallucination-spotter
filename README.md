# Hallucination Spotter

[![MIT License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Anthropic](https://img.shields.io/badge/Powered%20by-Anthropic%20API-6b4fbb)](https://docs.anthropic.com/)

> Identify false, fabricated, or unverifiable statements in AI-generated content.  
> Runs entirely in the browser — no server, no data sent anywhere except the Anthropic API.

---

## What it does

Paste any AI-generated response into the tool and it will:

- **Highlight suspicious claims** inline, directly in the text
- **Classify each issue** as HIGH / MEDIUM / LOW risk
- **Explain why** each claim might be wrong or unverifiable
- **Give an overall verdict** — from clean to major issues

Providing the original prompt that generated the response improves accuracy significantly.

---

## Features

| Feature | Details |
|---|---|
| Inline annotation | Suspicious passages underlined directly in the text |
| Claim breakdown | Each flagged claim explained individually |
| Adjustable sensitivity | Lenient / Balanced / Strict |
| Model selection | Claude Sonnet 4 (accuracy) or Claude Haiku 4.5 (speed) |
| No backend | API key used directly in the browser, never stored |

**Sensitivity modes:**

| Mode | Behavior |
|---|---|
| `LENIENT` | Flags only high-confidence hallucinations |
| `BALANCED` | Recommended for most use cases |
| `STRICT` | Flags anything suspicious or unverifiable |

---

## Getting Started

You need an [Anthropic API key](https://console.anthropic.com/) to use this tool.

```bash
# Clone the repo
git clone https://github.com/philipjpj/hallucination-spotter.git
cd hallucination-spotter

# Install dependencies
npm install

# Start the dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) and paste your API key in the UI.

---

## Usage

1. Click **Set API Key** and paste your Anthropic API key
2. Paste the AI-generated text you want to check
3. *(Optional but recommended)* Paste the original prompt for better accuracy
4. Choose a model and sensitivity level
5. Click **✦ Spot Hallucinations**

The key is never stored — it lives only in the page's memory for the duration of the session.

---

## Build & Deploy

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

The `dist/` folder is a fully static site — deploy it anywhere:

- [Vercel](https://vercel.com/) — connect the repo, set build command to `npm run build`, output to `dist`
- [Netlify](https://netlify.com/) — same settings
- [GitHub Pages](https://pages.github.com/) — use the `gh-pages` package or a GitHub Action

---

## Project Structure

```
hallucination-spotter/
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite configuration
├── package.json
├── .gitignore
└── src/
    ├── main.jsx                   # React root mount
    └── HallucinationSpotter.jsx   # Main component
```

---

## Stack

- [React 18](https://react.dev/)
- [Vite 5](https://vitejs.dev/)
- [Anthropic Messages API](https://docs.anthropic.com/en/api/messages)

No additional dependencies.

---

## Disclaimer

This tool provides **guidance only** and may not detect all false statements.  
Always verify critical information from primary sources independently.

---

## License

[MIT](LICENSE) — free to use, modify, and distribute.