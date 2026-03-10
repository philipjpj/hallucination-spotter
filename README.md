# Hallucination Spotter

> Identify false, fabricated, or unverifiable statements in AI-generated content.  
> Browser-based. No server. Powered by the Anthropic API.

---

<<<<<<< HEAD
## Features
=======
## 🔑 API Keys & Privacy

Your keys stay yours — always.

> Any API key entered into this tool is used **exclusively in your browser**
> to make direct requests to the respective AI service.

- **Never transmitted** to external servers
- **Never stored** beyond your current session
- **Never used** for any purpose other than your own requests

Close the tab and they're gone. Want to be extra sure? The app is a single HTML file — open it in any text editor and verify yourself.

⚠️ Keep your keys private. Never share them publicly.

---

## ⚡ Features
>>>>>>> 045462022c1fbbf05b821794f2bab5d145533625

- **Claim-level classification** — every flagged sentence gets tagged as HIGH / MEDIUM / LOW risk
- **Inline highlighting** — suspicious text annotated directly in the output with wavy underlines
- **Prompt-aware** — paste the original prompt to sharpen context analysis
- **Adjustable sensitivity:**

| Mode | Behavior |
|------|----------|
| `LENIENT` | Flags only high-confidence hallucinations |
| `BALANCED` | Recommended for most use cases |
| `STRICT` | Flags anything suspicious or unverifiable |

- **Model selection** — choose between Claude Sonnet 4 (accuracy) and Claude Haiku 4.5 (speed)

---

## Stack

- [React 18](https://react.dev/) + [Vite](https://vitejs.dev/)
- [Anthropic API](https://docs.anthropic.com/) — no backend required, direct browser access

---

## Getting Started

```bash
# 1. Clone the repo
git clone https://github.com/your-username/hallucination-spotter.git
cd hallucination-spotter

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

You'll need an [Anthropic API key](https://console.anthropic.com/) — paste it directly in the UI (it never leaves your browser).

---

## Build for Production

```bash
npm run build
npm run preview
```

The `dist/` folder can be deployed to any static host (Netlify, Vercel, GitHub Pages, etc.).

---

## Usage

1. Paste AI-generated text into the input area
2. *(Optional)* Paste the original prompt for better accuracy
3. Select a sensitivity level and model
4. Click **✦ Spot Hallucinations**

---

## Disclaimer

This tool provides **guidance only** and may not detect all false statements.  
Always verify critical information independently.

---

## License

MIT — free to use, modify, and distribute.
