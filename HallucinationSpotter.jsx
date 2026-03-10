import { useState, useRef, useEffect } from "react";

const FONTS = `@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=JetBrains+Mono:wght@400;500;600&family=Lora:ital,wght@0,400;0,500;1,400&display=swap');`;

const styles = `
  ${FONTS}
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #07070f;
    --surface: #0e0e1a;
    --surface2: #13131f;
    --border: rgba(255,255,255,0.07);
    --border-bright: rgba(255,255,255,0.13);
    --text: #e8e6f0;
    --muted: #6b6880;
    --accent: #7c6fff;
    --accent2: #00c9a7;
    --red: #ff4d6d;
    --orange: #ff9b3f;
    --yellow: #f5c542;
    --green: #00c9a7;
    --red-bg: rgba(255,77,109,0.09);
    --orange-bg: rgba(255,155,63,0.09);
    --yellow-bg: rgba(245,197,66,0.09);
    --green-bg: rgba(0,201,167,0.09);
    --red-border: rgba(255,77,109,0.25);
    --orange-border: rgba(255,155,63,0.25);
    --yellow-border: rgba(245,197,66,0.25);
    --green-border: rgba(0,201,167,0.25);
  }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: 'Lora', serif;
    min-height: 100vh;
  }

  .hs-root {
    min-height: 100vh;
    background: var(--bg);
    position: relative;
    overflow: hidden;
  }

  /* Ambient background */
  .hs-root::before {
    content: '';
    position: fixed;
    top: -30%;
    left: 50%;
    transform: translateX(-50%);
    width: 800px;
    height: 500px;
    background: radial-gradient(ellipse, rgba(124,111,255,0.07) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .hs-root::after {
    content: '';
    position: fixed;
    bottom: -10%;
    right: -10%;
    width: 600px;
    height: 400px;
    background: radial-gradient(ellipse, rgba(0,201,167,0.05) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
  }

  .hs-inner {
    position: relative;
    z-index: 1;
    max-width: 780px;
    margin: 0 auto;
    padding: 3rem 1.5rem 5rem;
  }

  /* Header */
  .hs-header {
    margin-bottom: 3rem;
  }

  .hs-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.65rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 0.75rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .hs-eyebrow::before {
    content: '';
    display: inline-block;
    width: 20px;
    height: 1px;
    background: var(--accent);
  }

  .hs-title {
    font-family: 'Syne', sans-serif;
    font-size: clamp(2rem, 5vw, 3rem);
    font-weight: 800;
    letter-spacing: -0.03em;
    line-height: 1.05;
    color: var(--text);
    margin-bottom: 0.6rem;
  }

  .hs-title span {
    color: var(--accent);
  }

  .hs-subtitle {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.75rem;
    color: var(--muted);
    letter-spacing: 0.02em;
  }

  /* Cards */
  .hs-card {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 16px;
    padding: 1.75rem;
    margin-bottom: 1rem;
    transition: border-color 0.2s;
  }

  .hs-card:hover {
    border-color: var(--border-bright);
  }

  .hs-card-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--muted);
    margin-bottom: 1.1rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .hs-card-label::after {
    content: '';
    flex: 1;
    height: 1px;
    background: var(--border);
  }

  /* Config row */
  .hs-config-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }

  @media (max-width: 520px) {
    .hs-config-grid { grid-template-columns: 1fr; }
  }

  .hs-field {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  .hs-field-label {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.6rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--muted);
  }

  .hs-select, .hs-input {
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.78rem;
    padding: 0.65rem 0.9rem;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    width: 100%;
    appearance: none;
    -webkit-appearance: none;
  }

  .hs-select { cursor: pointer; }

  .hs-select:focus, .hs-input:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(124,111,255,0.1);
  }

  .hs-key-row {
    margin-top: 1rem;
    overflow: hidden;
    transition: max-height 0.3s ease, opacity 0.3s ease;
  }

  .hs-key-row.collapsed {
    max-height: 0;
    opacity: 0;
    margin-top: 0;
  }

  .hs-key-row.expanded {
    max-height: 120px;
    opacity: 1;
  }

  .hs-key-toggle {
    background: none;
    border: 1px solid var(--border);
    color: var(--muted);
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.68rem;
    padding: 0.4rem 0.85rem;
    border-radius: 6px;
    cursor: pointer;
    transition: all 0.15s;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    letter-spacing: 0.05em;
    margin-bottom: 1rem;
  }

  .hs-key-toggle:hover {
    border-color: var(--accent);
    color: var(--accent);
  }

  /* Textarea */
  .hs-textarea {
    width: 100%;
    background: var(--surface2);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: 'Lora', serif;
    font-size: 0.9rem;
    line-height: 1.8;
    padding: 1rem 1.1rem;
    border-radius: 10px;
    resize: vertical;
    outline: none;
    transition: border-color 0.15s, box-shadow 0.15s;
    min-height: 160px;
  }

  .hs-textarea.small {
    min-height: 80px;
  }

  .hs-textarea:focus {
    border-color: var(--accent);
    box-shadow: 0 0 0 3px rgba(124,111,255,0.1);
  }

  .hs-textarea::placeholder {
    color: var(--muted);
    opacity: 0.6;
  }

  .hs-context-wrap {
    margin-top: 1.25rem;
  }

  /* Run button */
  .hs-run-btn {
    width: 100%;
    margin-top: 1.25rem;
    background: var(--accent);
    color: #fff;
    border: none;
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 0.9rem;
    letter-spacing: 0.02em;
    padding: 0.9rem 2rem;
    border-radius: 10px;
    cursor: pointer;
    transition: opacity 0.15s, transform 0.1s, box-shadow 0.15s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    box-shadow: 0 0 30px rgba(124,111,255,0.25);
  }

  .hs-run-btn:hover:not(:disabled) {
    opacity: 0.92;
    transform: translateY(-1px);
    box-shadow: 0 0 40px rgba(124,111,255,0.4);
  }

  .hs-run-btn:active:not(:disabled) {
    transform: translateY(0);
    box-shadow: 0 0 20px rgba(124,111,255,0.2);
  }

  .hs-run-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /* Spinner */
  .hs-spinner {
    width: 15px; height: 15px;
    border: 2px solid rgba(255,255,255,0.3);
    border-top-color: #fff;
    border-radius: 50%;
    animation: spin 0.7s linear infinite;
    flex-shrink: 0;
  }
  @keyframes spin { to { transform: rotate(360deg); } }

  /* Results */
  .hs-results {
    animation: fadeUp 0.4s ease forwards;
  }
  @keyframes fadeUp {
    from { opacity: 0; transform: translateY(12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* Summary chips */
  .hs-summary-row {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 1.25rem;
    align-items: center;
  }

  .hs-chip {
    display: inline-flex;
    align-items: center;
    gap: 0.35rem;
    padding: 0.3rem 0.8rem;
    border-radius: 99px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.67rem;
    font-weight: 600;
    letter-spacing: 0.05em;
    border: 1px solid;
  }

  .hs-chip.green { background: var(--green-bg); color: var(--green); border-color: var(--green-border); }
  .hs-chip.yellow { background: var(--yellow-bg); color: var(--yellow); border-color: var(--yellow-border); }
  .hs-chip.orange { background: var(--orange-bg); color: var(--orange); border-color: var(--orange-border); }
  .hs-chip.red { background: var(--red-bg); color: var(--red); border-color: var(--red-border); }

  .hs-summary-text {
    font-size: 0.8rem;
    color: var(--muted);
    font-style: italic;
    font-family: 'Lora', serif;
    margin-left: 0.25rem;
  }

  /* Annotated text box */
  .hs-annotated {
    background: var(--surface2);
    border: 1px solid var(--border);
    border-radius: 10px;
    padding: 1.25rem 1.3rem;
    font-size: 0.9rem;
    line-height: 1.9;
    margin-bottom: 1.25rem;
    color: var(--text);
  }

  .hs-mark {
    border-radius: 3px;
    padding: 1px 3px;
    cursor: help;
    font-weight: 500;
    transition: filter 0.1s;
    position: relative;
  }
  .hs-mark:hover { filter: brightness(1.2); }
  .hs-mark.red { background: rgba(255,77,109,0.18); color: #ff7a91; text-decoration: underline; text-decoration-style: wavy; text-decoration-color: var(--red); }
  .hs-mark.orange { background: rgba(255,155,63,0.18); color: #ffb76b; text-decoration: underline; text-decoration-style: wavy; text-decoration-color: var(--orange); }
  .hs-mark.yellow { background: rgba(245,197,66,0.18); color: #f7d26e; text-decoration: underline; text-decoration-style: wavy; text-decoration-color: var(--yellow); }

  .hs-clean-msg {
    text-align: center;
    padding: 2.5rem;
    color: var(--green);
    font-family: 'Syne', sans-serif;
    font-weight: 700;
    font-size: 1rem;
    letter-spacing: 0.02em;
  }

  /* Claims */
  .hs-claims {
    display: flex;
    flex-direction: column;
    gap: 0.65rem;
    margin-bottom: 1rem;
  }

  .hs-claim {
    border-radius: 10px;
    padding: 1rem 1.1rem;
    border: 1px solid;
    display: grid;
    grid-template-columns: auto 1fr;
    gap: 0.85rem;
    align-items: start;
    transition: transform 0.1s;
  }
  .hs-claim:hover { transform: translateX(2px); }

  .hs-claim.red { background: var(--red-bg); border-color: var(--red-border); }
  .hs-claim.orange { background: var(--orange-bg); border-color: var(--orange-border); }
  .hs-claim.yellow { background: var(--yellow-bg); border-color: var(--yellow-border); }

  .hs-claim-dot {
    width: 8px; height: 8px;
    border-radius: 50%;
    margin-top: 5px;
    flex-shrink: 0;
  }
  .red .hs-claim-dot { background: var(--red); box-shadow: 0 0 8px var(--red); }
  .orange .hs-claim-dot { background: var(--orange); box-shadow: 0 0 8px var(--orange); }
  .yellow .hs-claim-dot { background: var(--yellow); box-shadow: 0 0 8px var(--yellow); }

  .hs-claim-quote {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.72rem;
    opacity: 0.6;
    margin-bottom: 0.35rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .hs-claim-reason {
    font-size: 0.84rem;
    line-height: 1.6;
    color: var(--text);
  }

  .hs-claim-level {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.58rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    opacity: 0.5;
    margin-top: 0.3rem;
  }

  .hs-model-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 0.62rem;
    color: var(--muted);
    text-align: right;
    margin-top: 0.5rem;
    letter-spacing: 0.05em;
  }

  /* Select wrapper for custom arrow */
  .hs-select-wrap {
    position: relative;
  }
  .hs-select-wrap::after {
    content: '▾';
    position: absolute;
    right: 0.85rem;
    top: 50%;
    transform: translateY(-50%);
    color: var(--muted);
    pointer-events: none;
    font-size: 0.75rem;
  }
`;

function escapeHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildPrompt(text, context, sensitivity) {
  const sensitivityNote = {
    strict: "Be thorough and flag anything that could potentially be wrong, even if uncertain.",
    balanced: "Flag claims that are likely false, unverifiable, or suspiciously specific without context.",
    lenient: "Only flag claims that are clearly or very likely incorrect.",
  }[sensitivity];

  return `You are a hallucination detector for AI-generated text. Your job is to identify claims that may be false, fabricated, or unverifiable.

${context ? `Original question/context: "${context}"\n` : ""}Text to analyze:
"""
${text}
"""

${sensitivityNote}

Analyze this text and identify problematic claims. For each one, classify it as:
- HIGH: Very likely false or fabricated (wrong facts, made-up names/dates/numbers)
- MEDIUM: Possibly wrong or misleading, needs verification
- LOW: Minor inaccuracy, vague, or unverifiable but plausible

Respond ONLY with a valid JSON object, no markdown, no explanation outside JSON:
{
  "overall": "clean" | "minor_issues" | "significant_issues" | "major_issues",
  "summary": "one sentence overall assessment",
  "claims": [
    {
      "quote": "exact short excerpt from the text (max 15 words)",
      "level": "HIGH" | "MEDIUM" | "LOW",
      "reason": "why this might be wrong or unverifiable"
    }
  ]
}

If no issues found, return: {"overall": "clean", "summary": "No hallucinations detected.", "claims": []}`;
}

function AnnotatedText({ original, claims }) {
  if (!claims || claims.length === 0) {
    return <div className="hs-clean-msg">✦ No hallucinations detected in this text.</div>;
  }

  const clsMap = { HIGH: "red", MEDIUM: "orange", LOW: "yellow" };
  let html = escapeHtml(original);
  const sorted = [...claims].sort((a, b) => b.quote.length - a.quote.length);
  sorted.forEach((claim) => {
    const cls = clsMap[claim.level] || "yellow";
    const escaped = escapeHtml(claim.quote);
    if (html.includes(escaped)) {
      html = html.replace(
        escaped,
        `<span class="hs-mark ${cls}" title="${escapeHtml(claim.reason)}">${escaped}</span>`
      );
    }
  });
  html = html.replace(/\n/g, "<br/>");
  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}

export default function HallucinationSpotter() {
  const [apiKey, setApiKey] = useState("");
  const [showKey, setShowKey] = useState(false);
  const [model, setModel] = useState("claude-sonnet-4-20250514");
  const [sensitivity, setSensitivity] = useState("balanced");
  const [responseText, setResponseText] = useState("");
  const [contextText, setContextText] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [usedModel, setUsedModel] = useState("");
  const [error, setError] = useState("");
  const resultsRef = useRef(null);

  const overallConfig = {
    clean: { cls: "green", icon: "✦", label: "Clean" },
    minor_issues: { cls: "yellow", icon: "!", label: "Minor issues" },
    significant_issues: { cls: "orange", icon: "!!", label: "Significant issues" },
    major_issues: { cls: "red", icon: "!!!", label: "Major issues" },
  };

  const clsMap = { HIGH: "red", MEDIUM: "orange", LOW: "yellow" };

  async function runCheck() {
    const text = responseText.trim();
    if (!text) { setError("Please paste a response to check."); return; }
    if (!apiKey.trim()) { setShowKey(true); setError("Please enter your Anthropic API key."); return; }
    setError("");
    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey.trim(),
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true",
        },
        body: JSON.stringify({
          model,
          max_tokens: 1500,
          messages: [{ role: "user", content: buildPrompt(text, contextText.trim(), sensitivity) }],
        }),
      });
      const data = await res.json();
      if (data.error) throw new Error(data.error.message);
      let raw = data.content[0].text.trim().replace(/```json|```/g, "").trim();
      const parsed = JSON.parse(raw);
      setResult(parsed);
      setUsedModel(model);
    } catch (err) {
      setError("Error: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (result && resultsRef.current) {
      setTimeout(() => resultsRef.current.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
    }
  }, [result]);

  const counts = result ? { HIGH: 0, MEDIUM: 0, LOW: 0 } : null;
  if (result?.claims) result.claims.forEach((c) => counts[c.level]++);
  const ov = result ? (overallConfig[result.overall] || overallConfig.minor_issues) : null;

  return (
    <>
      <style>{styles}</style>
      <div className="hs-root">
        <div className="hs-inner">

          {/* Header */}
          <header className="hs-header">
            <div className="hs-eyebrow">AI Verification Tool</div>
            <h1 className="hs-title">Hallucination<br /><span>Spotter</span></h1>
            <p className="hs-subtitle">// let AI fact-check AI</p>
          </header>

          {/* Config card */}
          <div className="hs-card">
            <div className="hs-card-label">Configuration</div>

            <button className="hs-key-toggle" onClick={() => setShowKey((v) => !v)}>
              <span style={{ fontSize: "0.75rem" }}>{showKey ? "▼" : "▶"}</span>
              {showKey ? "Hide API Key" : "Set API Key"}
            </button>

            <div className={`hs-key-row ${showKey ? "expanded" : "collapsed"}`}>
              <div className="hs-field" style={{ maxWidth: 380, marginBottom: "1rem" }}>
                <label className="hs-field-label">Anthropic API Key</label>
                <input
                  type="password"
                  className="hs-input"
                  placeholder="sk-ant-..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
            </div>

            <div className="hs-config-grid">
              <div className="hs-field">
                <label className="hs-field-label">Checker Model</label>
                <div className="hs-select-wrap">
                  <select className="hs-select" value={model} onChange={(e) => setModel(e.target.value)}>
                    <option value="claude-sonnet-4-20250514">Claude Sonnet 4 (recommended)</option>
                    <option value="claude-haiku-4-5-20251001">Claude Haiku 4.5 (faster)</option>
                  </select>
                </div>
              </div>
              <div className="hs-field">
                <label className="hs-field-label">Sensitivity</label>
                <div className="hs-select-wrap">
                  <select className="hs-select" value={sensitivity} onChange={(e) => setSensitivity(e.target.value)}>
                    <option value="balanced">Balanced</option>
                    <option value="strict">Strict — flag more things</option>
                    <option value="lenient">Lenient — only obvious errors</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Input card */}
          <div className="hs-card">
            <div className="hs-card-label">AI Response to Analyze</div>
            <textarea
              className="hs-textarea"
              placeholder="Paste here the AI-generated text you want to fact-check. It can be a summary, an explanation, a research answer, etc."
              value={responseText}
              onChange={(e) => setResponseText(e.target.value)}
            />

            <div className="hs-context-wrap">
              <div className="hs-card-label">Original Prompt / Context <span style={{ opacity: 0.5, fontStyle: "italic", letterSpacing: 0 }}>— optional</span></div>
              <textarea
                className="hs-textarea small"
                placeholder="What was the original question or prompt? Helps the checker be more accurate."
                value={contextText}
                onChange={(e) => setContextText(e.target.value)}
              />
            </div>

            {error && (
              <div style={{ marginTop: "0.75rem", color: "var(--red)", fontFamily: "JetBrains Mono, monospace", fontSize: "0.75rem", padding: "0.6rem 0.8rem", background: "var(--red-bg)", border: "1px solid var(--red-border)", borderRadius: "8px" }}>
                {error}
              </div>
            )}

            <button className="hs-run-btn" disabled={loading} onClick={runCheck}>
              {loading ? (
                <><div className="hs-spinner" /> Analyzing…</>
              ) : (
                <>✦ Spot Hallucinations</>
              )}
            </button>
          </div>

          {/* Results */}
          {result && (
            <div className="hs-card hs-results" ref={resultsRef}>
              <div className="hs-card-label">Analysis Results</div>

              <div className="hs-summary-row">
                <span className={`hs-chip ${ov.cls}`}>{ov.icon} {ov.label}</span>
                {counts.HIGH > 0 && <span className="hs-chip red">● {counts.HIGH} High</span>}
                {counts.MEDIUM > 0 && <span className="hs-chip orange">● {counts.MEDIUM} Medium</span>}
                {counts.LOW > 0 && <span className="hs-chip yellow">● {counts.LOW} Low</span>}
                <span className="hs-summary-text">{result.summary}</span>
              </div>

              <div className="hs-annotated">
                <AnnotatedText original={responseText.trim()} claims={result.claims} />
              </div>

              {result.claims && result.claims.length > 0 && (
                <div className="hs-claims">
                  {result.claims.map((c, i) => {
                    const cls = clsMap[c.level] || "yellow";
                    return (
                      <div key={i} className={`hs-claim ${cls}`}>
                        <div className="hs-claim-dot" />
                        <div>
                          <div className="hs-claim-quote">"{c.quote}"</div>
                          <div className="hs-claim-reason">{c.reason}</div>
                          <div className="hs-claim-level">{c.level} risk</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              <div className="hs-model-tag">verified by {usedModel}</div>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
