/* ── NEUROPROFILE — app.js ─────────────────────────────────────────── */
const CATS=["autism","adhd","giftedness","overlap"];
const COL={autism:{m:"#E67A24",d:"#B85D10",g:"rgba(230,122,36,.12)"},adhd:{m:"#D63384",d:"#A71D6A",g:"rgba(214,51,132,.12)"},giftedness:{m:"#1B6EC2",d:"#0F4F8C",g:"rgba(27,110,194,.12)"},overlap:{m:"#2E8B57",d:"#1D6B3F",g:"rgba(46,139,87,.12)"}};
const Q={
  autism:["I need routine, order, and clear expectations, especially under stress.","I can hyperfocus on a few interests for a very long time.","I prefer direct communication — I don't like beating around the bush.","I recognize patterns where others don't see them.","I tend toward concrete thinking — abstract concepts without examples frustrate me.","I am sensory hyper- or hypo-sensitive (light, sound, touch, textures).","Repetitive movements, sounds, or behaviors soothe or stimulate me (stimming).","I have difficulty recognizing and naming my emotions (alexithymia).","Non-verbal communication (body language, tone) can be unreadable or exhausting for me.","I control impulses differently than most people."],
  adhd:["I have difficulty transitioning between tasks — switching focus is a challenge.","I seek novelty — I need constant stimulation.","I hyperfocus on what interests me but can't focus on the rest.","My working memory is unreliable — I forget what I was about to do.","I need movement or fidgeting to focus.","Physical or mental hyperactivity — my brain never stops.","I react quickly in crisis situations — that's when I'm in my element.","My social interactions are affected by impulsivity and focus difficulties.","I perceive time differently — either I can't feel it, or it flies.","My processing speed is non-standard (very fast OR very slow)."],
  giftedness:["I think in systems — I see how everything connects.","I have a strong need for logic and fairness — injustice hurts me.","I quickly understand complex concepts — 'skip thinking', I jump stages.","I'm fascinated by theory — I can spend hours exploring abstract ideas.","I need intellectual complexity — simple things bore me.","I connect knowledge from different domains in ways that surprise others.","Since childhood, I've been interested in existential questions — meaning of life, death, morality.","I have highly developed morality — ethics is personal to me.","I need connections with people through shared interest in complexity, not small talk.","I predict consequences and problems before others see them."],
  overlap:["I need time alone and in contemplation to function.","I am emotionally sensitive — I feel intensely.","I learn non-linearly — my learning path looks chaotic but works.","I get bored easily — I need constant intellectual stimulation.","I think in metaphors and symbols — it's my natural language.","My thinking is divergent/creative — I see non-standard solutions.","I have intense curiosity — I must know WHY.","I care about precision in expression — words must be exact.","My development is asynchronous — far ahead in some areas, 'behind' in others.","I developed emotional awareness early — I felt more than my peers."]
};
const CLAB={autism:"Part A — Autism",adhd:"Part B — ADHD",giftedness:"Part C — Giftedness",overlap:"Part D — Overlap"};
const TN={
  autism:["Routine & order","Hyperfocus (few interests)","Direct communication","Pattern recognition","Concrete thinking","Sensory sensitivity","Stimming","Alexithymia","Non-verbal difficulty","Impulse control"],
  adhd:["Task-switching","Novelty seeking","Interest-based focus","Working memory","Need for movement","Hyperactivity","Crisis response","Social impulsivity","Time perception","Processing speed"],
  giftedness:["Systems thinking","Logic & fairness","Skip thinking","Theory fascination","Need for complexity","Cross-domain connections","Existential interests","Developed morality","Connection via complexity","Predicting consequences"],
  overlap:["Need for solitude","Emotional intensity","Non-linear learning","Boredom / stimulation need","Metaphorical thinking","Divergent thinking","Intense curiosity","Precision in expression","Async development","Early emotional awareness"]
};

let S={scr:"intro",ci:0,qi:0,ans:{autism:{},adhd:{},giftedness:{},overlap:{}},name:"",dark:false};

// ── helpers ──
const $=s=>document.querySelector(s);
function h(tag,cl,kids){const e=document.createElement(tag);if(cl)e.className=cl;(kids||[]).forEach(c=>{if(typeof c==="string")e.append(c);else if(c)e.append(c)});return e}
function hs(tag,a){const e=document.createElementNS("http://www.w3.org/2000/svg",tag);Object.entries(a||{}).forEach(([k,v])=>e.setAttribute(k,v));return e}

// ── scoring ──
function scores(){const r={};CATS.forEach(c=>{const v=Object.values(S.ans[c]);r[c]=v.length?Math.round(v.reduce((a,b)=>a+b,0)/(v.length*10)*100):0});return r}
function nAns(c){return Object.keys(S.ans[c]).length}
function totAns(){return CATS.reduce((s,c)=>s+nAns(c),0)}

// ── diagnosis ──
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
  if(CATS.every(c=>sc[c]<30))return{t:"Neurotypical Profile",s:"Conventional cognitive architecture",tp:"neurotypical",dm:top,d:"Low scores across all domains — a predominantly neurotypical style. Not a deficit. Your brain processes information, regulates attention, and handles input in alignment with the majority. Strengths: adaptability, consistency, conventional processing."};
  return{t:"Low-Trait Profile",s:"Minimal neurodivergent expression",tp:"lowtrait",dm:top,d:"Low scores with slight presence in some areas. Could mean genuine neurotypicality, context-dependent traits, or expression this tool doesn't fully capture."};
}

// ── tens ──
function tens(){const r=[];CATS.forEach(c=>Object.entries(S.ans[c]).forEach(([i,v])=>{if(v===10)r.push({tr:TN[c][+i],c})}));return r}

// ── strengths & challenges ──
function strCha(sc){
  const St=[],Ch=[];const v=(c,i)=>S.ans[c]?.[i]??-1;
  if(sc.autism>=30){
    if(v("autism",3)>=8)St.push({x:"Pattern Recognition — architecture where others see chaos",c:"autism"});
    if(v("autism",1)>=8)St.push({x:"Deep Hyperfocus — extraordinary depth when engaged",c:"autism"});
    if(v("autism",2)>=8)St.push({x:"Direct Communication — no time wasted on ambiguity",c:"autism"});
    if(v("autism",8)>=7)Ch.push({x:"Non-verbal Processing — reading body language is exhausting",c:"autism"});
    if(v("autism",7)>=7)Ch.push({x:"Alexithymia — difficulty naming emotional states",c:"autism"});
    if(v("autism",5)>=7)Ch.push({x:"Sensory Load — environmental stimuli overwhelm",c:"autism"});
  }
  if(sc.adhd>=30){
    if(v("adhd",6)>=8)St.push({x:"Crisis Brilliance — you come alive under pressure",c:"adhd"});
    if(v("adhd",1)>=8)St.push({x:"Novelty Drive — constant innovation",c:"adhd"});
    if(v("adhd",2)>=8)St.push({x:"Interest Hyperfocus — unstoppable when passionate",c:"adhd"});
    if(v("adhd",3)>=7)Ch.push({x:"Working Memory — steps lost between vision and execution",c:"adhd"});
    if(v("adhd",8)>=7)Ch.push({x:"Time Perception — deadlines feel distorted",c:"adhd"});
    if(v("adhd",0)>=7)Ch.push({x:"Task Switching — transitions drain energy",c:"adhd"});
  }
  if(sc.giftedness>=30){
    if(v("giftedness",0)>=8)St.push({x:"Systems Vision — frameworks where others see fragments",c:"giftedness"});
    if(v("giftedness",9)>=8)St.push({x:"Predictive Thinking — foresee problems before they emerge",c:"giftedness"});
    if(v("giftedness",5)>=8)St.push({x:"Cross-Pollination — merging domains uniquely",c:"giftedness"});
    if(v("giftedness",2)>=8)St.push({x:"Rapid Comprehension — skip thinking",c:"giftedness"});
    if(v("giftedness",8)>=8)Ch.push({x:"Isolation — few match your depth",c:"giftedness"});
    if(v("giftedness",4)>=8)Ch.push({x:"Complexity Addiction — simple tasks are painful",c:"giftedness"});
  }
  if(sc.overlap>=30){
    if(v("overlap",1)>=8)St.push({x:"Emotional Depth — connect at levels others can't",c:"overlap"});
    if(v("overlap",5)>=8)St.push({x:"Divergent Thinking — solutions nobody considers",c:"overlap"});
    if(v("overlap",6)>=8)St.push({x:"Intense Curiosity — must know WHY",c:"overlap"});
    if(v("overlap",1)>=8)Ch.push({x:"Emotional Intensity — burnout threat",c:"overlap"});
    if(v("overlap",3)>=7)Ch.push({x:"Stimulation Hunger — boredom paralysis",c:"overlap"});
  }
  if(!St.length&&!Ch.length){
    const avg=(sc.autism+sc.adhd+sc.giftedness+sc.overlap)/4;
    if(avg<30){
      St.push({x:"Adaptability — adjust to environments without friction",c:"overlap"});
      St.push({x:"Steady Focus — attention is evenly distributed",c:"adhd"});
      St.push({x:"Social Fluency — non-verbal cues come naturally",c:"autism"});
      St.push({x:"Consistent Execution — follow through without scaffolding",c:"giftedness"});
      Ch.push({x:"Autopilot Risk — conventional processing can lead to coasting",c:"giftedness"});
      Ch.push({x:"Blind Spots — may underestimate neurodivergent processing",c:"overlap"});
    }
  }
  return{st:St,ch:Ch};
}

// ── formula ──
function formula(dg){
  const m={"3e":{f:"Systems × Patterns × Intensity ÷ (Memory + Sensory Load)",m:"External operating system needed for what your brain can't hold alone."},"2e-ga":{f:"Prediction × Creativity × Speed ÷ (Memory + Time Blindness)",m:"Capture insights before they evaporate. External memory + deadline scaffolding."},"2e-gau":{f:"Systems × Pattern Focus × Precision ÷ (Sensory + Social Energy)",m:"Controlled environments for deep processing. Reduce noise, protect solitude."},dual:{f:"Focus × Routine × Crisis Speed ÷ (Switching + Sensory)",m:"Structured novelty within reliable frameworks."},gifted:{f:"Systems × Cross-Domain × Prediction ÷ (Isolation + Understimulation)",m:"Complexity-rich environments. Intellectual challenge is fuel."},adhd:{f:"Novelty × Crisis × Interest ÷ (Time Blindness + Memory)",m:"External scaffolding. Your brain runs on engagement, not discipline."},autism:{f:"Patterns × Depth × Focus ÷ (Sensory + Communication Cost)",m:"Predictable, low-sensory, clear environments."},overlap:{f:"Emotion × Curiosity × Creativity ÷ (Overstimulation + Boredom)",m:"Creative autonomy with emotional space."},neurotypical:{f:"Consistency × Adaptability × Fluency ÷ (Autopilot + Comfort Zone)",m:"Your brain doesn't fight you. Use intentional challenge to keep growing."},lowtrait:{f:"Stability × Flexibility ÷ Understimulation Risk",m:"Reliable baseline. Invest in deliberate growth edges."},mild:{f:"Baseline × Trait Awareness ÷ Context Sensitivity",m:"Subtle traits emerge in specific contexts. Design for those."},emerging:{f:"Distributed Traits × Context ÷ Clarity",m:"Mosaic profile. Map which traits show up where."},nodata:{f:"— —",m:"Complete assessment to generate."}};
  return m[dg.tp]||{f:"Traits × Context ÷ Fit",m:"Design your environment accordingly."};
}

// ── recommendations ──
function recs(sc,dg){
  const R=[];
  if(sc.overlap>=50||sc.giftedness>=50)R.push({t:"Protect Solitude",d:"Alone time is infrastructure. 1–2 hours daily without input."});
  if(sc.adhd>=50){R.push({t:"External Brain",d:"Living system that tells you each morning what to focus on."});R.push({t:"Novelty Strategy",d:"Gamify, rotate, body-double, micro-deadline. Engagement > willpower."});}
  if(sc.giftedness>=50){R.push({t:"Design, Don't Execute",d:"Your value is the blueprint. Delegate operations."});R.push({t:"Intellectual Peers",d:"Loneliness from mismatch is real. Find matching depth."});}
  if(sc.autism>=50){R.push({t:"Sensory Environment",d:"Audit workspace. Noise-canceling, lighting, texture — small changes, massive gains."});R.push({t:"Leverage Routines",d:"Intentional structure frees your brain for what matters."});}
  if(sc.overlap>=50)R.push({t:"Honor Learning Style",d:"Non-linear ≠ broken. Your brain builds webs, not chains."});
  if(dg.tp==="3e"||dg.tp.startsWith("2e"))R.push({t:"Complexity = USP",d:"Don't simplify yourself. Find contexts that need your depth."});
  if(sc.overlap>=60||(sc.giftedness>=50&&sc.adhd>=50))R.push({t:"Burnout Protocol",d:"Recovery before you need it. Monitor emotional tank."});
  if(!R.length){
    if(dg.tp==="neurotypical"||dg.tp==="lowtrait"){
      R.push({t:"Leverage Consistency",d:"Your follow-through is rare. Set ambitious goals."});
      R.push({t:"Seek Challenge",d:"Deliberately create growth edges outside comfort zone."});
      R.push({t:"Neurodiversity Literacy",d:"Understand how others process differently."});
      R.push({t:"Watch Autopilot",d:"Is this the right path or just comfortable?"});
    }else if(dg.tp==="mild"){
      R.push({t:"Map Context Triggers",d:"Journal when you feel 'different' to understand your pattern."});
      R.push({t:"Don't Dismiss Subtle",d:"Mild traits are real. Small accommodations help."});
    }else R.push({t:"Explore Further",d:"Consider specialist assessment for deeper mapping."});
  }
  return R;
}

// ── deep analysis ──
function analysis(sc){
  const A=[];
  if(sc.giftedness>=50)A.push({t:"Systems Architect",d:"You see architecture where others see chaos. Maps, networks, webs of meaning."});
  if(sc.adhd>=50&&sc.giftedness>=50)A.push({t:"Gifted-ADHD Paradox",d:"Brilliant prediction meets unreliable memory. The gap isn't discipline — it's external systems."});
  else if(sc.adhd>=50)A.push({t:"ADHD Engine",d:"Attention runs on interest, not importance. Design life for default engagement."});
  if(sc.autism>=50&&sc.giftedness>=50)A.push({t:"Autistic Gold",d:"Pattern prescience + hyperfocus mastery + directness. Amplified giftedness."});
  else if(sc.autism>=50)A.push({t:"Deep Processor",d:"You analyze structure beneath surfaces. Brilliance needing the right environment."});
  if(sc.overlap>=60)A.push({t:"Emotional Ocean",d:"Dabrowski's overexcitability. Contemplative practice is essential infrastructure."});
  if(sc.adhd>=50&&sc.autism>=50)A.push({t:"Dual Tension",d:"ADHD wants novelty, autism wants routine. Solution: structured variety."});
  if(!A.length){
    const avg=(sc.autism+sc.adhd+sc.giftedness+sc.overlap)/4;
    if(avg<20){
      A.push({t:"Conventional Processor",d:"Your brain doesn't trade consistency for intensity. Energy goes to execution, not self-management."});
      A.push({t:"What Low Scores Mean",d:"Not 'no traits' — your style doesn't cluster around these patterns. Different architecture, not lesser."});
      A.push({t:"Consistency Advantage",d:"Predictable energy, stable memory, reliable social processing. Assets many neurodivergent people spend enormous energy simulating."});
    }else A.push({t:"Your Landscape",d:"Balanced expression. Which questions resonated most reveal your key patterns."});
  }
  return A;
}

// ── RADAR SVG ──
function radar(sc){
  const sz=320,cx=sz/2,cy=sz/2,mr=sz*.32;
  const ax=[{k:"giftedness",a:-90},{k:"overlap",a:0},{k:"adhd",a:90},{k:"autism",a:180}];
  const xy=(deg,r)=>[cx+r*Math.cos(deg*Math.PI/180),cy+r*Math.sin(deg*Math.PI/180)];
  const svg=hs("svg",{viewBox:`0 0 ${sz} ${sz}`,class:"radar-svg"});
  [20,40,60,80,100].forEach(lv=>{
    const pts=ax.map(a=>xy(a.a,(lv/100)*mr));
    svg.append(hs("polygon",{points:pts.map(([x,y])=>`${x.toFixed(1)},${y.toFixed(1)}`).join(" "),class:lv===100?"r-grid-o":"r-grid"}));
  });
  ax.forEach(a=>{const[ex,ey]=xy(a.a,mr);svg.append(hs("line",{x1:cx,y1:cy,x2:ex.toFixed(1),y2:ey.toFixed(1),class:"r-axis"}))});
  const dp=ax.map(a=>xy(a.a,(sc[a.k]/100)*mr));
  svg.append(hs("polygon",{points:dp.map(([x,y])=>`${x.toFixed(1)},${y.toFixed(1)}`).join(" "),class:"r-shape"}));
  dp.forEach(([x,y],i)=>svg.append(hs("circle",{cx:x.toFixed(1),cy:y.toFixed(1),r:"5",fill:COL[ax[i].k].m,class:"r-dot"})));
  ax.forEach(a=>{
    const[lx,ly]=xy(a.a,mr+32);const lb=a.k.charAt(0).toUpperCase()+a.k.slice(1);
    const t1=hs("text",{x:lx.toFixed(1),y:(ly-5).toFixed(1),"text-anchor":"middle",class:"r-lbl",fill:COL[a.k].m});t1.textContent=lb;svg.append(t1);
    const t2=hs("text",{x:lx.toFixed(1),y:(ly+10).toFixed(1),"text-anchor":"middle",class:"r-val",fill:COL[a.k].d});t2.textContent=sc[a.k]+"%";svg.append(t2);
  });
  return svg;
}

// ── THEME ──
function toggleTheme(){
  S.dark=!S.dark;
  document.documentElement.setAttribute("data-theme",S.dark?"dark":"light");
  $(".theme-toggle").textContent=S.dark?"☀️":"🌙";
}

// ── PDF DOWNLOAD ──
async function downloadPDF(){
  const status=$("#dl-status");
  if(status)status.textContent="Generating PDF…";
  try{
    const el=$("#report-content");
    // temporarily force light for PDF
    const wasDark=S.dark;
    if(wasDark){document.documentElement.setAttribute("data-theme","light");await new Promise(r=>setTimeout(r,100));}
    const canvas=await html2canvas(el,{scale:2,useCORS:true,backgroundColor:"#F6F3F0",logging:false});
    if(wasDark)document.documentElement.setAttribute("data-theme","dark");
    const{jsPDF}=window.jspdf;
    const imgW=canvas.width,imgH=canvas.height;
    const pdfW=210,pdfH=(imgH*pdfW)/imgW; // A4 width in mm
    const pdf=new jsPDF({orientation:pdfH>297?"p":"p",unit:"mm",format:[pdfW,Math.max(pdfH,297)]});
    pdf.addImage(canvas.toDataURL("image/png"),0,0,pdfW,pdfH);
    pdf.save(`NeuroProfile_${S.name||"Report"}_${new Date().toISOString().slice(0,10)}.pdf`);
    if(status)status.textContent="✓ Downloaded";
    setTimeout(()=>{if(status)status.textContent=""},3000);
  }catch(e){
    console.error(e);
    if(status)status.textContent="Error generating PDF";
  }
}

// ── RENDER: INTRO ──
function renderIntro(){
  const app=$("#app");app.innerHTML="";
  const w=h("div","wrap",[]);
  // top
  w.append(h("div","badge au",["NEUROPROFILE"]));
  const t=document.createElement("h1");t.className="au au1";t.textContent="NeuroProfile";w.append(t);
  const p1=h("p","sub au au2",["Cognitive Architecture Screener"]);w.append(p1);
  const p2=h("p","meta au au3",["40 questions · 4 domains · scale 0–10"]);w.append(p2);

  // info box
  const box=h("div","intro-box au au4",[]);
  box.append(h("p","",["Self-report screener mapping traits across four cognitive domains."]));

  // domains
  const dg=h("div","domains",[]);
  [{c:"autism",e:"🟠",n:"Autism",d:"Pattern depth, structure, sensory"},{c:"adhd",e:"🔴",n:"ADHD",d:"Energy, novelty, working memory"},{c:"giftedness",e:"⚫",n:"Giftedness",d:"Systems, abstraction, synthesis"},{c:"overlap",e:"🟢",n:"Overlap",d:"Shared intensity traits"}].forEach(x=>{
    const dc=h("div","dom",[]);
    const dot=h("span","dot",[]);dot.style.background=COL[x.c].m;dc.append(dot);
    const info=h("div","",[]); info.innerHTML=`${x.e} <b>${x.n}</b><small>${x.d}</small>`;dc.append(info);
    dg.append(dc);
  });
  box.append(dg);
  box.append(h("div","warn",[ h("span","",["⚠️"]), h("span","",["Not a clinical diagnosis. A reflective profiling tool."]) ]));
  box.append(h("div","hr",[]));

  // features
  box.append(h("div","sec-title",[h("span","",["✨"]),h("span","",["What It Does"])]));
  const fl=h("ul","feat",[]);
  ["📊 Maps 40 items (0–10)","🧭 Category intensity (0–100%)","🕸 Radar visualization","⚡ Identifies strengths","💥 Flags challenges","🧠 Rule-based profile summary","📄 Downloadable PDF report"].forEach(x=>{
    const li=document.createElement("li");li.textContent=x;fl.append(li);
  });
  box.append(fl);
  box.append(h("div","hr",[]));

  // profiles
  box.append(h("div","sec-title",[h("span","",["🧩"]),h("span","",["Possible Profiles"])]));
  const tg=h("div","tags",[]);
  ["3e Triple-Exceptional","2e Twice-Exceptional","Gifted","ADHD","Autistic","High-Overlap","Neurotypical","Emerging"].forEach(x=>{tg.append(h("span","tag",[x]))});
  box.append(tg);
  w.append(box);

  // pills
  const pls=h("div","pills au au5",[]);
  CATS.forEach(c=>{const p=h("span","pill",[c==="overlap"?"Overlap":c.charAt(0).toUpperCase()+c.slice(1)+" · 10Q"]);p.style.background=COL[c].m;pls.append(p)});
  w.append(pls);

  // name
  const inp=document.createElement("input");inp.className="name-inp au au5";inp.type="text";inp.placeholder="Your name (optional)";inp.value=S.name;
  inp.addEventListener("input",e=>S.name=e.target.value);
  const ic=h("div","",[]); ic.style.textAlign="center"; ic.append(inp); w.append(ic);

  // start
  const bc=h("div","au au6",[]);bc.style.textAlign="center";
  const btn=h("button","btn",["BEGIN ASSESSMENT"]);
  btn.addEventListener("click",()=>{S.scr="quiz";S.ci=0;S.qi=0;render()});
  bc.append(btn);w.append(bc);
  w.append(h("p","disc au au6",["For self-reflection only. Does not replace clinical evaluation."]));

  const screen=h("div","screen intro",[w]);
  app.append(screen);
}

// ── RENDER: QUIZ ──
function renderQuiz(){
  const app=$("#app");app.innerHTML="";
  const cat=CATS[S.ci],col=COL[cat],q=Q[cat][S.qi],cv=S.ans[cat]?.[S.qi],tot=totAns(),gq=S.ci*10+S.qi+1;
  const w=h("div","wrap",[]);

  // progress
  const pr=h("div","prog-row",[]);
  const badge=h("span","prog-badge",[CLAB[cat]]);badge.style.background=col.m;pr.append(badge);
  pr.append(h("span","prog-count",[`${tot}/40`]));w.append(pr);
  const bar=h("div","prog-bar",[]);
  const fill=h("div","prog-fill",[]);fill.style.width=`${(tot/40)*100}%`;fill.style.background=col.m;bar.append(fill);w.append(bar);

  // card
  const card=h("div","q-card",[]);card.id="qcard";
  const qn=h("div","q-num",[`Q${gq}/40`]);qn.style.color=col.m;card.append(qn);
  card.append(h("p","q-text",[q]));
  card.append(h("div","sc-labels",[h("span","",["0 — not at all"]),h("span","",["10 — maximum"])]));

  const btns=h("div","sc-btns",[]);
  for(let v=0;v<=10;v++){
    const b=document.createElement("button");b.className="sc-btn"+(cv===v?" sel":"");b.textContent=v;
    if(cv===v){b.style.background=col.m;b.style.borderColor=col.m;b.style.color="#fff";}
    b.addEventListener("mouseenter",()=>{if(cv!==v){b.style.background=col.g;b.style.borderColor=col.m}});
    b.addEventListener("mouseleave",()=>{if(cv!==v){b.style.background="";b.style.borderColor=""}});
    b.addEventListener("click",()=>{
      S.ans[cat][S.qi]=v;
      const c=$("#qcard");if(c)c.classList.add("fading");
      setTimeout(()=>{if(S.qi<9)S.qi++;else if(S.ci<3){S.ci++;S.qi=0}else S.scr="report";render()},160);
    });
    btns.append(b);
  }
  card.append(btns);

  // nav
  const nav=h("div","q-nav",[]);
  const back=h("button","btn-back",["← Back"]);
  if(S.ci===0&&S.qi===0)back.disabled=true;
  back.addEventListener("click",()=>{if(S.qi>0)S.qi--;else if(S.ci>0){S.ci--;S.qi=9}render()});
  nav.append(back);
  const dots=h("div","dots",[]);
  CATS.forEach((c,i)=>{const d=h("div","dot-i",[]);if(i<=S.ci)d.style.background=COL[c].m;dots.append(d)});
  nav.append(dots);
  card.append(nav);
  w.append(card);

  app.append(h("div","screen quiz",[w]));
}

// ── RENDER: REPORT ──
function renderReport(){
  const app=$("#app");app.innerHTML="";
  const sc=scores(),dg=diag(sc),tn=tens(),{st,ch}=strCha(sc),fm=formula(dg),rc=recs(sc,dg),an=analysis(sc);
  const dc=COL[dg.dm]||COL.giftedness;
  const now=new Date().toLocaleDateString("en-US",{month:"long",year:"numeric"}).toUpperCase();

  const w=h("div","wrap",[]);w.id="report-content";

  // header
  w.append(h("div","rpt-bar au",[`NEUROPROFILE · ${(S.name||"PROFILE").toUpperCase()} · ${now}`]));
  w.append(h("h1","rpt-title au au1",["NEUROPROFILE"]));
  const sub=h("p","rpt-sub au au2",[(S.name||"Your")+" — Mind Map"]);sub.style.color=dc.m;w.append(sub);

  // diagnosis
  const cd=h("div","card card-diag au au3",[]);cd.style.borderLeftColor=dc.m;
  const cl=h("div","card-lbl",["PROFILE DIAGNOSIS"]);cl.style.color=dc.m;cd.append(cl);
  cd.append(h("div","diag-t",[dg.t]));
  const ds=h("div","diag-s",[dg.s]);ds.style.color=dc.m;cd.append(ds);
  cd.append(h("div","diag-d",[dg.d]));
  w.append(cd);

  // scores
  const cs=h("div","card au au4",[]);
  CATS.forEach(c=>{
    const r=h("div","s-row",[]);
    r.innerHTML=`<div class="s-hdr"><div><span class="s-lbl" style="color:${COL[c].m}">${c.charAt(0).toUpperCase()+c.slice(1)}</span><span class="s-ans">${nAns(c)}/10</span></div><span class="s-val" style="color:${COL[c].d}">${sc[c]}<span class="of">/100</span></span></div><div class="s-track"><div class="s-fill" style="width:${sc[c]}%;background:linear-gradient(90deg,${COL[c].m},${COL[c].d})"></div></div>`;
    cs.append(r);
  });
  w.append(cs);

  // radar
  const cr=h("div","card card-radar au au5",[]);
  cr.append(h("div","card-lbl",["RADAR PROFILE"]));
  cr.append(radar(sc));w.append(cr);

  // tens
  if(tn.length){
    const ct=h("div","card au au5",[]);
    const tl=h("div","card-lbl",["TENS — Maximum (10/10)"]);tl.style.color=dc.m;ct.append(tl);
    tn.forEach(t=>{
      const r=h("div","ten",[]);
      const b=h("span","ten-b",["10"]);b.style.background=COL[t.c].m;r.append(b);
      r.append(h("span","ten-t",[t.tr]));
      const tc=h("span","ten-c",[t.c]);tc.style.color=COL[t.c].m;r.append(tc);
      ct.append(r);
    });
    w.append(ct);
  }

  // strengths / challenges
  if(st.length||ch.length){
    const g=h("div","sc-grid au au6",[]);
    if(st.length){
      const c=h("div","sc-card sc-str",[]);
      const l=h("div","card-lbl",["STRENGTHS"]);l.style.color="var(--green)";c.append(l);
      st.forEach(s=>{
        const i=h("div","sc-i",[]);
        const ic=h("span","sc-icon",["◆"]);ic.style.color=COL[s.c].m;i.append(ic);
        i.append(h("span","sc-tx",[s.x]));c.append(i);
      });
      g.append(c);
    }
    if(ch.length){
      const c=h("div","sc-card sc-cha",[]);
      const l=h("div","card-lbl",["CHALLENGES"]);l.style.color="var(--pink)";c.append(l);
      ch.forEach(s=>{
        const i=h("div","sc-i",[]);
        const ic=h("span","sc-icon",["◇"]);ic.style.color=COL[s.c].m;i.append(ic);
        i.append(h("span","sc-tx",[s.x]));c.append(i);
      });
      g.append(c);
    }
    w.append(g);
  }

  // formula
  const cf=h("div","card card-f au au6",[]);
  const fl=h("div","card-lbl",["YOUR FORMULA"]);fl.style.color=dc.m;cf.append(fl);
  cf.append(h("p","f-text",[fm.f]));cf.append(h("p","f-mean",[fm.m]));w.append(cf);

  // analysis
  const ca=h("div","card au au6",[]);
  ca.append(h("div","card-lbl",["DEEP ANALYSIS"]));
  an.forEach(a=>{const s=h("div","an-sec",[]);s.append(h("div","an-t",[a.t]));s.append(h("div","an-d",[a.d]));ca.append(s)});
  w.append(ca);

  // recommendations
  const crec=h("div","card au au6",[]);
  const rl=h("div","card-lbl",["RECOMMENDATIONS"]);rl.style.color=dc.m;crec.append(rl);
  rc.forEach(r=>{const d=h("div","rec",[]);d.style.borderLeftColor=dc.m+"30";d.append(h("div","rec-t",[r.t]));d.append(h("div","rec-d",[r.d]));crec.append(d)});
  w.append(crec);

  // footer (outside report-content so not captured in PDF)
  const foot=h("div","rpt-foot au au6",[]);

  const dlBtn=h("button","btn-dl",["↓ DOWNLOAD PDF"]);
  dlBtn.style.background=dc.m;dlBtn.style.boxShadow=`0 4px 14px ${dc.m}40`;
  dlBtn.addEventListener("click",downloadPDF);
  foot.append(dlBtn);

  const retry=h("button","btn-ghost",["RETAKE"]);
  retry.addEventListener("click",()=>{S.scr="intro";S.ci=0;S.qi=0;S.ans={autism:{},adhd:{},giftedness:{},overlap:{}};render()});
  foot.append(retry);

  foot.append(h("div","dl-status",[]));
  const dlStatus=document.createElement("div");dlStatus.className="dl-status";dlStatus.id="dl-status";foot.append(dlStatus);

  foot.append(h("p","disc",["Not a clinical diagnosis · "+new Date().getFullYear()]));

  const screen=h("div","screen report",[w,foot]);
  app.append(screen);
}

// ── DISPATCH ──
function render(){
  if(S.scr==="intro")renderIntro();else if(S.scr==="quiz")renderQuiz();else renderReport();
  window.scrollTo({top:0,behavior:"smooth"});
}

document.addEventListener("DOMContentLoaded",render);
