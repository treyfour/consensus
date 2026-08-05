#!/usr/bin/env python3
"""Four ways to catch a bad result and turn it into a better search.
Each output file is standalone."""
import os, json

OUT = "/Users/treyfour/dev/consensus/.claude/worktrees/relevance/prototypes/redirect"

TEMPLATE = r"""<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>__NAME__</title>
<style>
:root{
--accent:#068ef1;--accent-emph:#006fce;--accent-subtle:#eff7ff;--accent-bd:#b8dfff;
--bg:#fff;--mist:#fafafa;--faint:#f4f4f5;--subtle:#e4e4e7;
--fg:#18181b;--muted:#71717b;--bd:#e4e4e7;--bd-emph:#d4d4d8;
--pos:#148d74;--pos-bg:#eefaf6;--warn:#a65f00;--paper:#fffcf0;--paper-bd:#ece0bd;
--r-xs:.25rem;--r-sm:.5rem;--r-md:.75rem;
--s-2xs:.25rem;--s-xs:.5rem;--s-sm:.75rem;--s-md:1rem;--s-lg:1.25rem;--s-xl:1.5rem;--s-2xl:2rem;
--t-2xs:.69rem;--t-xs:.81rem;--t-sm:.94rem;--t-base:1rem;--t-lg:1.13rem;
--sans:Figtree,-apple-system,BlinkMacSystemFont,"Segoe UI",system-ui,sans-serif;
--mono:"Reddit Mono",ui-monospace,SFMono-Regular,Menlo,monospace;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:var(--sans);color:var(--fg);background:var(--bg);font-size:var(--t-base);-webkit-font-smoothing:antialiased}
.hd{background:var(--fg);color:#fff;padding:var(--s-sm) var(--s-md)}
.hd b{font-size:var(--t-sm)}
.hd p{color:#a1a1aa;font-size:var(--t-xs);line-height:1.55;margin-top:2px;max-width:68rem}
.hd .tag{display:inline-block;font-family:var(--mono);font-size:var(--t-2xs);background:var(--pos);
  color:#fff;border-radius:625rem;padding:1px var(--s-xs);margin-top:var(--s-xs)}
.wrap{display:grid;grid-template-columns:1fr 24rem;height:calc(100vh - 92px);overflow:hidden}
.wrap>*{min-height:0}

.mid{display:flex;flex-direction:column;border-right:1px solid var(--bd);min-height:0}
.thread{flex:1;overflow-y:auto;padding:var(--s-xl) var(--s-2xl)}
.inner{max-width:38rem;margin:0 auto}
.q{background:var(--accent-subtle);border-radius:var(--r-md);padding:var(--s-sm) var(--s-md);
  font-size:var(--t-sm);max-width:24rem;margin-left:auto}
.funnel{font-family:var(--mono);font-size:var(--t-2xs);color:var(--muted);margin:var(--s-lg) 0 var(--s-sm)}
h1{font-size:var(--t-lg);letter-spacing:-.01em;margin-bottom:var(--s-sm)}
.s{font-size:var(--t-sm);line-height:1.7;margin-bottom:var(--s-sm);padding-left:var(--s-xs);
  border-left:2px solid transparent;transition:background .12s,border-color .12s}
.s.lit{border-left-color:var(--accent);background:var(--accent-subtle)}
.cite{font-family:var(--mono);font-size:var(--t-2xs);background:var(--faint);border-radius:var(--r-xs);
  padding:1px 5px;display:inline-block}

/* composer */
.ask{flex:none;border-top:1px solid var(--bd);background:var(--mist);padding:var(--s-sm) var(--s-2xl)}
.askin{max-width:38rem;margin:0 auto}
.prompt{display:none;background:#fff;border:1px solid var(--accent-bd);border-radius:var(--r-md);
  padding:var(--s-xs) var(--s-sm);margin-bottom:var(--s-xs)}
.prompt.on{display:block;animation:rise .22s cubic-bezier(.2,.9,.3,1)}
@keyframes rise{0%{opacity:0;transform:translateY(6px)}100%{opacity:1;transform:none}}
.prompt .t{font-size:var(--t-2xs);line-height:1.5}
.prompt .t b{font-weight:500}
.prompt .x{float:right;font-family:var(--mono);font-size:var(--t-2xs);color:var(--muted);cursor:pointer}
.box{background:var(--bg);border:1px solid var(--bd);border-radius:var(--r-md);padding:var(--s-xs) var(--s-sm);
  display:flex;gap:var(--s-xs);align-items:center}
.box.armed{border-color:var(--accent-bd);box-shadow:0 0 0 3px var(--accent-subtle)}
.box input{flex:1;border:0;outline:0;font-family:inherit;font-size:var(--t-sm);background:transparent}
.box input::placeholder{color:var(--muted)}
.box button{font-family:inherit;font-size:var(--t-2xs);border:0;background:var(--accent);color:#fff;
  border-radius:var(--r-sm);padding:6px var(--s-sm);cursor:pointer;white-space:nowrap}

/* references */
.pane{display:flex;flex-direction:column;overflow:hidden}
.pane-hd{display:flex;align-items:baseline;gap:var(--s-xs);padding:var(--s-sm) var(--s-md);
  border-bottom:1px solid var(--bd);flex:none}
.pane-hd b{font-size:var(--t-sm)}
.pane-hd span{font-family:var(--mono);font-size:var(--t-2xs);color:var(--muted);margin-left:auto}
.list{flex:1;overflow-y:auto;padding:var(--s-xs) var(--s-sm) var(--s-2xl)}
.row{border:1px solid var(--bd);border-radius:var(--r-md);padding:var(--s-sm);margin-bottom:var(--s-xs);
  transition:border-color .12s,opacity .12s;outline:0}
.row:hover,.row:focus-visible{border-color:var(--accent-bd);background:var(--accent-subtle)}
.row h3{font-size:var(--t-xs);font-weight:500;line-height:1.35}
.row .m{font-family:var(--mono);font-size:var(--t-2xs);color:var(--muted);margin-top:var(--s-2xs)}
/* set aside is quiet and reversible. Nothing is ever struck through or removed. */
.aside-hd{display:flex;align-items:baseline;gap:var(--s-2xs);font-family:var(--mono);font-size:var(--t-2xs);
  color:var(--muted);margin:var(--s-md) var(--s-2xs) var(--s-2xs);cursor:pointer}
.aside-hd u{margin-left:auto}
.row.aside{opacity:.55;background:var(--mist);padding:var(--s-xs) var(--s-sm)}
.row.aside h3{font-weight:400}
.row.aside .back{font-family:var(--mono);font-size:var(--t-2xs);color:var(--accent-emph);cursor:pointer;
  margin-top:var(--s-2xs);display:inline-block}
.hide{display:none}

/* the gentle nudge: only once there is enough evidence to earn it */
.nudge{border:1px solid var(--accent-bd);background:var(--accent-subtle);border-radius:var(--r-md);
  padding:var(--s-sm);margin-bottom:var(--s-xs);animation:rise .24s cubic-bezier(.2,.9,.3,1)}
.nudge .t{font-size:var(--t-xs);line-height:1.5}
.nudge .t b{font-weight:500}
.nudge .sub{font-family:var(--mono);font-size:var(--t-2xs);color:var(--muted);margin-top:2px}

/* hover card */
.card{position:fixed;z-index:60;width:23.5rem;background:#fff;border:1px solid var(--bd);
  border-radius:var(--r-md);box-shadow:0 14px 34px #0000002e;padding:var(--s-sm) var(--s-md);display:none}
.card.on{display:block}
.card h4{font-size:var(--t-xs);font-weight:500;line-height:1.4}
.card .meta{font-family:var(--mono);font-size:var(--t-2xs);color:var(--muted);margin-top:var(--s-2xs)}
.card .ab{font-size:var(--t-2xs);line-height:1.55;margin-top:var(--s-xs);color:var(--muted)}
.card .chips{display:flex;gap:var(--s-2xs);margin-top:var(--s-xs);flex-wrap:wrap}
.card .ch{font-family:var(--mono);font-size:var(--t-2xs);border:1px solid var(--bd);border-radius:625rem;
  padding:0 var(--s-xs);color:var(--muted)}
/* the label carries the job now: "why" alone did not say whose reason it was,
   or that it is a reason at all. It gets its own line because it no longer fits
   beside the quote. */
.why{margin-top:var(--s-xs);border-top:1px solid var(--bd);padding-top:var(--s-xs)}
.why .k{display:block;font-family:var(--mono);font-size:var(--t-2xs);color:var(--accent-emph);
  letter-spacing:.06em;text-transform:uppercase;margin-bottom:3px}
.why .v{font-size:var(--t-2xs);line-height:1.55}
.why .v q{font-style:italic}
.why .tag{font-family:var(--mono);font-size:var(--t-2xs);color:var(--muted);display:block;margin-top:2px}

/* the ask. A question, in the product's voice, never a verdict. */
.act{margin-top:var(--s-xs);border-top:1px dashed var(--bd);padding-top:var(--s-xs)}
.softbtn{font-family:inherit;font-size:var(--t-2xs);color:var(--accent-emph);background:none;border:0;
  cursor:pointer;padding:2px 0}
.softbtn:hover{text-decoration:underline}
.step{margin-top:var(--s-xs)}
.step .qn{font-size:var(--t-xs);font-weight:500;line-height:1.45}
.step .hint{font-family:var(--mono);font-size:var(--t-2xs);color:var(--muted);margin-top:2px}
.goals{display:flex;flex-direction:column;gap:var(--s-2xs);margin-top:var(--s-xs)}
.goal{text-align:left;font-family:inherit;font-size:var(--t-2xs);border:1px solid var(--bd);background:#fff;
  border-radius:var(--r-sm);padding:5px var(--s-xs);cursor:pointer;color:var(--fg);line-height:1.4}
.goal:hover{border-color:var(--accent-bd);background:var(--accent-subtle);color:var(--accent-emph)}
.goal.on{border-color:var(--accent);background:var(--accent-subtle);color:var(--accent-emph)}
.sug{background:var(--accent-subtle);border:1px solid var(--accent-bd);border-radius:var(--r-sm);
  padding:var(--s-xs);margin-top:var(--s-xs)}
.sug .lab{font-family:var(--mono);font-size:var(--t-2xs);color:var(--accent-emph)}
.sug input{width:100%;border:1px solid var(--accent-bd);border-radius:var(--r-xs);outline:0;background:#fff;
  font-family:inherit;font-size:var(--t-2xs);padding:5px var(--s-xs);margin-top:var(--s-2xs);line-height:1.4}
.two{display:flex;gap:var(--s-2xs);margin-top:var(--s-xs);flex-wrap:wrap}
.two button{font-family:inherit;font-size:var(--t-2xs);border:1px solid var(--bd);background:#fff;
  border-radius:var(--r-sm);padding:5px var(--s-xs);cursor:pointer;color:var(--fg)}
.two button.go{background:var(--accent);border-color:var(--accent);color:#fff}
.two button.go:hover{background:var(--accent-emph)}
.two .later{font-family:var(--mono);font-size:var(--t-2xs);color:var(--muted);background:none;border:0;
  cursor:pointer;margin-left:auto;align-self:center}
.thanks{background:var(--pos-bg);border:1px solid #bfe6da;border-radius:var(--r-sm);padding:var(--s-xs);
  margin-top:var(--s-xs);font-size:var(--t-2xs);line-height:1.5;color:var(--fg)}
.thanks b{color:var(--pos);font-weight:500}
.toast{position:fixed;left:50%;bottom:1.5rem;transform:translate(-50%,200%);z-index:80;background:var(--fg);
  color:#fff;border-radius:625rem;padding:var(--s-xs) var(--s-md);font-size:var(--t-xs);opacity:0;
  box-shadow:0 10px 28px #00000040;transition:transform .22s cubic-bezier(.2,.9,.3,1),opacity .18s;
  max-width:46rem;text-align:center}
.toast.on{transform:translate(-50%,0);opacity:1}
.note{position:fixed;left:0;right:0;bottom:0;background:var(--mist);border-top:1px solid var(--bd);
  font-family:var(--mono);font-size:var(--t-2xs);color:var(--muted);padding:var(--s-2xs) var(--s-md);line-height:1.5}
</style>
</head>
<body>
<div class="hd"><b>__NAME__</b><p>__DESC__</p><span class="tag">__TAG__</span></div>

<div class="wrap">
  <div class="mid">
    <main class="thread">
      <div class="inner">
        <div class="q">What are the open questions in CRISPR off-target effects for in vivo therapies?</div>
        <div class="funnel">32.8M retrieved · 100 eligible · 20 included</div>
        <h1>Open Questions in CRISPR Off-Target Effects for In Vivo Therapies</h1>
        <div id="ans"></div>
      </div>
    </main>
    <div class="ask"><div class="askin">
      <div class="prompt" id="prompt"></div>
      <div class="box" id="box"><input id="in" placeholder="Ask a follow-up, or search again…">
        <button id="send">Search ↩</button></div>
    </div></div>
  </div>
  <aside class="pane">
    <div class="pane-hd"><b>References</b><span id="sub">20 included · 6 cited</span></div>
    <div class="list" id="list"></div>
  </aside>
</div>
<div class="card" id="card"></div>
<div class="toast" id="toast"></div>
<div class="note">Real data: six papers, three sub-queries and the funnel captured from the live CRISPR
thread. Nothing here is ever deleted — set-aside is reversible in one click.</div>

<script>
const P=__P__, A=__A__;
const BASE="What are the open questions in CRISPR off-target effects for in vivo therapies?";
/* goals, not faults. The first is specific to the paper that missed; the rest are
   the two redirections that come up most on any question. */
function goals(i){
  return [
    {l:"I'm not asking about "+P[i].topic,
     q:"Open questions in CRISPR off-target effects in vivo, excluding "+P[i].topic},
    {l:"I want detection and measurement methods",
     q:"How are CRISPR off-target effects detected and measured in vivo?"},
    {l:"I want human or clinical evidence",
     q:"What clinical evidence exists for CRISPR off-target effects in humans?"},
    {l:"Something else…",q:null}
  ];
}
const $=id=>document.getElementById(id);
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const card=$('card');
let aside={}, openOn=null, hideT=null, log=[];
function toast(m){const t=$('toast');t.innerHTML=m;t.classList.add('on');
  clearTimeout(t._h);t._h=setTimeout(()=>t.classList.remove('on'),4200)}

$('ans').innerHTML=A.map((a,k)=>'<p class="s" data-s="'+k+'">'+esc(a.s)+' '+
  a.srcs.map(i=>'<span class="cite" data-p="'+i+'">'+P[i].n.toUpperCase()+'</span>').join(' ')+'</p>').join('');

function base(i){
  const p=P[i];
  return '<h4>'+esc(p.t)+'</h4>'+
    '<div class="meta">'+esc(p.a)+' · '+p.y+' · '+p.c+' citations · '+esc(p.j)+'</div>'+
    '<div class="ab">'+esc(p.ab)+'</div>'+
    '<div class="chips"><span class="ch">'+esc(p.type)+'</span><span class="ch">INDEXED</span>'+
    '<span class="ch">FULL TEXT</span></div>'+
    '<div class="why"><span class="k">Why this paper was chosen</span><span class="v"><q>'+
    esc(p.passage)+'</q>'+
    '<span class="tag">the line that matched your question most closely, of '+p.q+
    ' that matched · quoted from the paper, not written by us</span></span></div>';
}
function place(row){
  const r=row.getBoundingClientRect(), h=card.offsetHeight, w=card.offsetWidth;
  card.style.left=Math.max(8,r.left-w-12)+'px';
  card.style.top=Math.max(96,Math.min(r.top,window.innerHeight-h-30))+'px';
}
function lit(i){document.querySelectorAll('.s').forEach(el=>
  el.classList.toggle('lit',i!=null&&A[+el.dataset.s].srcs.includes(i)))}
function scheduleHide(){hideT=setTimeout(hide,150)}
function hide(){if(card._sticky)return;card.classList.remove('on');openOn=null;lit(null)}
card.addEventListener('mouseenter',()=>clearTimeout(hideT));
card.addEventListener('mouseleave',scheduleHide);
document.addEventListener('keydown',e=>{if(e.key==='Escape'){card._sticky=false;hide()}});

function rowOf(i){return document.querySelector('.row[data-p="'+i+'"]')}
function show(i,row){
  openOn=i; card.classList.add('on');
  card.innerHTML=base(i)+cardExtra(i);
  wireCard(i); place(row); lit(i);
}
/* the suggestion is offered, never fired. Two scopes, because only the user
   knows whether one bad paper spoils the thread. */
function suggestBlock(q,editable){
  return '<div class="sug"><span class="lab">try this instead — edit it if it is not right</span>'+
    '<input id="sq" value="'+esc(q)+'"></div>'+
    '<div class="two"><button class="go" id="here">Search this thread</button>'+
    '<button id="fresh">Start a new chat</button>'+
    '<button class="later" id="later">not now</button></div>';
}
function wireSuggest(i,after){
  const run=(where)=>{
    const q=$('sq')?$('sq').value.trim():'';
    log.push({paper:P[i].n,goal:card._goal,query:q,scope:where});
    $('in').value=q; $('box').classList.add('armed'); $('in').focus();
    card._sticky=false; hide();
    toast(where==='fresh'
      ? '<b>New chat ready</b> — the question is in the composer, and this thread is untouched.'
      : 'Ready in this thread — press Search when you are happy with the wording.');
    if(after) after();
  };
  const h=$('here'), f=$('fresh'), l=$('later');
  if(h) h.addEventListener('click',e=>{e.stopPropagation();run('here')});
  if(f) f.addEventListener('click',e=>{e.stopPropagation();run('fresh')});
  if(l) l.addEventListener('click',e=>{e.stopPropagation();
    log.push({paper:P[i].n,goal:card._goal,query:null,scope:'declined'});
    card._sticky=false; hide();
    toast('No problem — noted either way. Nothing changed.')});
  const sq=$('sq');
  if(sq){sq.addEventListener('click',e=>e.stopPropagation());
         sq.addEventListener('keydown',e=>e.stopPropagation())}
}
function goalStep(i){
  return '<div class="step"><div class="qn">No problem — what were you hoping to find?</div>'+
    '<div class="hint">this is how we get better at it, and how you get a better search</div>'+
    '<div class="goals">'+goals(i).map((g,k)=>'<button class="goal" data-g="'+k+'">'+esc(g.l)+'</button>').join('')+
    '</div></div>';
}
function wireGoals(i,onPick){
  card.querySelectorAll('.goal').forEach(b=>b.addEventListener('click',e=>{
    e.stopPropagation();
    const g=goals(i)[+b.dataset.g];
    card._goal=g.l;
    onPick(g);
  }));
}
__JS__

function renderList(){
  const on=P.map((p,i)=>i).filter(i=>!aside[i]);
  const off=P.map((p,i)=>i).filter(i=>aside[i]);
  /* map passes the index as the second argument, which would land in isAside */
  $('list').innerHTML=listTop()+on.map(i=>rowHtml(i,false)).join('')+
    (off.length?'<div class="aside-hd" id="ahd">set aside · '+off.length+
      '<u id="ashow">show</u></div><div id="asideBox" class="hide">'+
      off.map(i=>rowHtml(i,true)).join('')+'</div>':'');
  $('sub').textContent='20 included · 6 cited'+(off.length?' · '+off.length+' set aside':'');
  document.querySelectorAll('.row:not(.aside)').forEach(row=>{
    const i=+row.dataset.p;
    row.addEventListener('mouseenter',()=>{clearTimeout(hideT);show(i,row)});
    row.addEventListener('focus',()=>{clearTimeout(hideT);show(i,row)});
    row.addEventListener('mouseleave',scheduleHide);
    row.addEventListener('blur',scheduleHide);
  });
  document.querySelectorAll('.row.aside .back').forEach(b=>b.addEventListener('click',e=>{
    e.stopPropagation(); const i=+b.closest('.row').dataset.p; delete aside[i]; renderList();
    toast('Put back.')}));
  const ah=$('ashow');
  if(ah) ah.addEventListener('click',()=>{const b=$('asideBox');
    b.classList.toggle('hide'); ah.textContent=b.classList.contains('hide')?'show':'hide'});
  wireList();
}
function rowHtml(i,isAside){
  const p=P[i];
  return '<div class="row'+(isAside?' aside':'')+'" data-p="'+i+'" tabindex="0">'+
    '<h3>'+esc(p.t)+'</h3><div class="m">'+esc(p.a)+' · '+p.y+' · '+p.c+' cites · '+esc(p.j)+'</div>'+
    (isAside?'<span class="back">put it back</span>':'')+'</div>';
}
$('send').addEventListener('click',()=>{const v=$('in').value.trim(); if(v)toast('Searching: “'+esc(v)+'”')});
$('in').addEventListener('keydown',e=>{if(e.key==='Enter'){const v=$('in').value.trim();
  if(v)toast('Searching: “'+esc(v)+'”')}});
init();
renderList();
</script>
</body>
</html>
"""

P = [
 dict(n="Wienert 2022", t="CRISPR nuclease off-target activity and mitigation strategies", a="B. Wienert",
      y=2022, c=46, j="Frontiers in Genome Editing", type="LITERATURE REVIEW", q=27, topic="mitigation strategies",
      ab="Reviews the sources of Cas9 off-target activity and the mitigation strategies available, from guide design through high-fidelity variants.",
      passage="large-scale aberrations have recently been reported… these are more difficult to detect using current workflows, indicating a major unmet need"),
 dict(n="Höijer 2021", t="CRISPR-Cas9 induces large structural variants at on- and off-target sites", a="I. Höijer",
      y=2021, c=149, j="Nature Communications", type="PRIMARY RESEARCH", q=19, topic="structural variants",
      ab="Long-read sequencing reveals large deletions and rearrangements that short-read, indel-focused assays systematically miss.",
      passage="long-read sequencing reveals large deletions and rearrangements that short-read, indel-focused assays systematically miss"),
 dict(n="Cancellieri 2022", t="Human genetic diversity alters off-target outcomes of therapeutic gene editing", a="S. Cancellieri",
      y=2022, c=98, j="Nature Genetics", type="PRIMARY RESEARCH", q=14, topic="population genetics",
      ab="Shows that individual genetic variation changes the off-target landscape, so a reference-genome analysis under-reports risk.",
      passage="individual genetic variation changes the off-target landscape, so a reference-genome analysis under-reports risk"),
 dict(n="Kalter 2025", t="Off-target effects in CRISPR-Cas genome editing for human therapeutics", a="N. Kalter",
      y=2025, c=56, j="Molecular Therapy Nucleic Acids", type="LITERATURE REVIEW", q=23, topic="detection standards",
      ab="Surveys detection methods for therapeutic editing and argues current standards do not agree on what counts as detected.",
      passage="current standards do not agree on what counts as detected"),
 dict(n="Angelini Stewart 2025", t="Measurement and clinical interpretation of CRISPR off-targets", a="A. Angelini Stewart",
      y=2025, c=6, j="Nature Genetics", type="LITERATURE REVIEW", q=11, topic="clinical interpretation",
      ab="Proposes a framework for interpreting off-target measurements clinically, including what to monitor after delivery.",
      passage="a framework for interpreting off-target measurements clinically, including what to monitor after delivery"),
 dict(n="Huang 2022", t="In vivo delivery of CRISPR-Cas9 genome editing components", a="K. Huang",
      y=2022, c=39, j="Biomaterials", type="LITERATURE REVIEW", q=8, topic="delivery",
      ab="Compares viral and lipid nanoparticle delivery for in vivo editing, and the tropism constraints each imposes.",
      passage="compares viral and lipid nanoparticle delivery for in vivo editing, and the tropism constraints each imposes"),
]
A = [
 dict(s="Several unresolved questions persist across detection, biological variability, structural variants, and clinical monitoring.", srcs=[0,3]),
 dict(s="Large rearrangements are systematically harder to detect than small indels.", srcs=[1]),
 dict(s="Individual genetic variation shifts the off-target landscape away from the reference genome.", srcs=[2]),
 dict(s="Nothing settles what should be monitored once an edit reaches a patient.", srcs=[4]),
 dict(s="Delivery remains the rate-limiting step for in vivo editing.", srcs=[5]),
]

OPTIONS = [
 dict(slug="ask-the-goal", name="A · Ask what they were after",
   tag="one paper · asks the goal · suggests, never fires",
   desc="The card asks a question rather than offering a verdict: <b>Not quite what you needed?</b> "
        "Answering it is three taps and no typing. You pick a goal, not a fault, and the reply is a "
        "search you can edit, run here, or take to a new chat. Nothing is removed either way. "
        "Hover a reference and move onto the card.",
   js=r"""
function cardExtra(i){
  if(card._stage==='goal'&&openOn===i) return goalStep(i);
  if(card._stage==='sug'&&openOn===i)
    return '<div class="step"><div class="qn">Try this instead</div>'+
      '<div class="hint">you said: '+esc(card._goal)+'</div>'+suggestBlock(card._q)+'</div>';
  if(card._stage==='free'&&openOn===i)
    return '<div class="step"><div class="qn">What were you looking for?</div>'+
      '<input id="sq" placeholder="In your words — a few words is plenty" style="width:100%;'+
      'border:1px solid var(--accent-bd);border-radius:.25rem;outline:0;font-family:inherit;'+
      'font-size:.69rem;padding:5px .5rem;margin-top:.5rem">'+
      '<div class="two"><button class="go" id="here">Search this thread</button>'+
      '<button id="fresh">Start a new chat</button><button class="later" id="later">not now</button></div></div>';
  return '<div class="act"><button class="softbtn" id="nq">Not quite what you needed? →</button></div>';
}
function wireCard(i){
  const nq=card.querySelector('#nq');
  if(nq) nq.addEventListener('click',e=>{e.stopPropagation();
    card._sticky=true; card._stage='goal'; show(i,rowOf(i))});
  if(card._stage==='goal') wireGoals(i,g=>{
    if(!g.q){card._stage='free'; show(i,rowOf(i)); const s=$('sq'); if(s){s.focus();
      s.addEventListener('click',e=>e.stopPropagation()); s.addEventListener('keydown',e=>e.stopPropagation())}
      wireSuggest(i); return}
    card._q=g.q; card._stage='sug'; show(i,rowOf(i));
  });
  if(card._stage==='sug'||card._stage==='free') wireSuggest(i,()=>{card._stage=null});
}
function listTop(){return ''}
function wireList(){}
function init(){card._stage=null}
"""),
 dict(slug="set-aside", name="B · Set aside first, ask later",
   tag="one is tidying · three is a pattern",
   desc="The click does something useful for the user rather than something for us: <b>Set aside</b> "
        "moves the paper into a collapsed group, reversibly. No dialog, no questions. Only once "
        "<b>three</b> have been set aside does a gentle line appear offering a different angle, "
        "because one miss in twenty is normal and three is a signal. Set aside three to see it.",
   js=r"""
function cardExtra(i){
  return '<div class="act"><button class="softbtn" id="sa">Set aside — not what I need</button></div>';
}
function wireCard(i){
  const b=card.querySelector('#sa');
  if(b) b.addEventListener('click',e=>{e.stopPropagation();
    aside[i]=1; hide(); renderList();
    const n=Object.keys(aside).length;
    toast(n<3?'Set aside. <span style="opacity:.7">Nothing is deleted — “put it back” any time.</span>'
             :'Set aside. That is three now, so there is a suggestion at the top of References.');
  });
}
function listTop(){
  const n=Object.keys(aside).length;
  if(n<3) return '';
  const i=+Object.keys(aside)[0];
  return '<div class="nudge" id="nudge"><div class="t"><b>Three of these are not landing.</b> '+
    'Want to try a different angle? The ones you kept stay exactly where they are.</div>'+
    '<div class="sub">nothing has changed yet</div>'+
    '<div class="goals">'+goals(i).map((g,k)=>'<button class="goal" data-g="'+k+'">'+esc(g.l)+'</button>').join('')+
    '</div><div id="nsug"></div></div>';
}
function wireList(){
  const nd=document.getElementById('nudge'); if(!nd) return;
  const i=+Object.keys(aside)[0];
  nd.querySelectorAll('.goal').forEach(b=>b.addEventListener('click',e=>{
    e.stopPropagation();
    nd.querySelectorAll('.goal').forEach(x=>x.classList.remove('on'));
    b.classList.add('on');
    const g=goals(i)[+b.dataset.g];
    card._goal=g.l;
    document.getElementById('nsug').innerHTML=suggestBlock(g.q||'');
    if(!g.q) document.getElementById('sq').value='';
    wireSuggest(i,()=>{});
  }));
}
function init(){}
"""),
 dict(slug="on-the-way-out", name="C · Catch it on the way out",
   tag="no button at all · learns from the re-search",
   desc="No control on the source, because the strongest signal is already free: a researcher who "
        "searches again without keeping anything has told you the results missed. Click into the "
        "composer and a single line rises above it, asking once. Ignore it and it goes away. "
        "<b>Click the search box below.</b>",
   js=r"""
function cardExtra(i){return ''}
function wireCard(i){}
function listTop(){return ''}
function wireList(){}
function init(){
  const pr=$('prompt');
  $('in').addEventListener('focus',()=>{
    if(pr._done||pr.classList.contains('on')) return;
    pr.innerHTML='<span class="x" id="px">dismiss</span>'+
      '<div class="t"><b>Searching again?</b> Nothing from the last twenty was opened or kept. '+
      'If you tell us what you were after, we can suggest a better wording.</div>'+
      '<div class="goals">'+goals(5).map((g,k)=>'<button class="goal" data-g="'+k+'">'+esc(g.l)+'</button>').join('')+
      '</div><div id="psug"></div>';
    pr.classList.add('on');
    $('px').addEventListener('click',()=>{pr.classList.remove('on');pr._done=1;
      toast('Fine — and noted. A search with nothing kept is a signal on its own.')});
    pr.querySelectorAll('.goal').forEach(b=>b.addEventListener('click',()=>{
      pr.querySelectorAll('.goal').forEach(x=>x.classList.remove('on'));
      b.classList.add('on');
      const g=goals(5)[+b.dataset.g];
      card._goal=g.l;
      document.getElementById('psug').innerHTML=suggestBlock(g.q||'');
      if(!g.q) document.getElementById('sq').value='';
      wireSuggest(5,()=>{pr.classList.remove('on');pr._done=1});
    }));
  });
}
"""),
 dict(slug="narrow-it", name="D · Offer the narrower search",
   tag="skips the question · goes straight to the fix",
   desc="Skips asking anything. The card offers the two or three narrowings that would have "
        "excluded this paper, each with what it would cost: <b>would drop 2 of 6, keep 4</b>. "
        "The user picks an outcome rather than describing a problem, and we learn the same thing "
        "from which one they pick.",
   js=r"""
const NARROW=[
 {l:"Only detection and measurement",k:["detection standards","structural variants","clinical interpretation"]},
 {l:"Only human or clinical work",k:["detection standards","clinical interpretation","population genetics"]},
 {l:"Published in the last three years",k:["detection standards","clinical interpretation"]}
];
function keeps(n){return P.map((p,i)=>i).filter(i=>n.k.includes(P[i].topic))}
function cardExtra(i){
  if(card._stage==='n'&&openOn===i){
    return '<div class="step"><div class="qn">Narrow it so this one drops out</div>'+
      '<div class="hint">pick the result you want — we work out the query</div>'+
      '<div class="goals">'+NARROW.map((n,k)=>{
        const kp=keeps(n), drop=6-kp.length;
        return '<button class="goal" data-n="'+k+'">'+esc(n.l)+
          '<span style="display:block;font-family:var(--mono);color:var(--muted);margin-top:2px">'+
          'would drop '+drop+' of 6, keep '+kp.length+'</span></button>'}).join('')+
      '</div><div id="nsug2"></div></div>';
  }
  return '<div class="act"><button class="softbtn" id="nq">Not quite? Narrow the search →</button></div>';
}
function wireCard(i){
  const nq=card.querySelector('#nq');
  if(nq) nq.addEventListener('click',e=>{e.stopPropagation();
    card._sticky=true; card._stage='n'; show(i,rowOf(i))});
  card.querySelectorAll('.goal[data-n]').forEach(b=>b.addEventListener('click',e=>{
    e.stopPropagation();
    const n=NARROW[+b.dataset.n];
    card._goal=n.l;
    document.getElementById('nsug2').innerHTML=
      suggestBlock(BASE.replace(/\?$/,'')+' — '+n.l.toLowerCase());
    wireSuggest(i,()=>{card._stage=null});
    place(rowOf(i));
  }));
}
function listTop(){return ''}
function wireList(){}
function init(){card._stage=null}
"""),
]

os.makedirs(OUT, exist_ok=True)
for k, o in enumerate(OPTIONS, 1):
    html = (TEMPLATE
        .replace("__NAME__", o["name"]).replace("__DESC__", o["desc"])
        .replace("__TAG__", o["tag"])
        .replace("__P__", json.dumps(P, ensure_ascii=False))
        .replace("__A__", json.dumps(A, ensure_ascii=False))
        .replace("__JS__", o["js"]))
    path = os.path.join(OUT, "redirect-%d-%s.html" % (k, o["slug"]))
    open(path, "w").write(html)
    print("wrote", path)
