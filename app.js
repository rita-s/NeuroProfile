/* ── NEUROPROFILE — app.js ─────────────────────────────────────────── */

const CATS = ["autism", "adhd", "giftedness", "overlap"];

const CAT_COLORS = {
  autism:     { main: "#E67A24", dark: "#B85D10", glow: "rgba(230,122,36,0.15)" },
  adhd:       { main: "#D63384", dark: "#A71D6A", glow: "rgba(214,51,132,0.15)" },
  giftedness: { main: "#1B6EC2", dark: "#0F4F8C", glow: "rgba(27,110,194,0.15)" },
  overlap:    { main: "#2E8B57", dark: "#1D6B3F", glow: "rgba(46,139,87,0.15)" },
};

const QUESTIONS = {
  autism: [
    "I need routine, order, and clear expectations, especially under stress.",
    "I can hyperfocus on a few interests for a very long time.",
    "I prefer direct communication — I don't like beating around the bush.",
    "I recognize patterns where others don't see them.",
    "I tend toward concrete thinking — abstract concepts without examples frustrate me.",
    "I am sensory hyper- or hypo-sensitive (light, sound, touch, textures).",
    "Repetitive movements, sounds, or behaviors soothe or stimulate me (stimming).",
    "I have difficulty recognizing and naming my emotions (alexithymia).",
    "Non-verbal communication (body language, tone of voice) can be unreadable or exhausting for me.",
    "I control impulses differently than most people.",
  ],
  adhd: [
    "I have difficulty transitioning between tasks — switching focus is a challenge.",
    "I seek novelty — I need constant stimulation.",
    "I hyperfocus on what interests me but can't focus on the rest.",
    "My working memory is unreliable — I forget what I was about to do.",
    "I need movement or fidgeting to focus.",
    "Physical or mental hyperactivity — my brain never stops.",
    "I react quickly in crisis situations — that's when I'm in my element.",
    "My social interactions are affected by impulsivity and focus difficulties.",
    "I perceive time differently — either I can't feel it, or it flies.",
    "My processing speed is non-standard (very fast OR very slow).",
  ],
  giftedness: [
    "I think in systems — I see how everything connects.",
    "I have a strong need for logic and fairness — injustice hurts me.",
    "I quickly understand complex concepts — 'skip thinking', I jump stages.",
    "I'm fascinated by theory — I can spend hours exploring abstract ideas.",
    "I need intellectual complexity — simple things bore me.",
    "I connect knowledge from different domains in ways that surprise others.",
    "Since childhood, I've been interested in existential questions — meaning of life, death, morality.",
    "I have highly developed morality — ethics is personal to me.",
    "I need connections with people through shared interest in complexity, not small talk.",
    "I predict consequences and problems before others see them.",
  ],
  overlap: [
    "I need time alone and in contemplation to function.",
    "I am emotionally sensitive — I feel intensely.",
    "I learn non-linearly — my learning path looks chaotic but works.",
    "I get bored easily — I need constant intellectual stimulation.",
    "I think in metaphors and symbols — it's my natural language.",
    "My thinking is divergent/creative — I see non-standard solutions.",
    "I have intense curiosity — I must know WHY.",
    "I care about precision in expression — words must be exact.",
    "My development is asynchronous — far ahead in some areas, 'behind' in others.",
    "I developed emotional awareness early — I felt more than my peers.",
  ],
};

const CAT_LABELS = {
  autism: "PART A — Autistic Traits",
  adhd: "PART B — ADHD Traits",
  giftedness: "PART C — Giftedness Traits",
  overlap: "PART D — Overlap Traits",
};

const TRAIT_NAMES = {
  autism: ["Routine & order", "Hyperfocus (few interests)", "Direct communication", "Pattern recognition", "Concrete thinking", "Sensory sensitivity", "Stimming", "Alexithymia", "Non-verbal difficulty", "Impulse control differences"],
  adhd: ["Task-switching difficulty", "Novelty seeking", "Interest-based focus", "Working memory issues", "Need for movement", "Hyperactivity (mental/physical)", "Crisis response", "Social impulsivity", "Time perception", "Processing speed"],
  giftedness: ["Systems thinking", "Logic & fairness", "Skip thinking", "Theory fascination", "Need for complexity", "Cross-domain connections", "Existential interests", "Highly developed morality", "Connection through complexity", "Predicting consequences"],
  overlap: ["Need for solitude", "Emotional intensity", "Non-linear learning", "Easily bored / need stimulation", "Metaphorical thinking", "Divergent/creative thinking", "Intense curiosity (WHY)", "Precision in expression", "Asynchronous development", "Early emotional awareness"],
};

// ── STATE ─────────────────────────────────────────────────────────────
let state = {
  screen: "intro",   // intro | quiz | report
  catIdx: 0,
  qIdx: 0,
  answers: { autism: {}, adhd: {}, giftedness: {}, overlap: {} },
  userName: "",
  darkMode: false,
};

// ── SCORING (only answered questions) ─────────────────────────────────
function computeScores() {
  const s = {};
  CATS.forEach(c => {
    const vals = Object.values(state.answers[c]);
    s[c] = vals.length === 0 ? 0 : Math.round((vals.reduce((a, b) => a + b, 0) / (vals.length * 10)) * 100);
  });
  return s;
}

function answeredIn(cat) { return Object.keys(state.answers[cat]).length; }
function totalAnswered() { return CATS.reduce((s, c) => s + answeredIn(c), 0); }

// ── DIAGNOSIS ─────────────────────────────────────────────────────────
function getDiagnosis(sc) {
  const { autism: au, adhd: ad, giftedness: gi, overlap: ov } = sc;
  if (gi >= 60 && ad >= 60 && au >= 60) return { title: "Triple-Exceptional (3e)", sub: "Gifted + ADHD + Autistic — a rare convergence", type: "3e", dom: "giftedness", desc: "Your brain operates across all three neurodivergent profiles at high intensity. You see systems, feel deeply, think divergently, and process through multiple lenses simultaneously. Extremely rare and extraordinarily powerful — but demands sophisticated external support." };
  if (gi >= 60 && ad >= 60) return { title: "Twice-Exceptional (2e)", sub: "Gifted + ADHD", type: "2e-ga", dom: "giftedness", desc: "Primarily a gifted mind with a strong ADHD component. You predict consequences brilliantly but working memory may lose the thread. You see the entire system but sometimes misplace the keys. Not lack of discipline — a brain seeing 50 connections at once." };
  if (gi >= 60 && au >= 60) return { title: "Twice-Exceptional (2e)", sub: "Gifted + Autistic", type: "2e-gau", dom: "giftedness", desc: "Exceptional giftedness combined with autistic depth of processing. Pattern recognition, hyperfocus, and systematic thinking at this level create a rare cognitive architecture." };
  if (ad >= 60 && au >= 60) return { title: "Dual Neurodivergent", sub: "ADHD + Autistic traits", type: "dual-aa", dom: "adhd", desc: "Significant traits from both ADHD and autism — novelty-seeking alongside routine needs, hyperfocus alongside switching difficulty. Understanding this duality is key to designing systems that work with your brain." };
  if (gi >= 60) return { title: "Gifted Profile", sub: "Exceptional cognitive architecture", type: "gifted", dom: "giftedness", desc: "Systems thinking, cross-domain connections, and predicting consequences are your core strengths. You need intellectual complexity to thrive." };
  if (ad >= 60) return { title: "ADHD Profile", sub: "High-energy divergent processor", type: "adhd", dom: "adhd", desc: "Your brain thrives on novelty, intensity, and urgency. Interest-based attention means extraordinary focus when engaged, struggle when not. External systems and novelty-rich environments are your allies." };
  if (au >= 60) return { title: "Autistic Profile", sub: "Deep pattern processor", type: "autism", dom: "autism", desc: "Pattern recognition, focused depth, and systematic thinking are your hallmarks. Direct communication, sensory awareness, and clarity preference create extraordinary capability in the right environment." };
  if (ov >= 60) return { title: "High-Overlap Profile", sub: "Convergent neurodivergent traits", type: "overlap", dom: "overlap", desc: "Emotional intensity, divergent thinking, curiosity, and non-linear learning define you. Highly creative, deeply feeling, naturally drawn to complexity." };
  const mod = CATS.filter(c => sc[c] >= 40);
  if (mod.length >= 2) return { title: "Emerging Profile", sub: "Distributed traits", type: "emerging", dom: CATS.reduce((a, b) => sc[a] >= sc[b] ? a : b), desc: "Moderate traits across categories — they may express situationally or more subtly. A specialist assessment could help map your unique pattern." };
  return { title: "Exploring Your Profile", sub: "Your cognitive landscape", type: "exploring", dom: CATS.reduce((a, b) => sc[a] >= sc[b] ? a : b), desc: "More typical presentation, or traits that express in ways this tool may not fully capture. If questions resonated even at lower scores, that experience is valid." };
}

// ── TENS ───────────────────────────────────────────────────────────────
function getTens() {
  const tens = [];
  CATS.forEach(cat => {
    Object.entries(state.answers[cat]).forEach(([idx, val]) => {
      if (val === 10) tens.push({ trait: TRAIT_NAMES[cat][+idx], cat });
    });
  });
  return tens;
}

// ── STRENGTHS & CHALLENGES ────────────────────────────────────────────
function getStrengthsChallenges(sc) {
  const S = [], C = [];
  const v = (cat, i) => state.answers[cat]?.[i] ?? -1;

  if (sc.autism >= 30) {
    if (v("autism",3) >= 8) S.push({ t: "Pattern Recognition — You see architecture where others see chaos", c: "autism" });
    if (v("autism",1) >= 8) S.push({ t: "Deep Hyperfocus — Extraordinary depth when engaged", c: "autism" });
    if (v("autism",2) >= 8) S.push({ t: "Direct Communication — No time wasted on ambiguity", c: "autism" });
    if (v("autism",0) >= 8) S.push({ t: "Systematic Organization — You build reliable structures", c: "autism" });
    if (v("autism",8) >= 7) C.push({ t: "Non-verbal Processing — Reading body language is exhausting", c: "autism" });
    if (v("autism",7) >= 7) C.push({ t: "Alexithymia — Difficulty naming emotional states", c: "autism" });
    if (v("autism",5) >= 7) C.push({ t: "Sensory Load — Environmental stimuli can overwhelm", c: "autism" });
  }
  if (sc.adhd >= 30) {
    if (v("adhd",6) >= 8) S.push({ t: "Crisis Brilliance — You come alive under pressure", c: "adhd" });
    if (v("adhd",1) >= 8) S.push({ t: "Novelty Drive — Constant innovation and fresh perspectives", c: "adhd" });
    if (v("adhd",2) >= 8) S.push({ t: "Interest Hyperfocus — Unstoppable when passionate", c: "adhd" });
    if (v("adhd",3) >= 7) C.push({ t: "Working Memory — Steps lost between vision and execution", c: "adhd" });
    if (v("adhd",8) >= 7) C.push({ t: "Time Perception — Deadlines and estimates feel distorted", c: "adhd" });
    if (v("adhd",0) >= 7) C.push({ t: "Task Switching — Transitions drain significant energy", c: "adhd" });
  }
  if (sc.giftedness >= 30) {
    if (v("giftedness",0) >= 8) S.push({ t: "Systems Vision — Frameworks where others see fragments", c: "giftedness" });
    if (v("giftedness",9) >= 8) S.push({ t: "Predictive Thinking — You foresee problems before they emerge", c: "giftedness" });
    if (v("giftedness",5) >= 8) S.push({ t: "Cross-Pollination — Merging domains into unique syntheses", c: "giftedness" });
    if (v("giftedness",2) >= 8) S.push({ t: "Rapid Comprehension — Skip thinking lets you leap ahead", c: "giftedness" });
    if (v("giftedness",8) >= 8) C.push({ t: "Isolation — Few people match your depth of interest", c: "giftedness" });
    if (v("giftedness",4) >= 8) C.push({ t: "Complexity Addiction — Hard to engage with 'simple' necessities", c: "giftedness" });
  }
  if (sc.overlap >= 30) {
    if (v("overlap",1) >= 8) S.push({ t: "Emotional Depth — Connect and create at levels others can't reach", c: "overlap" });
    if (v("overlap",5) >= 8) S.push({ t: "Divergent Thinking — Solutions nobody else considers", c: "overlap" });
    if (v("overlap",6) >= 8) S.push({ t: "Intense Curiosity — Your drive to understand fuels everything", c: "overlap" });
    if (v("overlap",1) >= 8) C.push({ t: "Emotional Intensity — Burnout is a recurring threat", c: "overlap" });
    if (v("overlap",3) >= 7) C.push({ t: "Stimulation Hunger — Simple tasks induce boredom paralysis", c: "overlap" });
    if (v("overlap",8) >= 7) C.push({ t: "Asynchronous Development — Uneven strengths create frustration", c: "overlap" });
  }
  return { strengths: S, challenges: C };
}

// ── FORMULA ───────────────────────────────────────────────────────────
function getFormula(diag) {
  const map = {
    "3e":     { f: "Systems Vision × Patterns × Intensity ÷ (Memory Chaos + Sensory Load)", m: "You need an external operating system that manages what your extraordinary brain cannot hold alone." },
    "2e-ga":  { f: "Prediction × Creativity × Speed ÷ (Working Memory + Time Blindness)", m: "Systems that capture rapid insights before they evaporate. External memory and deadline scaffolding." },
    "2e-gau": { f: "Systems Depth × Pattern Focus × Precision ÷ (Sensory Load + Social Energy)", m: "Controlled environments let your deep processing thrive. Reduce noise, protect solitude." },
    "dual-aa":{ f: "Focus × Routine × Crisis Speed ÷ (Switching Cost + Sensory Input)", m: "Predictable variety — structured novelty within reliable frameworks." },
    gifted:   { f: "Systems Vision × Cross-Domain × Prediction ÷ (Isolation + Understimulation)", m: "Complexity-rich environments and peers who match your depth." },
    adhd:     { f: "Novelty × Crisis Speed × Interest Focus ÷ (Time Blindness + Memory Gaps)", m: "External scaffolding. Your brain runs on engagement, not discipline." },
    autism:   { f: "Pattern Recognition × Systematic Depth × Focus ÷ (Sensory Overload + Communication Cost)", m: "Environments designed for your processing style — predictable, low-sensory, clear." },
    overlap:  { f: "Emotional Depth × Curiosity × Creativity ÷ (Overstimulation + Boredom)", m: "Creative autonomy with emotional space. Protect energy, feed curiosity." },
  };
  return map[diag.type] || { f: "Your Traits × Your Context ÷ Environmental Fit", m: "Understand which traits are strengths and which need support, then design accordingly." };
}

// ── RECOMMENDATIONS ──────────────────────────────────────────────────
function getRecommendations(sc, diag) {
  const R = [];
  if (sc.overlap >= 50 || sc.giftedness >= 50) R.push({ t: "Protect Your Solitude", d: "Alone time is infrastructure, not luxury. Schedule it like a non-negotiable meeting. Minimum 1–2 hours daily without external input." });
  if (sc.adhd >= 50) {
    R.push({ t: "Build an External Brain", d: "Your working memory needs backup. Not another planner — a living system: AI workflow, assistant, or dashboard that tells you each morning exactly what to focus on." });
    R.push({ t: "Use Novelty Strategically", d: "Your brain runs on engagement, not willpower. Gamify boring tasks, rotate projects, use body-doubling, set micro-deadlines." });
  }
  if (sc.giftedness >= 50) {
    R.push({ t: "Design, Don't Execute", d: "Your brain is built for architecture — designing systems, seeing patterns, creating frameworks. Delegate operational execution wherever possible." });
    R.push({ t: "Seek Intellectual Peers", d: "Loneliness from intellectual mismatch is real. Find communities, mentors, or collaborators who energize rather than drain you." });
  }
  if (sc.autism >= 50) {
    R.push({ t: "Design Your Sensory Environment", d: "Audit your workspace for sensory triggers. Noise-canceling headphones, lighting control — small changes create massive productivity gains." });
    R.push({ t: "Leverage Your Routines", d: "Your need for structure is a superpower when intentionally designed. Predictability frees your brain to focus on what matters." });
  }
  if (sc.overlap >= 50) R.push({ t: "Honor Your Learning Style", d: "Non-linear learning is not broken learning. Your brain builds webs, not chains. Trust the process." });
  if (diag.type === "3e" || diag.type.startsWith("2e")) R.push({ t: "Complexity Is Your USP", d: "Your need for complexity is not a flaw — it's your Unique Selling Proposition. Find contexts that need what you naturally produce." });
  if (sc.overlap >= 60 || (sc.giftedness >= 50 && sc.adhd >= 50)) R.push({ t: "Burnout Prevention Protocol", d: "Build recovery into your schedule before you need it. Monitor your emotional tank, not just your task list." });
  if (R.length === 0) R.push({ t: "Explore Further", d: "Consider whether specific environments or support systems might help you work more comfortably with your cognitive style." });
  return R;
}

// ── DEEP ANALYSIS ────────────────────────────────────────────────────
function getDeepAnalysis(sc) {
  const A = [];
  if (sc.giftedness >= 50) A.push({ t: "The Systems Architect", d: "Your combination of systems thinking, pattern recognition, and cross-domain connections places you in a rare cognitive category. You see architecture where others see chaos. Your brain builds maps, networks, webs of meaning." });
  if (sc.adhd >= 50 && sc.giftedness >= 50) A.push({ t: "The Gifted-ADHD Paradox", d: "Brilliant prediction meets unreliable memory. You see the entire system, forecast consequences, design elegant solutions — then forget what you were doing. The gap between vision and execution isn't about discipline. It's about external systems." });
  else if (sc.adhd >= 50) A.push({ t: "The ADHD Engine", d: "Your attention runs on interest, not importance. When engaged, flow states produce extraordinary work. When disengaged, even simple tasks feel impossible. Design your life so engagement is the default." });
  if (sc.autism >= 50 && sc.giftedness >= 50) A.push({ t: "Autistic Gold in a Gifted Mind", d: "Pattern recognition that borders on prescience, hyperfocus producing mastery, directness cutting through noise — your autistic traits amplify giftedness into something rare and powerful." });
  else if (sc.autism >= 50) A.push({ t: "The Deep Processor", d: "Where others skim surfaces, you analyze structure beneath. This depth creates both your greatest capability and vulnerability — brilliance requiring the right environmental accommodation." });
  if (sc.overlap >= 60) A.push({ t: "The Emotional Ocean", d: "Emotional intensity paired with early awareness suggests Dabrowski's overexcitability at a high level. Contemplative practices and emotional literacy aren't optional — they're essential infrastructure." });
  if (sc.adhd >= 50 && sc.autism >= 50) A.push({ t: "The Dual Tension", d: "ADHD craves novelty while autistic traits crave routine. Resolution: structured variety — reliable frameworks containing fresh content. Same morning routine, different creative projects." });
  if (A.length === 0) A.push({ t: "Your Cognitive Landscape", d: "Balanced or subtle neurodivergent expression. Pay attention to which questions resonated most — those reveal key areas for self-understanding." });
  return A;
}

// ── RENDER HELPERS ────────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => document.querySelectorAll(sel);

function el(tag, attrs = {}, children = []) {
  const e = document.createElement(tag);
  Object.entries(attrs).forEach(([k, v]) => {
    if (k === "class") e.className = v;
    else if (k === "style" && typeof v === "object") Object.assign(e.style, v);
    else if (k.startsWith("on")) e.addEventListener(k.slice(2).toLowerCase(), v);
    else if (k === "html") e.innerHTML = v;
    else if (k === "text") e.textContent = v;
    else e.setAttribute(k, v);
  });
  children.forEach(c => {
    if (typeof c === "string") e.appendChild(document.createTextNode(c));
    else if (c) e.appendChild(c);
  });
  return e;
}

function svgEl(tag, attrs = {}) {
  const e = document.createElementNS("http://www.w3.org/2000/svg", tag);
  Object.entries(attrs).forEach(([k, v]) => e.setAttribute(k, v));
  return e;
}

// ── THEME ─────────────────────────────────────────────────────────────
function toggleTheme() {
  state.darkMode = !state.darkMode;
  document.documentElement.setAttribute("data-theme", state.darkMode ? "dark" : "light");
  const btn = $(".theme-toggle");
  if (btn) btn.textContent = state.darkMode ? "☀️" : "🌙";
}

// ── RADAR CHART (SVG) ─────────────────────────────────────────────────
function buildRadar(scores) {
  const size = 340, cx = size/2, cy = size/2, maxR = size * 0.33;
  const axes = [
    { key: "giftedness", angle: -90 },
    { key: "overlap", angle: 0 },
    { key: "adhd", angle: 90 },
    { key: "autism", angle: 180 },
  ];
  const toXY = (deg, r) => {
    const rad = deg * Math.PI / 180;
    return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)];
  };

  const svg = svgEl("svg", { viewBox: `0 0 ${size} ${size}`, class: "radar-svg" });

  // Grid
  [20,40,60,80,100].forEach(lv => {
    const pts = axes.map(a => toXY(a.angle, (lv/100)*maxR));
    const poly = svgEl("polygon", {
      points: pts.map(([x,y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" "),
      class: lv === 100 ? "radar-grid-accent" : "radar-grid",
      "stroke-width": lv === 100 ? "1.5" : "0.7",
    });
    svg.appendChild(poly);
  });

  // Axes
  axes.forEach(a => {
    const [ex, ey] = toXY(a.angle, maxR);
    svg.appendChild(svgEl("line", { x1: cx, y1: cy, x2: ex.toFixed(1), y2: ey.toFixed(1), class: "radar-axis" }));
  });

  // Data shape
  const dataPoints = axes.map(a => toXY(a.angle, (scores[a.key]/100)*maxR));
  const polygon = svgEl("polygon", {
    points: dataPoints.map(([x,y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" "),
    class: "radar-shape",
  });
  svg.appendChild(polygon);

  // Data dots
  dataPoints.forEach(([x,y], i) => {
    svg.appendChild(svgEl("circle", {
      cx: x.toFixed(1), cy: y.toFixed(1), r: "6",
      fill: CAT_COLORS[axes[i].key].main,
      class: "radar-point",
    }));
  });

  // Labels
  axes.forEach(a => {
    const [lx, ly] = toXY(a.angle, maxR + 34);
    const label = a.key.charAt(0).toUpperCase() + a.key.slice(1);
    const tLabel = svgEl("text", {
      x: lx.toFixed(1), y: (ly - 6).toFixed(1),
      "text-anchor": "middle", class: "radar-label",
      fill: CAT_COLORS[a.key].main,
    });
    tLabel.textContent = label;
    svg.appendChild(tLabel);

    const tVal = svgEl("text", {
      x: lx.toFixed(1), y: (ly + 11).toFixed(1),
      "text-anchor": "middle", class: "radar-value",
      fill: CAT_COLORS[a.key].dark,
    });
    tVal.textContent = scores[a.key] + "%";
    svg.appendChild(tVal);
  });

  return svg;
}

// ── SCREENS ──────────────────────────────────────────────────────────

function renderIntro() {
  const root = $("#app");
  root.innerHTML = "";

  const screen = el("div", { class: "screen intro-screen" }, [
    el("div", { class: "container" }, [
      // Badge
      el("div", { class: "intro-badge anim-fade-up" }, ["NEUROPROFILE"]),
      // Icon + Title
      el("div", { class: "intro-icon anim-fade-up stagger-1", text: "🧠" }),
      el("h1", { class: "intro-title anim-fade-up stagger-2", text: "NeuroProfile" }),
      el("p", { class: "intro-subtitle anim-fade-up stagger-3", text: "Cognitive Architecture Screener" }),
      el("p", { class: "intro-meta anim-fade-up stagger-4", text: "40 questions · 4 domains · scale 0–10" }),

      // Description box
      el("div", { class: "intro-desc-box anim-fade-up stagger-5" }, [
        el("p", { class: "intro-desc", text: "NeuroProfile is a self-report cognitive architecture screener designed to map traits across four domains:" }),

        // Domain grid
        el("div", { class: "domain-grid" }, [
          makeDomainChip("autism", "🟠", "Autism", "Pattern depth, structure, sensory profile"),
          makeDomainChip("adhd", "🔴", "ADHD", "Energy regulation, novelty drive, working memory"),
          makeDomainChip("giftedness", "⚫", "Giftedness", "Systems thinking, abstraction, synthesis"),
          makeDomainChip("overlap", "🟢", "Overlap", "Shared neurodivergent intensity traits"),
        ]),

        el("div", { class: "intro-warning" }, [
          el("span", { class: "warn-icon", text: "⚠️" }),
          el("span", { text: "This is NOT a clinical diagnosis. It is a reflective profiling tool." }),
        ]),

        el("div", { class: "divider" }),

        // What it does
        el("div", { class: "intro-section-title" }, [
          el("span", { class: "emoji", text: "✨" }),
          el("span", { text: "What It Does" }),
        ]),
        el("ul", { class: "feature-list" }, [
          featureItem("📊", "Maps 40 structured self-report items (0–10 scale)"),
          featureItem("🧭", "Calculates category intensity (0–100%)"),
          featureItem("🕸", "Generates radar visualization (SVG-based)"),
          featureItem("⚡", "Identifies potential strengths"),
          featureItem("💥", "Flags friction points and challenges"),
          featureItem("🧠", "Produces a rule-based profile summary"),
        ]),
        el("p", { class: "intro-desc", style: { marginTop: "8px", fontStyle: "italic", fontSize: "11px", color: "var(--text-muted)" }, text: "Built as a cognitive pattern mapper, not a medical instrument." }),

        el("div", { class: "divider" }),

        // Radar model
        el("div", { class: "intro-section-title" }, [
          el("span", { class: "emoji", text: "📈" }),
          el("span", { text: "Radar Model" }),
        ]),
        el("p", { class: "intro-desc", text: "The radar chart visualizes cognitive distribution across four axes: Giftedness (top), Overlap (right), ADHD (bottom), Autism (left)." }),

        el("div", { class: "divider" }),

        // Profile classification
        el("div", { class: "intro-section-title" }, [
          el("span", { class: "emoji", text: "🧩" }),
          el("span", { text: "Profile Classification" }),
        ]),
        el("p", { class: "intro-desc", text: "Profiles are threshold-driven and transparent. Possible outputs:" }),
        el("div", { class: "profile-tags" }, [
          profileTag("🧠 Triple-Exceptional (3e)"),
          profileTag("🧠 Twice-Exceptional (2e)"),
          profileTag("⚫ Gifted-Dominant"),
          profileTag("🔴 ADHD-Dominant"),
          profileTag("🟠 Autism-Dominant"),
          profileTag("🟢 High-Overlap"),
          profileTag("🌱 Emerging Profile"),
        ]),
        el("p", { class: "intro-desc", style: { fontSize: "11px", fontStyle: "italic", color: "var(--text-muted)" }, text: "Classification logic is deterministic and editable." }),

        el("div", { class: "divider" }),

        // Purpose
        el("div", { class: "intro-section-title" }, [
          el("span", { class: "emoji", text: "🚀" }),
          el("span", { text: "Purpose" }),
        ]),
        el("ul", { class: "feature-list" }, [
          featureItem("→", "Externalize cognitive structure"),
          featureItem("→", "Clarify leverage vs friction"),
          featureItem("→", "Support better system design"),
          featureItem("→", "Help builders architect around their brain"),
        ]),
        el("p", { class: "intro-desc", style: { marginTop: "8px" }, text: "Built for operators, founders, architects, researchers and systems thinkers." }),
      ]),

      // Category pills
      el("div", { class: "cat-pills anim-fade-up stagger-6" }, CATS.map(c =>
        el("span", { class: "cat-pill", style: { background: CAT_COLORS[c].main }, text: `${c === "overlap" ? "Overlap" : c.charAt(0).toUpperCase() + c.slice(1)} · 10Q` })
      )),

      // Name input
      (() => {
        const inp = el("input", { type: "text", class: "name-input anim-fade-up stagger-7", placeholder: "Your name (optional)", value: state.userName });
        inp.addEventListener("input", e => state.userName = e.target.value);
        return inp;
      })(),

      // Start button
      el("div", { class: "anim-fade-up stagger-8" }, [
        (() => {
          const btn = el("button", { class: "btn-primary", text: "BEGIN ASSESSMENT" });
          btn.addEventListener("click", () => { state.screen = "quiz"; state.catIdx = 0; state.qIdx = 0; render(); });
          return btn;
        })(),
      ]),

      el("p", { class: "disclaimer anim-fade stagger-8", text: "This tool is for self-reflection only. It does not replace clinical evaluation." }),
    ]),
  ]);
  root.appendChild(screen);
}

function makeDomainChip(cat, emoji, name, desc) {
  return el("div", { class: "domain-chip" }, [
    el("span", { class: "dot", style: { background: CAT_COLORS[cat].main } }),
    el("div", {}, [
      el("div", { style: { fontWeight: "600" }, text: `${emoji} ${name}` }),
      el("div", { class: "domain-chip-desc", text: desc }),
    ]),
  ]);
}

function featureItem(icon, text) {
  return el("li", {}, [
    el("span", { class: "icon", text: icon }),
    el("span", { text }),
  ]);
}

function profileTag(text) {
  return el("span", { class: "profile-tag", text });
}

// ── QUIZ ──────────────────────────────────────────────────────────────
function renderQuiz() {
  const root = $("#app");
  root.innerHTML = "";
  const cat = CATS[state.catIdx];
  const col = CAT_COLORS[cat];
  const q = QUESTIONS[cat][state.qIdx];
  const curVal = state.answers[cat]?.[state.qIdx];
  const total = totalAnswered();
  const globalQ = state.catIdx * 10 + state.qIdx + 1;

  const screen = el("div", { class: "screen quiz-screen" }, [
    el("div", { class: "container" }, [
      // Progress
      el("div", { class: "progress-row" }, [
        el("span", { class: "progress-badge", style: { background: col.main }, text: CAT_LABELS[cat] }),
        el("span", { class: "progress-count", text: `${total} / 40` }),
      ]),
      el("div", { class: "progress-bar" }, [
        el("div", { class: "progress-fill", style: { width: `${(total/40)*100}%`, background: col.main } }),
      ]),

      // Question card
      el("div", { class: "question-card anim-fade", id: "qcard" }, [
        el("div", { class: "q-number", style: { color: col.main }, text: `Q${globalQ} / 40` }),
        el("p", { class: "q-text", text: q }),
        el("div", { class: "scale-labels" }, [
          el("span", { text: "0 — not at all" }),
          el("span", { text: "10 — maximum" }),
        ]),
        el("div", { class: "scale-buttons" }, Array.from({ length: 11 }, (_, v) => {
          const btn = el("button", {
            class: `scale-btn${curVal === v ? " selected" : ""}`,
            text: String(v),
            style: curVal === v
              ? { background: col.main, borderColor: col.main, color: "#fff" }
              : {},
          });
          btn.addEventListener("mouseenter", () => {
            if (curVal !== v) { btn.style.background = col.glow; btn.style.borderColor = col.main; }
          });
          btn.addEventListener("mouseleave", () => {
            if (curVal !== v) { btn.style.background = ""; btn.style.borderColor = ""; }
          });
          btn.addEventListener("click", () => {
            state.answers[cat][state.qIdx] = v;
            const card = $("#qcard");
            if (card) card.classList.add("fading");
            setTimeout(() => {
              if (state.qIdx < 9) state.qIdx++;
              else if (state.catIdx < 3) { state.catIdx++; state.qIdx = 0; }
              else state.screen = "report";
              render();
            }, 180);
          });
          return btn;
        })),

        // Nav
        el("div", { class: "quiz-nav" }, [
          (() => {
            const btn = el("button", { class: "btn-back", text: "← Back" });
            if (state.catIdx === 0 && state.qIdx === 0) btn.disabled = true;
            btn.addEventListener("click", () => {
              if (state.qIdx > 0) state.qIdx--;
              else if (state.catIdx > 0) { state.catIdx--; state.qIdx = 9; }
              render();
            });
            return btn;
          })(),
          el("div", { class: "cat-dots" }, CATS.map((c, i) =>
            el("div", { class: "cat-dot", style: { background: i <= state.catIdx ? CAT_COLORS[c].main : "" } })
          )),
        ]),
      ]),
    ]),
  ]);
  root.appendChild(screen);
}

// ── REPORT ────────────────────────────────────────────────────────────
function renderReport() {
  const root = $("#app");
  root.innerHTML = "";

  const sc = computeScores();
  const diag = getDiagnosis(sc);
  const tens = getTens();
  const { strengths, challenges } = getStrengthsChallenges(sc);
  const formula = getFormula(diag);
  const recs = getRecommendations(sc, diag);
  const analysis = getDeepAnalysis(sc);
  const dCol = CAT_COLORS[diag.dom] || CAT_COLORS.giftedness;
  const now = new Date().toLocaleDateString("en-US", { month: "long", year: "numeric" }).toUpperCase();

  const children = [
    // Header bar
    el("div", { class: "report-header-bar anim-fade-up", text: `NEUROPROFILE · ${state.userName ? state.userName.toUpperCase() : "YOUR PROFILE"} · ${now} · NOT A CLINICAL DIAGNOSIS` }),
    el("h1", { class: "report-title anim-fade-up stagger-1", text: "NEURODIVERGENT PROFILE" }),
    el("p", { class: "report-subtitle anim-fade-up stagger-2", style: { color: dCol.main }, text: `${state.userName || "Your"} — Mind Map` }),

    // Diagnosis
    el("div", { class: "card card-diagnosis anim-fade-up stagger-3", style: { borderLeftColor: dCol.main } }, [
      el("div", { class: "card-label", style: { color: dCol.main }, text: "PROFILE DIAGNOSIS" }),
      el("h2", { class: "diagnosis-title", text: diag.title }),
      el("p", { class: "diagnosis-subtitle", style: { color: dCol.main }, text: diag.sub }),
      el("p", { class: "diagnosis-desc", text: diag.desc }),
    ]),

    // Scores
    el("div", { class: "card anim-fade-up stagger-4" }, CATS.map(c => {
      const wrapper = el("div", { class: "score-row" });
      wrapper.innerHTML = `
        <div class="score-header">
          <div><span class="score-label" style="color:${CAT_COLORS[c].main}">${c.charAt(0).toUpperCase()+c.slice(1)}</span><span class="score-answered">${answeredIn(c)}/10 answered</span></div>
          <span class="score-value" style="color:${CAT_COLORS[c].dark}">${sc[c]}<span class="of"> /100</span></span>
        </div>
        <div class="score-track"><div class="score-fill" style="width:${sc[c]}%;background:linear-gradient(90deg,${CAT_COLORS[c].main},${CAT_COLORS[c].dark})"></div></div>
      `;
      return wrapper;
    })),

    // Radar
    (() => {
      const card = el("div", { class: "card card-radar anim-fade-up stagger-5" }, [
        el("div", { class: "card-label", style: { color: "var(--text-muted)" }, text: "RADAR PROFILE" }),
      ]);
      card.appendChild(buildRadar(sc));
      return card;
    })(),
  ];

  // Tens
  if (tens.length > 0) {
    children.push(el("div", { class: "card anim-fade-up stagger-6" }, [
      el("div", { class: "card-label", style: { color: dCol.main }, text: "YOUR TENS — Traits at Maximum (10/10)" }),
      ...tens.map(t => el("div", { class: "ten-row" }, [
        el("span", { class: "ten-badge", style: { background: CAT_COLORS[t.cat].main }, text: "10" }),
        el("span", { class: "ten-trait", text: t.trait }),
        el("span", { class: "ten-cat", style: { color: CAT_COLORS[t.cat].main }, text: t.cat }),
      ])),
    ]));
  }

  // Strengths / Challenges
  if (strengths.length > 0 || challenges.length > 0) {
    const grid = el("div", { class: "sc-grid anim-fade-up stagger-7" });
    if (strengths.length > 0) {
      grid.appendChild(el("div", { class: "sc-card sc-card-strength" }, [
        el("div", { class: "card-label", style: { color: "var(--strength-accent)" }, text: "STRENGTHS" }),
        ...strengths.map(s => el("div", { class: "sc-item" }, [
          el("span", { class: "sc-icon", style: { color: CAT_COLORS[s.c].main }, text: "◆" }),
          el("span", { class: "sc-text", text: s.t }),
        ])),
      ]));
    }
    if (challenges.length > 0) {
      grid.appendChild(el("div", { class: "sc-card sc-card-challenge" }, [
        el("div", { class: "card-label", style: { color: "var(--challenge-accent)" }, text: "CHALLENGES" }),
        ...challenges.map(c => el("div", { class: "sc-item" }, [
          el("span", { class: "sc-icon", style: { color: CAT_COLORS[c.c].main }, text: "◇" }),
          el("span", { class: "sc-text", text: c.t }),
        ])),
      ]));
    }
    children.push(grid);
  }

  // Formula
  children.push(el("div", { class: "card card-formula anim-fade-up stagger-7" }, [
    el("div", { class: "card-label", style: { color: dCol.main }, text: "YOUR FORMULA" }),
    el("p", { class: "formula-text", text: formula.f }),
    el("p", { class: "formula-meaning", text: formula.m }),
  ]));

  // Deep Analysis
  children.push(el("div", { class: "card anim-fade-up stagger-8" }, [
    el("div", { class: "card-label", style: { color: "var(--text-muted)" }, text: "DEEP ANALYSIS — What This Means For You" }),
    ...analysis.map(a => el("div", { class: "analysis-section" }, [
      el("h3", { class: "analysis-title", text: a.t }),
      el("p", { class: "analysis-text", text: a.d }),
    ])),
  ]));

  // Recommendations
  children.push(el("div", { class: "card anim-fade-up stagger-8" }, [
    el("div", { class: "card-label", style: { color: dCol.main }, text: "RECOMMENDATIONS — Based on Your Profile" }),
    ...recs.map(r => el("div", { class: "rec-item", style: { borderLeftColor: dCol.main + "30" } }, [
      el("h3", { class: "rec-title", text: r.t }),
      el("p", { class: "rec-text", text: r.d }),
    ])),
  ]));

  // Retake
  children.push(el("div", { class: "report-footer anim-fade-up stagger-8" }, [
    (() => {
      const btn = el("button", { class: "btn-retake", style: { background: dCol.main, boxShadow: `0 4px 14px ${dCol.main}40` }, text: "RETAKE ASSESSMENT" });
      btn.addEventListener("click", () => {
        state.screen = "intro"; state.catIdx = 0; state.qIdx = 0;
        state.answers = { autism: {}, adhd: {}, giftedness: {}, overlap: {} };
        render();
      });
      return btn;
    })(),
    el("p", { class: "disclaimer", text: `This is not a clinical diagnosis · ${new Date().getFullYear()}` }),
  ]));

  const screen = el("div", { class: "screen report-screen" }, [
    el("div", { class: "container-wide" }, children),
  ]);
  root.appendChild(screen);
}

// ── RENDER DISPATCH ──────────────────────────────────────────────────
function render() {
  // Always ensure theme toggle exists
  if (!$(".theme-toggle")) {
    const btn = el("button", { class: "theme-toggle", text: state.darkMode ? "☀️" : "🌙" });
    btn.addEventListener("click", toggleTheme);
    document.body.appendChild(btn);
  }

  if (state.screen === "intro") renderIntro();
  else if (state.screen === "quiz") renderQuiz();
  else renderReport();

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ── BOOT ──────────────────────────────────────────────────────────────
document.addEventListener("DOMContentLoaded", render);
