/* ── NEUROPROFILE — app.js v5 ─────────────────────────────────────── */
const CATS=["autism","adhd","giftedness","overlap"];

/* Colors: muted gold, purple, teal, sage — matching buttons/dots/badges */
const COL={
  autism:  {m:"rgb(180,142,78)", d:"rgb(148,114,56)", g:"rgba(180,142,78,.10)", hex:"#B48E4E", hexD:"#947238"},
  adhd:   {m:"rgb(126,92,156)", d:"rgb(100,68,130)", g:"rgba(126,92,156,.10)", hex:"#7E5C9C", hexD:"#644482"},
  giftedness:{m:"rgb(68,140,140)", d:"rgb(44,112,112)", g:"rgba(68,140,140,.10)", hex:"#448C8C", hexD:"#2C7070"},
  overlap:{m:"rgb(108,132,100)",d:"rgb(82,106,74)", g:"rgba(108,132,100,.10)", hex:"#6C8464", hexD:"#526A4A"}
};

const Q={
  autism:["I need routine, order, and clear expectations, especially under stress.","I can hyperfocus on a few interests for a very long time.","I prefer direct communication — I don't like beating around the bush.","I recognize patterns where others don't see them.","I tend toward concrete thinking — abstract concepts without examples frustrate me.","I am sensory hyper- or hypo-sensitive (light, sound, touch, textures).","Repetitive movements, sounds, or behaviors soothe or stimulate me (stimming).","I have difficulty recognizing and naming my emotions (alexithymia).","Non-verbal communication (body language, tone) can be unreadable or exhausting for me.","I control impulses differently than most people."],
  adhd:["I have difficulty transitioning between tasks — switching focus is a challenge.","I seek novelty — I need constant stimulation.","I hyperfocus on what interests me but can't focus on the rest.","My working memory is unreliable — I forget what I was about to do.","I need movement or fidgeting to focus.","Physical or mental hyperactivity — my brain never stops.","I react quickly in crisis situations — that's when I'm in my element.","My social interactions are affected by impulsivity and focus difficulties.","I perceive time differently — either I can't feel it, or it flies.","My processing speed is non-standard (very fast OR very slow)."],
  giftedness:["I think in systems — I see how everything connects.","I have a strong need for logic and fairness — injustice hurts me.","I quickly understand complex concepts — 'skip thinking', I jump stages.","I'm fascinated by theory — I can spend hours exploring abstract ideas.","I need intellectual complexity — simple things bore me.","I connect knowledge from different domains in ways that surprise others.","Since childhood, I've been interested in existential questions — meaning of life, death, morality.","I have highly developed morality — ethics is personal to me.","I need connections with people through shared interest in complexity, not small talk.","I predict consequences and problems before others see them."],
  overlap:["I need time alone and in contemplation to function.","I am emotionally sensitive — I feel intensely.","I learn non-linearly — my learning path looks chaotic but works.","I get bored easily — I need constant intellectual stimulation.","I think in metaphors and symbols — it's my natural language.","My thinking is divergent/creative — I see non-standard solutions.","I have intense curiosity — I must know WHY.","I care about precision in expression — words must be exact.","My development is asynchronous — far ahead in some areas, 'behind' in others.","I developed emotional awareness early — I felt more than my peers."]
};

const CLAB={autism:"Part A — Autism",adhd:"Part B — ADHD",giftedness:"Part C — Giftedness",overlap:"Part D — Overlap"};
const CLAB_SHORT={autism:"Autism",adhd:"ADHD",giftedness:"Giftedness",overlap:"Overlap"};

const TN={
  autism:["Routine & order","Hyperfocus (few interests)","Direct communication","Pattern recognition","Concrete thinking","Sensory sensitivity","Stimming","Alexithymia","Non-verbal difficulty","Impulse control"],
  adhd:["Task-switching","Novelty seeking","Interest-based focus","Working memory","Need for movement","Hyperactivity","Crisis response","Social impulsivity","Time perception","Processing speed"],
  giftedness:["Systems thinking","Logic & fairness","Skip thinking","Theory fascination","Need for complexity","Cross-domain connections","Existential interests","Developed morality","Connection via complexity","Predicting consequences"],
  overlap:["Need for solitude","Emotional intensity","Non-linear learning","Boredom / stimulation need","Metaphorical thinking","Divergent thinking","Intense curiosity","Precision in expression","Async development","Early emotional awareness"]
};

let S={scr:"intro",ci:0,ans:{autism:{},adhd:{},giftedness:{},overlap:{}},name:"",dark:false};

const $=s=>document.querySelector(s);
function h(tag,cl,kids){const e=document.createElement(tag);if(cl)e.className=cl;(kids||[]).forEach(c=>{if(typeof c==="string")e.append(c);else if(c)e.append(c)});return e}
function hs(tag,a){const e=document.createElementNS("http://www.w3.org/2000/svg",tag);Object.entries(a||{}).forEach(([k,v])=>e.setAttribute(k,v));return e}

function scores(){const r={};CATS.forEach(c=>{const v=Object.values(S.ans[c]);r[c]=v.length?Math.round(v.reduce((a,b)=>a+b,0)/(v.length*10)*100):0});return r}
function nAns(c){return Object.keys(S.ans[c]).length}
function totAns(){return CATS.reduce((s,c)=>s+nAns(c),0)}

function diag(sc){
  const{autism:au,adhd:ad,giftedness:gi,overlap:ov}=sc;
  const top=CATS.reduce((a,b)=>sc[a]>=sc[b]?a:b);
  if(gi>=60&&ad>=60&&au>=60)return{t:"Triple-Exceptional (3e)",s:"Gifted + ADHD + Autistic",tp:"3e",dm:"giftedness",d:"Your brain operates across all three neurodivergent profiles at high intensity. Extremely rare, extraordinarily powerful — demands sophisticated external support."};
  if(gi>=60&&ad>=60)return{t:"Twice-Exceptional (2e)",s:"Gifted + ADHD",tp:"2e-ga",dm:"giftedness",d:"Primarily a gifted mind with strong ADHD. You predict brilliantly but working memory loses the thread. Not lack of discipline — a brain seeing 50 connections at once."};
  if(gi>=60&&au>=60)return{t:"Twice-Exceptional (2e)",s:"Gifted + Autistic",tp:"2e-gau",dm:"giftedness",d:"Exceptional giftedness with autistic depth. Pattern recognition, hyperfocus, and systematic thinking create a rare cognitive architecture."};
  if(ad>=60&&au>=60)return{t:"Dual Neurodivergent",s:"ADHD + Autistic",tp:"dual",dm:"adhd",d:"Novelty-seeking alongside routine needs, hyperfocus alongside switching difficulty. Understanding this duality lets you design systems that work with your brain."};
  if(gi>=60)return{t:"Gifted Profile",s:"Exceptional cognitive architecture",tp:"gifted",dm:"giftedness",d:"Systems thinking, cross-domain connections, and predicting consequences are your core. You need intellectual complexity to thrive."};
  if(ad>=60)return{t:"ADHD Profile",s:"High-energy divergent processor",tp:"adhd",dm:"adhd",d:"Your brain thrives on novelty and urgency. Interest-based attention — extraordinary when engaged, struggling when not."};
  if(au>=60)return{t:"Autistic Profile",s:"Deep pattern processor",tp:"autism",dm:"autism",d:"Pattern recognition, focused depth, systematic thinking. Direct communication and clarity preference are your hallmarks."};
  if(ov>=60)return{t:"High-Overlap Profile",s:"Convergent neurodivergent traits",tp:"overlap",dm:"overlap",d:"Emotional intensity, divergent thinking, curiosity, and non-linear learning define you."};
  const mod=CATS.filter(c=>sc[c]>=40);
  if(mod.length>=2)return{t:"Emerging Profile",s:"Distributed traits",tp:"emerging",dm:top,d:"Moderate traits across categories — may express situationally. A specialist could help map your unique pattern."};
  if(mod.length===1)return{t:"Mild "+mod[0].charAt(0).toUpperCase()+mod[0].slice(1)+" Traits",s:"Subtle expression",tp:"mild",dm:mod[0],d:"Moderate traits in one domain. Subtle or situational neurodivergent expression — present enough to notice, not dominant."};
  if(CATS.every(c=>sc[c]===0))return{t:"No Data",s:"Assessment incomplete",tp:"nodata",dm:"giftedness",d:"No answers recorded. Retake and rate each question 0–10."};
  if(CATS.every(c=>sc[c]<30))return{t:"Neurotypical Profile",s:"Conventional cognitive architecture",tp:"neurotypical",dm:top,d:"Low scores across all domains — a predominantly neurotypical style. Not a deficit."};
  return{t:"Low-Trait Profile",s:"Minimal neurodivergent expression",tp:"lowtrait",dm:top,d:"Low scores with slight presence in some areas."};
}

function tens(){const r=[];CATS.forEach(c=>Object.entries(S.ans[c]).forEach(([i,v])=>{if(v===10)r.push({tr:TN[c][+i],c})}));return r}

function strCha(sc){
  const St=[],Ch=[];const v=(c,i)=>S.ans[c]?.[i]??-1;
  if(sc.autism>=30){
    if(v("autism",3)>=8)St.push({t:"Pattern Recognition",d:"You see architecture where others see chaos. You build frameworks from fragments.",c:"autism"});
    if(v("autism",1)>=8)St.push({t:"Deep Hyperfocus",d:"When a topic captures you, you can work for hours in flow — extraordinary depth.",c:"autism"});
    if(v("autism",2)>=8)St.push({t:"Direct Communication",d:"No time wasted on ambiguity. You say what you mean and mean what you say.",c:"autism"});
    if(v("autism",8)>=7)Ch.push({t:"Non-verbal Processing",d:"Reading body language and social cues is exhausting and drains cognitive resources.",c:"autism"});
    if(v("autism",7)>=7)Ch.push({t:"Alexithymia",d:"Difficulty naming and identifying your own emotional states in real time.",c:"autism"});
    if(v("autism",5)>=7)Ch.push({t:"Sensory Overload",d:"Environmental stimuli — light, sound, texture — can overwhelm and shut down processing.",c:"autism"});
  }
  if(sc.adhd>=30){
    if(v("adhd",6)>=8)St.push({t:"Crisis Brilliance",d:"You come alive under pressure. Emergencies activate your sharpest cognition.",c:"adhd"});
    if(v("adhd",1)>=8)St.push({t:"Novelty Drive",d:"Constant innovation and idea generation. Your brain never stops creating.",c:"adhd"});
    if(v("adhd",2)>=8)St.push({t:"Interest Hyperfocus",d:"When passionate, you are unstoppable — producing at levels others can't match.",c:"adhd"});
    if(v("adhd",3)>=7)Ch.push({t:"Working Memory",d:"Steps lost between vision and execution. You see the whole system but lose the keys.",c:"adhd"});
    if(v("adhd",8)>=7)Ch.push({t:"Time Perception",d:"Deadlines and time estimates are distorted. Time either doesn't exist or flies.",c:"adhd"});
    if(v("adhd",0)>=7)Ch.push({t:"Task Switching",d:"Transitions between contexts drain massive energy. Shifting from relationships to work costs.",c:"adhd"});
  }
  if(sc.giftedness>=30){
    if(v("giftedness",0)>=8)St.push({t:"Systems Vision",d:"You create frameworks where others see separate elements. Natural architect.",c:"giftedness"});
    if(v("giftedness",9)>=8)St.push({t:"Predictive Thinking",d:"You foresee problems before they emerge. Others call it intuition — it's pattern processing.",c:"giftedness"});
    if(v("giftedness",5)>=8)St.push({t:"Cross-Pollination",d:"You merge psychology + business + spirituality + tech into unique products.",c:"giftedness"});
    if(v("giftedness",2)>=8)St.push({t:"Skip Thinking",d:"Rapid comprehension — you see solutions before others finish explaining the problem.",c:"giftedness"});
    if(v("giftedness",8)>=8)Ch.push({t:"Intellectual Isolation",d:"Few people match your depth. Connection through complexity is rare.",c:"giftedness"});
    if(v("giftedness",4)>=8)Ch.push({t:"Complexity Addiction",d:"Simple operational tasks paralyze with boredom. You need difficulty to engage.",c:"giftedness"});
  }
  if(sc.overlap>=30){
    if(v("overlap",1)>=8)St.push({t:"Emotional Depth",d:"You create content and connections at a level unreachable for others.",c:"overlap"});
    if(v("overlap",5)>=8)St.push({t:"Divergent Thinking",d:"You see non-standard solutions. Your creative brain finds what linear thinkers miss.",c:"overlap"});
    if(v("overlap",6)>=8)St.push({t:"Intense Curiosity",d:"You must know WHY. This drive powers relentless learning and discovery.",c:"overlap"});
    if(v("overlap",1)>=8)Ch.push({t:"Emotional Intensity",d:"Burnout is a real and constant threat. You process emotions at 10/10 while the world runs at 3/10.",c:"overlap"});
    if(v("overlap",3)>=7)Ch.push({t:"Stimulation Hunger",d:"Too many visions at once. 4 businesses × 5 projects × 10 books = system overload.",c:"overlap"});
  }
  if(!St.length&&!Ch.length){
    const avg=(sc.autism+sc.adhd+sc.giftedness+sc.overlap)/4;
    if(avg<30){
      St.push({t:"Adaptability",d:"You adjust to environments without friction.",c:"overlap"});
      St.push({t:"Steady Focus",d:"Attention is evenly distributed across tasks.",c:"adhd"});
      Ch.push({t:"Autopilot Risk",d:"Conventional processing can lead to coasting without growth.",c:"giftedness"});
    }
  }
  return{st:St,ch:Ch};
}

function formula(dg){
  const m={"3e":{f:"Systems × Patterns × Intensity ÷ (Memory + Sensory Load)",m:"You need an external operating system to manage what your brain can't hold alone."},"2e-ga":{f:"Systemic Vision × Patterns × Intensity ÷ Memory Chaos",m:"You need an external system that manages what your brain won't hold."},"2e-gau":{f:"Systems × Pattern Focus × Precision ÷ (Sensory + Social Energy)",m:"Controlled environments for deep processing."},dual:{f:"Focus × Routine × Crisis Speed ÷ (Switching + Sensory)",m:"Structured novelty within reliable frameworks."},gifted:{f:"Systems × Cross-Domain × Prediction ÷ (Isolation + Understimulation)",m:"Complexity-rich environments where your brain can operate at full capacity."},adhd:{f:"Novelty × Crisis × Interest ÷ (Time Blindness + Memory)",m:"External scaffolding to capture and sequence your insights."},autism:{f:"Patterns × Depth × Focus ÷ (Sensory + Communication Cost)",m:"Predictable, low-sensory, clear environments for optimal processing."},overlap:{f:"Emotion × Curiosity × Creativity ÷ (Overstimulation + Boredom)",m:"Creative autonomy with emotional space and recovery protocols."},neurotypical:{f:"Consistency × Adaptability × Fluency ÷ (Autopilot + Comfort Zone)",m:"Use intentional challenge to keep growing."},lowtrait:{f:"Stability × Flexibility ÷ Understimulation Risk",m:"Reliable baseline with room for exploration."},mild:{f:"Baseline × Trait Awareness ÷ Context Sensitivity",m:"Subtle traits emerge in specific contexts."},emerging:{f:"Distributed Traits × Context ÷ Clarity",m:"Mosaic profile — a specialist can map your unique pattern."},nodata:{f:"— —",m:"Complete assessment to generate."}};
  return m[dg.tp]||{f:"Traits × Context ÷ Fit",m:"Design your environment accordingly."};
}

function recs(sc,dg){
  const R=[];
  if(sc.overlap>=50||sc.giftedness>=50)R.push({t:"Protect Solitude",d:"With high scores on the need for contemplation and emotional intensity, solitude isn't luxury — it's infrastructure. Build it into your calendar like a business meeting. Minimum 1–2 hours daily without input from the external world."});
  if(sc.adhd>=50){R.push({t:"External Operational Brain",d:"With unreliable working memory, you need a system that remembers for you. Not another planner — a living system: an assistant, automation, or AI-driven workflow that tracks your projects and tells you each morning: 'Today you do THIS.'"});R.push({t:"Novelty Strategy",d:"Your brain needs stimulation to engage. Gamify routine tasks, rotate between projects, use body-doubling, create micro-deadlines. Harness the novelty drive rather than fighting it."});}
  if(sc.giftedness>=50){R.push({t:"Architect, Not Operator",d:"Your brain is built for designing systems, not running them operationally. The faster you delegate execution (even to AI), the faster your visions become reality instead of beautiful plans stuck in your head."});R.push({t:"Find Intellectual Peers",d:"Loneliness from cognitive mismatch is real. Seek connections through shared complexity, not small talk. Online communities, masterminds, or specialized groups where your depth is matched."});}
  if(sc.autism>=50){R.push({t:"Sensory Environment Audit",d:"Review your workspace: noise-canceling headphones, controlled lighting, comfortable textures. Small environmental changes yield massive cognitive gains."});R.push({t:"Leverage Routines",d:"Intentional structure frees your brain for what matters. Create reliable systems for the mundane so your processing power goes to what you do best."});}
  if(sc.overlap>=50)R.push({t:"Honor Your Learning Style",d:"Non-linear learning ≠ broken learning. Your brain builds webs and maps, not sequential chains. Design your learning paths to match — jump between topics, connect across domains, circle back."});
  if(dg.tp==="3e"||dg.tp.startsWith("2e"))R.push({t:"Complexity as Product",d:"Your need for complexity is not a flaw — it's your Unique Selling Proposition. Combining neuroscience + psychology + spirituality + business? That's exactly what your brain does naturally. Don't simplify your offering — find people who need complexity the way you do."});
  if(sc.overlap>=60||(sc.giftedness>=50&&sc.adhd>=50))R.push({t:"Burnout Protocol",d:"Build recovery before you need it. With emotional intensity at peak levels, monitor your emotional tank. Schedule decompression, contemplation, and creative rest as non-negotiable."});
  if(!R.length){
    R.push({t:"Leverage Consistency",d:"Your steady follow-through is rarer than you think. Set ambitious goals and trust your ability to see them through."});
    R.push({t:"Seek Deliberate Challenge",d:"Create growth edges outside your comfort zone. Your stable baseline is a foundation for expansion."});
  }
  return R;
}

function analysis(sc){
  const A=[];
  if(sc.giftedness>=50)A.push({t:"Systems Architect",d:"Your combination of systems thinking, pattern recognition, and cross-domain connection is an exceptionally rare profile. You see architecture where others see chaos. Your brain doesn't process information linearly — you build maps, networks, systems. This is why projects that combine multiple domains feel natural to you, even when they look impossible to others."});
  if(sc.adhd>=50&&sc.giftedness>=50)A.push({t:"The Gifted-ADHD Paradox",d:"This is the heart of your challenge: you predict consequences brilliantly, but working memory means you forget what you just planned. You see the entire system but lose the keys. Your time perception and need for stimulation explain the pull toward multiple businesses and projects simultaneously — your brain needs complexity, but the ADHD system makes sequential execution difficult. This is not a lack of discipline. This is a brain that sees 50 connections at once and tries to build them all simultaneously."});
  else if(sc.adhd>=50)A.push({t:"ADHD Engine",d:"Your attention runs on interest, not importance. When something captures you, your performance is extraordinary. When it doesn't, even simple tasks become impossible. Understanding this interest-based nervous system lets you design work around engagement rather than willpower."});
  if(sc.autism>=50&&sc.giftedness>=50)A.push({t:"Autistic Gold",d:"You don't have a full autistic profile — but you have the three traits that build empires: pattern recognition, hyperfocus, and directness in communication. These traits, separated from typical autistic challenges, give you an uncommon advantage: you see structures like someone on the spectrum, but communicate and read people like a neurotypical with high emotional intelligence."});
  else if(sc.autism>=50)A.push({t:"Deep Processor",d:"You analyze structure beneath surfaces. Pattern recognition and systematic thinking allow you to see what others miss. Your direct communication style is an asset — clarity and precision save time and build trust."});
  if(sc.overlap>=60)A.push({t:"Emotional Ocean",d:"Emotional intensity at maximum combined with early emotional awareness and the need for solitude — this is Dabrowski's overexcitability in its purest form. This explains years of spiritual practice, body psychotherapy training, and contemplative work. These aren't hobbies — they are your survival tools in a world that processes emotions at 3/10 while you process at 10/10."});
  if(sc.adhd>=50&&sc.autism>=50)A.push({t:"Dual Tension",d:"ADHD wants novelty while autistic traits want routine. This creates internal tension — the solution is structured variety. Create reliable frameworks that contain changing content. Same time, same place, different challenges each day."});
  if(!A.length)A.push({t:"Your Cognitive Landscape",d:"Your profile shows balanced expression across domains. The questions that resonated most strongly reveal your key patterns. Pay attention to where you scored highest — even moderate scores indicate real cognitive preferences that shape how you work, learn, and relate to others."});
  return A;
}

function scoreDesc(cat,val){
  if(val>=80)return{autism:"Deep autistic traits at full expression. Pattern recognition, hyperfocus, and systematic thinking at maximum intensity.",adhd:"Dominant ADHD profile — extraordinary power alongside significant chaos. Working memory, time perception, and processing speed all highly active.",giftedness:"Dominant cognitive profile. Systems thinking, cross-domain connection, and consequence prediction at maximum capacity.",overlap:"Near-perfect overlap score. Emotional intensity, divergent thinking, and deep curiosity define your processing."}[cat];
  if(val>=60)return{autism:"Clear autistic profile with prominent pattern recognition and systematic processing. Selective traits that serve as genuine superpowers.",adhd:"Pronounced ADHD expression. Working memory both power and chaos. Novelty-seeking and interest-based focus clearly present.",giftedness:"Strong giftedness profile. Systems thinking active at high levels. Need for complexity and cross-domain connections evident.",overlap:"Strong overlap traits. Emotional intensity, non-linear learning, and divergent thinking consistently expressed."}[cat];
  if(val>=40)return{autism:"Selective autistic traits — pattern recognition, hyperfocus, and directness emerge in specific contexts. Pure gold when leveraged.",adhd:"Moderate ADHD expression. Novelty-seeking and interest-based attention present but not dominant.",giftedness:"Significant giftedness markers. Systems thinking and abstraction active in your processing style.",overlap:"Notable overlap traits including emotional sensitivity and creative thinking."}[cat];
  return{autism:"Low autistic expression. Minimal trait presence in this domain.",adhd:"Low ADHD expression. Standard attention and processing patterns.",giftedness:"Low giftedness expression. Conventional processing style in this domain.",overlap:"Low overlap expression. Standard emotional and learning patterns."}[cat];
}

// ── RADAR SVG ──
function radar(sc){
  const sz=500,cx=sz/2,cy=sz/2,mr=sz*.30;
  // 8 axes: 2 sub-categories per domain, evenly spaced at 45deg
  const axes=[
    {k:"giftedness",sub:"Systems",a:-90,color:COL.giftedness},
    {k:"giftedness",sub:"Prediction",a:-45,color:COL.giftedness},
    {k:"overlap",sub:"Intensity",a:0,color:COL.overlap},
    {k:"overlap",sub:"Curiosity",a:45,color:COL.overlap},
    {k:"adhd",sub:"Novelty",a:90,color:COL.adhd},
    {k:"adhd",sub:"Speed",a:135,color:COL.adhd},
    {k:"autism",sub:"Patterns",a:180,color:COL.autism},
    {k:"autism",sub:"Focus",a:225,color:COL.autism},
  ];
  const xy=(deg,r)=>[cx+r*Math.cos(deg*Math.PI/180),cy+r*Math.sin(deg*Math.PI/180)];
  const svg=hs("svg",{viewBox:`0 0 ${sz} ${sz}`,class:"radar-svg"});

  // Grid rings (octagonal)
  [20,40,60,80,100].forEach(lv=>{
    const pts=axes.map(a=>xy(a.a,(lv/100)*mr));
    svg.append(hs("polygon",{points:pts.map(([x,y])=>`${x.toFixed(1)},${y.toFixed(1)}`).join(" "),class:lv===100?"r-grid-o":"r-grid"}));
  });

  // Dashed axis lines
  axes.forEach(a=>{
    const[ex,ey]=xy(a.a,mr);
    svg.append(hs("line",{x1:cx,y1:cy,x2:ex.toFixed(1),y2:ey.toFixed(1),class:"r-axis","stroke-dasharray":"3,3"}));
  });

  // Data shape — use domain score + variation for sub-axes
  const subScores=axes.map(a=>{
    const base=sc[a.k];
    // Create slight variation between the 2 sub-axes of each domain
    const idx=axes.filter(x=>x.k===a.k).indexOf(a);
    const v=(c,i)=>S.ans[a.k]?.[i]??5;
    let subVal;
    if(a.k==="giftedness"){subVal=idx===0?v("giftedness",0)*10:v("giftedness",9)*10;}
    else if(a.k==="adhd"){subVal=idx===0?v("adhd",1)*10:v("adhd",4)*10;}
    else if(a.k==="autism"){subVal=idx===0?v("autism",3)*10:v("autism",1)*10;}
    else{subVal=idx===0?v("overlap",1)*10:v("overlap",6)*10;}
    // Blend: 60% domain score + 40% sub-question score
    return Math.min(100,Math.max(0,Math.round(base*0.6+subVal*0.4)));
  });

  const dp=axes.map((a,i)=>xy(a.a,(subScores[i]/100)*mr));
  svg.append(hs("polygon",{points:dp.map(([x,y])=>`${x.toFixed(1)},${y.toFixed(1)}`).join(" "),class:"r-shape"}));

  // Data dots
  dp.forEach(([x,y],i)=>{
    svg.append(hs("circle",{cx:x.toFixed(1),cy:y.toFixed(1),r:"5",fill:axes[i].color.hex,class:"r-dot"}));
  });

  // Labels outside
  axes.forEach((a,i)=>{
    const[lx,ly]=xy(a.a,mr+48);
    // Label dot
    svg.append(hs("circle",{cx:lx.toFixed(1),cy:(ly-10).toFixed(1),r:"5",fill:a.color.hex,class:"r-label-dot"}));
    // Sub-category name
    const t1=hs("text",{x:lx.toFixed(1),y:(ly+4).toFixed(1),"text-anchor":"middle",class:"r-lbl",fill:a.color.hex});
    t1.textContent=a.sub.toUpperCase();svg.append(t1);
  });

  // Domain scores at the 4 cardinal positions (bigger, outside the sub-labels)
  [{k:"giftedness",a:-90},{k:"overlap",a:0},{k:"adhd",a:90},{k:"autism",a:180}].forEach(d=>{
    const[lx,ly]=xy(d.a,mr+72);
    const t=hs("text",{x:lx.toFixed(1),y:ly.toFixed(1),"text-anchor":"middle",class:"r-val",fill:COL[d.k].hexD});
    t.textContent=sc[d.k]+"%";svg.append(t);
  });

  return svg;
}

function toggleTheme(){
  S.dark=!S.dark;
  document.documentElement.setAttribute("data-theme",S.dark?"dark":"light");
  $(".theme-toggle").textContent=S.dark?"☀️":"🌙";
}

// ── PDF — clean professional layout ──
async function downloadPDF(){
  const status=$("#dl-status");
  if(status)status.textContent="Generating PDF...";
  try{
    if(!window.jspdf){
      await new Promise((res,rej)=>{
        const s=document.createElement("script");
        s.src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        s.onload=res;s.onerror=()=>rej(new Error("Could not load jsPDF"));
        document.head.appendChild(s);
      });
    }
    const sc=scores(),dg=diag(sc),tn=tens(),{st,ch}=strCha(sc),fm=formula(dg),rc=recs(sc,dg),an=analysis(sc);
    const dc=COL[dg.dm]||COL.giftedness;
    const{jsPDF}=window.jspdf;
    const pdf=new jsPDF({unit:"mm",format:"a4"});

    // Layout constants
    const W=210, H=297, ML=24, MR=24, MT=24, MB=20;
    const pw=W-ML-MR; // 162mm content width
    let y=0;

    // Colors
    const hex=c=>{if(c.startsWith("#"))return[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];const m=c.match(/\d+/g);return m?m.map(Number):[0,0,0]};
    const BG=[252,250,247], DK=[30,30,30], TX=[65,60,55], TX2=[115,110,100], TX3=[155,148,138], WHITE=[255,255,255];

    // Safe text — replace special chars
    function safe(t){return t.replace(/[≠]/g,"!=").replace(/[—]/g," - ").replace(/['']/g,"'").replace(/[""]/g,'"');}

    // Page background + header
    function pageBg(){pdf.setFillColor(...BG);pdf.rect(0,0,W,H,"F");}
    function phdr(){
      pdf.setFontSize(6);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX3);
      const htext=`NEUROPROFILE  ·  ${(S.name||"PROFILE").toUpperCase()}  ·  ${new Date().toLocaleDateString("en-US",{month:"long",year:"numeric"}).toUpperCase()}  ·  Not a clinical diagnosis`;
      pdf.text(htext,W/2,9,{align:"center"});
      pdf.setDrawColor(230,225,218);pdf.setLineWidth(0.3);pdf.line(ML,12,W-MR,12);
    }
    function newPage(){pdf.addPage();pageBg();y=MT;phdr();}
    function np(need){if(y+need>H-MB){newPage();}}
    pageBg();phdr();

    // Text helpers with proper width calc
    function txt(text,x,maxW,sz,style,col,lh){
      const t=safe(text);
      pdf.setFontSize(sz);pdf.setFont("helvetica",style);pdf.setTextColor(...col);
      const lines=pdf.splitTextToSize(t,maxW);
      for(let i=0;i<lines.length;i++){np(lh+1);pdf.text(lines[i],x,y);y+=lh;}
    }
    function label(text,col){
      pdf.setFontSize(7.5);pdf.setFont("helvetica","bold");pdf.setTextColor(...col);
      pdf.text(text.toUpperCase(),ML,y);y+=8;
    }
    function heading(text,sz){
      np(sz/2+4);pdf.setFontSize(sz);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
      pdf.text(safe(text),ML,y);y+=sz*0.45+3;
    }
    function gap(mm){y+=mm;}

    // ═══ PAGE 1: Title + Diagnosis + Scores ═══
    y=28;
    pdf.setFontSize(24);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
    pdf.text("NEUROPROFILE",W/2,y,{align:"center"});y+=8;
    pdf.setFontSize(10);pdf.setFont("helvetica","normal");pdf.setTextColor(...hex(dc.hex));
    pdf.text(safe((S.name||"Your")+" - Mind Map"),W/2,y,{align:"center"});y+=5;
    pdf.setFontSize(7.5);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX3);
    pdf.text("Analysis of Autism, ADHD, Giftedness and Overlap traits",W/2,y,{align:"center"});y+=14;

    // Diagnosis card
    const dcCol=hex(dc.hex);
    pdf.setFillColor(...dcCol);pdf.rect(ML,y,2,28,"F");
    const dx=ML+8;
    pdf.setFontSize(7.5);pdf.setFont("helvetica","bold");pdf.setTextColor(...dcCol);
    pdf.text("PROFILE DIAGNOSIS",dx,y+4);
    pdf.setFontSize(15);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
    pdf.text(safe(dg.t),dx,y+12);
    pdf.setFontSize(9);pdf.setFont("helvetica","bold");pdf.setTextColor(...dcCol);
    pdf.text(safe(dg.s),dx,y+18);
    y+=24;
    txt(dg.d,dx,pw-10,8.5,"normal",TX,4.2);gap(12);

    // Score bars with descriptions
    CATS.forEach(c=>{
      np(28);
      const col=hex(COL[c].hex);
      const colD=hex(COL[c].hexD);
      // Label + score on same line
      pdf.setFontSize(10);pdf.setFont("helvetica","bold");pdf.setTextColor(...col);
      pdf.text(c.toUpperCase(),ML,y);
      pdf.setFontSize(16);pdf.setFont("helvetica","bold");pdf.setTextColor(...col);
      pdf.text(sc[c]+" / 100",ML+pw,y,{align:"right"});
      y+=4;
      // Bar
      pdf.setFillColor(232,228,222);pdf.rect(ML,y,pw,3,"F");
      if(sc[c]>0){pdf.setFillColor(...col);pdf.rect(ML,y,pw*(sc[c]/100),3,"F");}
      y+=6;
      // Description
      const desc=scoreDesc(c,sc[c]);
      if(desc){
        pdf.setFontSize(8);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX2);
        const dLines=pdf.splitTextToSize(safe(desc),pw);
        dLines.forEach(l=>{pdf.text(l,ML,y);y+=3.8;});
      }
      y+=6;
    });

    // ═══ RADAR ═══
    np(80);y+=6;
    label("RADAR PROFILE",TX3);gap(2);
    const rcx=W/2, rcy=y+34, rr=32;
    // Grid
    [.2,.4,.6,.8,1].forEach(f=>{
      const r=rr*f;pdf.setDrawColor(218,214,208);pdf.setLineWidth(f===1?.35:.12);
      const p=[{x:rcx,y:rcy-r},{x:rcx+r,y:rcy},{x:rcx,y:rcy+r},{x:rcx-r,y:rcy}];
      for(let i=0;i<4;i++)pdf.line(p[i].x,p[i].y,p[(i+1)%4].x,p[(i+1)%4].y);
    });
    // Axes + shape
    const axes=[{k:"giftedness",dx:0,dy:-1},{k:"overlap",dx:1,dy:0},{k:"adhd",dx:0,dy:1},{k:"autism",dx:-1,dy:0}];
    const pts=axes.map(a=>({x:rcx+a.dx*rr*(sc[a.k]/100),y:rcy+a.dy*rr*(sc[a.k]/100)}));
    pdf.setFillColor(68,140,140);
    try{pdf.saveGraphicsState();pdf.setGState(new pdf.GState({opacity:0.12}));
      pdf.triangle(pts[0].x,pts[0].y,pts[1].x,pts[1].y,pts[2].x,pts[2].y,"F");
      pdf.triangle(pts[0].x,pts[0].y,pts[2].x,pts[2].y,pts[3].x,pts[3].y,"F");
      pdf.restoreGraphicsState();}catch(e){}
    pdf.setDrawColor(68,140,140);pdf.setLineWidth(.7);
    for(let i=0;i<4;i++)pdf.line(pts[i].x,pts[i].y,pts[(i+1)%4].x,pts[(i+1)%4].y);
    // Labels
    const lpos=[{x:rcx,y:rcy-rr-8,al:"center"},{x:rcx+rr+6,y:rcy+1,al:"left"},{x:rcx,y:rcy+rr+6,al:"center"},{x:rcx-rr-6,y:rcy+1,al:"right"}];
    axes.forEach((a,i)=>{
      const col=hex(COL[a.k].hex);
      pdf.setFillColor(...col);pdf.circle(pts[i].x,pts[i].y,2,"F");
      pdf.setFontSize(9);pdf.setFont("helvetica","bold");pdf.setTextColor(...col);
      pdf.text(a.k.charAt(0).toUpperCase()+a.k.slice(1),lpos[i].x,lpos[i].y,{align:lpos[i].al});
      pdf.setFontSize(12);pdf.setFont("helvetica","bold");pdf.setTextColor(...hex(COL[a.k].hexD));
      pdf.text(sc[a.k]+"%",lpos[i].x,lpos[i].y+5,{align:lpos[i].al});
    });
    y=rcy+rr+20;

    // Tens
    if(tn.length){
      gap(4);label("YOUR TENS",hex(dc.hex));
      pdf.setFontSize(7.5);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX3);
      pdf.text("Traits at maximum - 10/10",ML,y);y+=8;
      tn.forEach(t=>{
        np(8);const col=hex(COL[t.c].hex);
        pdf.setFillColor(...col);pdf.roundedRect(ML,y-4,9,5.5,1,1,"F");
        pdf.setFontSize(7.5);pdf.setFont("helvetica","bold");pdf.setTextColor(...WHITE);
        pdf.text("10",ML+4.5,y,{align:"center"});
        pdf.setFontSize(8.5);pdf.setFont("helvetica","normal");pdf.setTextColor(...DK);
        pdf.text(safe(t.tr),ML+13,y);
        pdf.setFontSize(6.5);pdf.setFont("helvetica","bold");pdf.setTextColor(...col);
        pdf.text(t.c.toUpperCase(),ML+pw,y,{align:"right"});
        y+=7;
      });
      gap(6);
    }

    // ═══ DEEP ANALYSIS ═══
    np(20);label("DEEP ANALYSIS",hex(dc.hex));gap(2);
    an.forEach(a=>{
      np(16);
      pdf.setFontSize(11);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
      pdf.text(safe(a.t),ML,y);y+=7;
      txt(a.d,ML,pw,8.5,"normal",TX,4.2);gap(8);
    });

    // ═══ SUPERPOWERS / KRYPTONITE ═══
    if(st.length||ch.length){
      np(24);
      const colW=(pw-8)/2;
      // Headers
      pdf.setFontSize(7.5);pdf.setFont("helvetica","bold");
      pdf.setTextColor(108,132,100);pdf.text("SUPERPOWERS",ML,y);
      pdf.setTextColor(126,92,156);pdf.text("KRYPTONITE",ML+colW+8,y);
      y+=3;
      pdf.setDrawColor(218,214,208);pdf.setLineWidth(0.3);pdf.line(ML,y,ML+pw,y);y+=6;
      const maxRows=Math.max(st.length,ch.length);
      for(let i=0;i<maxRows;i++){
        np(16);const baseY=y;let rowH=0;
        if(i<st.length){
          pdf.setFontSize(8.5);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
          pdf.text(safe(st[i].t),ML,baseY);
          pdf.setFontSize(7.5);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX);
          const sL=pdf.splitTextToSize(safe(st[i].d),colW-2);
          sL.forEach((l,li)=>pdf.text(l,ML,baseY+4+li*3.5));
          rowH=Math.max(rowH,4+sL.length*3.5);
        }
        if(i<ch.length){
          const cx=ML+colW+8;
          pdf.setFontSize(8.5);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
          pdf.text(safe(ch[i].t),cx,baseY);
          pdf.setFontSize(7.5);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX);
          const cL=pdf.splitTextToSize(safe(ch[i].d),colW-2);
          cL.forEach((l,li)=>pdf.text(l,cx,baseY+4+li*3.5));
          rowH=Math.max(rowH,4+cL.length*3.5);
        }
        y=baseY+rowH+4;
      }
      gap(6);
    }

    // ═══ FORMULA ═══
    np(22);label("YOUR FORMULA",hex(dc.hex));
    pdf.setFontSize(11);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
    const fLines=pdf.splitTextToSize(safe(fm.f),pw);
    fLines.forEach(l=>{np(6);pdf.text(l,ML,y);y+=5.5;});gap(3);
    pdf.setFontSize(8.5);pdf.setFont("helvetica","italic");pdf.setTextColor(...TX2);
    const mLines=pdf.splitTextToSize("= "+safe(fm.m),pw);
    mLines.forEach(l=>{np(5);pdf.text(l,ML,y);y+=4;});gap(10);

    // ═══ RECOMMENDATIONS ═══
    np(16);label("RECOMMENDATIONS",hex(dc.hex));gap(2);
    rc.forEach((r,i)=>{
      np(18);
      // Title
      pdf.setFontSize(10);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
      pdf.text(safe(r.t),ML,y);y+=6;
      // Body
      txt(r.d,ML,pw,8.5,"normal",TX,4.2);gap(7);
    });

    // Footer
    gap(8);np(8);
    pdf.setFontSize(6.5);pdf.setFont("helvetica","italic");pdf.setTextColor(...TX3);
    pdf.text("Not a clinical diagnosis  ·  NeuroProfile  ·  "+new Date().getFullYear(),W/2,y,{align:"center"});

    pdf.save(`NeuroProfile_${S.name||"Report"}_${new Date().toISOString().slice(0,10)}.pdf`);
    if(status)status.textContent="Done!";setTimeout(()=>{if(status)status.textContent=""},3000);
  }catch(e){console.error("PDF error:",e);if(status)status.textContent="Error: "+e.message;}
}

// ── RENDER: INTRO ──
function renderIntro(){
  const app=$("#app");app.innerHTML="";
  const w=h("div","wrap",[]);

  const hd=h("div","intro-header au au1",[]);
  hd.append(h("h1","intro-title",["NeuroProfile"]));
  hd.append(h("p","intro-sub",["Cognitive Architecture Screener"]));
  hd.append(h("p","intro-meta",["40 questions · 4 domains · scale 0–10"]));
  w.append(hd);

  const dg=h("div","domains au au2",[]);
  [{c:"autism",n:"Autism",d:"Pattern depth, structure, sensory"},
    {c:"adhd",n:"ADHD",d:"Energy, novelty, working memory"},
    {c:"giftedness",n:"Giftedness",d:"Systems, abstraction, synthesis"},
    {c:"overlap",n:"Overlap",d:"Shared intensity traits"}
  ].forEach(x=>{
    const dc=h("div","dom",[]);
    const dot=h("span","dom-dot",[]);dot.style.background=COL[x.c].m;
    dc.append(dot);
    const info=h("div","dom-info",[]);
    info.append(h("span","dom-name",[x.n]));
    info.append(h("span","dom-desc",[x.d]));
    dc.append(info);
    dg.append(dc);
  });
  w.append(dg);

  w.append(h("p","intro-warn au au3",["This is not a clinical diagnosis. A reflective profiling tool."]));

  const inp=document.createElement("input");inp.className="name-inp au au4";inp.type="text";inp.placeholder="Your name (optional)";inp.value=S.name;
  inp.addEventListener("input",e=>S.name=e.target.value);
  const ic=h("div","name-wrap",[]);ic.append(inp);w.append(ic);

  const bc=h("div","start-wrap au au5",[]);
  const btn=h("button","btn",["BEGIN ASSESSMENT"]);
  btn.addEventListener("click",()=>{S.scr="quiz";S.ci=0;render()});
  bc.append(btn);w.append(bc);

  w.append(h("p","disc au au5",["For self-reflection only. Does not replace clinical evaluation."]));
  app.append(h("div","screen intro",[w]));
}

// ── RENDER: QUIZ (10 questions per page) ──
let _quizCat=null; // track which category page is rendered

function updateQuizState(){
  const cat=CATS[S.ci],col=COL[cat],tot=totAns();
  // update progress
  const countEl=document.querySelector(".quiz-count");
  if(countEl)countEl.textContent=`${tot}/40`;
  const fillEl=document.querySelector(".prog-fill");
  if(fillEl){fillEl.style.width=`${(tot/40)*100}%`;}
  // update nav button state
  const allAnswered=nAns(cat)===10;
  const nextBtn=document.querySelector(".btn-next");
  if(nextBtn){
    nextBtn.style.background=allAnswered?(S.ci<3?COL[CATS[S.ci+1]].m:col.m):"var(--brd)";
    nextBtn.style.cursor=allAnswered?"pointer":"not-allowed";
    nextBtn.style.opacity=allAnswered?"1":"0.5";
  }
}

function renderQuiz(){
  const app=$("#app");
  const cat=CATS[S.ci],col=COL[cat],tot=totAns();
  const globalOffset=S.ci*10;

  // Full rebuild only when category changes or first render
  if(_quizCat===cat&&document.querySelector(".q-list")){
    // Just update button states for all questions
    Q[cat].forEach((qText,qi)=>{
      const cv=S.ans[cat]?.[qi];
      const item=document.querySelectorAll(".q-item")[qi];
      if(!item)return;
      const btns=item.querySelectorAll(".sc-btn");
      btns.forEach((b,v)=>{
        b.className="sc-btn"+(cv===v?" sel":"");
        if(cv===v){b.style.background=col.m;b.style.borderColor=col.m;b.style.color="#fff";}
        else{b.style.background="";b.style.borderColor="";b.style.color="";}
      });
    });
    updateQuizState();
    return;
  }

  _quizCat=cat;
  app.innerHTML="";
  const w=h("div","wrap",[]);

  const hdr=h("div","quiz-header",[]);
  const badge=h("span","quiz-badge",[CLAB[cat]]);badge.style.background=col.m;hdr.append(badge);
  hdr.append(h("span","quiz-count",[`${tot}/40`]));
  w.append(hdr);

  const bar=h("div","prog-bar",[]);
  const fill=h("div","prog-fill",[]);fill.style.width=`${(tot/40)*100}%`;fill.style.background=col.m;
  bar.append(fill);w.append(bar);

  const steps=h("div","cat-steps",[]);
  CATS.forEach((c,i)=>{
    const dot=h("div","cat-step"+(i===S.ci?" active":"")+(i<S.ci?" done":""),[]);
    const circle=h("span","cat-dot",[]);circle.style.background=i<=S.ci?COL[c].m:"var(--brd)";
    dot.append(circle);
    dot.append(h("span","cat-step-label",[CLAB_SHORT[c]]));
    steps.append(dot);
  });
  w.append(steps);

  const qlist=h("div","q-list",[]);
  Q[cat].forEach((qText,qi)=>{
    const cv=S.ans[cat]?.[qi];
    const qcard=h("div","q-item",[]);
    const qhdr=h("div","q-header",[]);
    qhdr.append(h("span","q-text",[qText]));
    qcard.append(qhdr);
    const btns=h("div","sc-btns",[]);
    for(let v=0;v<=10;v++){
      const b=document.createElement("button");
      b.className="sc-btn"+(cv===v?" sel":"");
      b.textContent=v;
      if(cv===v){b.style.background=col.m;b.style.borderColor=col.m;b.style.color="#fff";}
      b.addEventListener("mouseenter",()=>{if(S.ans[cat]?.[qi]!==v){b.style.background=col.g;b.style.borderColor=col.m}});
      b.addEventListener("mouseleave",()=>{if(S.ans[cat]?.[qi]!==v){b.style.background="";b.style.borderColor=""}});
      b.addEventListener("click",()=>{S.ans[cat][qi]=v;render()});
      btns.append(b);
    }
    qcard.append(btns);
    qlist.append(qcard);
  });
  w.append(qlist);

  w.append(h("div","scale-hint",["0 = not at all · 10 = maximum"]));

  const nav=h("div","quiz-nav",[]);
  if(S.ci>0){
    const back=h("button","btn-back",["← Previous section"]);
    back.addEventListener("click",()=>{S.ci--;_quizCat=null;render();window.scrollTo({top:0,behavior:"smooth"})});
    nav.append(back);
  }else{
    const back=h("button","btn-back",["← Back"]);
    back.addEventListener("click",()=>{S.scr="intro";_quizCat=null;render()});
    nav.append(back);
  }

  const allAnswered=nAns(cat)===10;
  if(S.ci<3){
    const next=h("button","btn-next",[`Next: ${CLAB_SHORT[CATS[S.ci+1]]} →`]);
    next.style.background=allAnswered?COL[CATS[S.ci+1]].m:"var(--brd)";
    next.style.cursor=allAnswered?"pointer":"not-allowed";
    next.style.opacity=allAnswered?"1":"0.5";
    next.addEventListener("click",()=>{if(nAns(cat)===10){S.ci++;_quizCat=null;render();window.scrollTo({top:0,behavior:"smooth"})}});
    nav.append(next);
  }else{
    const finish=h("button","btn-next",["See Results →"]);
    finish.style.background=allAnswered?col.m:"var(--brd)";
    finish.style.cursor=allAnswered?"pointer":"not-allowed";
    finish.style.opacity=allAnswered?"1":"0.5";
    finish.addEventListener("click",()=>{if(nAns(cat)===10){S.scr="report";_quizCat=null;render()}});
    nav.append(finish);
  }
  w.append(nav);

  app.append(h("div","screen quiz",[w]));
}

// ── RENDER: REPORT ──
function renderReport(){
  const app=$("#app");app.innerHTML="";
  const sc=scores(),dg=diag(sc),tn=tens(),{st,ch}=strCha(sc),fm=formula(dg),rc=recs(sc,dg),an=analysis(sc);
  const dc=COL[dg.dm]||COL.giftedness;
  const now=new Date().toLocaleDateString("en-US",{month:"long",year:"numeric"}).toUpperCase();
  const w=h("div","wrap",[]);w.id="report-content";

  w.append(h("div","rpt-bar",[`NEUROPROFILE · ${(S.name||"PROFILE").toUpperCase()} · ${now} · Not a clinical diagnosis`]));
  w.append(h("h1","rpt-title",["NEUROPROFILE"]));
  const sub=h("p","rpt-sub",[(S.name||"Your")+" — Mind Map"]);sub.style.color=dc.m;w.append(sub);
  w.append(h("p","rpt-meta",["Analysis of Autism, ADHD, Giftedness and Overlap traits"]));

  // Diagnosis
  const cd=h("div","card card-diag",[]);
  const cl2=h("div","card-lbl",[]);cl2.style.color=dc.m;cl2.textContent="PROFILE DIAGNOSIS";cd.append(cl2);
  cd.append(h("div","diag-t",[dg.t]));
  const ds=h("div","diag-s",[dg.s]);ds.style.color=dc.m;cd.append(ds);
  cd.append(h("div","diag-d",[dg.d]));
  w.append(cd);

  // Scores with descriptions
  const cs=h("div","card",[]);
  CATS.forEach(c=>{
    const desc=scoreDesc(c,sc[c]);
    const r=h("div","s-row",[]);
    r.innerHTML=`<div class="s-hdr"><div><span class="s-lbl" style="color:${COL[c].m}">${c.charAt(0).toUpperCase()+c.slice(1).toUpperCase()}</span><span class="s-ans">${nAns(c)}/10</span></div><span class="s-val" style="color:${COL[c].d}">${sc[c]}<span class="of"> / 100</span></span></div><div class="s-track"><div class="s-fill" style="width:${sc[c]}%;background:${COL[c].m}"></div></div><div class="s-desc">${desc||""}</div>`;
    cs.append(r);
  });
  w.append(cs);

  // Radar
  const cr=h("div","card card-radar",[]);
  cr.append(h("div","card-lbl",["RADAR PROFILE"]));
  cr.append(radar(sc));w.append(cr);

  // Tens
  if(tn.length){
    const ct=h("div","card",[]);
    const tl=h("div","card-lbl",["TENS — Maximum (10/10)"]);tl.style.color=dc.m;ct.append(tl);
    tn.forEach(t=>{const r=h("div","ten",[]);const b=h("span","ten-b",["10"]);b.style.background=COL[t.c].m;r.append(b);r.append(h("span","ten-t",[t.tr]));const tc=h("span","ten-c",[t.c.toUpperCase()]);tc.style.color=COL[t.c].m;r.append(tc);ct.append(r)});
    w.append(ct);
  }

  // Deep Analysis
  const ca=h("div","card",[]);
  const albl=h("div","card-lbl",["DEEP ANALYSIS"]);albl.style.color=dc.m;ca.append(albl);
  an.forEach(a=>{const s=h("div","an-sec",[]);s.append(h("div","an-t",[a.t]));s.append(h("div","an-d",[a.d]));ca.append(s)});
  w.append(ca);

  // Strengths / Challenges
  if(st.length||ch.length){
    const tbl=h("div","card sc-table",[]);

    // Desktop: 2-column grid with interleaved rows
    const desktop=h("div","sc-desktop",[]);
    const thead=h("div","sc-thead",[]);
    const thS=h("div","sc-th sc-th-str",["SUPERPOWERS"]);thS.style.color="var(--green)";
    const thC=h("div","sc-th sc-th-cha",["KRYPTONITE"]);thC.style.color="var(--pink)";
    thead.append(thS);thead.append(thC);desktop.append(thead);
    const maxRows=Math.max(st.length,ch.length);
    for(let i=0;i<maxRows;i++){
      const row=h("div","sc-trow",[]);
      const cellS=h("div","sc-td",[]);
      if(st[i]){cellS.append(h("div","sc-td-t",[st[i].t]));cellS.append(h("div","sc-td-d",[st[i].d]));}
      const cellC=h("div","sc-td",[]);
      if(ch[i]){cellC.append(h("div","sc-td-t",[ch[i].t]));cellC.append(h("div","sc-td-d",[ch[i].d]));}
      row.append(cellS);row.append(cellC);desktop.append(row);
    }
    tbl.append(desktop);

    // Mobile: two separate blocks
    const mobile=h("div","sc-mobile",[]);
    if(st.length){
      const sBlock=h("div","sc-mob-section",[]);
      const sLabel=h("div","sc-mob-label",["SUPERPOWERS"]);sLabel.style.color="var(--green)";sBlock.append(sLabel);
      st.forEach(s=>{const item=h("div","sc-mob-item",[]);item.append(h("div","sc-td-t",[s.t]));item.append(h("div","sc-td-d",[s.d]));sBlock.append(item);});
      mobile.append(sBlock);
    }
    if(ch.length){
      const cBlock=h("div","sc-mob-section",[]);
      const cLabel=h("div","sc-mob-label",["KRYPTONITE"]);cLabel.style.color="var(--pink)";cBlock.append(cLabel);
      ch.forEach(c=>{const item=h("div","sc-mob-item",[]);item.append(h("div","sc-td-t",[c.t]));item.append(h("div","sc-td-d",[c.d]));cBlock.append(item);});
      mobile.append(cBlock);
    }
    tbl.append(mobile);
    w.append(tbl);
  }

  // Formula
  const cf=h("div","card card-f",[]);
  const fl2=h("div","card-lbl",["YOUR FORMULA"]);fl2.style.color=dc.m;cf.append(fl2);
  cf.append(h("p","f-text",[fm.f]));cf.append(h("p","f-mean",["= "+fm.m]));w.append(cf);

  // Recommendations
  const crec=h("div","card",[]);
  const rl=h("div","card-lbl",["RECOMMENDATIONS"]);rl.style.color=dc.m;crec.append(rl);
  rc.forEach(r=>{const d=h("div","rec",[]);d.append(h("div","rec-t",[r.t]));d.append(h("div","rec-d",[r.d]));crec.append(d)});
  w.append(crec);

  // Footer
  const foot=h("div","rpt-foot",[]);
  const dlBtn=h("button","btn-dl",["↓ DOWNLOAD PDF"]);
  dlBtn.addEventListener("click",downloadPDF);foot.append(dlBtn);
  const retry=h("button","btn-ghost",["RETAKE"]);
  retry.addEventListener("click",()=>{S.scr="intro";S.ci=0;S.ans={autism:{},adhd:{},giftedness:{},overlap:{}};_quizCat=null;render()});
  foot.append(retry);
  const dlStatus=document.createElement("div");dlStatus.className="dl-status";dlStatus.id="dl-status";foot.append(dlStatus);
  foot.append(h("p","disc",["Not a clinical diagnosis · "+new Date().getFullYear()]));
  app.append(h("div","screen report",[w,foot]));
}

function render(){
  if(S.scr==="intro")renderIntro();else if(S.scr==="quiz")renderQuiz();else renderReport();
  if(S.scr!=="quiz")window.scrollTo({top:0,behavior:"smooth"});
}
document.addEventListener("DOMContentLoaded",render);