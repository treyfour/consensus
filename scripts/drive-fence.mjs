/* Drives the real scenario in every fence option and asserts the scoped state
   actually changes retrieval — not just the decoration. */
import { chromium } from '/Users/treyfour/.claude/skills/gstack/node_modules/playwright-core/index.mjs';
const EXE='/Users/treyfour/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const FILES=['option-29-hairline','option-30-composer','option-31-ambient','option-32-pill','option-33-funnel'];
const b=await chromium.launch({executablePath:EXE});
let pass=0,fail=0;
const ok=(l,c,x)=>{c?(pass++,console.log('  ok   '+l)):(fail++,console.log('  FAIL '+l+(x?' :: '+x:'')))};

for(const f of FILES){
  console.log('\n'+f);
  const p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:2});
  const errs=[]; p.on('pageerror',e=>errs.push(e.message));
  p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
  await p.goto('http://localhost:4603/'+f+'.html');
  await p.waitForTimeout(400);
  const st=()=>p.evaluate(()=>({
    fenced:!!FENCE, fsrcs:FENCE?FENCE.srcs.slice():null,
    turns:TURNS.length,
    refSub:document.getElementById('refSub').textContent,
    outCount:document.querySelectorAll('#refs .src.out').length,
    lastFunnel:[...document.querySelectorAll('#turns .funnel')].pop().textContent,
    fencedTurns:document.querySelectorAll('#turns .turn.fenced').length,
    cards:document.querySelectorAll('#note .card').length,
    hdState:document.getElementById('hdState').textContent
  }));
  let s=await st();
  ok('starts unscoped', s.fenced===false && /everything retrieved/.test(s.refSub), s.refSub);
  ok('eight turns seeded', s.turns===8, ''+s.turns);
  ok('no source is dimmed before scoping', s.outCount===0, ''+s.outCount);

  // narrow: pick three sources and add them to the note
  await p.click('#refs .src[data-p="1"]');
  await p.click('#refs .src[data-p="3"]');
  await p.click('#refs .src[data-p="4"]');
  await p.waitForTimeout(150);
  ok('the bar says what the add will do',
    /Add 3 to note — and search only these/.test(await p.evaluate(()=>document.getElementById('barAdd').textContent)));
  await p.click('#barAdd'); await p.waitForTimeout(400);
  s=await st();
  ok('a note card was created', s.cards===1, ''+s.cards);
  ok('the fence is set to those three', s.fenced && JSON.stringify(s.fsrcs)==='[1,3,4]', JSON.stringify(s.fsrcs));
  ok('References now says it is scoped', /your 3 sources only/.test(s.refSub), s.refSub);
  ok('the three excluded sources are dimmed', s.outCount===3, ''+s.outCount);
  /* option 33 states the fence only in an answer's funnel line, so at the moment
     of narrowing it has nothing to say. That is the intrinsic cost of the approach
     and it is asserted here rather than treated as a bug. */
  const speaksNow=await p.evaluate(()=>!!document.querySelector('.fence, .fchip.on, .scopetag, [data-eject]'));
  if(f==='option-33-funnel')
    ok('KNOWN COST — says nothing at the moment of narrowing', speaksNow===false, 'it spoke, so the cost is gone');
  else
    ok('the fence is visible the moment it is set, before asking anything', speaksNow, 'no fence marker rendered');
  ok('no source reads "0 of 0"',
    !(await p.evaluate(()=>[...document.querySelectorAll('#refs .p')].some(e=>/0 of 0/.test(e.textContent)))));
  await p.screenshot({path:'/tmp/'+f+'-scoped.png',fullPage:true});

  // ask inside the fence
  await p.fill('#askInput','how large are the deletions these assays under-report');
  await p.click('#sendBtn'); await p.waitForTimeout(500);
  s=await st();
  ok('the new turn is inside the fence', s.turns===9 && s.fencedTurns>=1, s.turns+'/'+s.fencedTurns);
  ok('its funnel states the scope, not a new retrieval',
    /your 3 sources/.test(s.lastFunnel) && /nothing new retrieved/.test(s.lastFunnel), s.lastFunnel);
  const cited=await p.evaluate(()=>{
    const t=TURNS[TURNS.length-1]; return t.refs.map(r=>r.p);
  });
  ok('retrieval really was limited to the three', cited.every(x=>[1,3,4].includes(x)), JSON.stringify(cited));

  // eject
  const ejected=await p.evaluate(()=>{
    const b=document.querySelector('.fence .out')||document.getElementById('fchipX')
      ||document.querySelector('.scopetag button')||document.querySelector('[data-eject]');
    if(!b) return 'no eject control found';
    b.click(); return 'clicked';
  });
  ok('an eject control exists and is reachable', ejected==='clicked', ejected);
  await p.waitForTimeout(400);
  s=await st();
  ok('ejecting restores the full corpus', s.fenced===false && /everything retrieved/.test(s.refSub), s.refSub);
  ok('ejecting keeps the note', s.cards===1, ''+s.cards);
  ok('ejecting keeps every turn', s.turns===9, ''+s.turns);
  ok('no console errors', errs.length===0, errs.join(' | '));
  await p.close();
}
console.log('\n'+pass+' passed, '+fail+' failed');
await b.close();
process.exit(fail?1:0);
