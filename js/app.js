/* Case Room: game logic. Plain JavaScript, no build step. */
(function () {
  "use strict";
  const C = window.CONTENT;
  const $app = document.getElementById("app");

  /* ---------------- helpers ---------------- */
  const esc = (s) => String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const ind = (id) => C.industries.find((i) => i.id === id);
  const caseById = (id) => C.cases.find((c) => c.id === id);
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const today = () => new Date().toISOString().slice(0, 10);
  const daysBetween = (a, b) => Math.round((new Date(b) - new Date(a)) / 86400000);
  const addDays = (d, n) => { const x = new Date(d); x.setDate(x.getDate() + n); return x.toISOString().slice(0, 10); };
  const rnd = (a, b) => Math.floor(Math.random() * (b - a + 1)) + a;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const lc = (s) => String(s || "").toLowerCase();
  const hits = (text, keys) => keys.filter((k) => lc(text).includes(k));
  const fmtNum = (n, d = 0) => Number(n).toLocaleString("en-US", { minimumFractionDigits: d, maximumFractionDigits: d });

  /* ---------------- storage (per-browser) ---------------- */
  const KEY = "caseroom.v1";
  const blank = () => ({ lessons: {}, quizzes: {}, sims: [], cases: [], math: [], charts: [], fit: [], settings: { difficulty: "standard", format: "interviewer", tone: "neutral", voice: true, ai: true } });
  let S = blank();
  try { const raw = localStorage.getItem(KEY); if (raw) S = Object.assign(blank(), JSON.parse(raw)); } catch (e) { /* storage unavailable */ }
  const save = () => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) { /* ignore */ } };

  /* ---------------- platform capabilities ---------------- */
  const Cap = { sample: null, dictation: null, tts: null, ready: false };
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition || null;
  async function initCaps() {
    const use = (n) => (window.claude && typeof window.claude.use === "function") ? window.claude.use(n).catch(() => null) : Promise.resolve(null);
    const [s, d, t] = await Promise.all([use("sample"), use("dictation"), use("tts")]);
    Cap.sample = s; Cap.dictation = d; Cap.tts = t; Cap.ready = true;
    const pill = document.getElementById("ai-pill");
    pill.textContent = Cap.sample ? "AI interviewer: on" : "AI interviewer: off";
    pill.classList.toggle("on", !!Cap.sample);
    pill.title = Cap.sample ? "Claude plays the interviewer and grades your answers." : "Running in scripted mode with keyword scoring. Open in Claude to turn on the AI interviewer.";
    if (current.rerenderOnCaps) render();
  }
  const aiOn = () => !!Cap.sample && S.settings.ai !== false;
  const voiceInAvailable = () => !!Cap.dictation || !!SR;

  /* ---------------- speech out ---------------- */
  const Speech = {
    async say(text) {
      if (!S.settings.voice || !text) return;
      const clean = text.replace(/\[[A-Z_]+\]/g, "").slice(0, 1900);
      if (Cap.tts) { try { await Cap.tts.speak(clean, { voice: "rounded" }); } catch (e) { /* stopped or unavailable */ } return; }
      if ("speechSynthesis" in window) {
        try { speechSynthesis.cancel(); const u = new SpeechSynthesisUtterance(clean); u.rate = 1.02; speechSynthesis.speak(u); } catch (e) { /* ignore */ }
      }
    },
    stop() { try { Cap.tts && Cap.tts.stop(); } catch (e) {} try { window.speechSynthesis && speechSynthesis.cancel(); } catch (e) {} }
  };

  /* ---------------- speech in: attaches a mic button to a textarea ---------------- */
  function wireMic(btn, ta, interimEl) {
    if (!voiceInAvailable()) { btn.hidden = true; return () => {}; }
    let live = false, rec = null, unsubs = [];
    const append = (t) => { const v = ta.value; ta.value = (v && !/\s$/.test(v) ? v + " " : v) + t.trim(); ta.dispatchEvent(new Event("input")); };
    const setLive = (on) => { live = on; btn.classList.toggle("live", on); btn.textContent = on ? "Stop" : "Speak"; if (!on && interimEl) interimEl.textContent = ""; };
    btn.textContent = "Speak";
    btn.addEventListener("click", () => {
      Speech.stop();
      if (live) {
        if (Cap.dictation) Cap.dictation.stop().catch(() => {}); else if (rec) rec.stop();
        setLive(false); return;
      }
      if (Cap.dictation) {
        unsubs.forEach((u) => u()); unsubs = [];
        unsubs.push(Cap.dictation.onPartial(({ text }) => { if (interimEl) interimEl.textContent = text; }));
        unsubs.push(Cap.dictation.onFinal(({ text }) => { append(text); if (interimEl) interimEl.textContent = ""; }));
        unsubs.push(Cap.dictation.onState(({ state }) => { if (state === "idle") setLive(false); }));
        setLive(true);
        Cap.dictation.start().catch((e) => { setLive(false); if (e && e.code === "not_granted") { btn.hidden = true; } });
        return;
      }
      rec = new SR(); rec.continuous = true; rec.interimResults = true; rec.lang = "en-US";
      rec.onresult = (ev) => {
        let interim = "";
        for (let i = ev.resultIndex; i < ev.results.length; i++) {
          const r = ev.results[i];
          if (r.isFinal) append(r[0].transcript); else interim += r[0].transcript;
        }
        if (interimEl) interimEl.textContent = interim;
      };
      rec.onerror = () => setLive(false);
      rec.onend = () => setLive(false);
      try { rec.start(); setLive(true); } catch (e) { setLive(false); }
    });
    return () => { try { if (Cap.dictation && live) Cap.dictation.stop(); if (rec) rec.stop(); } catch (e) {} unsubs.forEach((u) => u()); };
  }

  /* ---------------- Claude calls ---------------- */
  async function ask(input, opts = {}) {
    if (!Cap.sample) throw { code: "unavailable" };
    return Cap.sample(input, Object.assign({ cache: false }, opts));
  }
  function aiErrorText(e) {
    const code = e && e.code;
    if (code === "not_granted") return "The AI interviewer was not allowed in this view, so the case continues in scripted mode.";
    if (code === "rate_limited") return "Claude is busy. Wait a minute and send again.";
    if (code === "cancelled") return "Stopped.";
    return "Claude could not answer just now. Send again, or switch to scripted mode.";
  }

  /* ---------------- skills and scoring ---------------- */
  const SKILLS = [
    { key: "structure", label: "Structure" },
    { key: "math", label: "Math" },
    { key: "insight", label: "Insight & creativity" },
    { key: "synthesis", label: "Synthesis" },
    { key: "communication", label: "Communication" },
    { key: "charts", label: "Chart reading" },
    { key: "judgment", label: "Business judgment" },
    { key: "fit", label: "Fit & PEI" }
  ];
  function skillScores() {
    // Each skill = average of the 5 most recent observations (0-100).
    const obs = {}; SKILLS.forEach((s) => (obs[s.key] = []));
    const sorted = (arr) => arr.slice().sort((a, b) => (a.ts || 0) - (b.ts || 0));
    sorted(S.cases).forEach((c) => { ["structure", "math", "insight", "synthesis", "communication"].forEach((k) => { if (c.scores && c.scores[k] != null) obs[k].push(c.scores[k] * 20); }); });
    sorted(S.math).forEach((m) => obs.math.push(m.score));
    sorted(S.charts).forEach((m) => obs.charts.push(m.score));
    sorted(S.sims).forEach((m) => obs.judgment.push(m.score));
    Object.values(S.quizzes).forEach((q) => obs.judgment.push(q.score));
    sorted(S.fit).forEach((m) => { obs.fit.push(m.score); if (m.comm != null) obs.communication.push(m.comm); });
    const out = {};
    for (const k in obs) { const a = obs[k].slice(-5); out[k] = a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : null; }
    return out;
  }
  function industryStatus(id) {
    const items = [];
    S.cases.filter((c) => c.industry === id).forEach((c) => items.push({ date: c.date, score: c.overall }));
    S.sims.filter((c) => c.industry === id).forEach((c) => items.push({ date: c.date, score: c.score }));
    if (S.quizzes[id]) items.push({ date: S.quizzes[id].date, score: S.quizzes[id].score });
    if (!items.length) return { practiced: false };
    items.sort((a, b) => (a.date < b.date ? -1 : 1));
    const last = items[items.length - 1];
    const recent = items.slice(-3);
    const avg = Math.round(recent.reduce((x, y) => x + y.score, 0) / recent.length);
    // Spaced review: weaker scores come back sooner.
    const interval = avg < 60 ? 1 : avg < 75 ? 3 : avg < 85 ? 7 : 14;
    const due = addDays(last.date, interval);
    return { practiced: true, avg, last: last.date, due, interval, overdue: daysBetween(due, today()) };
  }
  function reviewPlan() {
    const plan = [];
    C.industries.forEach((i) => {
      const st = industryStatus(i.id);
      if (!st.practiced) plan.push({ kind: "industry", id: i.id, title: i.name, why: "Not practiced yet. Start with the lessons, then a case.", status: "due", sort: 1, action: "learn" });
      else plan.push({ kind: "industry", id: i.id, title: i.name, why: `Recent average ${st.avg}/100. Review every ${st.interval} day${st.interval > 1 ? "s" : ""}. ${st.overdue >= 0 ? "Due now." : "Next review " + st.due + "."}`, status: st.overdue >= 0 ? "due" : st.overdue > -2 ? "soon" : "ok", sort: st.overdue >= 0 ? 0 : 2, action: st.avg < 70 ? "learn" : "case" });
    });
    const sk = skillScores();
    const scored = SKILLS.filter((s) => sk[s.key] != null).sort((a, b) => sk[a.key] - sk[b.key]);
    if (scored.length && sk[scored[0].key] < 75) {
      const w = scored[0];
      const target = { math: "math", charts: "charts", fit: "fit", judgment: "sim" }[w.key] || "case";
      plan.unshift({ kind: "skill", id: w.key, title: `Weakest skill: ${w.label}`, why: `Averaging ${sk[w.key]}/100 over your last attempts. Drill it today.`, status: "due", sort: -1, action: target });
    }
    const lastMath = S.math.length ? S.math[S.math.length - 1].date : null;
    if (!lastMath || daysBetween(lastMath, today()) >= 1) plan.push({ kind: "daily", id: "math", title: "Daily mental math round", why: "Two minutes a day keeps math sharp for exhibits.", status: lastMath === today() ? "ok" : "due", sort: 3, action: "math" });
    return plan.sort((a, b) => a.sort - b.sort);
  }

  /* ---------------- router ---------------- */
  let current = { view: "home", params: {}, cleanup: null, rerenderOnCaps: false };
  function go(view, params = {}) {
    if (current.cleanup) { try { current.cleanup(); } catch (e) {} }
    Speech.stop();
    current = { view, params, cleanup: null, rerenderOnCaps: false };
    render();
    window.scrollTo({ top: 0 });
  }
  function render() {
    const v = VIEWS[current.view] || VIEWS.home;
    $app.innerHTML = "";
    const root = document.createElement("div");
    root.className = "stack fade";
    root.style.gap = "24px";
    $app.appendChild(root);
    v(root, current.params);
    document.querySelectorAll("#nav button").forEach((b) => b.setAttribute("aria-current", String(b.dataset.go === current.view || (b.dataset.go === "gym" && ["math", "charts", "fit"].includes(current.view)) || (b.dataset.go === "case-setup" && ["case", "case-result"].includes(current.view)))));
  }
  document.getElementById("nav").addEventListener("click", (e) => { const b = e.target.closest("button[data-go]"); if (b) go(b.dataset.go); });
  document.getElementById("brand").addEventListener("click", () => go("home"));
  const on = (root, sel, ev, fn) => root.querySelectorAll(sel).forEach((el) => el.addEventListener(ev, fn));

  function skillBarsHTML() {
    const sk = skillScores();
    return SKILLS.map((s) => {
      const v = sk[s.key];
      const cls = v == null ? "none" : v < 60 ? "low" : v < 75 ? "mid" : "";
      return `<div class="skillbar"><span>${s.label}</span><div class="track"><div class="fill ${cls}" style="width:${v == null ? 0 : v}%"></div></div><span class="num muted">${v == null ? "--" : v}</span></div>`;
    }).join("");
  }

  /* ================= VIEWS ================= */
  const VIEWS = {};

  /* ---------- Home ---------- */
  VIEWS.home = (root) => {
    const plan = reviewPlan().slice(0, 4);
    const total = S.cases.length + S.sims.length + S.math.length + S.charts.length + S.fit.length;
    root.innerHTML = `
      <section class="hero">
        <div class="hero-copy">
          <span class="eyebrow">MBB case prep &middot; Dallas &middot; Chicago &middot; New York</span>
          <h1>Learn the industry. Run the business. Crack the case.</h1>
          <p class="lede">Pick an industry. A consultant teaches you how it makes money, you run a company through four quarters, then you take a live case interview tied to what is happening in the industry right now.</p>
          <div class="row">
            <button class="btn primary" data-go-case>Start a case interview</button>
            <button class="btn" data-go-math>Two-minute math round</button>
          </div>
        </div>
        <div class="card stack">
          <div class="row" style="justify-content:space-between"><h3>Your readiness</h3><span class="chip">${total} sessions</span></div>
          <div class="readiness">${skillBarsHTML()}</div>
          <p class="small muted">Scores are the average of your last five attempts per skill.</p>
        </div>
      </section>

      <section class="stack">
        <div class="row" style="justify-content:space-between;align-items:baseline"><h2>Industries</h2><span class="small muted">3 of many to come</span></div>
        <div class="grid-3">
          ${C.industries.map((i) => {
            const st = industryStatus(i.id);
            const nCases = C.cases.filter((c) => c.industry === i.id).length;
            return `<article class="card industry-card">
              <div class="row" style="justify-content:space-between"><h3>${esc(i.name)}</h3>${st.practiced ? `<span class="chip ${st.avg >= 75 ? "good" : st.avg >= 60 ? "warn" : "bad"}">${st.avg}/100</span>` : `<span class="chip">New</span>`}</div>
              <p class="small muted">${esc(i.tagline)}</p>
              <div class="trend"><b>Now:</b> ${esc(i.trend)}</div>
              <div class="mode-list">
                <button class="mode-btn" data-learn="${i.id}"><strong>Learn</strong><span>${esc(i.mentor.name)} teaches the industry</span><em>${i.lessons.length} lessons</em></button>
                <button class="mode-btn" data-sim="${i.id}"><strong>Simulate</strong><span>Run ${esc(C.simulations[i.id].company)} for Q1 to Q4</span><em>4 quarters</em></button>
                <button class="mode-btn" data-case="${i.id}"><strong>Case interview</strong><span>Voice-first, with an interviewer</span><em>${nCases} cases</em></button>
              </div>
            </article>`;
          }).join("")}
        </div>
      </section>

      <section class="grid-2">
        <div class="card stack">
          <div class="row" style="justify-content:space-between"><h3>Review plan</h3><button class="btn small ghost" data-go-progress>See progress</button></div>
          <div>${plan.map((p) => `<div class="review-item"><span class="dot ${p.status}"></span><div><b>${esc(p.title)}</b><div class="small muted">${esc(p.why)}</div></div><button class="btn small" data-plan="${p.action}" data-id="${p.id}">Go</button></div>`).join("")}</div>
        </div>
        <div class="stack">
          <h3>Drills</h3>
          <div class="grid-2" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">
            <button class="card gym-card" data-gym="math"><span class="eyebrow">Timed</span><b>Mental math</b><span class="small muted">Percentages, growth, breakeven and big multiplication against the clock.</span></button>
            <button class="card gym-card" data-gym="charts"><span class="eyebrow">Exhibits</span><b>Chart reading</b><span class="small muted">Read a chart fast and find the so-what.</span></button>
            <button class="card gym-card" data-gym="fit"><span class="eyebrow">Behavioral</span><b>Fit & PEI</b><span class="small muted">McKinsey Personal Experience Interview and fit questions, spoken.</span></button>
          </div>
        </div>
      </section>
      <p class="footer-note">Progress is saved in this browser only.</p>`;
    on(root, "[data-learn]", "click", (e) => go("learn", { industry: e.currentTarget.dataset.learn }));
    on(root, "[data-sim]", "click", (e) => go("sim", { industry: e.currentTarget.dataset.sim }));
    on(root, "[data-case]", "click", (e) => go("case-setup", { industry: e.currentTarget.dataset.case }));
    on(root, "[data-gym]", "click", (e) => go(e.currentTarget.dataset.gym));
    on(root, "[data-go-case]", "click", () => go("case-setup"));
    on(root, "[data-go-math]", "click", () => go("math"));
    on(root, "[data-go-progress]", "click", () => go("progress"));
    on(root, "[data-plan]", "click", (e) => {
      const a = e.currentTarget.dataset.plan, id = e.currentTarget.dataset.id;
      if (a === "learn") go("learn", { industry: id });
      else if (a === "case") go("case-setup", { industry: C.industries.some((i) => i.id === id) ? id : undefined });
      else if (a === "sim") go("sim", { industry: C.industries[0].id });
      else go(a);
    });
  };

  /* ---------- Drills hub ---------- */
  VIEWS.gym = (root) => {
    root.innerHTML = `
      <div class="stack"><span class="eyebrow">Drills</span><h1>Sharpen the skills that sink candidates</h1><p class="lede">Short, repeatable reps. Do one math round a day, a chart set every few days, and one fit story before each interview.</p></div>
      <div class="grid-3">
        <button class="card gym-card" data-gym="math"><span class="eyebrow">2 minutes</span><h3>Mental math</h3><p class="small muted">Case-style arithmetic against the clock. Answers within 2% count.</p></button>
        <button class="card gym-card" data-gym="charts"><span class="eyebrow">5 exhibits</span><h3>Chart reading</h3><p class="small muted">Bar and line exhibits like the ones in MBB cases. Find growth, shares and the so-what.</p></button>
        <button class="card gym-card" data-gym="fit"><span class="eyebrow">8 prompts</span><h3>Fit & PEI</h3><p class="small muted">Speak your story, get structured feedback and a follow-up probe.</p></button>
      </div>`;
    on(root, "[data-gym]", "click", (e) => go(e.currentTarget.dataset.gym));
  };

  /* ---------- Learning mode ---------- */
  VIEWS.learn = (root, p) => {
    const I = ind(p.industry) || C.industries[0];
    let idx = p.lesson || 0;
    const total = I.lessons.length + 1; // + quiz
    const draw = () => {
      S.lessons[I.id + ":" + (I.lessons[idx] ? I.lessons[idx].id : "quiz")] = today(); save();
      const isQuiz = idx >= I.lessons.length;
      const L = I.lessons[idx];
      root.innerHTML = `
        <div class="row" style="justify-content:space-between">
          <div class="stack" style="gap:6px"><span class="eyebrow">Learning mode &middot; ${esc(I.name)}</span><h1>${esc(I.name)}</h1></div>
          <div class="row"><button class="btn" data-sim>Simulate</button><button class="btn primary" data-case>Take a case</button></div>
        </div>
        <div class="learn-layout">
          <nav class="lesson-nav card flat" style="padding:8px">
            ${I.lessons.map((l, i) => `<button data-i="${i}" aria-current="${i === idx}"><span class="n">${String(i + 1).padStart(2, "0")}</span>${esc(l.title)}</button>`).join("")}
            <button data-i="${I.lessons.length}" aria-current="${isQuiz}"><span class="n">QZ</span>Check yourself</button>
          </nav>
          <article class="card stack">
            <div class="mentor"><div class="avatar">${esc(I.mentor.initials)}</div><div><b>${esc(I.mentor.name)}</b><div class="small muted">${esc(I.mentor.title)}</div></div>
              ${isQuiz ? "" : `<button class="btn small ghost" data-listen style="margin-left:auto">Listen</button>`}</div>
            ${isQuiz ? quizHTML(I) : `
              <h2>${esc(L.title)}</h2>
              <div class="lesson-body">${L.body.map((b) => `<p>${esc(b)}</p>`).join("")}</div>
              <div class="keyidea"><b>Interview tip.</b> ${esc(L.keyIdea)}</div>`}
            <div class="row" style="justify-content:space-between">
              <button class="btn" data-prev ${idx === 0 ? "disabled" : ""}>Previous</button>
              <span class="small muted num">${idx + 1} / ${total}</span>
              <button class="btn primary" data-next ${idx >= total - 1 ? "disabled" : ""}>Next</button>
            </div>
          </article>
        </div>
        <section class="card stack" id="askbox">
          <h3>Ask ${esc(I.mentor.name.split(" ")[0])} a question</h3>
          ${Cap.sample ? `<p class="small muted">Ask anything about ${esc(I.name.toLowerCase())}: how a metric works, what a trend means for a client, how to open a case.</p>
          <textarea id="askq" placeholder="For example: How would a PBM react if we launched a cash-pay channel?"></textarea>
          <div class="row"><button class="btn rec" id="askmic">Speak</button><button class="btn primary" id="asksend">Ask</button><span class="interim" id="askint"></span></div>
          <div id="askout" class="model" hidden></div>` : `<p class="small muted">Open this game inside Claude to ask the mentor follow-up questions. Everything else works here.</p>`}
        </section>`;
      on(root, "[data-i]", "click", (e) => { idx = +e.currentTarget.dataset.i; draw(); });
      on(root, "[data-prev]", "click", () => { idx--; draw(); });
      on(root, "[data-next]", "click", () => { idx++; draw(); window.scrollTo({ top: 0 }); });
      on(root, "[data-sim]", "click", () => go("sim", { industry: I.id }));
      on(root, "[data-case]", "click", () => go("case-setup", { industry: I.id }));
      on(root, "[data-listen]", "click", () => Speech.say(L.title + ". " + L.body.join(" ") + " Interview tip: " + L.keyIdea));
      if (isQuiz) wireQuiz(root, I);
      if (Cap.sample) {
        const ta = root.querySelector("#askq");
        current.cleanup = wireMic(root.querySelector("#askmic"), ta, root.querySelector("#askint"));
        root.querySelector("#asksend").addEventListener("click", async () => {
          const q = ta.value.trim(); if (!q) return;
          const out = root.querySelector("#askout"); out.hidden = false; out.textContent = "Thinking...";
          const ctx = I.lessons.map((l) => l.title + ": " + l.body.join(" ")).join("\n");
          try {
            const { text } = await ask(`You are ${I.mentor.name}, ${I.mentor.title} at a top strategy consulting firm, mentoring a candidate preparing for McKinsey, BCG and Bain case interviews. Answer the question below in plain spoken English, under 180 words, concrete and practical, and end with one tip for using this in a case interview. Do not invent precise statistics; say "roughly" when estimating.\n\nIndustry notes:\n${ctx}\n\nCandidate's question: ${q}`, { onText: ({ text }) => { out.textContent = text; } });
            out.textContent = text;
          } catch (e) { out.textContent = aiErrorText(e); }
        });
      }
    };
    current.rerenderOnCaps = true;
    draw();
  };
  function quizHTML(I) {
    return `<h2>Check yourself</h2><p class="muted">Three quick questions. Your score counts toward business judgment and this industry's review schedule.</p>
      ${I.quiz.map((q, qi) => `<div class="quiz-q" data-q="${qi}"><b>${qi + 1}. ${esc(q.q)}</b><div class="opts">${q.options.map((o, oi) => `<button class="opt" data-o="${oi}">${esc(o)}</button>`).join("")}</div><div class="small why" hidden></div></div>`).join("")}
      <div id="quizres" class="keyidea" hidden></div>`;
  }
  function wireQuiz(root, I) {
    const answers = {};
    on(root, ".quiz-q .opt", "click", (e) => {
      const qEl = e.currentTarget.closest(".quiz-q"); const qi = +qEl.dataset.q; if (answers[qi] != null) return;
      const oi = +e.currentTarget.dataset.o; answers[qi] = oi; const q = I.quiz[qi];
      qEl.querySelectorAll(".opt").forEach((b, i) => { if (i === q.answer) b.classList.add("right"); else if (i === oi) b.classList.add("wrong"); });
      const w = qEl.querySelector(".why"); w.hidden = false; w.textContent = (oi === q.answer ? "Correct. " : "Not quite. ") + q.why;
      if (Object.keys(answers).length === I.quiz.length) {
        const right = I.quiz.filter((qq, i) => answers[i] === qq.answer).length;
        const score = Math.round((right / I.quiz.length) * 100);
        S.quizzes[I.id] = { score, date: today(), ts: Date.now() }; save();
        const r = root.querySelector("#quizres"); r.hidden = false;
        r.innerHTML = `<b>${right} of ${I.quiz.length} correct.</b> ${right === I.quiz.length ? "Ready for a case." : "Review the lessons you missed, then try a case."}`;
      }
    });
  }

  /* ---------- Simulation mode ---------- */
  VIEWS.sim = (root, p) => {
    const I = ind(p.industry) || C.industries[0];
    const SIM = C.simulations[I.id];
    const st = { q: 0, m: Object.assign({}, SIM.start), history: [], drag: 0, choice: null, phase: "intro" };
    const fmtM = (k, v) => { const d = SIM.metrics.find((x) => x.key === k); return fmtNum(v, d.fmt); };
    const metricsHTML = (prev) => `<div class="metrics">${SIM.metrics.map((mm) => {
      const v = st.m[mm.key]; const p0 = prev ? prev[mm.key] : null; const d = p0 == null ? null : v - p0;
      return `<div class="metric"><span class="small muted">${esc(mm.label)}</span><span class="v">${fmtM(mm.key, v)}<span class="small muted"> ${esc(mm.unit)}</span></span>${d == null || Math.abs(d) < 1e-9 ? `<span class="d muted">&nbsp;</span>` : `<span class="d ${d > 0 ? "up" : "down"}">${d > 0 ? "+" : ""}${fmtNum(d, mm.fmt || (Math.abs(d) < 1 ? 1 : 0))}</span>`}</div>`;
    }).join("")}</div>`;
    const timeline = () => `<div class="timeline">${[0, 1, 2, 3].map((i) => `<div class="${i < st.q ? "done" : i === st.q && st.phase !== "final" ? "now" : ""}">Q${i + 1}</div>`).join("")}</div>`;
    const apply = (fx) => {
      const prev = Object.assign({}, st.m);
      for (const k in fx) { if (k === "revenueDrag") st.drag += fx[k]; else if (k in st.m) st.m[k] = st.m[k] + fx[k]; }
      // Underlying momentum each quarter, plus noise.
      const noise = () => (Math.random() - 0.5) * 0.04;
      st.m.revenue = st.m.revenue * (1 + 0.005 + noise() * 0.5 - st.drag / 4);
      if ("pipeline" in st.m) st.m.pipeline = clamp(st.m.pipeline, 0, 100);
      ["trust", "reliability", "pipeline"].forEach((k) => { if (k in st.m) st.m[k] = clamp(Math.round(st.m[k]), 0, 100); });
      if ("share" in st.m) st.m.share = Math.max(0, st.m.share);
      // Cash moves with profit too.
      st.m.cash = st.m.cash + (st.m.revenue * st.m.margin / 100) * 0.25 * 0.5;
      return prev;
    };
    const finalScore = () => {
      const pts = { good: 15, ok: 8, weak: 2 };
      const decision = st.history.reduce((a, h) => a + pts[h.verdict], 0); // max 60
      const s0 = SIM.start, m = st.m;
      let outcome = 20;
      outcome += clamp((m.revenue / s0.revenue - 1) * 100, -10, 10) * 0.6;
      outcome += clamp(m.margin - s0.margin, -5, 5) * 0.8;
      const soft = ["trust", "reliability", "pipeline", "share"].filter((k) => k in m);
      soft.forEach((k) => { outcome += clamp((m[k] - s0[k]) / (k === "share" ? 0.2 : 2), -5, 5) * 0.6; });
      if (m.cash < 0) outcome -= 8;
      return clamp(Math.round(decision + clamp(outcome, 0, 40)), 0, 100);
    };
    const draw = () => {
      const Q = SIM.quarters[st.q];
      let body = "";
      if (st.phase === "intro") {
        body = `<article class="card stack"><span class="eyebrow">Your role: ${esc(SIM.role)}, ${esc(SIM.company)}</span><h2>The situation</h2><p>${esc(SIM.setup)}</p>
          <p class="muted small">Each quarter you get a briefing and three options. There is no perfect path, but some choices are much stronger. After each quarter a partner explains how a consultant would think about it. Your final score blends decision quality (60%) and results (40%).</p>
          <div><button class="btn primary" data-begin>Start Q1</button></div></article>`;
      } else if (st.phase === "decide") {
        body = `<article class="card stack"><span class="eyebrow">${esc(Q.title.split(":")[0])} briefing</span><h2>${esc(Q.title.split(": ")[1] || Q.title)}</h2><p>${esc(Q.brief)}</p>
          <div class="stack" style="gap:10px">${Q.options.map((o, i) => `<button class="choice" data-c="${i}" aria-pressed="${st.choice === i}"><b>${esc(o.label)}</b><span class="small muted">${esc(o.detail)}</span></button>`).join("")}</div>
          <label class="stack" style="gap:6px"><span class="small"><b>Your rationale</b> <span class="muted">(optional, but this is the habit interviewers grade: say the answer first, then why)</span></span><textarea id="why" placeholder="I choose ... because ... The main risk is ..."></textarea></label>
          <div class="row"><button class="btn rec" id="simmic">Speak</button><span class="interim" id="simint"></span><button class="btn primary" data-commit ${st.choice == null ? "disabled" : ""} style="margin-left:auto">Lock in decision</button></div></article>`;
      } else if (st.phase === "result") {
        const h = st.history[st.history.length - 1];
        const o = Q.options[h.choice];
        const best = Q.options.find((x) => x.verdict === "good");
        body = `<article class="card stack"><span class="eyebrow">${esc(Q.title.split(":")[0])} results</span>
          <div class="row"><h2>${esc(o.label)}</h2><span class="chip ${h.verdict === "good" ? "good" : h.verdict === "ok" ? "warn" : "bad"}">${h.verdict === "good" ? "Strong call" : h.verdict === "ok" ? "Defensible" : "Weak call"}</span></div>
          <div class="keyidea"><b>Partner debrief.</b> ${esc(o.debrief)}</div>
          ${h.verdict !== "good" ? `<p class="small"><b>What a strong team would have done:</b> ${esc(best.label)}. ${esc(best.debrief)}</p>` : ""}
          ${h.why && Cap.sample ? `<div class="stack" style="gap:8px"><button class="btn small" data-fb style="justify-self:start">Get feedback on my rationale</button><div id="fb" class="model" hidden></div></div>` : ""}
          <div><button class="btn primary" data-nextq>${st.q < 3 ? `Go to Q${st.q + 2}` : "See year-end results"}</button></div></article>`;
      } else {
        const score = st.score;
        const grade = score >= 85 ? "Partner material" : score >= 70 ? "Strong year" : score >= 55 ? "Mixed year" : "Tough year";
        body = `<article class="card stack"><span class="eyebrow">Year-end review</span><div class="row" style="align-items:flex-end;gap:16px"><span class="bigscore">${score}</span><div><h2>${grade}</h2><p class="muted small">Decision quality ${st.history.reduce((a, h) => a + ({ good: 15, ok: 8, weak: 2 })[h.verdict], 0)}/60, results ${score - st.history.reduce((a, h) => a + ({ good: 15, ok: 8, weak: 2 })[h.verdict], 0)}/40</p></div></div>
          <div class="table-wrap"><table><thead><tr><th>Quarter</th><th>Your decision</th><th>Verdict</th></tr></thead><tbody>${st.history.map((h, i) => `<tr><td>Q${i + 1}</td><td style="font-family:var(--body)">${esc(SIM.quarters[i].options[h.choice].label)}</td><td style="font-family:var(--body)">${h.verdict === "good" ? "Strong" : h.verdict === "ok" ? "Defensible" : "Weak"}</td></tr>`).join("")}</tbody></table></div>
          <div class="keyidea"><b>Lesson for your cases.</b> The strong calls share a pattern: protect the core economics, keep options open when uncertainty is high, and align who benefits with who pays. Use that language in your recommendations.</div>
          <div class="row"><button class="btn" data-again>Play again</button><button class="btn primary" data-case>Take a case in this industry</button></div></article>`;
      }
      root.innerHTML = `
        <div class="row" style="justify-content:space-between"><div class="stack" style="gap:6px"><span class="eyebrow">Simulation &middot; ${esc(I.name)}</span><h1>${esc(SIM.company)}</h1></div><button class="btn ghost" data-learn>Review lessons</button></div>
        ${timeline()}
        ${metricsHTML(st.prev)}
        ${body}`;
      on(root, "[data-learn]", "click", () => go("learn", { industry: I.id }));
      on(root, "[data-begin]", "click", () => { st.phase = "decide"; draw(); });
      on(root, "[data-c]", "click", (e) => { st.choice = +e.currentTarget.dataset.c; root.querySelectorAll("[data-c]").forEach((b) => b.setAttribute("aria-pressed", String(+b.dataset.c === st.choice))); root.querySelector("[data-commit]").disabled = false; });
      const ta = root.querySelector("#why");
      if (ta) { if (current.cleanup) current.cleanup(); current.cleanup = wireMic(root.querySelector("#simmic"), ta, root.querySelector("#simint")); }
      on(root, "[data-commit]", "click", () => {
        const o = Q.options[st.choice];
        st.prev = apply(o.fx);
        st.history.push({ choice: st.choice, verdict: o.verdict, why: ta ? ta.value.trim() : "" });
        st.phase = "result"; draw();
      });
      on(root, "[data-fb]", "click", async (e) => {
        const h = st.history[st.history.length - 1]; const out = root.querySelector("#fb"); out.hidden = false; out.textContent = "Thinking..."; e.currentTarget.disabled = true;
        try {
          const { text } = await ask(`You are a strategy consulting partner coaching a candidate in a business simulation. Situation: ${Q.brief}\nOptions: ${Q.options.map((o) => o.label + " (" + o.detail + ")").join("; ")}.\nThe candidate chose: ${Q.options[h.choice].label}.\nTheir rationale: "${h.why}"\nIn under 120 words: say what was strong in the reasoning, what was missing (risks, numbers, stakeholders), and rewrite their rationale as a crisp two-sentence answer-first statement.`, { onText: ({ text }) => { out.textContent = text; } });
          out.textContent = text;
        } catch (err) { out.textContent = aiErrorText(err); }
      });
      on(root, "[data-nextq]", "click", () => {
        st.prev = null;
        if (st.q < 3) { st.q++; st.choice = null; st.phase = "decide"; }
        else { st.q = 4; st.phase = "final"; st.score = finalScore(); S.sims.push({ industry: I.id, score: st.score, date: today(), ts: Date.now() }); save(); }
        draw(); window.scrollTo({ top: 0 });
      });
      on(root, "[data-again]", "click", () => go("sim", { industry: I.id }));
      on(root, "[data-case]", "click", () => go("case-setup", { industry: I.id }));
    };
    draw();
  };

  /* ---------- Case setup ---------- */
  const DIFF = {
    foundation: { label: "Foundation", desc: "Hints and a structure checklist. No clock pressure. Good for learning a new industry." },
    standard: { label: "Standard", desc: "First-round level. Hints cost points. A clock shows your pace." },
    final: { label: "Final round", desc: "No hints, tougher follow-ups and a curveball question. Partner-level pressure." }
  };
  const FORMAT = {
    interviewer: { label: "Interviewer-led (McKinsey)", desc: "The interviewer steers: one question at a time, and you answer each fully." },
    candidate: { label: "Candidate-led (BCG & Bain)", desc: "You drive: after your structure you say where to dig and ask for the data you need." }
  };
  const TONE = {
    supportive: { label: "Supportive coach", desc: "Encouraging, nudges you when stuck." },
    neutral: { label: "Realistic", desc: "Polite and neutral, like most real interviews." },
    tough: { label: "Tough partner", desc: "Short answers, pushback and 'so what?' challenges." }
  };
  VIEWS["case-setup"] = (root, p) => {
    let selected = p.caseId || (p.industry ? C.cases.find((c) => c.industry === p.industry).id : C.cases[0].id);
    let filter = p.industry || "all";
    const st = S.settings;
    const draw = () => {
      const list = C.cases.filter((c) => filter === "all" || c.industry === filter);
      if (!list.some((c) => c.id === selected)) selected = list[0].id;
      const seg = (name, obj, val) => `<div class="seg" role="group">${Object.entries(obj).map(([k, v]) => `<button data-set="${name}" data-v="${k}" aria-pressed="${val === k}">${esc(v.label)}</button>`).join("")}</div>`;
      root.innerHTML = `
        <div class="stack" style="gap:6px"><span class="eyebrow">Case interview</span><h1>Set up your interview</h1><p class="lede">Answer out loud like the real thing. Every case is built on a current industry trend.</p></div>
        <div class="grid-2" style="align-items:start">
          <section class="card stack">
            <div class="row" style="justify-content:space-between"><h3>Choose a case</h3>
              <select id="filter" aria-label="Industry"><option value="all">All industries</option>${C.industries.map((i) => `<option value="${i.id}" ${filter === i.id ? "selected" : ""}>${esc(i.name)}</option>`).join("")}</select></div>
            <div class="stack" style="gap:8px">${list.map((c) => {
              const done = S.cases.filter((x) => x.caseId === c.id);
              const best = done.length ? Math.max(...done.map((x) => x.overall)) : null;
              return `<button class="case-pick" data-pick="${c.id}" aria-pressed="${selected === c.id}"><span class="row" style="justify-content:space-between"><b>${esc(c.title)}</b>${best != null ? `<span class="chip">${best}/100</span>` : ""}</span><span class="small muted">${esc(ind(c.industry).name)} &middot; ${esc(c.type)}</span><span class="small">Trend: ${esc(c.trend)}</span></button>`;
            }).join("")}</div>
          </section>
          <section class="card stack">
            <div class="setup-group"><b>Difficulty</b>${seg("difficulty", DIFF, st.difficulty)}<span class="small muted">${esc(DIFF[st.difficulty].desc)}</span></div>
            <div class="setup-group"><b>Interview format</b>${seg("format", FORMAT, st.format)}<span class="small muted">${esc(FORMAT[st.format].desc)}</span></div>
            <div class="setup-group"><b>Interviewer style</b>${seg("tone", TONE, st.tone)}<span class="small muted">${esc(TONE[st.tone].desc)}</span></div>
            <div class="setup-group"><b>Voice</b>
              <label class="row small" style="gap:8px"><input type="checkbox" id="voice" ${st.voice ? "checked" : ""}> Interviewer speaks out loud</label>
              <span class="small muted">${voiceInAvailable() ? "Answer with the Speak button, or type." : "Voice input is not available in this browser. Chrome or Edge support it; you can type meanwhile."}</span></div>
            <div class="setup-group"><b>Interviewer</b>
              ${Cap.sample ? `<label class="row small" style="gap:8px"><input type="checkbox" id="ai" ${st.ai !== false ? "checked" : ""}> AI interviewer (Claude runs a live, adaptive interview and grades you)</label>` : `<span class="small muted">Scripted interviewer with keyword scoring. ${Cap.ready ? "Open the game inside Claude for a live AI interviewer." : "Checking for the AI interviewer..."}</span>`}
            </div>
            <button class="btn primary" data-start>Start interview</button>
          </section>
        </div>`;
      root.querySelector("#filter").addEventListener("change", (e) => { filter = e.target.value; draw(); });
      on(root, "[data-pick]", "click", (e) => { selected = e.currentTarget.dataset.pick; draw(); });
      on(root, "[data-set]", "click", (e) => { st[e.currentTarget.dataset.set] = e.currentTarget.dataset.v; save(); draw(); });
      root.querySelector("#voice").addEventListener("change", (e) => { st.voice = e.target.checked; save(); });
      const ai = root.querySelector("#ai"); if (ai) ai.addEventListener("change", (e) => { st.ai = e.target.checked; save(); });
      on(root, "[data-start]", "click", () => go("case", { caseId: selected }));
    };
    current.rerenderOnCaps = true;
    draw();
  };

  /* ---------- Case interview ---------- */
  const LINES = {
    supportive: { ack: ["Nice, thanks.", "Good start.", "That's helpful, thank you."], push: "You're on the right track. Is there anything you'd add?", move: "Great, let's keep going." },
    neutral: { ack: ["Okay.", "Thanks.", "Got it."], push: "Anything else?", move: "Let's move on." },
    tough: { ack: ["Fine.", "Okay. Faster next time.", "Hm."], push: "That feels incomplete. What's missing?", move: "Let's move. We don't have all day." }
  };
  function stagesFor(cs, diff, format) {
    const s = [{ id: "clarify", label: "Clarify" }, { id: "structure", label: "Structure" }];
    if (format === "candidate") s.push({ id: "route", label: "Drive the case" });
    s.push({ id: "math", label: "Exhibit & math" }, { id: "brainstorm", label: "Brainstorm" });
    if (diff === "final") s.push({ id: "curveball", label: "Curveball" });
    s.push({ id: "synthesis", label: "Recommendation" });
    return s;
  }
  function exhibitHTML(ex) {
    return `<div class="exhibit"><div class="exhibit-head">${esc(ex.title)}</div><div class="table-wrap"><table><thead><tr>${ex.columns.map((c) => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>${ex.rows.map((r) => `<tr>${r.map((c) => `<td>${esc(c)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><div class="exhibit-src">${esc(ex.source)}</div></div>`;
  }
  function parseNumbers(text, unit) {
    // Extract numbers and normalize to the answer's unit.
    const out = [];
    const re = /(-?\$?\d[\d,]*\.?\d*)\s*(billion|bn|b\b|million|mm|m\b|k\b|thousand|gw|mw|%)?/gi;
    let m;
    while ((m = re.exec(text))) {
      let v = parseFloat(m[1].replace(/[$,]/g, "")); if (isNaN(v)) continue;
      const u = lc(m[2] || "");
      if (unit === "$B") { if (u.startsWith("m")) v = v / 1000; else if (u === "k" || u === "thousand") v = v / 1e6; }
      else if (unit === "$M") { if (u === "billion" || u === "bn" || u === "b") v = v * 1000; else if (u === "k" || u === "thousand") v = v / 1000; }
      else if (unit === "MW") { if (u === "gw") v = v * 1000; }
      out.push(v);
    }
    return out;
  }
  function commScore(texts) {
    const all = texts.join(" ");
    const words = all.split(/\s+/).filter(Boolean);
    if (!words.length) return 1;
    const fillers = (all.match(/\b(um+|uh+|like|you know|kind of|sort of|basically)\b/gi) || []).length;
    const sign = (all.match(/\b(first|second|third|finally|next|so the answer|in summary|to summarize|three|two buckets|my hypothesis)\b/gi) || []).length;
    let s = 3;
    if (fillers / words.length > 0.04) s -= 1;
    if (sign >= 4) s += 1;
    if (sign >= 8) s += 1;
    if (words.length < 60) s -= 1;
    return clamp(s, 1, 5);
  }

  VIEWS.case = (root, p) => {
    const cs = caseById(p.caseId) || C.cases[0];
    const I = ind(cs.industry);
    const set = Object.assign({}, S.settings);
    const useAI = aiOn();
    const stages = stagesFor(cs, set.difficulty, set.format);
    const L = LINES[set.tone];
    const state = { stage: 0, log: [], revealed: new Set(), hints: 0, mathTries: 0, answers: {}, start: Date.now(), stageStart: Date.now(), busy: false, done: false, aiTurns: [], exhibitShown: false };
    let timerId = null;

    root.innerHTML = `
      <div class="row" style="justify-content:space-between"><div class="stack" style="gap:6px"><span class="eyebrow">${esc(I.name)} &middot; ${esc(cs.type)}</span><h1 style="font-size:clamp(1.5rem,3.5vw,2.1rem)">${esc(cs.title)}</h1></div>
        <div class="row"><span class="chip">${esc(DIFF[set.difficulty].label)}</span><span class="chip">${set.format === "candidate" ? "Candidate-led" : "Interviewer-led"}</span><span class="chip">${esc(TONE[set.tone].label)}</span>${useAI ? `<span class="chip good">AI interviewer</span>` : `<span class="chip">Scripted</span>`}</div></div>
      <div class="case-shell">
        <div class="stack">
          <div class="transcript" id="log"></div>
          <div class="composer" id="composer">
            <div class="interim" id="interim"></div>
            <textarea id="input" placeholder="Speak or type your answer. Answer first, then explain."></textarea>
            <div class="row">
              <button class="btn rec" id="mic">Speak</button>
              <button class="btn ghost small" id="hint">Hint</button>
              <button class="btn ghost small" id="reveal" hidden>What could I ask?</button>
              <button class="btn ghost small" id="advance" hidden>I'm ready to structure</button>
              <button class="btn primary" id="send" style="margin-left:auto">Send</button>
            </div>
          </div>
        </div>
        <aside class="side">
          <div class="card stack" style="gap:10px"><span class="eyebrow">Time</span><span class="timer" id="timer">0:00</span><span class="small muted" id="pace"></span></div>
          <div class="card stack" style="gap:10px"><span class="eyebrow">Stages</span><div class="stages" id="stages"></div></div>
          <div class="card stack" id="factsCard" style="gap:8px" hidden><span class="eyebrow">Facts you uncovered</span><div id="facts" class="small stack" style="gap:6px"></div></div>
          <button class="btn ghost" id="quit">End and score</button>
        </aside>
      </div>`;
    const $log = root.querySelector("#log"), $in = root.querySelector("#input");
    const $send = root.querySelector("#send"), $hint = root.querySelector("#hint"), $reveal = root.querySelector("#reveal"), $adv = root.querySelector("#advance");
    const stopMic = wireMic(root.querySelector("#mic"), $in, root.querySelector("#interim"));
    current.cleanup = () => { stopMic(); clearInterval(timerId); if (state.ctl) state.ctl.abort(); };

    const add = (who, text, opts = {}) => {
      const d = document.createElement("div");
      d.className = "bubble " + (who === "int" ? "int" : who === "me" ? "me" : "sys");
      if (who !== "sys") { const w = document.createElement("div"); w.className = "who"; w.textContent = who === "int" ? "Interviewer" : "You"; d.appendChild(w); }
      const t = document.createElement("div"); t.textContent = text; d.appendChild(t);
      $log.appendChild(d);
      if (opts.html) { const x = document.createElement("div"); x.innerHTML = opts.html; $log.appendChild(x); }
      state.log.push({ who, text });
      if (who === "int" && opts.speak !== false) Speech.say(text);
      d.scrollIntoView({ block: "nearest", behavior: "smooth" });
      return t;
    };
    const drawStages = () => {
      root.querySelector("#stages").innerHTML = stages.map((s, i) => `<div class="stage ${i < state.stage ? "done" : i === state.stage ? "on" : ""}"><i></i>${esc(s.label)}</div>`).join("");
      const sid = stages[state.stage] && stages[state.stage].id;
      $reveal.hidden = useAI || sid !== "clarify" || set.difficulty === "final";
      $adv.hidden = useAI || sid !== "clarify";
      $hint.hidden = set.difficulty === "final" || (!useAI && !["structure", "math", "brainstorm"].includes(sid));
    };
    const drawFacts = () => {
      const card = root.querySelector("#factsCard"); const facts = [...state.revealed].map((i) => cs.facts[i].text);
      card.hidden = !facts.length; const box = root.querySelector("#facts"); box.innerHTML = "";
      facts.forEach((f) => { const p = document.createElement("p"); p.textContent = f; box.appendChild(p); });
    };
    const tick = () => {
      const s = Math.floor((Date.now() - state.start) / 1000);
      const el = root.querySelector("#timer"); if (!el) return;
      el.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
      const limit = set.difficulty === "foundation" ? null : set.difficulty === "final" ? 25 : 30;
      if (limit) { el.classList.toggle("over", s > limit * 60); root.querySelector("#pace").textContent = `Target: finish in about ${limit} minutes.`; }
    };
    timerId = setInterval(tick, 1000); tick();

    /* ----- scripted interviewer ----- */
    const Scripted = {
      open() {
        add("sys", "Tip: take notes, ask 2 to 3 clarifying questions, then ask for a moment to structure.");
        add("int", (set.tone === "tough" ? "Let's get started. " : "Thanks for coming in. Let's start the case. ") + cs.prompt + (set.format === "candidate" ? " Take it from here." : " What questions do you have before you structure your approach?"));
        drawStages();
      },
      next() {
        state.stage++; state.stageStart = Date.now(); drawStages();
        const sid = stages[state.stage] ? stages[state.stage].id : "done";
        if (sid === "structure") add("int", (set.difficulty === "foundation" ? "Take a minute to lay out how you'd approach this. Aim for 3 to 5 areas, and say what you'd look at in each." : "Okay. Take a moment, then walk me through how you'd approach this."));
        else if (sid === "route") add("int", "Where would you like to start?");
        else if (sid === "math") {
          const showEx = () => { if (!state.exhibitShown) { state.exhibitShown = true; return exhibitHTML(cs.exhibit); } return ""; };
          add("int", (set.format === "interviewer" ? `${L.move} Our team pulled together some data. ` : "Here's what the team has. ") + cs.question, { html: showEx() });
        } else if (sid === "brainstorm") add("int", cs.brainstorm);
        else if (sid === "curveball") add("int", cs.curveball);
        else if (sid === "synthesis") add("int", set.tone === "tough" ? "The CEO just walked in. You have 60 seconds. What's your recommendation?" : "Let's wrap up. The CEO walks in and asks what we should do. What's your recommendation?");
        else finish();
      },
      reply(text) {
        const sid = stages[state.stage].id;
        state.answers[sid] = (state.answers[sid] ? state.answers[sid] + "\n" : "") + text;
        if (sid === "clarify") {
          const found = [];
          cs.facts.forEach((f, i) => { if (hits(text, f.keys).length) found.push(i); });
          if (found.length) { found.forEach((i) => state.revealed.add(i)); add("int", found.map((i) => cs.facts[i].text).join(" ")); drawFacts(); }
          else add("int", set.tone === "tough" ? "Not relevant right now. Anything else, or are you ready to structure?" : "Good question, but we don't have data on that. Anything else?");
          if (/\b(structure|framework|approach|moment|ready|minute)\b/i.test(text) && state.revealed.size > 0) Scripted.next();
          return;
        }
        if (sid === "structure") {
          const covered = cs.structure.filter((b) => hits(text, b.keys).length);
          if (covered.length < 2 && !state.pushedStructure) { state.pushedStructure = true; add("int", L.push); return; }
          if (set.difficulty === "final" && set.tone === "tough" && !state.probed) { state.probed = true; add("int", "Which of those areas would you look at first, and why?"); return; }
          add("int", pick(L.ack) + (set.difficulty === "foundation" ? ` A strong structure here might cover: ${cs.structure.map((b) => b.name.toLowerCase()).join("; ")}.` : ""));
          return Scripted.next();
        }
        if (sid === "route") {
          const b = cs.branches[0];
          if (hits(text, b.keys).length || hits(text, cs.branches[1].keys).length) { add("int", "Makes sense. What data would you want to see?"); }
          else add("int", `That's reasonable. In the interest of time, let's look at ${b.name.toLowerCase()} first.`);
          return Scripted.next();
        }
        if (sid === "math") {
          state.mathTries++;
          const nums = parseNumbers(text, cs.answer.unit);
          const ok = nums.some((n) => Math.abs(n - cs.answer.value) <= cs.answer.tolerance);
          const close = nums.some((n) => Math.abs(n - cs.answer.value) <= Math.abs(cs.answer.value) * 0.1);
          if (ok) { state.mathRight = true; add("int", (set.tone === "supportive" ? "That's right, well done. " : "Correct. ") + "So what does that number tell us?"); state.awaitSoWhat = true; return; }
          if (state.awaitSoWhat) { state.awaitSoWhat = false; add("int", pick(L.ack)); return Scripted.next(); }
          if (state.mathTries < 2) { add("int", close ? "You're close. Check your steps again." : set.tone === "tough" ? "That's not what I get. Walk me through your math." : "Hmm, I get a different number. Can you walk me through your steps?"); return; }
          add("int", `Let me show you how I'd do it. ${cs.solution}`); return Scripted.next();
        }
        if (sid === "brainstorm") {
          const ideas = cs.brainstormKeys.filter((b) => hits(text, b.keys).length);
          if (ideas.length < 3 && !state.pushedBrainstorm) { state.pushedBrainstorm = true; add("int", set.tone === "tough" ? "That's two ideas. Give me more, and organize them." : "Good. What else could we consider?"); return; }
          add("int", pick(L.ack)); return Scripted.next();
        }
        if (sid === "curveball") { add("int", pick(L.ack)); return Scripted.next(); }
        if (sid === "synthesis") { add("int", set.tone === "supportive" ? "Thank you, that was a solid case. Let's look at how you did." : "Thanks. That's time."); return finish(); }
      },
      hint() {
        const sid = stages[state.stage].id;
        state.hints++;
        if (sid === "structure") add("sys", "Hint: cover " + cs.structure.slice(0, 3).map((b) => b.name.toLowerCase()).join(", ") + ", and more.");
        else if (sid === "math") add("sys", "Hint: " + (cs.mathHints[Math.min(state.hints - 1, cs.mathHints.length - 1)] || cs.mathHints[0]));
        else if (sid === "brainstorm") add("sys", "Hint: think in buckets, for example internal vs external, or short term vs long term. One idea: " + cs.brainstormKeys[rnd(0, cs.brainstormKeys.length - 1)].name.toLowerCase() + ".");
      },
      score() {
        const a = state.answers;
        const cov = cs.structure.filter((b) => hits(a.structure || "", b.keys).length).length;
        const structure = clamp(1 + Math.round((cov / cs.structure.length) * 4) - (state.hints && set.difficulty !== "foundation" ? 0.5 : 0), 1, 5);
        let math = state.mathRight ? (state.mathTries <= 1 ? 5 : 4) : (parseNumbers(a.math || "", cs.answer.unit).some((n) => Math.abs(n - cs.answer.value) <= Math.abs(cs.answer.value) * 0.1) ? 3 : a.math ? 2 : 1);
        if (state.hints >= 2 && set.difficulty !== "foundation") math = Math.max(1, math - 1);
        const ideas = cs.brainstormKeys.filter((b) => hits(a.brainstorm || "", b.keys).length).length;
        let insight = clamp(ideas + 1, 1, 5);
        if (a.curveball) insight = Math.round((insight + clamp(hits(a.curveball, cs.curveballKeys).length + 1, 1, 5)) / 2);
        const sy = a.synthesis || "";
        const k = cs.synthesisKeys;
        const parts = [k.answer, k.reasons, k.risks, k.next].filter((ks) => hits(sy, ks).length).length;
        const leads = hits(sy.split(/\s+/).slice(0, 18).join(" "), k.answer).length > 0;
        const synthesis = clamp(parts + (leads ? 1 : 0), 1, 5);
        const communication = commScore(Object.values(a));
        const clar = state.revealed.size;
        return { scores: { structure, math, insight, synthesis, communication }, notes: {
          structure: `You covered ${cov} of ${cs.structure.length} key areas: ${cs.structure.filter((b) => hits(a.structure || "", b.keys).length).map((b) => b.name).join(", ") || "none detected"}.`,
          math: state.mathRight ? `Correct${state.mathTries > 1 ? " after a retry" : " on the first try"}.` : "The answer was not reached. Practice the setup: write the formula before you calculate.",
          insight: `You raised ${ideas} of ${cs.brainstormKeys.length} idea areas.` + (a.curveball ? " Curveball handled." : ""),
          synthesis: `${leads ? "You led with the answer." : "Lead with the answer in your first sentence."} Your close covered ${parts} of 4 parts (answer, reasons with numbers, risks, next steps).`,
          communication: `You asked questions that uncovered ${clar} fact${clar === 1 ? "" : "s"}. Signposting and fewer filler words raise this score.`
        } };
      }
    };

    /* ----- AI interviewer ----- */
    const AI = {
      rules() {
        const styleTxt = set.format === "candidate"
          ? "CANDIDATE-LED (BCG/Bain style): after the candidate structures, let them drive. Ask 'Where would you like to start?' Only share data when they ask for it or go down a relevant branch; if they go down an unproductive branch, redirect them politely."
          : "INTERVIEWER-LED (McKinsey style): you steer the case. Ask one question at a time in this order: clarifying questions, structure, exhibit and math, brainstorm, recommendation.";
        const toneTxt = { supportive: "Tone: a supportive coach. Encourage, and when the candidate is stuck give a small nudge.", neutral: "Tone: realistic and neutral, like most real MBB interviewers.", tough: "Tone: a tough, busy partner. Be brief, push back, ask 'so what?' and challenge weak logic or vague numbers." }[set.tone];
        const diffTxt = { foundation: "Difficulty: foundation. Give gentle hints if the candidate misses major areas.", standard: "Difficulty: standard first round.", final: `Difficulty: final round. No hints. After the brainstorm, ask this curveball: "${cs.curveball}". Probe the structure with one tough follow-up.` }[set.difficulty];
        return `You are an interviewer at a top strategy consulting firm running a live case interview with a candidate. Speak like a real interviewer in conversation: short turns (under 90 words), one question at a time, no markdown, no bullet lists, no headings. Never reveal the solution or the grading notes unless the candidate has finished that step. Never play the candidate.

${styleTxt}
${toneTxt}
${diffTxt}

CASE BOOK (confidential to you):
Industry: ${I.name}. Trend: ${cs.trend}.
Prompt to read at the start: ${cs.prompt}
Facts you may share when asked: ${cs.facts.map((f) => "- " + f.text).join(" ")}
Good structure covers: ${cs.modelStructure}
Exhibit (when you reach the data step, write the token [EXHIBIT] on its own and then ask the question; the page will show this table to the candidate): ${cs.exhibit.title}: ${cs.exhibit.rows.map((r) => r.join(" = ")).join("; ")}
Math question: ${cs.question}
Correct answer: ${cs.answer.display}. Solution: ${cs.solution}
Brainstorm question: ${cs.brainstorm}
Strong brainstorm ideas: ${cs.brainstormKeys.map((b) => b.name).join("; ")}
Strong recommendation looks like: ${cs.modelSynthesis}

When the candidate has given their final recommendation (or after about 14 of their turns), thank them briefly and end your message with the token [END].
Begin now: greet the candidate in one sentence and read the prompt.`;
      },
      async turn(userText) {
        if (userText) state.aiTurns.push({ role: "user", content: userText });
        const input = [{ role: "user", content: AI.rules() }];
        if (state.aiTurns.length) { input.push({ role: "assistant", content: state.aiOpening || "Hello." }); input.push(...state.aiTurns); }
        state.busy = true; $send.disabled = true;
        const t = add("int", "Thinking...", { speak: false });
        state.ctl = new AbortController();
        try {
          const { text } = await ask(input, { signal: state.ctl.signal, onText: ({ text }) => { t.textContent = text.replace("[EXHIBIT]", "").replace("[END]", "").trim(); } });
          const clean = text.replace("[EXHIBIT]", "").replace("[END]", "").trim();
          t.textContent = clean; state.log[state.log.length - 1].text = clean;
          if (!state.aiOpening) state.aiOpening = text; else state.aiTurns.push({ role: "assistant", content: text });
          if (text.includes("[EXHIBIT]") && !state.exhibitShown) { state.exhibitShown = true; const x = document.createElement("div"); x.innerHTML = exhibitHTML(cs.exhibit); t.parentElement.after(x); AI.bump("math"); }
          AI.inferStage(text);
          Speech.say(clean);
          if (text.includes("[END]")) { state.stage = stages.length - 1; drawStages(); setTimeout(finish, 600); }
        } catch (e) {
          t.textContent = aiErrorText(e);
          if (e && e.code === "not_granted") { state.fallback = true; t.textContent += " Restart the case to continue in scripted mode."; }
          if (userText) state.aiTurns.pop();
        } finally { state.busy = false; $send.disabled = false; }
      },
      bump(id) { const i = stages.findIndex((s) => s.id === id); if (i > state.stage) { state.stage = i; drawStages(); } },
      inferStage(text) {
        const t = lc(text);
        if (/structure|approach|framework|walk me through how/.test(t)) AI.bump("structure");
        if (/where would you like to start|where do you want to go/.test(t)) AI.bump("route");
        if (t.includes(lc(cs.brainstorm).slice(0, 30)) || /what else could|brainstorm|other ways|what could stop/.test(t)) AI.bump("brainstorm");
        if (set.difficulty === "final" && t.includes(lc(cs.curveball).slice(0, 25))) AI.bump("curveball");
        if (/recommendation|ceo walks|wrap up|what should (we|they) do/.test(t)) AI.bump("synthesis");
      },
      async score() {
        const transcript = state.log.filter((l) => l.who !== "sys").map((l) => (l.who === "int" ? "Interviewer: " : "Candidate: ") + l.text).join("\n");
        const r = await Cap.sample.json(`Grade this consulting case interview like an MBB interviewer. Difficulty: ${set.difficulty}. Be honest and specific; quote the candidate where useful.

Case: ${cs.title}. Expected structure: ${cs.modelStructure}. Correct math answer: ${cs.answer.display}. Strong ideas: ${cs.brainstormKeys.map((b) => b.name).join("; ")}. Strong recommendation: ${cs.modelSynthesis}

Transcript:
${transcript}

Score each dimension 1 to 5 (5 = would pass an MBB final round). Dimensions: structure, math, insight (brainstorm, business judgment, curveball), synthesis (answer-first, numbers, risks, next steps), communication (clarity, signposting, conciseness, confidence). If a step never happened, score it 1 and say so.
Reply with only JSON: {"scores":{"structure":n,"math":n,"insight":n,"synthesis":n,"communication":n},"notes":{"structure":"...","math":"...","insight":"...","synthesis":"...","communication":"..."},"top_fix":"the single most important thing to fix next time","verdict":"one sentence on whether this would pass and why"}`, { modelTier: "default" });
        if (!r || !r.scores) throw { code: "invalid_json" };
        ["structure", "math", "insight", "synthesis", "communication"].forEach((k) => { r.scores[k] = clamp(Math.round(Number(r.scores[k]) || 1), 1, 5); });
        return r;
      }
    };

    async function finish() {
      if (state.done) return; state.done = true;
      clearInterval(timerId); Speech.stop();
      root.querySelector("#composer").hidden = true;
      add("sys", useAI && !state.fallback ? "Scoring your interview..." : "Scoring...");
      let result;
      if (useAI && !state.fallback) {
        try { result = await AI.score(); result.mode = "ai"; }
        catch (e) { result = Scripted.score(); result.mode = "scripted"; result.note = "The AI grader was unavailable, so keyword scoring was used."; }
      } else { result = Scripted.score(); result.mode = "scripted"; }
      const sc = result.scores;
      const overall = Math.round(((sc.structure + sc.math + sc.insight + sc.synthesis + sc.communication) / 25) * 100);
      const rec = { caseId: cs.id, industry: cs.industry, date: today(), ts: Date.now(), scores: sc, overall, difficulty: set.difficulty, format: set.format, tone: set.tone, mode: result.mode, minutes: Math.round((Date.now() - state.start) / 60000) };
      S.cases.push(rec); save();
      go("case-result", { rec, result, caseId: cs.id, transcript: state.log });
    }

    $send.addEventListener("click", () => {
      const text = $in.value.trim(); if (!text || state.busy || state.done) return;
      Speech.stop();
      add("me", text); $in.value = "";
      if (useAI && !state.fallback) AI.turn(text); else Scripted.reply(text);
    });
    $in.addEventListener("keydown", (e) => { if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) $send.click(); });
    $hint.addEventListener("click", () => {
      if (useAI && !state.fallback) { state.hints++; $in.value = "Could I get a small hint?"; $send.click(); }
      else Scripted.hint();
    });
    $reveal.addEventListener("click", () => { add("sys", "Areas you could ask about: the client's goal, " + cs.facts.slice(1).map((f) => f.keys[0]).join(", ") + "."); });
    $adv.addEventListener("click", () => { if (stages[state.stage].id === "clarify") { add("me", "Thanks. Could I take a moment to structure my thoughts?"); Scripted.next(); } });
    root.querySelector("#quit").addEventListener("click", finish);

    drawStages();
    if (useAI) AI.turn(null); else Scripted.open();
  };

  /* ---------- Case result ---------- */
  VIEWS["case-result"] = (root, p) => {
    const { rec, result } = p; const cs = caseById(p.caseId);
    const labels = { structure: "Structure", math: "Math", insight: "Insight", synthesis: "Synthesis", communication: "Communication" };
    const weakest = Object.keys(labels).sort((a, b) => rec.scores[a] - rec.scores[b])[0];
    const grade = rec.overall >= 85 ? "Strong pass" : rec.overall >= 70 ? "Likely pass" : rec.overall >= 55 ? "Borderline" : "Not yet";
    root.innerHTML = `
      <div class="stack" style="gap:6px"><span class="eyebrow">Case scorecard &middot; ${esc(ind(cs.industry).name)}</span><h1>${esc(cs.title)}</h1></div>
      <section class="card stack">
        <div class="row" style="gap:20px;align-items:flex-end"><span class="bigscore">${rec.overall}</span><div><h2>${grade}</h2><p class="small muted">${esc(DIFF[rec.difficulty].label)} &middot; ${rec.format === "candidate" ? "Candidate-led" : "Interviewer-led"} &middot; ${rec.minutes} min &middot; ${result.mode === "ai" ? "Graded by the AI interviewer" : "Keyword scoring"}</p></div></div>
        ${result.verdict ? `<p>${esc(result.verdict)}</p>` : ""}
        ${result.note ? `<p class="notice">${esc(result.note)}</p>` : ""}
        <div class="score-grid">${Object.keys(labels).map((k) => `<div class="score"><span class="small muted">${labels[k]}</span><span class="v ${rec.scores[k] >= 4 ? "up" : rec.scores[k] <= 2 ? "down" : ""}">${rec.scores[k]}<span class="small muted">/5</span></span><span class="small">${esc((result.notes || {})[k] || "")}</span></div>`).join("")}</div>
        <div class="keyidea"><b>Fix this next.</b> ${esc(result.top_fix || `Your weakest area was ${labels[weakest].toLowerCase()}. ` + ({ structure: "Before speaking, write 3 to 5 buckets that are tailored to the industry, not a generic framework.", math: "Say the formula out loud, round smartly, and sanity-check the magnitude. Do a math drill today.", insight: "Organize ideas in buckets (internal vs external, short vs long term) and aim for 5 or more.", synthesis: "Lead with the answer, give two reasons with numbers, one risk and a next step, in 60 seconds.", communication: "Signpost ('three things...'), pause instead of filler words, and keep answers tight." })[weakest])}</div>
      </section>
      <section class="grid-2" style="align-items:start">
        <div class="card stack"><h3>Model structure</h3><div class="model">${esc(cs.modelStructure)}</div><h3>Math solution</h3><div class="model">${esc(cs.solution)}</div></div>
        <div class="card stack"><h3>Strong brainstorm ideas</h3><div class="model">${esc(cs.brainstormKeys.map((b) => "- " + b.name).join("\n"))}</div><h3>Model recommendation</h3><div class="model">${esc(cs.modelSynthesis)}</div></div>
      </section>
      <div class="row"><button class="btn" data-retry>Try again</button><button class="btn" data-learn>Review ${esc(ind(cs.industry).name)} lessons</button>${weakest === "math" ? `<button class="btn" data-math>Math drill</button>` : ""}<button class="btn primary" data-progress>See progress</button></div>`;
    on(root, "[data-retry]", "click", () => go("case-setup", { caseId: cs.id, industry: cs.industry }));
    on(root, "[data-learn]", "click", () => go("learn", { industry: cs.industry }));
    on(root, "[data-math]", "click", () => go("math"));
    on(root, "[data-progress]", "click", () => go("progress"));
  };

  /* ---------- Mental math ---------- */
  function mathQuestion() {
    const t = rnd(0, 7);
    if (t === 0) { const p = pick([15, 35, 45, 12, 65, 8, 22, 85]); const n = pick([2400, 640, 1800, 3500, 720, 960, 4200]); return { q: `${p}% of ${fmtNum(n)}`, a: (p / 100) * n }; }
    if (t === 1) { const a = rnd(40, 160); const g = pick([5, 8, 12, 15, 20, 25, -10, -15]); const b = Math.round(a * (1 + g / 100)); return { q: `Revenue went from ${a} to ${b}. Growth in %?`, a: ((b - a) / a) * 100, unit: "%" }; }
    if (t === 2) { const pts = pick([1.5, 2.4, 3.2, 0.75, 4.5]); const pr = pick([350, 120, 45, 80, 25]); return { q: `${pts}M customers x $${pr} per month x 12 months, in $B`, a: (pts * 1e6 * pr * 12) / 1e9, unit: "$B" }; }
    if (t === 3) { const n = pick([252, 180, 90, 420, 64]); const d = pick([14, 12, 3.6, 2.4, 8]); return { q: `$${n}M as a % of $${d}B`, a: (n / (d * 1000)) * 100, unit: "%" }; }
    if (t === 4) { const f = pick([12, 6, 24, 9, 30]); const p = pick([40, 25, 60, 18, 100]); const v = Math.round(p * pick([0.4, 0.5, 0.6, 0.7])); return { q: `Fixed costs $${f}M, price $${p}, variable cost $${v}. Breakeven units (millions)?`, a: f / (p - v), unit: "M units" }; }
    if (t === 5) { const r = pick([6, 8, 9, 12, 18, 24]); return { q: `At ${r}% annual growth, roughly how many years to double? (rule of 72)`, a: 72 / r, unit: "years" }; }
    if (t === 6) { const fr = pick([[3, 8], [5, 6], [7, 12], [1, 7], [3, 16], [5, 9]]); return { q: `${fr[0]}/${fr[1]} as a %`, a: (fr[0] / fr[1]) * 100, unit: "%" }; }
    const mw = pick([100, 250, 800, 1300, 50]); const cf = pick([25, 35, 90, 60]); return { q: `${mw} MW at ${cf}% capacity factor: annual energy in thousand MWh (8,760 h/yr)`, a: (mw * 8760 * cf / 100) / 1000, unit: "k MWh" };
  }
  VIEWS.math = (root) => {
    const DURATION = 120;
    let st = { running: false, left: DURATION, q: null, right: 0, tries: 0, log: [], timer: null, qStart: 0 };
    const draw = () => {
      root.innerHTML = `
        <div class="stack" style="gap:6px"><span class="eyebrow">Drill &middot; Mental math</span><h1>Two-minute math round</h1><p class="lede">Case-style arithmetic. Answers within 2% count, so round smartly the way you would in an interview. Units are given in the question.</p></div>
        <section class="card stack" id="arena">
          ${st.running ? `
            <div class="row" style="justify-content:space-between"><span class="timer ${st.left <= 15 ? "over" : ""}" id="mt">${st.left}s</span><span class="num muted">${st.right} correct of ${st.tries}</span></div>
            <div class="drill-q">${esc(st.q.q)} = ?</div>
            <form id="mf" class="row"><input type="text" inputmode="decimal" id="ma" autocomplete="off" aria-label="Your answer" style="font-family:var(--mono);font-size:1.2rem;width:12rem"><button class="btn primary" type="submit">Submit</button><button class="btn ghost" type="button" id="skip">Skip</button></form>
            <div id="mfb" class="small" style="min-height:1.4em"></div>` : st.log.length ? resultsHTML() : `
            <p>You will get as many questions as you can answer in ${DURATION} seconds: percentages, growth, market math, breakeven, rule of 72, fractions and energy units.</p>
            <div><button class="btn primary" id="go">Start round</button></div>`}
        </section>
        ${S.math.length ? `<section class="card stack"><h3>Recent rounds</h3><div class="table-wrap"><table><thead><tr><th>Date</th><th>Correct</th><th>Accuracy</th><th>Score</th></tr></thead><tbody>${S.math.slice(-6).reverse().map((m) => `<tr><td>${esc(m.date)}</td><td>${m.right}/${m.tries}</td><td>${m.tries ? Math.round(m.right / m.tries * 100) : 0}%</td><td>${m.score}</td></tr>`).join("")}</tbody></table></div></section>` : ""}`;
      const g = root.querySelector("#go"); if (g) g.addEventListener("click", start);
      const again = root.querySelector("#again"); if (again) again.addEventListener("click", start);
      const f = root.querySelector("#mf");
      if (f) {
        const inp = root.querySelector("#ma"); inp.focus();
        f.addEventListener("submit", (e) => { e.preventDefault(); answer(inp.value); });
        root.querySelector("#skip").addEventListener("click", () => answer(null));
      }
    };
    const resultsHTML = () => {
      const last = S.math[S.math.length - 1];
      return `<div class="row" style="align-items:flex-end;gap:16px"><span class="bigscore">${last.score}</span><div><h2>${last.right} correct</h2><p class="small muted">${last.tries} attempted, ${last.tries ? Math.round(last.right / last.tries * 100) : 0}% accuracy. Target: 10+ correct at 90% accuracy.</p></div></div>
        <div class="table-wrap"><table><thead><tr><th>Question</th><th>You</th><th>Answer</th></tr></thead><tbody>${st.log.map((l) => `<tr><td style="font-family:var(--body)">${esc(l.q)}</td><td class="${l.ok ? "up" : "down"}">${l.you == null ? "skipped" : esc(l.you)}</td><td>${fmtNum(l.a, Math.abs(l.a) < 10 ? 2 : 1)}</td></tr>`).join("")}</tbody></table></div>
        <div><button class="btn primary" id="again">Another round</button></div>`;
    };
    const start = () => {
      st = { running: true, left: DURATION, q: mathQuestion(), right: 0, tries: 0, log: [], timer: null, qStart: Date.now() };
      st.timer = setInterval(() => { st.left--; const el = root.querySelector("#mt"); if (el) { el.textContent = st.left + "s"; el.classList.toggle("over", st.left <= 15); } if (st.left <= 0) end(); }, 1000);
      current.cleanup = () => clearInterval(st.timer);
      draw();
    };
    const answer = (raw) => {
      const v = raw == null || raw === "" ? null : parseFloat(String(raw).replace(/[$,%\s]/g, ""));
      const ok = v != null && !isNaN(v) && Math.abs(v - st.q.a) <= Math.max(Math.abs(st.q.a) * 0.02, 0.05);
      st.tries++; if (ok) st.right++;
      st.log.push({ q: st.q.q, a: st.q.a, you: raw == null || raw === "" ? null : raw, ok });
      const prevQ = st.q;
      st.q = mathQuestion();
      draw();
      const fb = root.querySelector("#mfb"); if (fb) { fb.className = "small " + (ok ? "flash-good" : "flash-bad"); fb.textContent = ok ? "Correct" : `Answer to the last one: ${fmtNum(prevQ.a, Math.abs(prevQ.a) < 10 ? 2 : 1)}`; }
    };
    const end = () => {
      clearInterval(st.timer); st.running = false;
      const acc = st.tries ? st.right / st.tries : 0;
      const score = Math.round(acc * 70 + Math.min(1, st.right / 10) * 30);
      S.math.push({ date: today(), ts: Date.now(), right: st.right, tries: st.tries, score }); save();
      draw();
    };
    draw();
  };

  /* ---------- Chart reading ---------- */
  const CHART_SETS = {
    pharma: { title: "Revenue by therapy area", unit: "$M", series: ["Obesity", "Diabetes", "Oncology", "Immunology"] },
    retail: { title: "Sales by channel", unit: "$M", series: ["Stores", "Online", "Store brand", "Retail media"] },
    energy: { title: "Generation by source", unit: "TWh", series: ["Gas", "Solar", "Wind", "Nuclear"] }
  };
  function makeChart() {
    const indId = pick(Object.keys(CHART_SETS)); const set = CHART_SETS[indId];
    const years = [2021, 2022, 2023, 2024, 2025];
    const series = set.series.map((name, i) => {
      let v = rnd(20, 90) * (i === 0 ? 2 : 1); const g = pick([-0.08, 0.02, 0.05, 0.1, 0.18, 0.3, 0.45]);
      const vals = years.map(() => { const cur = Math.round(v); v = v * (1 + g + (Math.random() - 0.5) * 0.06); return Math.max(4, cur); });
      return { name, vals };
    });
    const kind = pick(["bar", "line"]);
    const growth = series.map((s) => s.vals[4] / s.vals[0] - 1);
    const qType = rnd(0, 3);
    let q, opts, ans, why;
    if (qType === 0) {
      const bi = growth.indexOf(Math.max(...growth));
      q = `Which segment grew fastest in percentage terms from 2021 to 2025?`; opts = series.map((s) => s.name); ans = bi;
      why = `${series[bi].name} went from ${series[bi].vals[0]} to ${series[bi].vals[4]}, up ${Math.round(growth[bi] * 100)}%. Fastest in % is not the same as biggest in absolute terms.`;
    } else if (qType === 1) {
      const tot = series.reduce((a, s) => a + s.vals[4], 0);
      const big = series.reduce((a, s) => (s.vals[4] > a.vals[4] ? s : a));
      const share = Math.round(big.vals[4] / tot * 100);
      q = `Roughly what share of the 2025 total is ${big.name}?`;
      const c = [share, share + pick([8, 12]), Math.max(5, share - pick([9, 14])), share + pick([18, 22])].sort(() => Math.random() - 0.5);
      opts = c.map((x) => x + "%"); ans = c.indexOf(share); why = `${big.name} is ${big.vals[4]} of a ${tot} total, about ${share}%.`;
    } else if (qType === 2) {
      const tot0 = series.reduce((a, s) => a + s.vals[0], 0), tot4 = series.reduce((a, s) => a + s.vals[4], 0);
      const cagr = Math.round((Math.pow(tot4 / tot0, 1 / 4) - 1) * 100);
      q = `Roughly what is the total's compound annual growth rate (CAGR) from 2021 to 2025?`;
      const c = [cagr, cagr + 4, cagr - 3, cagr + 9].sort(() => Math.random() - 0.5);
      opts = c.map((x) => x + "%"); ans = c.indexOf(cagr); why = `Total went from ${tot0} to ${tot4}: ${(tot4 / tot0).toFixed(2)}x over 4 years. The 4th root gives about ${cagr}% a year. Tip: total growth divided by years overstates CAGR.`;
    } else {
      const decl = series.map((s, i) => ({ i, d: s.vals[4] - s.vals[3] })).sort((a, b) => a.d - b.d)[0];
      q = `Which segment had the weakest change from 2024 to 2025?`; opts = series.map((s) => s.name); ans = decl.i;
      why = `${series[decl.i].name} moved from ${series[decl.i].vals[3]} to ${series[decl.i].vals[4]}. In a case, this is the 'so what' to dig into: why did it slow?`;
    }
    return { indId, set, years, series, kind, q, opts, ans, why };
  }
  function chartSVG(ch) {
    const W = 620, H = 300, padL = 48, padR = 16, padT = 16, padB = 36;
    const max = Math.max(...ch.series.flatMap((s) => s.vals));
    const niceMax = Math.ceil(max / 20) * 20 || 20;
    const x0 = padL, x1 = W - padR, y0 = H - padB, y1 = padT;
    const ys = (v) => y0 - (v / niceMax) * (y0 - y1);
    const colors = ["var(--c1)", "var(--c2)", "var(--c3)", "var(--c4)"];
    let g = "";
    for (let i = 0; i <= 4; i++) { const v = (niceMax / 4) * i; const y = ys(v); g += `<line x1="${x0}" x2="${x1}" y1="${y}" y2="${y}" stroke="var(--line)" stroke-width="1"/><text x="${x0 - 8}" y="${y + 4}" text-anchor="end" font-size="11" fill="var(--muted)" font-family="IBM Plex Mono, monospace">${Math.round(v)}</text>`; }
    const band = (x1 - x0) / ch.years.length;
    ch.years.forEach((yr, i) => { g += `<text x="${x0 + band * i + band / 2}" y="${H - 12}" text-anchor="middle" font-size="11" fill="var(--muted)" font-family="IBM Plex Mono, monospace">${yr}</text>`; });
    if (ch.kind === "bar") {
      const bw = (band - 16) / ch.series.length;
      ch.series.forEach((s, si) => s.vals.forEach((v, i) => { const x = x0 + band * i + 8 + bw * si; g += `<rect x="${x}" y="${ys(v)}" width="${bw - 2}" height="${y0 - ys(v)}" fill="${colors[si]}" rx="1"><title>${esc(s.name)} ${ch.years[i]}: ${v}</title></rect>`; }));
    } else {
      ch.series.forEach((s, si) => {
        const pts = s.vals.map((v, i) => `${x0 + band * i + band / 2},${ys(v)}`).join(" ");
        g += `<polyline points="${pts}" fill="none" stroke="${colors[si]}" stroke-width="2.5"/>`;
        s.vals.forEach((v, i) => { g += `<circle cx="${x0 + band * i + band / 2}" cy="${ys(v)}" r="${i === 4 ? 4 : 3}" fill="${colors[si]}"><title>${esc(s.name)} ${ch.years[i]}: ${v}</title></circle>`; });
        g += `<text x="${x0 + band * 4 + band / 2 + 6}" y="${ys(s.vals[4]) - 6}" font-size="11" fill="var(--ink)" font-family="IBM Plex Mono, monospace">${s.vals[4]}</text>`;
      });
    }
    g += `<line x1="${x0}" x2="${x1}" y1="${y0}" y2="${y0}" stroke="var(--muted)" stroke-width="1"/>`;
    return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${esc(ch.set.title)}">${g}</svg>`;
  }
  VIEWS.charts = (root) => {
    const N = 5;
    let st = { i: 0, right: 0, ch: makeChart(), answered: null, start: Date.now() };
    const draw = () => {
      if (st.i >= N) {
        const score = Math.round(st.right / N * 100);
        root.innerHTML = `<div class="stack" style="gap:6px"><span class="eyebrow">Drill &middot; Chart reading</span><h1>Set complete</h1></div>
          <section class="card stack"><div class="row" style="align-items:flex-end;gap:16px"><span class="bigscore">${score}</span><div><h2>${st.right} of ${N} correct</h2><p class="small muted">${Math.round((Date.now() - st.start) / 1000)} seconds. In an interview, aim to state the main takeaway of a chart within 30 seconds.</p></div></div>
          <div class="keyidea"><b>Habit to build.</b> When an exhibit appears: read the title and units, say what the chart shows in one sentence, find the biggest change, then say what it means for the client.</div>
          <div><button class="btn primary" id="again">New set</button></div></section>`;
        root.querySelector("#again").addEventListener("click", () => go("charts"));
        return;
      }
      const ch = st.ch;
      root.innerHTML = `
        <div class="stack" style="gap:6px"><span class="eyebrow">Drill &middot; Chart reading &middot; ${st.i + 1} of ${N}</span><h1>Read the exhibit</h1></div>
        <section class="card stack">
          <div class="exhibit" style="border:0"><div class="exhibit-head" style="padding-inline:0">Exhibit: ${esc(ch.set.title)}, 2021 to 2025 (${esc(ch.set.unit)})</div></div>
          <div class="legend">${ch.series.map((s, i) => `<span><i style="background:var(--c${i + 1})"></i>${esc(s.name)}</span>`).join("")}</div>
          <div class="chart-box">${chartSVG(ch)}</div>
          <b>${esc(ch.q)}</b>
          <div class="stack" style="gap:6px">${ch.opts.map((o, i) => `<button class="opt ${st.answered != null ? (i === ch.ans ? "right" : i === st.answered ? "wrong" : "") : ""}" data-o="${i}">${esc(o)}</button>`).join("")}</div>
          ${st.answered != null ? `<div class="keyidea">${st.answered === ch.ans ? "<b>Correct.</b> " : "<b>Not quite.</b> "}${esc(ch.why)}</div><div><button class="btn primary" id="nx">${st.i < N - 1 ? "Next exhibit" : "Finish"}</button></div>` : ""}
        </section>`;
      on(root, "[data-o]", "click", (e) => { if (st.answered != null) return; st.answered = +e.currentTarget.dataset.o; if (st.answered === ch.ans) st.right++; draw(); });
      const nx = root.querySelector("#nx");
      if (nx) nx.addEventListener("click", () => {
        st.i++; st.answered = null; st.ch = makeChart();
        if (st.i >= N) { S.charts.push({ date: today(), ts: Date.now(), score: Math.round(st.right / N * 100) }); save(); }
        draw();
      });
    };
    draw();
  };

  /* ---------- Fit & PEI ---------- */
  VIEWS.fit = (root, p) => {
    let qi = p.q != null ? p.q : 0;
    let timer = null, t0 = null;
    const draw = () => {
      const F = C.fit[qi];
      root.innerHTML = `
        <div class="stack" style="gap:6px"><span class="eyebrow">Drill &middot; Fit & PEI</span><h1>Tell your story</h1><p class="lede">McKinsey's Personal Experience Interview goes deep on one story for about 10 minutes. BCG and Bain fit questions are shorter. Aim for 2 minutes, with a clear situation, what you did, and a measurable result.</p></div>
        <div class="grid-2" style="grid-template-columns:minmax(0,1fr) minmax(0,2fr);align-items:start">
          <nav class="lesson-nav card flat" style="padding:8px">${C.fit.map((f, i) => `<button data-q="${i}" aria-current="${i === qi}"><span class="n">${String(i + 1).padStart(2, "0")}</span>${esc(f.type.replace("McKinsey PEI: ", "PEI: "))}</button>`).join("")}</nav>
          <section class="card stack">
            <span class="eyebrow">${esc(F.type)}</span>
            <div class="row" style="justify-content:space-between"><h2>${esc(F.q)}</h2><button class="btn small ghost" id="listen">Hear it</button></div>
            <details><summary class="small">How to answer this well</summary><p class="small" style="margin-top:8px">${esc(F.tips)}</p></details>
            <div class="row"><span class="timer" id="ft">0:00</span><span class="small muted">Target 2:00</span></div>
            <textarea id="fa" placeholder="Speak or type your story. Situation, your actions (say I, not we), result with numbers, what you learned."></textarea>
            <div class="row"><button class="btn rec" id="fmic">Speak</button><span class="interim" id="fint"></span><button class="btn primary" id="fdone" style="margin-left:auto">Get feedback</button></div>
            <div id="fout" class="stack" hidden></div>
          </section>
        </div>`;
      on(root, "[data-q]", "click", (e) => { qi = +e.currentTarget.dataset.q; clearInterval(timer); t0 = null; draw(); });
      root.querySelector("#listen").addEventListener("click", () => Speech.say(F.q));
      const ta = root.querySelector("#fa");
      const startTimer = () => { if (t0) return; t0 = Date.now(); timer = setInterval(() => { const s = Math.floor((Date.now() - t0) / 1000); const el = root.querySelector("#ft"); if (el) { el.textContent = `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`; el.classList.toggle("over", s > 150); } }, 1000); };
      ta.addEventListener("input", startTimer);
      const stopMic = wireMic(root.querySelector("#fmic"), ta, root.querySelector("#fint"));
      root.querySelector("#fmic").addEventListener("click", startTimer);
      current.cleanup = () => { stopMic(); clearInterval(timer); };
      root.querySelector("#fdone").addEventListener("click", async () => {
        const text = ta.value.trim(); if (!text) return;
        clearInterval(timer);
        const secs = t0 ? Math.round((Date.now() - t0) / 1000) : null;
        const out = root.querySelector("#fout"); out.hidden = false;
        // Local STAR check (always shown).
        const words = text.split(/\s+/).length;
        const iCount = (text.match(/\bI\b/g) || []).length, weCount = (text.match(/\bwe\b/gi) || []).length;
        const checks = [
          ["Sets up the situation", /\b(when|at|in my|during|our team|the company|was|were)\b/i.test(text.split(/[.!?]/)[0] || "")],
          ["Focuses on your own actions (more 'I' than 'we')", iCount >= weCount],
          ["Quantifies the result", /\d/.test(text)],
          ["Names what you learned", /\b(learn|learned|lesson|taught|realized|since then|now I)\b/i.test(text)],
          ["Right length (about 250 to 400 words spoken)", words >= 180 && words <= 450]
        ];
        const localScore = Math.round(checks.filter((c) => c[1]).length / checks.length * 100);
        out.innerHTML = `<h3>Story checklist</h3><div class="checklist">${checks.map((c) => `<label><span class="chip ${c[1] ? "good" : "bad"}">${c[1] ? "Yes" : "Missing"}</span>${esc(c[0])}</label>`).join("")}</div><p class="small muted">${words} words${secs ? `, ${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, "0")} long` : ""}.</p><div id="faifb"></div>`;
        let score = localScore, comm = null;
        if (Cap.sample) {
          const box = out.querySelector("#faifb"); box.className = "model"; box.textContent = "Getting interviewer feedback...";
          try {
            const r = await Cap.sample.json(`You are a McKinsey interviewer running a Personal Experience Interview (or a BCG/Bain fit interview). Question: "${F.q}". Category: ${F.type}. Candidate answer (transcribed from speech): """${text.slice(0, 6000)}"""
Evaluate it like a real interviewer. Reply with only JSON: {"score": 0-100, "communication": 0-100, "strengths": "one or two sentences", "improve": "the two most important fixes, specific", "followup": "the probing follow-up question you would ask next to go one level deeper"}`);
            score = clamp(Math.round(Number(r.score) || localScore), 0, 100); comm = clamp(Math.round(Number(r.communication) || 60), 0, 100);
            box.className = "stack";
            box.innerHTML = `<div class="row"><span class="bigscore" style="font-size:2.4rem">${score}</span><span class="muted small">Interviewer score</span></div><div class="keyidea"><b>Strengths.</b> <span id="s1"></span></div><div class="notice"><b>Improve.</b> <span id="s2"></span></div><div class="model"><b>Follow-up probe:</b> <span id="s3"></span></div><span class="small muted">Answer the follow-up out loud. Real PEI interviews go three or four levels deep on one story.</span>`;
            box.querySelector("#s1").textContent = r.strengths || ""; box.querySelector("#s2").textContent = r.improve || ""; box.querySelector("#s3").textContent = r.followup || "";
            if (r.followup) Speech.say(r.followup);
          } catch (e) { box.textContent = aiErrorText(e) + " The checklist above still applies."; }
        }
        S.fit.push({ id: F.id, date: today(), ts: Date.now(), score, comm }); save();
      });
    };
    current.rerenderOnCaps = false;
    draw();
  };

  /* ---------- Progress ---------- */
  VIEWS.progress = (root) => {
    const sk = skillScores();
    const plan = reviewPlan();
    const hist = S.cases.slice().reverse().slice(0, 12);
    root.innerHTML = `
      <div class="stack" style="gap:6px"><span class="eyebrow">Progress</span><h1>Where you stand</h1><p class="lede">Every case, simulation, quiz and drill feeds these scores. Industries you score poorly on come back sooner in your review plan.</p></div>
      <section class="grid-2" style="align-items:start">
        <div class="card stack"><h3>Skills</h3><div class="readiness">${skillBarsHTML()}</div>
          <p class="small muted">${(() => { const s = SKILLS.filter((x) => sk[x.key] != null).sort((a, b) => sk[a.key] - sk[b.key]); return s.length ? `Weakest: ${s[0].label} (${sk[s[0].key]}). Strongest: ${s[s.length - 1].label} (${sk[s[s.length - 1].key]}).` : "Complete a case or drill to see your weak spots."; })()}</p></div>
        <div class="card stack"><h3>Review plan</h3>
          <div>${plan.map((p) => `<div class="review-item"><span class="dot ${p.status}"></span><div><b>${esc(p.title)}</b><div class="small muted">${esc(p.why)}</div></div><button class="btn small" data-plan="${p.action}" data-id="${p.id}">Go</button></div>`).join("")}</div>
          <p class="small muted">Schedule: below 60 review tomorrow, 60 to 74 in 3 days, 75 to 84 in a week, 85+ in two weeks.</p></div>
      </section>
      <section class="card stack"><h3>Industries</h3><div class="table-wrap"><table><thead><tr><th>Industry</th><th>Recent avg</th><th>Cases</th><th>Simulations</th><th>Quiz</th><th>Next review</th></tr></thead><tbody>
        ${C.industries.map((i) => { const st = industryStatus(i.id); return `<tr><td style="font-family:var(--body)">${esc(i.name)}</td><td>${st.practiced ? st.avg : "--"}</td><td>${S.cases.filter((c) => c.industry === i.id).length}</td><td>${S.sims.filter((c) => c.industry === i.id).length}</td><td>${S.quizzes[i.id] ? S.quizzes[i.id].score : "--"}</td><td>${st.practiced ? esc(st.due) : "Now"}</td></tr>`; }).join("")}
      </tbody></table></div></section>
      <section class="card stack"><h3>Case history</h3>${hist.length ? `<div class="table-wrap"><table><thead><tr><th>Date</th><th>Case</th><th>Level</th><th>Str</th><th>Math</th><th>Ins</th><th>Syn</th><th>Comm</th><th>Overall</th></tr></thead><tbody>
        ${hist.map((h) => `<tr><td>${esc(h.date)}</td><td style="font-family:var(--body)">${esc((caseById(h.caseId) || {}).title || h.caseId)}</td><td style="font-family:var(--body)">${esc(DIFF[h.difficulty] ? DIFF[h.difficulty].label : h.difficulty)}</td><td>${h.scores.structure}</td><td>${h.scores.math}</td><td>${h.scores.insight}</td><td>${h.scores.synthesis}</td><td>${h.scores.communication}</td><td><b>${h.overall}</b></td></tr>`).join("")}
      </tbody></table></div>` : `<p class="muted">No cases yet. Your first scorecard will appear here.</p>`}</section>
      <div class="row"><button class="btn ghost small" id="reset">Reset all progress</button><span id="resetc" class="small" hidden>Are you sure? <button class="btn small" id="reset2">Yes, erase</button></span></div>`;
    on(root, "[data-plan]", "click", (e) => {
      const a = e.currentTarget.dataset.plan, id = e.currentTarget.dataset.id;
      if (a === "learn") go("learn", { industry: id }); else if (a === "case") go("case-setup", { industry: C.industries.some((i) => i.id === id) ? id : undefined }); else if (a === "sim") go("sim", { industry: C.industries[0].id }); else go(a);
    });
    root.querySelector("#reset").addEventListener("click", () => { root.querySelector("#resetc").hidden = false; });
    root.querySelector("#reset2").addEventListener("click", () => { S = blank(); save(); go("progress"); });
  };

  /* ---------------- boot ---------------- */
  render();
  initCaps();
})();
