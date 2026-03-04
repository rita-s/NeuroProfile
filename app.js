/* ── NEUROPROFILE — app.js v23 ─────────────────────────────────────── */
console.log("NeuroProfile v23 loaded");
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
    const W=700,H=700;
    const CX=W/2,CY=350;
    const R=220;
    const sqH=R*1.08;
    const SL=CX-sqH,ST=CY-sqH,SW=sqH*2;
    const SR=SL+SW,SB=ST+SW;

    const isDark=S.dark;
    const DOT_COL="#B48E4E";
    const BLUE_S=isDark?"#5B8FD7":"#2B5EA7";
    const BLUE_F=isDark?"rgba(91,143,215,0.12)":"rgba(43,94,167,0.10)";
    const DARK=isDark?"#6A6D72":"#b0b4ba";
    const LIGHT=isDark?"#3A3D42":"#d0d3d8";
    const TXT=isDark?"#d0d0d4":"#000000";
    const GRN=isDark?"#5CB85C":"#3B8C3B";
    const BAR_BG="transparent";
    const BAR_BORDER=isDark?"#444":"#bbb";
    const BAR_TXT=isDark?"#aaa":"#555";

    const pol=(a,r)=>{const rd=((a-90)*Math.PI)/180;return[CX+r*Math.cos(rd),CY+r*Math.sin(rd)];};
    const octPath=r=>{const pts=[];for(let a=0;a<360;a+=45)pts.push(pol(a,r));return pts.map((p,i)=>`${i===0?"M":"L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ")+"Z";};
    const angles=[0,45,90,135,180,225,270,315];

    const v=(cat,i)=>S.ans[cat]?.[i]??5;
    const blend=(cat,qi)=>Math.min(10,Math.max(0,Math.round(sc[cat]*0.06+v(cat,qi)*0.4)));
    const radarScores=[
        blend("giftedness",0),blend("giftedness",9),
        blend("overlap",1),blend("overlap",6),
        blend("adhd",1),blend("adhd",4),
        blend("autism",3),blend("autism",1),
    ];
    const radarPts=radarScores.map((val,i)=>pol(angles[i],R*(val/10)));
    const radarPath=radarPts.map((p,i)=>`${i===0?"M":"L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ")+"Z";

    // Outer sub-labels
    const oD=50;
    const outer=[
        {label:"SYSTEMS",    cx:CX,       cy:ST-oD},
        {label:"PREDICTION", cx:SR+oD-4,  cy:ST-oD+16},
        {label:"INTENSITY",  cx:SR+oD,    cy:CY},
        {label:"CURIOSITY",  cx:SR+oD-4,  cy:SB+oD-16},
        {label:"NOVELTY",    cx:CX,       cy:SB+oD+4},
        {label:"SPEED",      cx:SL-oD+4,  cy:SB+oD-16},
        {label:"PATTERNS",   cx:SL-oD,    cy:CY},
        {label:"FOCUS",      cx:SL-oD+4,  cy:ST-oD+16},
    ];
    const labelPos=[
        {dy:-20,dx:0,anchor:"middle"},
        {dy:-18,dx:0,anchor:"middle"},
        {dy:0,dx:20,anchor:"start"},
        {dy:18,dx:0,anchor:"middle"},
        {dy:22,dx:0,anchor:"middle"},
        {dy:18,dx:0,anchor:"middle"},
        {dy:0,dx:-20,anchor:"end"},
        {dy:-18,dx:0,anchor:"middle"},
    ];

    const svg=hs("svg",{viewBox:`0 0 ${W} ${H}`,class:"radar-svg"});

    // Dashed lines from center to outer dots
    outer.forEach(d=>{
        svg.append(hs("line",{x1:CX,y1:CY,x2:d.cx,y2:d.cy,stroke:LIGHT,"stroke-width":"0.8","stroke-dasharray":"5 4"}));
    });

    // Square
    svg.append(hs("rect",{x:SL,y:ST,width:SW,height:SW,fill:"none",stroke:DARK,"stroke-width":"1.2"}));

    // 10 octagonal rings
    for(let lv=1;lv<=10;lv++){
        const dk=lv===5||lv===10;
        svg.append(hs("path",{d:octPath(R*(lv/10)),fill:"none",stroke:dk?DARK:LIGHT,"stroke-width":dk?"1":"0.5"}));
    }

    // Tick dots on axes
    angles.forEach(a=>{
        for(let lv=1;lv<=10;lv++){
            const[tx,ty]=pol(a,R*(lv/10));
            svg.append(hs("circle",{cx:tx.toFixed(1),cy:ty.toFixed(1),r:"1.5",fill:DARK}));
        }
    });

    // Data shape
    svg.append(hs("path",{d:radarPath,fill:BLUE_F,stroke:BLUE_S,"stroke-width":"2.5","stroke-linejoin":"round"}));

    // Domain labels inside — all same size, equal distance from edge (~82%)
    const dFS="13",dFW="700",dLS="4";
    const forceFill=`fill:${TXT} !important`;
    // GIFTEDNESS top
    const gt2=document.createElementNS("http://www.w3.org/2000/svg","text");
    gt2.setAttribute("x",CX);gt2.setAttribute("y",CY-R*0.82);
    gt2.setAttribute("text-anchor","middle");gt2.setAttribute("dominant-baseline","central");
    gt2.setAttribute("font-size",dFS);gt2.setAttribute("font-weight",dFW);gt2.setAttribute("letter-spacing",dLS);
    gt2.style.cssText=forceFill;gt2.textContent="GIFTEDNESS";svg.append(gt2);
    // ADHD bottom
    const ab2=document.createElementNS("http://www.w3.org/2000/svg","text");
    ab2.setAttribute("x",CX);ab2.setAttribute("y",CY+R*0.82);
    ab2.setAttribute("text-anchor","middle");ab2.setAttribute("dominant-baseline","central");
    ab2.setAttribute("font-size",dFS);ab2.setAttribute("font-weight",dFW);ab2.setAttribute("letter-spacing",dLS);
    ab2.style.cssText=forceFill;ab2.textContent="ADHD";svg.append(ab2);
    // OVERLAP right
    const ov2=document.createElementNS("http://www.w3.org/2000/svg","text");
    ov2.setAttribute("x",CX+R*0.82);ov2.setAttribute("y",CY);
    ov2.setAttribute("text-anchor","middle");ov2.setAttribute("dominant-baseline","central");
    ov2.setAttribute("font-size",dFS);ov2.setAttribute("font-weight",dFW);ov2.setAttribute("letter-spacing","4");
    ov2.setAttribute("writing-mode","vertical-rl");
    ov2.style.cssText=`${forceFill};text-orientation:mixed`;
    ov2.textContent="OVERLAP";svg.append(ov2);
    // AUTISM left
    const lx3=CX-R*0.82;
    const au2=document.createElementNS("http://www.w3.org/2000/svg","text");
    au2.setAttribute("x",lx3);au2.setAttribute("y",CY);
    au2.setAttribute("text-anchor","middle");au2.setAttribute("dominant-baseline","central");
    au2.setAttribute("font-size",dFS);au2.setAttribute("font-weight",dFW);au2.setAttribute("letter-spacing","4");
    au2.setAttribute("writing-mode","vertical-rl");au2.setAttribute("transform",`rotate(180,${lx3.toFixed(1)},${CY})`);
    au2.style.cssText=`${forceFill};text-orientation:mixed`;
    au2.textContent="AUTISM";svg.append(au2);

    // Gold dots + outer sub-labels
    outer.forEach((d,i)=>{
        const lp=labelPos[i];
        svg.append(hs("circle",{cx:d.cx,cy:d.cy,r:"9",fill:DOT_COL}));
        const t=document.createElementNS("http://www.w3.org/2000/svg","text");
        t.setAttribute("x",d.cx+lp.dx);t.setAttribute("y",d.cy+lp.dy);
        t.setAttribute("text-anchor",lp.anchor);t.setAttribute("dominant-baseline","central");
        t.setAttribute("font-size","12");t.setAttribute("font-weight","700");t.setAttribute("letter-spacing","1.2");
        t.style.cssText=forceFill;t.textContent=d.label;svg.append(t);
    });

    // Score bar — rendered as HTML below SVG, not inside SVG
    // (removed from SVG for better mobile scaling)

    return {svg, scores:sc, cats:[
            {k:"giftedness",l:"Giftedness:",cl:"rgb(68,140,140)"},
            {k:"adhd",l:"ADHD:",cl:"rgb(126,92,156)"},
            {k:"autism",l:"Autism:",cl:"rgb(180,142,78)"},
            {k:"overlap",l:"Overlap:",cl:"rgb(108,132,100)"},
        ]};
}

function toggleTheme(){
    S.dark=!S.dark;
    document.documentElement.setAttribute("data-theme",S.dark?"dark":"light");
    $(".theme-toggle").textContent=S.dark?"☀️":"🌙";
    render();
}

// ── PDF — NeuroProfile Report matching template ──
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

        const W=210,H=297,ML=24,MR=24,MT=28,MB=24;
        const pw=W-ML-MR;
        let y=0,pageNum=0;

        // Colors
        const hex=c=>{if(c.startsWith("#"))return[parseInt(c.slice(1,3),16),parseInt(c.slice(3,5),16),parseInt(c.slice(5,7),16)];const m=c.match(/\d+/g);return m?m.map(Number):[0,0,0]};
        const COVER_BG=[14,15,22];
        const WHITE=[255,255,255];
        const DK=[30,30,30];
        const TX=[55,55,55];
        const TX2=[100,100,100];
        const TX3=[140,140,140];
        const TEAL=hex(COL.giftedness.hex);
        const GOLD=hex(COL.autism.hex);
        const PURPLE=hex(COL.adhd.hex);
        const SAGE=hex(COL.overlap.hex);
        const BG_LIGHT=[255,255,255];
        const HEADER_BG=[235,240,248];
        const LINE_COL=[200,205,212];

        function safe(t){return t.replace(/[≠]/g,"!=").replace(/[—–]/g," - ").replace(/['']/g,"'").replace(/[""]/g,'"');}

        // ── Footer ──
        function footer(num){
            pdf.setDrawColor(...LINE_COL);pdf.setLineWidth(0.3);pdf.line(ML,H-16,W-MR,H-16);
            pdf.setFontSize(6);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX3);
            pdf.text("NeuroProfile ® | Copyright © 2026 Rita Anstey. All rights reserved.",ML,H-11);
            if(num>0){
                pdf.setFontSize(7);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
                pdf.text(String(num).padStart(2,"0"),W-MR,H-11,{align:"right"});
            }
        }

        // Section header bar (teal left border + grey bg)
        function sectionHeader(text){
            pdf.setFillColor(...HEADER_BG);pdf.rect(ML,y,pw,14,"F");
            pdf.setFillColor(...TEAL);pdf.rect(ML,y,3,14,"F");
            pdf.setFontSize(11);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
            pdf.text(text,ML+10,y+9);
            y+=20;
        }

        function newPage(){pdf.addPage();pageNum++;y=MT;pdf.setFillColor(...BG_LIGHT);pdf.rect(0,0,W,H,"F");}
        function np(need){if(y+need>H-MB){newPage();}}

        function txt(text,x,maxW,sz,style,col,lh){
            const t=safe(text);
            pdf.setFontSize(sz);pdf.setFont("helvetica",style);pdf.setTextColor(...col);
            const lines=pdf.splitTextToSize(t,maxW);
            for(let i=0;i<lines.length;i++){np(lh+1);pdf.text(lines[i],x,y);y+=lh;}
        }
        function gap(mm){y+=mm;}

        // ════════════════════════════════════════
        // PAGE 1: COVER (dark background)
        // ════════════════════════════════════════
        pageNum=1;
        pdf.setFillColor(...COVER_BG);pdf.rect(0,0,W,H,"F");

        // NEUROPROFILE header
        y=55;
        pdf.setFontSize(11);pdf.setFont("helvetica","bold");pdf.setTextColor(...TEAL);
        pdf.text("NEUROPROFILE",W/2,y,{align:"center",charSpace:2});y+=50;

        // Main title
        pdf.setFontSize(38);pdf.setFont("helvetica","bold");pdf.setTextColor(...WHITE);
        pdf.text("Neurodiversity",W/2,y,{align:"center"});y+=18;
        pdf.text("Profile Report",W/2,y,{align:"center"});y+=30;

        // 4 colored dots
        const dotColors=[GOLD,TEAL,PURPLE,SAGE];
        const dotX=W/2-45;
        dotColors.forEach((c,i)=>{
            pdf.setFillColor(...c);pdf.circle(dotX+i*30,y,7,"F");
        });
        y+=50;

        // Date
        const dateStr=new Date().toLocaleDateString("en-GB",{month:"long",year:"numeric"});
        pdf.setFontSize(14);pdf.setFont("helvetica","bold");pdf.setTextColor(...WHITE);
        pdf.text(dateStr,W/2,y,{align:"center"});y+=12;

        // Subtitle
        pdf.setFontSize(10);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX3);
        pdf.text("Giftedness · Overlap · ADHD · Autism",W/2,y,{align:"center"});y+=8;
        pdf.text("Assessment System for Neurodivergent Profiles",W/2,y,{align:"center"});

        footer(0);

        // ════════════════════════════════════════
        // PAGE 2: CONTENTS
        // ════════════════════════════════════════
        newPage();
        sectionHeader("CONTENTS");
        gap(6);

        const tocItems=[
            {n:"01",t:"Profile Diagnosis",d:"Your neurodiversity map at a glance"},
            {n:"02",t:"The Four Domains",d:"Scores visualised — cards, radar & bars"},
            {n:"03",t:"Your Tens",d:"Top traits scored at maximum intensity"},
            {n:"04",t:"Superpowers & Kryptonite",d:"Your formula: strengths and challenges"},
            {n:"05",t:"Deep Dive",d:"What this combination means for you"},
            {n:"06",t:"Recommendations",d:"What to do with this profile"},
        ];
        tocItems.forEach(item=>{
            pdf.setFontSize(22);pdf.setFont("helvetica","bold");pdf.setTextColor(...TEAL);
            pdf.text(item.n,ML+4,y+2);
            pdf.setFontSize(13);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
            pdf.text(item.t,ML+30,y-2);
            pdf.setFontSize(9);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX2);
            pdf.text(item.d,ML+30,y+5);
            y+=8;
            pdf.setDrawColor(...LINE_COL);pdf.setLineWidth(0.2);pdf.line(ML+30,y,W-MR,y);
            y+=16;
        });
        footer(pageNum);

        // ════════════════════════════════════════
        // PAGE 3: PROFILE DIAGNOSIS
        // ════════════════════════════════════════
        newPage();
        sectionHeader("01 PROFILE DIAGNOSIS");

        // Diagnosis title
        pdf.setFontSize(22);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
        pdf.text(safe(dg.t),ML,y);y+=10;
        // Subtitle
        pdf.setFontSize(10);pdf.setFont("helvetica","bolditalic");pdf.setTextColor(...TEAL);
        pdf.text(safe(dg.s),ML,y);y+=10;
        // Description (full width)
        txt(dg.d,ML,pw,9,"normal",TX,4.5);gap(10);

        // Two column lorem-style extended description
        const colW2=(pw-10)/2;
        const diagExtra=an.length>0?safe(an[0].d):"";
        if(diagExtra){
            const diagSentences=diagExtra.split(/(?<=\.)\s+/);
            const diagMid=Math.ceil(diagSentences.length/2);
            const leftText=diagSentences.slice(0,diagMid).join(" ");
            const rightText=diagSentences.slice(diagMid).join(" ");
            const leftLines=pdf.splitTextToSize(leftText,colW2);
            const rightLines=pdf.splitTextToSize(rightText,colW2);
            pdf.setFontSize(8.5);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX);
            const startY=y;
            leftLines.forEach(l=>{np(4.2);pdf.text(l,ML,y);y+=4.2;});
            const leftEnd=y;
            y=startY;
            rightLines.forEach(l=>{np(4.2);pdf.text(l,ML+colW2+10,y);y+=4.2;});
            y=Math.max(leftEnd,y);
            gap(8);
        }

        // Bottom paragraph
        if(an.length>1){
            txt(an[1].d,ML,pw,9,"normal",TX,4.5);
        }
        footer(pageNum);

        // ════════════════════════════════════════
        // PAGE 4: RADAR VIEW
        // ════════════════════════════════════════
        newPage();
        sectionHeader("02 THE FOUR DOMAINS — RADAR VIEW");
        gap(4);

        const rSz=58;
        const rcx=W/2,rcy=y+rSz+14;
        const sqHalf=rSz*1.08;
        const sqL=rcx-sqHalf,sqT=rcy-sqHalf,sqW2r=sqHalf*2;

        const pol=(aDeg,r)=>{const rd=((aDeg-90)*Math.PI)/180;return{x:rcx+r*Math.cos(rd),y:rcy+r*Math.sin(rd)};};
        const angles=[0,45,90,135,180,225,270,315];
        const vv=(cat,i)=>S.ans[cat]?.[i]??5;
        const bld=(cat,qi)=>Math.min(10,Math.max(0,Math.round(sc[cat]*0.06+vv(cat,qi)*0.4)));
        const subSc=[bld("giftedness",0),bld("giftedness",9),bld("overlap",1),bld("overlap",6),bld("adhd",1),bld("adhd",4),bld("autism",3),bld("autism",1)];

        const outerOff=14;
        const outerPos=[
            {lbl:"SYSTEMS",   x:rcx,y:rcy-sqHalf-outerOff,al:"center"},
            {lbl:"PREDICTION",x:rcx+sqHalf+outerOff,y:rcy-sqHalf-outerOff+6,al:"center"},
            {lbl:"INTENSITY", x:rcx+sqHalf+outerOff+4,y:rcy,al:"center"},
            {lbl:"CURIOSITY", x:rcx+sqHalf+outerOff,y:rcy+sqHalf+outerOff-6,al:"center"},
            {lbl:"NOVELTY",   x:rcx,y:rcy+sqHalf+outerOff,al:"center"},
            {lbl:"SPEED",     x:rcx-sqHalf-outerOff,y:rcy+sqHalf+outerOff-6,al:"center"},
            {lbl:"PATTERNS",  x:rcx-sqHalf-outerOff-4,y:rcy,al:"center"},
            {lbl:"FOCUS",     x:rcx-sqHalf-outerOff,y:rcy-sqHalf-outerOff+6,al:"center"},
        ];

        // Dashed lines
        pdf.setDrawColor(180,182,186);pdf.setLineWidth(0.2);
        outerPos.forEach(o=>{
            const dx=o.x-rcx,dy2=o.y-rcy;const len=Math.sqrt(dx*dx+dy2*dy2);
            const steps=Math.floor(len/1.5);
            for(let s=0;s<steps;s+=2){
                const t1=s/steps,t2=Math.min((s+1)/steps,1);
                pdf.line(rcx+dx*t1,rcy+dy2*t1,rcx+dx*t2,rcy+dy2*t2);
            }
        });

        // Square
        pdf.setDrawColor(154,157,161);pdf.setLineWidth(0.4);pdf.rect(sqL,sqT,sqW2r,sqW2r);

        // Grid rings
        for(let lv=1;lv<=10;lv++){
            const isDk=lv===5||lv===10;
            pdf.setDrawColor(isDk?154:200,isDk?157:203,isDk?161:208);
            pdf.setLineWidth(isDk?0.3:0.12);
            const pts=angles.map(a=>pol(a,rSz*(lv/10)));
            for(let i=0;i<8;i++){pdf.line(pts[i].x,pts[i].y,pts[(i+1)%8].x,pts[(i+1)%8].y);}
        }

        // Tick dots
        pdf.setFillColor(154,157,161);
        angles.forEach(a=>{for(let lv=1;lv<=10;lv++){const p=pol(a,rSz*(lv/10));pdf.circle(p.x,p.y,0.4,"F");}});

        // Data shape
        const dataPts=subSc.map((val,i)=>pol(angles[i],rSz*(val/10)));
        pdf.setFillColor(43,94,167);
        try{pdf.saveGraphicsState();pdf.setGState(new pdf.GState({opacity:0.08}));
            for(let i=0;i<8;i++){const p1=dataPts[i],p2=dataPts[(i+1)%8];pdf.triangle(rcx,rcy,p1.x,p1.y,p2.x,p2.y,"F");}
            pdf.restoreGraphicsState();}catch(e){}
        pdf.setDrawColor(43,94,167);pdf.setLineWidth(0.6);
        for(let i=0;i<8;i++){pdf.line(dataPts[i].x,dataPts[i].y,dataPts[(i+1)%8].x,dataPts[(i+1)%8].y);}

        // Domain labels inside
        pdf.setFontSize(7);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
        pdf.text("G I F T E D N E S S",rcx,rcy-rSz*0.52,{align:"center"});
        pdf.text("A D H D",rcx,rcy+rSz*0.56,{align:"center"});
        // OVERLAP right - vertical
        const ovX=rcx+rSz*0.5;
        const ovLetters="OVERLAP".split("");
        ovLetters.forEach((ch2,ci)=>{pdf.text(ch2,ovX,rcy-14+ci*4.5,{align:"center"});});
        // AUTISM left - vertical (top to bottom, reading upward)
        const auX=rcx-rSz*0.5;
        const auLetters="AUTISM".split("");
        auLetters.forEach((ch2,ci)=>{pdf.text(ch2,auX,rcy+10-ci*4.5,{align:"center"});});

        // Gold dots + labels
        outerPos.forEach((o,i)=>{
            pdf.setFillColor(180,142,78);pdf.circle(o.x,o.y,2,"F");
            pdf.setFontSize(5.5);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
            // Position label relative to dot based on quadrant
            const isTop=o.y<rcy-10;const isBot=o.y>rcy+10;
            const isLeft=o.x<rcx-10;const isRight=o.x>rcx+10;
            let lx=o.x,ly=o.y;
            if(isTop&&!isLeft&&!isRight){ly-=4;}
            else if(isBot&&!isLeft&&!isRight){ly+=5;}
            else if(isTop&&isRight){lx+=4;ly-=3;}
            else if(isTop&&isLeft){lx-=4;ly-=3;}
            else if(isBot&&isRight){lx+=4;ly+=4;}
            else if(isBot&&isLeft){lx-=4;ly+=4;}
            else if(isRight){lx+=4;}
            else if(isLeft){lx-=4;}
            pdf.text(o.lbl,lx,ly,{align:"center",charSpace:0.5});
        });
        y=rcy+sqHalf+outerOff+20;
        footer(pageNum);

        // ════════════════════════════════════════
        // PAGE 5: DOMAIN SCORE CARDS
        // ════════════════════════════════════════
        newPage();
        sectionHeader("02 THE FOUR DOMAINS");
        pdf.setFontSize(10);pdf.setFont("helvetica","bold");pdf.setTextColor(...TX2);
        pdf.text("Domain Score Cards",ML,y);y+=12;

        // Score card headers + donut circles
        const cardW=pw/4;
        const domData=[
            {k:"giftedness",ab:"GI",n:"Giftedness",col:GOLD},
            {k:"overlap",ab:"OV",n:"Overlap",col:SAGE},
            {k:"adhd",ab:"AD",n:"ADHD",col:PURPLE},
            {k:"autism",ab:"AU",n:"Autism",col:TEAL},
        ];
        // Abbreviated labels
        domData.forEach((d,i)=>{
            const cx=ML+cardW*i+cardW/2;
            pdf.setFontSize(18);pdf.setFont("helvetica","bold");pdf.setTextColor(...d.col);
            pdf.text(d.ab,cx,y,{align:"center"});
            pdf.setFontSize(7);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX2);
            pdf.text(d.n,cx,y+5,{align:"center"});
        });
        y+=14;

        // Donut charts (simplified as circles with score)
        domData.forEach((d,i)=>{
            const cx=ML+cardW*i+cardW/2;
            const r=14;
            // Background circle
            pdf.setDrawColor(220,220,220);pdf.setLineWidth(4);pdf.circle(cx,y,r);
            // Colored arc (approximate with thick circle proportional to score)
            pdf.setDrawColor(...d.col);pdf.setLineWidth(4);
            const pct=sc[d.k]/100;
            // Draw arc segments
            const segs=Math.floor(pct*36);
            for(let s=0;s<segs;s++){
                const a1=(s*10-90)*Math.PI/180;
                const a2=((s+1)*10-90)*Math.PI/180;
                pdf.line(cx+r*Math.cos(a1),y+r*Math.sin(a1),cx+r*Math.cos(a2),y+r*Math.sin(a2));
            }
            // Score number + %
            const scoreStr=String(sc[d.k]);
            pdf.setFontSize(18);pdf.setFont("helvetica","bold");pdf.setTextColor(...d.col);
            const sw=pdf.getStringUnitWidth(scoreStr)*18/pdf.internal.scaleFactor;
            pdf.text(scoreStr,cx-3,y+1,{align:"center"});
            pdf.setFontSize(7);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX3);
            pdf.text("%",cx+sw/2+1,y+2);
        });
        y+=24;gap(8);

        // Score description
        txt(scoreDesc("giftedness",sc.giftedness)||"",ML,pw,9,"normal",TX,4.5);gap(8);

        // Score table
        const domList=[
            {k:"giftedness",n:"Giftedness",col:GOLD},
            {k:"overlap",n:"Overlap",col:SAGE},
            {k:"adhd",n:"ADHD",col:PURPLE},
            {k:"autism",n:"Autism",col:TEAL},
        ];
        domList.forEach(d=>{
            np(10);
            pdf.setFontSize(10);pdf.setFont("helvetica","bold");pdf.setTextColor(...d.col);
            pdf.text(d.n,ML,y);
            pdf.setFontSize(10);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
            pdf.text(sc[d.k]+" / 100",ML+40,y);
            pdf.setFontSize(8.5);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX2);
            const desc=scoreDesc(d.k,sc[d.k])||"";
            if(desc){
                const dl=pdf.splitTextToSize(safe(desc),pw-85);
                dl.forEach((l,li)=>{pdf.text(l,ML+70,y+li*3.8);});
            }
            y+=6;
            pdf.setDrawColor(...LINE_COL);pdf.setLineWidth(0.15);pdf.line(ML,y,W-MR,y);
            y+=8;
        });
        footer(pageNum);

        // ════════════════════════════════════════
        // PAGE 6: SCORE DISTRIBUTION (bars)
        // ════════════════════════════════════════
        newPage();
        sectionHeader("02 THE FOUR DOMAINS — SCORE DISTRIBUTION");
        pdf.setFontSize(10);pdf.setFont("helvetica","bold");pdf.setTextColor(...TX2);
        pdf.text("Comparative Score Analysis",ML,y);y+=14;

        domList.forEach(d=>{
            np(18);
            pdf.setFontSize(11);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
            pdf.text(d.n,ML,y+4);
            // Bar background
            const barX=ML+35,barW=pw-60,barH=8;
            pdf.setFillColor(220,225,232);pdf.rect(barX,y,barW,barH,"F");
            // Color fill - gradient effect with two colors
            const fillW=barW*(sc[d.k]/100);
            pdf.setFillColor(...d.col);pdf.rect(barX,y,fillW*0.5,barH,"F");
            pdf.setFillColor(...TEAL);pdf.rect(barX+fillW*0.5,y,fillW*0.5,barH,"F");
            // Score
            pdf.setFontSize(12);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
            pdf.text(sc[d.k]+"%",W-MR,y+6,{align:"right"});
            y+=20;
        });
        gap(8);
        // Description
        if(an.length>0){txt(an[0].d,ML,pw,9,"normal",TX,4.5);gap(6);}
        if(an.length>1){txt(an[1].d,ML,pw,9,"normal",TX,4.5);}
        footer(pageNum);

        // ════════════════════════════════════════
        // PAGE 7: YOUR TENS
        // ════════════════════════════════════════
        if(tn.length){
            newPage();
            sectionHeader("03 YOUR TENS — TRAITS AT MAXIMUM INTENSITY");
            pdf.setFontSize(8.5);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX);
            const introTxt=tn.length===1
                ?`This trait scored 10/10 in your assessment — the outer edge of your profile where neurodiversity is most concentrated and most powerful.`
                :`These ${tn.length} traits scored 10/10 in your assessment — the outer edges of your profile where neurodiversity is most concentrated and most powerful. Each is a distinct lens through which you experience the world.`;
            const introLines=pdf.splitTextToSize(introTxt,pw);
            introLines.forEach(l=>{pdf.text(l,ML,y);y+=4;});
            gap(8);

            tn.forEach(t=>{
                np(16);
                const col=hex(COL[t.c].hex);
                // Card row
                pdf.setFillColor(240,243,248);pdf.rect(ML+14,y-3,pw-14,13,"F");
                pdf.setFillColor(...col);pdf.rect(ML+14,y-3,2,13,"F");
                // 10 badge
                pdf.setFontSize(18);pdf.setFont("helvetica","bold");pdf.setTextColor(...GOLD);
                pdf.text("10",ML+4,y+6);
                // Trait name
                pdf.setFontSize(10);pdf.setFont("helvetica","bold");pdf.setTextColor(...DK);
                pdf.text(safe(t.tr),ML+20,y+5);
                // Category
                pdf.setFontSize(7);pdf.setFont("helvetica","italic");pdf.setTextColor(...col);
                pdf.text(t.c.charAt(0).toUpperCase()+t.c.slice(1),W-MR-4,y+5,{align:"right"});
                y+=16;
            });
            footer(pageNum);
        }

        // ════════════════════════════════════════
        // SUPERPOWERS & KRYPTONITE
        // ════════════════════════════════════════
        if(st.length||ch.length){
            newPage();
            sectionHeader("04 SUPERPOWERS & KRYPTONITE");

            // Summary boxes
            const sumW=pw/4;
            const sumData=[
                {v:sc.giftedness+"%",l:"Giftedness dominant\ndomain",c:GOLD},
                {v:sc.overlap+"%",l:"Overlap peak\nconvergence",c:SAGE},
                {v:sc.adhd+"%",l:"ADHD working\nprofile",c:PURPLE},
                {v:tn.length+"×",l:"Traits at 10\n/ 10",c:TEAL},
            ];
            // Summary bar bg
            pdf.setFillColor(...HEADER_BG);pdf.rect(ML,y-4,pw,26,"F");
            pdf.setFillColor(...TEAL);pdf.rect(ML,y-4,pw,1.5,"F");
            sumData.forEach((s,i)=>{
                const cx=ML+sumW*i+sumW/2;
                pdf.setFontSize(20);pdf.setFont("helvetica","bold");pdf.setTextColor(...s.c);
                pdf.text(s.v,cx,y+6,{align:"center"});
                pdf.setFontSize(7);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX2);
                const sLines=s.l.split("\n");
                sLines.forEach((sl,si)=>{pdf.text(sl,cx,y+13+si*3.5,{align:"center"});});
            });
            y+=30;gap(6);

            // Two column: Superpowers | Kryptonite
            const colW=(pw-8)/2;
            pdf.setFontSize(9);pdf.setFont("helvetica","bold");
            pdf.setTextColor(...DK);pdf.text("SUPERPOWERS",ML,y);
            pdf.text("KRYPTONITE",ML+colW+8,y);y+=6;
            pdf.setDrawColor(...LINE_COL);pdf.setLineWidth(0.2);pdf.line(ML,y,W-MR,y);y+=6;

            const maxRows=Math.max(st.length,ch.length);
            for(let i=0;i<maxRows;i++){
                np(24);const baseY=y;let rowH=0;
                if(i<st.length){
                    pdf.setFontSize(9);pdf.setFont("helvetica","bolditalic");pdf.setTextColor(...DK);
                    pdf.text(safe(st[i].t),ML,baseY);
                    pdf.setFontSize(7.5);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX);
                    const sL=pdf.splitTextToSize(safe(st[i].d),colW-2);
                    sL.forEach((l,li)=>pdf.text(l,ML,baseY+5+li*3.5));
                    rowH=Math.max(rowH,5+sL.length*3.5);
                }
                if(i<ch.length){
                    const cx=ML+colW+8;
                    pdf.setFontSize(9);pdf.setFont("helvetica","bolditalic");pdf.setTextColor(...DK);
                    pdf.text(safe(ch[i].t),cx,baseY);
                    pdf.setFontSize(7.5);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX);
                    const cL=pdf.splitTextToSize(safe(ch[i].d),colW-2);
                    cL.forEach((l,li)=>pdf.text(l,cx,baseY+5+li*3.5));
                    rowH=Math.max(rowH,5+cL.length*3.5);
                }
                y=baseY+rowH+5;
                pdf.setDrawColor(...LINE_COL);pdf.setLineWidth(0.1);pdf.line(ML,y,W-MR,y);y+=4;
            }
            footer(pageNum);
        }

        // ════════════════════════════════════════
        // DEEP DIVE
        // ════════════════════════════════════════
        newPage();
        sectionHeader("05 DEEP DIVE — WHAT THIS COMBINATION MEANS");
        gap(4);

        an.forEach((a,i)=>{
            np(30);
            // Section heading with colored left bar
            const barCol=i%4===0?TEAL:i%4===1?GOLD:i%4===2?PURPLE:SAGE;
            pdf.setFillColor(...barCol);pdf.rect(ML,y-1,3,8,"F");
            pdf.setFontSize(12);pdf.setFont("helvetica","bold");pdf.setTextColor(...TEAL);
            pdf.text(safe(a.t),ML+8,y+5);
            y+=5;
            pdf.setDrawColor(...barCol);pdf.setLineWidth(0.3);pdf.line(ML+8,y+2,W-MR,y+2);
            y+=8;
            txt(a.d,ML,pw,9,"normal",TX,4.5);gap(12);
        });
        footer(pageNum);

        // ════════════════════════════════════════
        // RECOMMENDATIONS
        // ════════════════════════════════════════
        newPage();
        sectionHeader("06 RECOMMENDATIONS — WHAT TO DO WITH THIS");
        gap(2);

        // Intro paragraph
        if(rc.length>0){
            txt("Based on your unique cognitive architecture, these personalised recommendations are designed to help you leverage your neurodivergent strengths while managing your specific challenges.",ML,pw,9,"normal",TX,4.5);
            gap(8);
        }

        rc.forEach((r,i)=>{
            np(30);
            // Numbered heading
            pdf.setFontSize(11);pdf.setFont("helvetica","bold");pdf.setTextColor(...TEAL);
            pdf.text((i+1)+". "+safe(r.t),ML,y);y+=6;
            // Brief description
            txt(r.d,ML,pw,8.5,"normal",TX,4.2);
            gap(4);

            // Split description at first sentence boundary for Why/What sections
            const halfD=safe(r.d);
            const sentences=halfD.split(/(?<=\.)\s+/);
            const midPt=Math.ceil(sentences.length/2);
            const whyText=sentences.slice(0,midPt).join(" ");
            const whatText=sentences.slice(midPt).join(" ")||whyText;

            np(20);
            pdf.setFontSize(8);pdf.setFont("helvetica","bold");pdf.setTextColor(...TEAL);
            pdf.text("Why this\nmatters",ML,y);
            pdf.setFontSize(8);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX);
            const wLines=pdf.splitTextToSize(whyText,pw-35);
            wLines.slice(0,4).forEach((l,li)=>{pdf.text(l,ML+28,y+li*3.8);});
            y+=Math.min(wLines.length,4)*3.8+6;

            np(14);
            pdf.setFontSize(8);pdf.setFont("helvetica","bold");pdf.setTextColor(...TEAL);
            pdf.text("What to\ndo",ML,y);
            pdf.setFontSize(8);pdf.setFont("helvetica","normal");pdf.setTextColor(...TX);
            const aLines=pdf.splitTextToSize(whatText,pw-35);
            aLines.slice(0,4).forEach((l,li)=>{pdf.text(l,ML+28,y+li*3.8);});
            y+=Math.min(aLines.length,4)*3.8+4;
            gap(6);
        });
        footer(pageNum);

        // Save
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

    const inp=document.createElement("input");inp.className="name-inp au au4";inp.type="text";inp.placeholder="Your name";inp.value=S.name;inp.required=true;
    inp.addEventListener("input",e=>{S.name=e.target.value;btn.disabled=!S.name.trim();btn.style.opacity=S.name.trim()?"1":"0.4";});
    const ic=h("div","name-wrap",[]);ic.append(inp);w.append(ic);

    const bc=h("div","start-wrap au au5",[]);
    const btn=h("button","btn",["BEGIN ASSESSMENT"]);
    btn.disabled=!S.name.trim();btn.style.opacity=S.name.trim()?"1":"0.4";
    btn.addEventListener("click",()=>{if(!S.name.trim()){inp.focus();return;}S.scr="quiz";S.ci=0;render()});
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

    // Button colors — uniform grey
    const btnGrey="#93969a";
    const mob6=[{v:0,l:"0"},{v:1,l:"1"},{v:2,l:"2"},{v:3,l:"3"},{v:4,l:"4"},{v:5,l:"5"}];
    const isMob=window.innerWidth<=768;

    const qlist=h("div","q-list",[]);
    Q[cat].forEach((qText,qi)=>{
        const cv=S.ans[cat]?.[qi];
        const qcard=h("div","q-item",[]);
        qcard.append(h("div","q-text",[qText]));

        const btnsRow=h("div","sc-btns-row",[]);

        // Left label
        const leftLbl=h("span","sc-side-label sc-side-left",["Completely disagree"]);
        btnsRow.append(leftLbl);

        const btns=h("div","sc-btns"+(isMob?" sc-btns-mob":""),[]);
        const btnSteps=isMob?mob6:Array.from({length:11},(_,i)=>({v:i,l:String(i)}));
        btnSteps.forEach(s=>{
            const b=document.createElement("button");
            b.className="sc-btn"+(cv===s.v?" sel":"");
            b.style.borderColor=btnGrey;
            b.style.color=btnGrey;
            if(cv===s.v){b.style.background=col.m;b.style.borderColor=col.m;b.style.color="#fff";}
            const num=document.createElement("span");num.className="sc-btn-num";num.textContent=s.l;b.append(num);
            b.addEventListener("mouseenter",()=>{if(S.ans[cat]?.[qi]!==s.v){b.style.background="rgba(147,150,154,0.12)";b.style.borderColor=col.m}});
            b.addEventListener("mouseleave",()=>{if(S.ans[cat]?.[qi]!==s.v){b.style.background="transparent";b.style.borderColor=btnGrey}});
            b.addEventListener("click",()=>{S.ans[cat][qi]=s.v;render()});
            btns.append(b);
        });
        btnsRow.append(btns);

        // Right label
        const rightLbl=h("span","sc-side-label sc-side-right",["Completely agree"]);
        btnsRow.append(rightLbl);

        qcard.append(btnsRow);
        qlist.append(qcard);
    });
    w.append(qlist);

    // scale hint is now inline with buttons

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

    w.append(h("div","rpt-bar",[`NeuroProfile · ${(S.name||"Profile").toUpperCase()} · ${now} · Not a clinical diagnosis`]));
    w.append(h("h1","rpt-title",["NeuroProfile"]));
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
    const radarData=radar(sc);
    cr.append(radarData.svg);
    // HTML score bar
    const scoreBar=h("div","radar-scores",[]);
    radarData.cats.forEach(c=>{
        const cell=h("div","radar-score-cell",[]);
        const lbl=h("span","radar-score-lbl",[c.l]);
        lbl.style.color=c.cl;
        const val=h("span","radar-score-val",[radarData.scores[c.k]+"%"]);
        cell.append(lbl,val);
        scoreBar.append(cell);
    });
    cr.append(scoreBar);
    w.append(cr);

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