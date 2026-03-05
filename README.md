# ⟨ Hallucination Spotter ⟩

> Identify false, fabricated, or unverifiable statements in AI-generated content.
> Browser-based. No setup. No server.

---

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

- **CRT-style interface** — retro aesthetics, built for focus
- **Prompt-aware** — paste the original prompt to sharpen context analysis
- **Adjustable sensitivity** — tune detection to your needs:

| Mode | Behavior |
|------|----------|
| `LENIENT` | Flags only high-confidence hallucinations |
| `BALANCED` | Recommended for most use cases |
| `STRICT` | Flags anything suspicious or unverifiable |

- **Claim-level classification** — every flagged sentence gets tagged:

```
[HIGH]    Very likely false or fabricated
[MEDIUM]  Possibly wrong or misleading
[LOW]     Minor inaccuracy or unverifiable but plausible
```

- **Inline highlighting** — suspicious text annotated directly in the output

---

## 💻 Usage

```
1. Open index.html in any modern browser
2. Paste AI-generated text into the input area
3. (Optional) Paste the original prompt for better accuracy
4. Select a sensitivity level
5. Click  [ INITIATE DECEPTION SCAN ]
```

---

## ⚠️ Disclaimer

This tool provides **guidance only** and may not detect all false statements.
Always verify critical information independently.

---

## 📝 License

MIT — free to use, modify, and distribute.
