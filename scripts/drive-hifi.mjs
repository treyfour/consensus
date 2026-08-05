/* The canonical drive for prototypes/hifi.html — the same five acts as the
   lo-fi, walked end to end inside Consensus's real shell.

     node scripts/drive-hifi.mjs                      screenshots to /tmp
     SHOTS=research/screens node scripts/drive-hifi.mjs

   Exits non-zero on any failed assertion or console error. */
import { chromium } from '/Users/treyfour/.claude/skills/gstack/node_modules/playwright-core/index.mjs';
const EXE='/Users/treyfour/Library/Caches/ms-playwright/chromium_headless_shell-1234/chrome-headless-shell-mac-arm64/chrome-headless-shell';
const OUT=(process.env.SHOTS||'/tmp')+'/';
const b=await chromium.launch({executablePath:EXE});
const p=await b.newPage({viewport:{width:1440,height:900},deviceScaleFactor:2});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:4599/hifi.html'); await p.waitForTimeout(500);
let pass=0,fail=0;
const ok=(l,c,x)=>{c?(pass++,console.log('  ok   '+l)):(fail++,console.log('  FAIL '+l+(x?' :: '+x:'')))};
const shot=n=>p.screenshot({path:OUT+n});
const txt=s=>p.evaluate(x=>document.querySelector(x)?.textContent||'',s);
const n=s=>p.evaluate(x=>document.querySelectorAll(x).length,s);
/* Notes is its own column now, so opening it is a state, not a toggle */
const openNotes=async()=>{if(!await p.evaluate(()=>showNotes)){
  await p.click('#btnNotes'); await p.waitForTimeout(250)}};

console.log('\n0 · the shell is theirs');
ok('the product sidebar, not a rail',
  await p.evaluate(()=>[...document.querySelectorAll('.sb .nav')].map(b=>b.textContent))
    .then(v=>v.join('|').includes('New Thread')&&v.join('|').includes('My Library')));
ok('Pro quota and Upgrade are present', /4 \/ 15 Pro messages left/.test(await txt('.quota')));
ok('Notes sits beside References in the thread header',
  await p.evaluate(()=>{const h=[...document.querySelectorAll('.thd .pill')].map(b=>b.textContent.trim());
    return h[0].startsWith('Notes')&&h[1]==='References'&&h[2]==='Share'}));
ok('the header is not tight with one panel open',
  await p.evaluate(()=>!document.querySelector('.thd').classList.contains('tight')));
ok('the composer carries Corpus and Deep',
  /Corpus/.test(await txt('#btnCorpus'))&&/Deep/.test(await txt('#btnDeep')));
ok('the drawer shows References; Notes is a separate column, closed',
  await p.evaluate(()=>dmode==='refs'&&showNotes===false
  &&getComputedStyle(document.getElementById('notesPane')).display==='none'
  &&getComputedStyle(document.getElementById('mPaper')).display==='none'));
await shot('h-0-shell.png');

console.log('\n1–2 · ask, and get the trace the product already computes');
ok('the thread starts empty', await p.evaluate(()=>!!document.querySelector('.blank')&&QUERIES.length===0));
await p.click('#seedBtn'); await p.waitForTimeout(150);
ok('the walkthrough key fills the question without firing it',
  await p.evaluate(()=>document.getElementById('askInput').value.startsWith('What are the open questions')
    &&QUERIES.length===0));
await p.click('#sendBtn'); await p.waitForTimeout(1100);
ok('no leftover thinking row', await p.evaluate(()=>!document.querySelector('.thinking')));
ok('the real funnel, as three cells',
  await p.evaluate(()=>[...document.querySelectorAll('.funnel .cell')]
    .map(c=>c.querySelector('b').textContent.trim()+' '+c.querySelector('span').textContent).join(' · '))
    .then(v=>/32\.8M Retrieved · 100 Eligible · 20 Included/.test(v)));
ok('the three literal sub-queries with their pools',
  await p.evaluate(()=>[...document.querySelectorAll('.step')].map(s=>s.textContent).join('|'))
    .then(v=>v.includes('31.7M')&&v.includes('656.6K')&&v.includes('442.8K')));
ok('and the sentence that says it is thrown away',
  /discards it/.test(await txt('.discard')));
ok('six references', await n('#refs .ref')===6);
ok('the evidence-coverage table came with the answer', await n('.ev tbody tr')===3);
ok('citation chips are in the prose', await n('.ans .cite')>0);
await shot('h-1-answered.png');

console.log('\n2 · why this paper, in their card');
await p.hover('#refs .ref[data-p="0"]'); await p.waitForTimeout(400);
ok('the hover card opens', await p.evaluate(()=>document.getElementById('whyCard').classList.contains('on')));
ok('WHY THIS PAPER, in the accent', await txt('#whyCard .why .k')==='WHY THIS PAPER');
ok('the passage is the paper\'s own words',
  /large-scale aberrations/.test(await txt('#whyCard .why q')));
ok('and it names the search that found it',
  /the closest of 27 matching lines · found by/.test(await txt('#whyCard .why .tag')));
ok('the actions sit at the foot: Ask, Add to note, Open paper',
  await p.evaluate(()=>[...document.querySelectorAll('#whyCard .rowacts button')]
    .map(x=>x.textContent.trim()).join('|')).then(v=>v==='Ask|Add to note|Open paper'));
ok('no "keep it" anywhere', !(await p.content()).includes('Keep it'));
await shot('h-2-why.png');
await p.click('#missBtn'); await p.waitForTimeout(150);
ok('the way out asks the goal, not the fault', /what were you hoping to find/.test(await txt('#goals .lab')));
await p.click('#goals .goal'); await p.waitForTimeout(150);
ok('and hands back an editable search',
  await p.evaluate(()=>document.getElementById('sq').value.length>10));
ok('nothing is removed either way', /nothing is removed either way/.test(await txt('.sug .keep')));
await shot('h-3-redirect.png');
await p.keyboard.press('Escape'); await p.waitForTimeout(200);

console.log('\n3 · the reference card carries provenance the product throws away');
ok('rank badge is theirs', await txt('#refs .ref[data-p="0"] .rank')==='1');
ok('KEY TAKEAWAY is theirs', /KEY TAKEAWAY/.test(await txt('#refs .ref[data-p="0"] .kt')));
ok('27 SUPPORTING QUOTES is theirs',
  /27 SUPPORTING QUOTES/.test(await txt('#refs .ref[data-p="0"] .badges')));
ok('recurrence is ours, in their badge grammar',
  /THIS SEARCH/.test(await txt('#refs .ref[data-p="0"] .badge.rec')));

console.log('\n4 · keep three as one card, without opening the panel');
for(const i of [0,1,3]) await p.click('#refs .ref[data-p="'+i+'"] .chk');
ok('the panel\'s own control row becomes the selection actions',
  /3 selected/.test(await txt('#refSelN'))
  && await p.evaluate(()=>getComputedStyle(document.getElementById('refIdle')).display==='none'));
await p.click('#selAdd'); await p.waitForTimeout(400);
ok('one card, because they were selected as a set',
  await p.evaluate(()=>CARDS.length===1&&CARDS[0].srcs.length===3));
ok('the drawer never left References', await p.evaluate(()=>dmode==='refs'));
ok('the toast counts what it added', /3 sources added to note/.test(await txt('#toast')));
ok('and offers to show it', await txt('#toast .tact')==='View');
ok('the kept papers now say so in References',
  await n('#refs .badge.kept')===3);
ok('the Notes button carries the count', /Notes\s*1/.test(await txt('#btnNotes')));
await shot('h-4-kept.png');

console.log('\n5 · Notes is the third thing the drawer can be');
await p.click('#toast .tact'); await p.waitForTimeout(350);
ok('View opened the Notes column', await p.evaluate(()=>showNotes===true));
/* the whole point of the change: References does not go away to make room */
ok('References is still on screen beside it',
  await p.evaluate(()=>dmode==='refs'
    &&getComputedStyle(document.getElementById('mRefs')).display!=='none'));
ok('Notes sits to the LEFT of the drawer',
  await p.evaluate(()=>document.getElementById('notesPane').getBoundingClientRect().right
    <=document.getElementById('drawer').getBoundingClientRect().left+1));
ok('its header reads Notes / the thread it belongs to',
  /CRISPR Off Target Effects/.test(await txt('#nSwitchLab')));
ok('three columns fit the viewport', await p.evaluate(()=>{
  const d=document.getElementById('drawer').getBoundingClientRect();
  const t=document.querySelector('.mid').getBoundingClientRect();
  return Math.round(d.right)<=window.innerWidth&&t.width>380}));
/* the header must not bleed into the Notes column it now sits next to */
ok('the header sheds its labels rather than overflowing', await p.evaluate(()=>{
  const thd=document.querySelector('.thd'), mid=document.querySelector('.mid');
  const last=document.getElementById('btnShare').getBoundingClientRect();
  return thd.classList.contains('tight')
    && Math.round(last.right)<=Math.round(mid.getBoundingClientRect().right)+1
    && thd.scrollWidth<=thd.clientWidth+1}));
ok('and every control is still there, and visible',
  await p.evaluate(()=>[...document.querySelectorAll('.thd .pill,.thd .ghostbtn')]
    .every(b=>b.getBoundingClientRect().width>0))
  && await n('.thd .pill')===3 && await n('.thd .ghostbtn')===3);
ok('the card shows its three sources', await n('#noteList .card .pin')===3);
ok('the write-a-note field is above the cards',
  await p.evaluate(()=>document.getElementById('ncomp').compareDocumentPosition(
    document.getElementById('noteList'))&Node.DOCUMENT_POSITION_FOLLOWING?true:false));
await p.fill('#cText','Detection is the disagreement, not the biology.');
await p.keyboard.press('Enter'); await p.waitForTimeout(250);
ok('typing alone makes a card', await p.evaluate(()=>CARDS.length===2&&!CARDS[0].srcs.length));
await shot('h-5-notes.png');

console.log('\n6 · tag, filter, and ask what the filter left');
await p.click('#noteList .card:nth-of-type(2) .tag.add'); await p.waitForTimeout(200);
await p.fill('#tagPop input','methods');
await p.keyboard.press('Enter'); await p.waitForTimeout(250);
ok('Enter commits the tag', await p.evaluate(()=>CARDS.some(c=>c.tags.includes('methods'))));
await p.click('#filterBtn'); await p.waitForTimeout(200);
await p.fill('#fq','methods');
await p.keyboard.press('Enter'); await p.waitForTimeout(250);
ok('the filter narrows the note', await p.evaluate(()=>activeTags.has('methods')));
ok('and Ask follows the filter', /Ask\s*3 of 3/.test(await txt('#askNote')));
ok('the active filter is shown as a chip', await n('#chips .chip')===1);
await shot('h-6-filtered.png');
await p.click('#chips .chip'); await p.waitForTimeout(200);
ok('the chip clears it', await p.evaluate(()=>!activeTags.size));

console.log('\n7 · asking attaches the note as scope');
await p.click('#askNote'); await p.waitForTimeout(250);
ok('the composer shows how many sources are attached',
  /3 sources from your note/.test(await txt('#compAtt')), await txt('#compAtt'));
/* the whole point: it names the other kind of thing it is NOT sending */
ok('and names the comments it is leaving out',
  /sources only · your 1 comment stays out/.test(await txt('#compAtt')), await txt('#compAtt'));
ok('including them is an opt-in, off by default',
  await p.evaluate(()=>document.getElementById('inclComments').classList.contains('show')
    &&!document.getElementById('inclComments').classList.contains('on')));
ok('the opt-in says comments, not notes',
  /include 1 comment/.test(await txt('#inclComments')), await txt('#inclComments'));
await p.click('#inclComments'); await p.waitForTimeout(200);
ok('and it can be turned on', await p.evaluate(()=>inclComments===true));
ok('the chip now says the comment goes with it',
  /with 1 comment you wrote/.test(await txt('#compAtt')), await txt('#compAtt'));
ok('and it still says where the sources came from',
  /3 sources from your note/.test(await txt('#compAtt')), await txt('#compAtt'));
await shot('h-7-attached.png');
await p.fill('#askInput','Which of these disagree about what counts as a detected off-target?');
await p.click('#sendBtn'); await p.waitForTimeout(1100);
ok('the scoped answer says it retrieved nothing',
  /nothing new retrieved/.test(await txt('.turn:last-child .scopeline')));
ok('and that the comment went in with them',
  /1 comment of yours included/.test(await txt('.turn:last-child .scopeline')),
  await txt('.turn:last-child .scopeline'));
ok('the drawer came back to References for the new answer', await p.evaluate(()=>dmode==='refs'));

console.log('\n8 · a scoped answer may name a paper you did not keep');
const raised=await p.evaluate(()=>{const q=QUERIES[QUERIES.length-1];
  const r=q.refs.find(x=>x.raised); return r?P[r.p].n:null});
ok('it raised one', !!raised, String(raised));
ok('and it is Cancellieri, computed not hardcoded', raised==='Cancellieri 2022', String(raised));
ok('it appears in References marked not kept',
  /RAISED BY THE ANSWER · NOT IN YOUR NOTE/.test(await txt('#refs .badge.notkept')));
ok('carrying no rank, because it was not retrieved for you',
  await p.evaluate(()=>!!document.querySelector('#refs .ref .rank.none')));
ok('the attachment cleared after sending', await p.evaluate(()=>attached===null));
await shot('h-8-raised.png');

/* asking a paper is not asking your note, so no comment prompt appears */
await p.click('#refs .ref[data-p="2"] .chk'); await p.waitForTimeout(150);
await p.click('#selAsk'); await p.waitForTimeout(250);
ok('asking a paper from References offers no comments',
  await p.evaluate(()=>attachedCards.length===0
    &&!document.getElementById('inclComments').classList.contains('show')));
ok('and its chip does not mention them', !/comment/.test(await txt('#compAtt')), await txt('#compAtt'));
await p.click('#compAtt .x'); await p.waitForTimeout(200);

console.log('\n9 · the paper drawer is theirs, with one verb added');
await p.click('#refs .ref[data-p="0"] h3'); await p.waitForTimeout(300);
ok('the drawer became the Paper', await p.evaluate(()=>dmode==='paper'));
ok('their five-tab head', await p.evaluate(()=>[...document.querySelectorAll('#pTabs .tab')]
  .map(t=>t.textContent).join('|')).then(v=>v==='Overview|Snapshot|Attachment|Evidence (27)|Metadata'));
ok('DOI, journal, SJR dots and citations are there',
  /10\.3389/.test(await txt('#pBody'))&&await n('.dots4 i')===4);
ok('the action bar reads Ask · Add to note · Save',
  await p.evaluate(()=>[...document.querySelectorAll('#pBar .pill')].map(x=>x.textContent.trim()).join('|'))
    .then(v=>v.startsWith('Ask|Add to note|Save')));
await shot('h-9-paper.png');
await p.click('#pQuotes'); await p.waitForTimeout(250);
ok('the supporting-quotes pill opens Evidence',
  await p.evaluate(()=>pTab==='evidence'));
ok('and WHY THIS PAPER heads it', await txt('#pBody .why .k')==='WHY THIS PAPER');
ok('rank is explained as per-search', /Rank is per search/.test(await txt('#pBody .hint')));
await shot('h-10-evidence.png');

console.log('\n10 · file the note into a collection');
await openNotes();
await p.click('#libBtn'); await p.waitForTimeout(250);
ok('the picker is the product\'s own Save popover',
  /Saved to My Library/.test(await txt('#collPop')));
ok('with Add to Collection underneath', /ADD TO COLLECTION/.test(await txt('#collPop')));
ok('and a search across collections',
  await p.evaluate(()=>document.querySelector('#collPop input').placeholder)==='Search your Collections…');
await shot('h-11-file.png');
await p.click('#collPop > div:last-child button'); await p.waitForTimeout(300);
ok('the note is filed', await p.evaluate(()=>savedTo==='CRISPR off-target effects'));
ok('the toast offers the way there', await txt('#toast .tact')==='Open');

console.log('\n11 · My Library, and comparing two notes');
await p.click('#navLib'); await p.waitForTimeout(350);
ok('the sidebar became the library sidebar',
  await p.evaluate(()=>getComputedStyle(document.getElementById('sbLib')).display!=='none'
    &&getComputedStyle(document.getElementById('sbThread')).display==='none'));
ok('collections are a tree in the sidebar, not a breadcrumb',
  await n('#tree .collrow')===1);
await p.click('#tree .collrow'); await p.waitForTimeout(300);
ok('the title is their breadcrumb', /My Library \/ CRISPR off-target effects/.test(await txt('#libTitle')));
ok('their two tabs, plus ours',
  await p.evaluate(()=>[...document.querySelectorAll('#libTabs .tab')].map(t=>t.textContent).join('|'))
    .then(v=>/^Items \(\d+\)\|Threads \(\d+\)\|Notes \(\d+\)$/.test(v)), await txt('#libTabs'));
await shot('h-12-library.png');
await p.click('#libTabs .tab:nth-child(1)'); await p.waitForTimeout(250);
ok('Items says why each paper is in the library',
  /kept by 1 note · “/.test(await txt('#itb tr .sub')));
await p.click('#libTabs .tab:nth-child(3)'); await p.waitForTimeout(250);
ok('two notes from two threads', await n('#ntb tr')===2);
for(const k of [1,2]) await p.click('#ntb tr:nth-child('+k+') .gchk');
ok('the selection pill counts cards and sources',
  /2 selected · \d+ cards · \d+ sources/.test(await txt('#selN')), await txt('#selN'));
await shot('h-13-two-notes.png');
await p.fill('#nAsk','Where do these lines of enquiry actually disagree?');
await p.click('#nGo'); await p.waitForTimeout(600);
ok('asking left My Library for the thread', await p.evaluate(()=>screen==='thread'));
ok('the thread is renamed after both notes', /\+/.test(await txt('#threadName')));
ok('the comparison names the shared source', /THE JOIN/.test(await txt('.cmp .join .k')));
ok('it quotes what you actually wrote', await n('.cmp .blk q')===2);
ok('and lists what only one note holds', await n('.cmp .grid2 .col')===2);
ok('References became the union of both notes',
  await p.evaluate(()=>QUERIES[0].refs.length)>=4);
ok('the note panel is a fresh one, not one of the compared',
  await p.evaluate(()=>CARDS.length===0));
/* a long combined title must truncate, not push the drawer off screen */
ok('the drawer still fits the viewport',
  await p.evaluate(()=>{const r=document.getElementById('drawer').getBoundingClientRect();
    return Math.round(r.right)<=window.innerWidth&&r.width>300}));
await shot('h-14-compare.png');
ok('the comparison got the room — the Notes column closed itself',
  await p.evaluate(()=>showNotes===false));
await openNotes();
ok('and it opens empty, with no count', /· empty/.test(await txt('#nSwitchLab')));
ok('no empty quote marks pretending you wrote something',
  await p.evaluate(()=>!document.querySelector('#noteList .card')));
await shot('h-15-fresh-note.png');

console.log('\n12 · details from a clean load');
await p.goto('http://localhost:4599/hifi.html'); await p.waitForTimeout(400);
await p.click('#seedBtn'); await p.click('#sendBtn'); await p.waitForTimeout(1100);
/* dropping onto the Notes button, because the drawer holds one thing at a time */
const from=await p.evaluate(()=>{const r=document.querySelector('#refs .ref[data-p="1"]')
  .getBoundingClientRect(); return {x:r.x+40,y:r.y+20}});
const to=await p.evaluate(()=>{const r=document.getElementById('btnNotes')
  .getBoundingClientRect(); return {x:r.x+r.width/2,y:r.y+r.height/2}});
await p.mouse.move(from.x,from.y); await p.mouse.down();
await p.mouse.move(to.x,to.y,{steps:12}); await p.waitForTimeout(120);
await p.mouse.up(); await p.waitForTimeout(400);
ok('a reference dropped on the Notes button is kept',
  await p.evaluate(()=>CARDS.length===1&&CARDS[0].srcs[0]===1));
ok('one source reads "Added to note", singular', /^Added to note/.test(await txt('#toast')));
await openNotes();
await p.click('#noteList .card .cardmore'); await p.waitForTimeout(200);
ok('the card menu holds Ask, Tag, Collection, Copy, Delete',
  await p.evaluate(()=>[...document.querySelectorAll('#menu button')].map(x=>x.textContent.trim()).join('|'))
    .then(v=>/Ask this card/.test(v)&&/Tag…/.test(v)&&/Add to a collection/.test(v)
      &&/Copy citations/.test(v)&&/Delete this card/.test(v)));
await p.keyboard.press('Escape');
await p.click('#nSwitch'); await p.waitForTimeout(250);
ok('the note switcher lists every note and offers a new one',
  await p.evaluate(()=>[...document.querySelectorAll('#menu button')].map(x=>x.textContent).join('|'))
    .then(v=>v.includes('CRISPR Off Target Effects')&&v.includes('Post-delivery monitoring in vivo')
      &&v.includes('New note in this thread')));
await p.keyboard.press('Escape'); await p.waitForTimeout(150);
await p.click('#dSwitch'); await p.waitForTimeout(250);
ok('the same switcher in References picks the query',
  /REFERENCES FOR/.test(await txt('#menu')));
ok('and offers the union, recurrence only', /no single rank/.test(await txt('#menu')));
await p.keyboard.press('Escape'); await p.waitForTimeout(150);
await p.click('#btnRefs'); await p.waitForTimeout(200);
ok('pressing References again closes the drawer',
  await p.evaluate(()=>!document.getElementById('drawer').classList.contains('on')));
ok('closing the drawer left the Notes column open', await p.evaluate(()=>showNotes===true));
await p.click('#btnNotes'); await p.waitForTimeout(200);
ok('and Notes closes independently of it',
  await p.evaluate(()=>showNotes===false
    &&!document.getElementById('drawer').classList.contains('on')));

console.log('\n13 · no raw hex, no dark-mode leak');
const raw=await p.evaluate(()=>{
  const out=new Set();
  for(const r of document.styleSheets[0].cssRules){
    if(!r.selectorText||/^:root/.test(r.selectorText)) continue;
    (r.cssText.match(/#[0-9a-f]{3,8}\b/gi)||[]).forEach(h=>out.add(h.toLowerCase()));
  }
  return [...out];
});
/* every colour outside :root must be one of these documented additions —
   the heat-map ramp, the avatar, the Zotero mark, and translucent overlays */
const ALLOW=['#fff','#a8d8fb','#5cb6f5','#4f46e5','#a52a2a','#ffffff26','#00000029','#0000'];
const stray=raw.filter(h=>!ALLOW.includes(h));
ok('component CSS uses tokens, with only documented exceptions', stray.length===0, stray.join(' '));
ok('no data-theme="dark" block', !(await p.content()).includes('data-theme="dark"'));

console.log('\nconsole: '+(errs.length?errs.join(' | '):'clean'));
if(errs.length)fail+=errs.length;
console.log('\n'+pass+' passed, '+fail+' failed\n');
await b.close();
process.exit(fail?1:0);
