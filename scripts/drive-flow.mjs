/* The canonical drive for prototypes/flow.html — walks the eleven-step demo
   script end to end and asserts the state at every beat.

     node scripts/drive-flow.mjs                     screenshots to /tmp
     SHOTS=research/screens node scripts/drive-flow.mjs

   Exits non-zero on any failed assertion or console error. */
import { chromium } from '/Users/treyfour/.claude/skills/gstack/node_modules/playwright-core/index.mjs';
const EXE='/Users/treyfour/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const OUT=(process.env.SHOTS||'/tmp')+'/';
const b=await chromium.launch({executablePath:EXE});
const p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:2});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:4599/flow.html'); await p.waitForTimeout(500);
let pass=0,fail=0;
const ok=(l,c,x)=>{c?(pass++,console.log('  ok   '+l)):(fail++,console.log('  FAIL '+l+(x?' :: '+x:'')))};
const shot=n=>p.screenshot({path:OUT+n});

console.log('\n1–2 · insert a chat, populate it');
ok('the thread starts empty', await p.evaluate(()=>!!document.querySelector('.blank')&&QUERIES.length===0));
ok('no "new" badge on Notes', await p.evaluate(()=>!document.querySelector('#tNotes .badge')));
ok('references say nothing retrieved yet',
  /nothing retrieved yet/.test(await p.evaluate(()=>document.getElementById('refSub').textContent)));
await shot('pG-1-empty.png');
await p.click('#seedBtn'); await p.waitForTimeout(200);
ok('the demo key fills the first question, does not fire it',
  await p.evaluate(()=>document.getElementById('askInput').value.startsWith('What are the open questions'))
  && await p.evaluate(()=>QUERIES.length===0));
await p.click('#sendBtn'); await p.waitForTimeout(1100);
ok('the captured answer arrives with the real funnel',
  /32\.8M retrieved · 100 eligible · 20 included/.test(
    await p.evaluate(()=>document.querySelector('#thread .funnel').textContent)));
ok('six references', await p.evaluate(()=>document.querySelectorAll('#refs .row').length)===6);
ok('no leftover thinking row', await p.evaluate(()=>!document.querySelector('.thinking')));
await shot('pG-2-answered.png');

console.log('\n3–4 · hover a citation, then a reference');
await p.hover('#thread .cite'); await p.waitForTimeout(350);
ok('hovering a citation in the answer explains it',
  await p.evaluate(()=>document.getElementById('whyCard').classList.contains('on')));
await p.mouse.move(10,10); await p.waitForTimeout(300);
await p.hover('#refs .row[data-p="0"]'); await p.waitForTimeout(350);
ok('hovering the panel reveals WHY THIS PAPER',
  await p.evaluate(()=>document.querySelector('.why .k')?.textContent==='WHY THIS PAPER'));
ok('with the passage and its count',
  /the closest of 27 matching lines/.test(await p.evaluate(()=>document.querySelector('.why .tagline').textContent)));

console.log('\n5–6 · keep, tag, filter, ask');
for(const i of [0,1,3]) await p.click('#refs .row[data-p="'+i+'"]');
await p.click('#barAdd'); await p.waitForTimeout(400);
ok('three cards, panel still closed', await p.evaluate(()=>CARDS.length===3
  && document.getElementById('notesPane').style.display==='none'));
ok('three sources became three separate cards',
  await p.evaluate(()=>CARDS.every(c=>c.srcs.length===1)));
/* a drop is confirmed, not negotiated: no popup, no offer to write */
ok('no popup', await p.evaluate(()=>!document.getElementById('dropPop')));
const tst=await p.evaluate(()=>({t:document.getElementById('toast').textContent,
  act:document.querySelector('#toast .tact')?.textContent}));
ok('the toast says it was added', /added to note/i.test(tst.t), tst.t);
ok('and offers View while the panel is closed', tst.act==='View', JSON.stringify(tst));
await p.click('#toast .tact'); await p.waitForTimeout(400);
ok('View opens the note',
  await p.evaluate(()=>document.getElementById('notesPane').style.display!=='none'));
await shot('pG-2b-added.png');
/* with the panel open there is nothing to navigate to, so no action */
await p.click('#refs .row[data-p="2"]'); await p.click('#barAdd'); await p.waitForTimeout(400);
ok('no View offered once the note is visible',
  await p.evaluate(()=>!document.querySelector('#toast .tact')));
await p.evaluate(()=>{CARDS=CARDS.filter(c=>c.srcs[0]!==2);render()});
await p.waitForTimeout(200);
ok('the switcher says this is a note from this thread',
  /from CRISPR Off Target Effects/.test(await p.evaluate(()=>document.getElementById('nsFrom').textContent)),
  await p.evaluate(()=>document.getElementById('nsFrom').textContent));
await p.evaluate(()=>{CARDS[0].tags=['ch.3'];CARDS[1].tags=['ch.3'];CARDS[2].tags=['methods'];render()});
await p.click('#filterBtn'); await p.waitForTimeout(300);
await p.type('#fq','ch.3'); await p.keyboard.press('Enter'); await p.waitForTimeout(400);
const vis=await p.evaluate(()=>document.querySelectorAll('#noteList .card:not(.hidden)').length);
const askTxt=await p.evaluate(()=>document.getElementById('askNote').textContent.trim());
ok('filtering narrows and Ask follows', vis===2 && / of /.test(askTxt), vis+' visible · '+askTxt);
await shot('pG-3-filtered.png');
await p.click('#askNote'); await p.waitForTimeout(250);
ok('the attachment names the filter',
  /filtered by ch\.3/.test(await p.evaluate(()=>document.getElementById('attLab').textContent)));

console.log('\n7–8 · a contextual message, further down the chat');
await p.click('#seedBtn'); await p.waitForTimeout(200);
ok('the demo key advances to the next scripted line',
  await p.evaluate(()=>document.getElementById('askInput').value.startsWith('Which of these disagree')),
  await p.evaluate(()=>document.getElementById('askInput').value));
await p.click('#sendBtn'); await p.waitForTimeout(1100);
ok('answered inside the note',
  /nothing new retrieved/.test(await p.evaluate(()=>document.querySelector('#thread .scoped-mark').textContent)));

console.log('\n9 · a new source is revealed, and kept');
const raised=await p.evaluate(()=>(QUERIES[QUERIES.length-1].refs.find(r=>r.raised)||{}).p);
ok('the answer raises a paper you had not kept', raised!=null, 'raised='+raised);
await p.evaluate(i=>document.querySelector('#refs .row[data-p="'+i+'"]').click(),raised);
await p.click('#barAdd'); await p.waitForTimeout(400);
ok('and it can be kept in one move',
  await p.evaluate(i=>[...new Set(CARDS.flatMap(c=>c.srcs))].includes(i),raised));

console.log('\n10 · file it, then open My Library from where it went');
await p.evaluate(()=>{activeTags.clear();query='';render()});
await p.click('#libBtn'); await p.waitForTimeout(300);
const picker=await p.evaluate(()=>[...document.querySelectorAll('#collPop button')].map(b=>b.textContent.trim()));
/* one collection, flat — filing is a click, not a decision */
ok('the picker is one collection, flat',
  picker.length===1 && /CRISPR off-target effects/.test(picker[0]), JSON.stringify(picker));
await p.click('#collPop button'); await p.waitForTimeout(350);
ok('the header button becomes where it went',
  /⊞ CRISPR off-target effects/.test(await p.evaluate(()=>document.getElementById('libBtn').textContent)),
  await p.evaluate(()=>document.getElementById('libBtn').textContent));
await p.click('#libBtn'); await p.waitForTimeout(400);
ok('and clicking it opens that collection in My Library',
  await p.evaluate(()=>document.getElementById('libScreen').classList.contains('on')
    && document.getElementById('libTitle').textContent==='CRISPR off-target effects'));
await shot('pG-4-library.png');

console.log('\n11 · two notes, into a new chat');
await p.evaluate(()=>[...document.querySelectorAll('.tab')].find(t=>/Notes/.test(t.textContent)).click());
await p.waitForTimeout(350);
const rows=await p.evaluate(()=>[...document.querySelectorAll('.nrow h3')].map(h=>h.textContent));
ok('both notes are listed', rows.length===2, JSON.stringify(rows));
await p.evaluate(()=>document.querySelectorAll('.nrow').forEach(r=>r.querySelector('.gchk').click()));
await p.waitForTimeout(300);
ok('selecting both raises the composer',
  await p.evaluate(()=>document.getElementById('notebar').classList.contains('on')));
await p.fill('#nAsk','which of these is load bearing');
await p.keyboard.press('Enter'); await p.waitForTimeout(450);
/* the last beat leaves My Library — asking is something that happens in a thread */
ok('sending lands in the chat', await p.evaluate(()=>
  document.getElementById('threadScreen').classList.contains('on')
  && !document.getElementById('libScreen').classList.contains('on')));
ok('with both notes attached as scope',
  /2 notes · .* cards · .* sources/.test(await p.evaluate(()=>document.querySelector('#thread .att').textContent)),
  await p.evaluate(()=>document.querySelector('#thread .att').textContent));
ok('the question you typed is the turn',
  /load bearing/.test(await p.evaluate(()=>document.querySelector('#thread .q').textContent)));
ok('and the comparison is the answer',
  await p.evaluate(()=>!!document.querySelector('#thread .join')
    && document.querySelectorAll('#thread .blk q').length===2));
ok('References becomes what the two notes kept',
  await p.evaluate(()=>document.querySelectorAll('#refs .row').length>0
    && /nothing retrieved/.test(document.querySelector('#thread .scoped-mark').textContent)));
await shot('pG-5-compare.png');

console.log('\nswitching notes');
/* the last beat deliberately leaves Notes closed — the user is just searching */
ok('Notes is closed after landing in the chat',
  await p.evaluate(()=>document.getElementById('notesPane').style.display==='none'));
await p.click('#tNotes'); await p.waitForTimeout(300);
await p.click('#noteSwitch'); await p.waitForTimeout(250);
const sw=await p.evaluate(()=>[...document.querySelectorAll('#cardMenu button')].map(b=>b.textContent));
ok('the switcher lists both notes and offers a new one',
  sw.length===3 && /New note/.test(sw[2]), JSON.stringify(sw));
await p.evaluate(()=>[...document.querySelectorAll('#cardMenu button')][1].click());
await p.waitForTimeout(350);
ok('switching changes which note you write into',
  /Post-delivery monitoring/.test(await p.evaluate(()=>document.getElementById('nsFrom').textContent)),
  await p.evaluate(()=>document.getElementById('nsFrom').textContent));
ok('and its cards come with it', await p.evaluate(()=>CARDS.length===2));
await shot('pG-6-switched.png');


/* the detail checks run from a clean load so they do not depend on where the
   eleven-step walk happened to leave the app */
console.log('\nDETAIL · from a fresh load');
await p.goto('http://localhost:4599/flow.html'); await p.waitForTimeout(400);
await p.click('#seedBtn'); await p.click('#sendBtn'); await p.waitForTimeout(1100);

console.log('\nDETAIL · the funnel opens onto the three real sub-queries');
await p.evaluate(()=>document.querySelector('#thread .funnel .more')?.click());
await p.waitForTimeout(250);
const sq=await p.evaluate(()=>document.querySelector('.subq.on')?.textContent);
ok('31.7M / 656.6K / 442.8K are all there',
  sq&&/31\.7M/.test(sq)&&/656\.6K/.test(sq)&&/442\.8K/.test(sq), (sq||'').slice(0,50));
ok('and it says they are discarded today', /discards it/.test(sq||''));

console.log('\nDETAIL · what the hover card can do');
await p.hover('#refs .row[data-p="0"]'); await p.waitForTimeout(350);
const acts=await p.evaluate(()=>[...document.querySelectorAll('.rowacts .mini')].map(b=>b.textContent.trim()));
ok('it offers Ask and Add to note, in the product’s words',
  JSON.stringify(acts)==='["💬 Ask","＋ Add to note"]', JSON.stringify(acts));
await p.click('#whyAsk'); await p.waitForTimeout(300);
ok('Ask from the hover card attaches just that paper',
  /1 attached · Wienert 2022/.test(await p.evaluate(()=>document.getElementById('attLab').textContent)),
  await p.evaluate(()=>document.getElementById('attLab').textContent));
await p.click('#attX');

console.log('\nDETAIL · the way out of a wrong reference');
await p.hover('#refs .row[data-p="0"]'); await p.waitForTimeout(350);
await p.click('#missBtn'); await p.waitForTimeout(250);
ok('it asks the goal, not the fault',
  /what were you hoping to find/i.test(await p.evaluate(()=>document.querySelector('.goals .lab').textContent)));
await p.click('.goal'); await p.waitForTimeout(300);
const sug=await p.evaluate(()=>({v:document.getElementById('sq')?.value,
  keep:document.querySelector('.keep')?.textContent,
  btns:[...document.querySelectorAll('.two button')].map(b=>b.textContent)}));
ok('the suggested search is editable', (sug.v||'').length>10, sug.v);
ok('nothing is removed either way', /nothing is removed/.test(sug.keep||''));
ok('offered, never fired', sug.btns.length===3, JSON.stringify(sug.btns));
await p.keyboard.press('Escape'); await p.waitForTimeout(200);
ok('escape leaves the reference intact',
  await p.evaluate(()=>!document.getElementById('whyCard').classList.contains('on')
    && document.querySelectorAll('#refs .row').length===6));

console.log('\nDETAIL · one control per card');
await p.click('#refs .row[data-p="0"]'); await p.click('#barAdd'); await p.waitForTimeout(400);
await p.click('#tNotes'); await p.waitForTimeout(400);
ok('a corner control, no actions row',
  await p.evaluate(()=>{const c=document.querySelector('#noteList .card');
    return c.querySelectorAll('.cardmore').length===1 && !c.querySelector('.cardacts')}));
await p.evaluate(()=>document.querySelector('#noteList .card .cardmore').click());
await p.waitForTimeout(250);
const menu=await p.evaluate(()=>[...document.querySelectorAll('#cardMenu button')].map(b=>b.textContent));
ok('Ask and Delete both live in the menu',
  menu.some(m=>/Ask this card/.test(m)) && menu.some(m=>/Delete this card/.test(m)), JSON.stringify(menu));
await p.evaluate(()=>document.getElementById('cardMenu').classList.remove('on'));

console.log('\nconsole: '+(errs.length?errs.join(' | '):'clean'));
if(errs.length)fail++;
console.log(pass+' passed, '+fail+' failed');
await b.close(); process.exit(fail?1:0);
