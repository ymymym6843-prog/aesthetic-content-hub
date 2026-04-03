# Zone-Based Individual Text Drag Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace single-block text drag with 3-zone independent drag (TOP / MAIN / BOTTOM) per slide, so staff can reposition individual text areas when a background image covers important photo subjects.

**Architecture:** `TEXT_OFFSETS[idx]` (one offset per slide) → `ELEM_OFFSETS[idx]` (`{top,main,bottom}` per slide). Each zone in `inner()` is wrapped in a `data-zone` div with per-zone `transform:translate`. Drag handler targets `data-zone` elements. Double-click/tap resets individual zone. `has-bg` class on `.sf` gates visual affordance.

**Tech Stack:** Vanilla JS, CSS custom properties, localStorage (existing pattern). Single file: `card_news_maker.html`.

---

## File Structure

| File | Change |
|------|--------|
| `card_news_maker.html` | All changes — data structure, inner() zones, drag handler, CSS, reset, localStorage |

---

## Zone Mapping (all slide types)

| Type | TOP | MAIN | BOTTOM |
|------|-----|------|--------|
| hook | eyebrow label | title + sub text | "스와이프해서 확인" |
| step | STEP label | number circle + title + body + tip box | — |
| content | POINT label | title + divider + body + keypoint box | — |
| myth | X icon + MYTH label | title text | — |
| fact | ✓ icon + FACT label | title + fact box | — |
| checklist | CHECKLIST label | title + items | — |
| program | IM SOLUTION label | card block | — |
| cause | ANALYSIS label | title + body box | — |
| recommend | FOR YOU label | title + items list | — |
| ugc | REVIEW label + stars | quote box + author | — |
| highlight | — | quote block | — |
| cta | SAVE & SHARE label | icon + title + buttons | — |
| ba | CASE STUDY label | photos | captions row |

---

## Task 1: Replace TEXT_OFFSETS with ELEM_OFFSETS

**Files:**
- Modify: `card_news_maker.html:1260` (state declaration)
- Modify: `card_news_maker.html:1359` (reset on load)
- Modify: `card_news_maker.html:1515-1517` (resetTextPos)
- Modify: `card_news_maker.html:2500-2514` (collectState)
- Modify: `card_news_maker.html:2555-2559` (restoreState)

- [ ] **Step 1.1: Update state declaration (line 1260)**

Change:
```javascript
let POST=null,SLIDES=[],IMGS={},IMG_SETTINGS={},TEXT_OFFSETS={};
```
To:
```javascript
let POST=null,SLIDES=[],IMGS={},IMG_SETTINGS={},ELEM_OFFSETS={};
```

- [ ] **Step 1.2: Reset ELEM_OFFSETS on new post load (line 1359)**

Change `TEXT_OFFSETS={}` → `ELEM_OFFSETS={}` in the `loadPost` function.

- [ ] **Step 1.3: Update resetTextPos (lines 1515-1517)**

```javascript
function resetTextPos(idx){
  ELEM_OFFSETS[idx]={top:{x:0,y:0},main:{x:0,y:0},bottom:{x:0,y:0}};
  refreshPrev(idx);autoSave();
}
function resetZone(idx,zone){
  if(!ELEM_OFFSETS[idx])ELEM_OFFSETS[idx]={};
  ELEM_OFFSETS[idx][zone]={x:0,y:0};
  refreshPrev(idx);autoSave();
}
```

- [ ] **Step 1.4: Update collectState (line 2508)**

Change `textOffsets:TEXT_OFFSETS` → `elemOffsets:ELEM_OFFSETS`

- [ ] **Step 1.5: Update restoreState (line 2559)**

Change:
```javascript
if(data.textOffsets)TEXT_OFFSETS=data.textOffsets;
```
To:
```javascript
if(data.elemOffsets)ELEM_OFFSETS=data.elemOffsets;
else if(data.textOffsets){
  // Migrate legacy single-offset saves → main zone
  Object.entries(data.textOffsets).forEach(([k,v])=>{
    ELEM_OFFSETS[k]={top:{x:0,y:0},main:v,bottom:{x:0,y:0}};
  });
}
```

- [ ] **Step 1.6: Commit**
```bash
git add card_news_maker.html
git commit -m "refactor(card-news): replace TEXT_OFFSETS with 3-zone ELEM_OFFSETS"
```

---

## Task 2: Add CSS for zone visual affordance

**Files:**
- Modify: `card_news_maker.html` (CSS section, near line 365)

- [ ] **Step 2.1: Add zone CSS after existing `.pw .sp` rules (after line 366)**

```css
/* Zone drag affordance */
.sf.has-bg [data-zone]{cursor:move;}
[data-zone]{position:relative;transition:outline 0.1s;}
[data-zone].zone-dragging{outline:2px dashed rgba(232,112,58,0.6);outline-offset:4px;}
.sf.has-bg [data-zone]:hover{outline:1px dashed rgba(232,112,58,0.3);outline-offset:4px;}
```

- [ ] **Step 2.2: Commit**
```bash
git add card_news_maker.html
git commit -m "style(card-news): add zone drag visual affordance CSS"
```

---

## Task 3: Wrap inner() slide types with data-zone divs

**Files:**
- Modify: `card_news_maker.html:1670-1844` (entire inner() function)

Helper: add `zT()` function before `inner()` to compute zone transform inline:

- [ ] **Step 3.1: Add zT() helper before inner() (before line 1670)**

```javascript
// Returns inline style string for a draggable zone
function zT(idx,zone){
  const o=(ELEM_OFFSETS[idx]||{})[zone];
  return o&&(o.x||o.y)?`transform:translate(${o.x}px,${o.y}px);`:'';
}
```

- [ ] **Step 3.2: Wrap hook slide zones (lines 1682-1692)**

Replace the existing hook case with zone-wrapped version:
```javascript
case'hook':return`
  <div style="position:absolute;inset:36px;border:1px solid ${ac}40;border-radius:28px;pointer-events:none"></div>
  <div style="position:absolute;inset:44px;border:0.5px solid ${ac}20;border-radius:24px;pointer-events:none"></div>
  <div style="position:absolute;right:60px;top:50%;transform:translateY(-60%);font-size:320px;color:${dc};opacity:0.015;font-family:'Playfair Display',serif;font-weight:300;line-height:1;pointer-events:none">M</div>
  ${POST?.tp==='qa_flip'?`<div style="position:absolute;right:20px;top:40%;font-size:240px;color:rgba(255,255,255,0.04);font-family:'Playfair Display',serif;font-weight:300;transform:translateY(-50%)">?</div>`:''}
  <div style="text-align:left;color:${dc};word-break:keep-all;display:flex;flex-direction:column;justify-content:center;height:100%;position:relative;z-index:2;margin-top:-80px">
    <div data-zone="top" style="${zT(i,'top')}">
      ${s.eyebrow?`<div style="font-size:${Math.round(16*cap.sizeMul)}px;font-weight:${cap.weight};letter-spacing:0.15em;color:${ac};${cc}margin-bottom:20px;text-transform:uppercase;font-family:${cap.family}">${e(s.eyebrow)}</div>`:'<div style="height:36px"></div>'}
    </div>
    <div data-zone="main" style="${zT(i,'main')}">
      <div style="font-size:${Math.round(68*ttl.sizeMul)}px;font-weight:${ttl.weight};line-height:1.35;white-space:pre-line;letter-spacing:0.01em;font-family:${ttl.family};${tc}">${e(s.tx)}</div>
      ${s.sub?`<div style="margin-top:28px;font-size:${Math.round(28*bod.sizeMul)}px;${bc}font-weight:${bod.weight};font-family:${bod.family}">${e(s.sub)} →</div>`:`${diamondDivider(ac)}`}
    </div>
    <div data-zone="bottom" style="position:absolute;bottom:36px;left:0;right:0;${zT(i,'bottom')}">
      <div style="font-size:18px;color:${sc};letter-spacing:0.1em;opacity:0.6">→ 스와이프해서 확인</div>
    </div>
  </div>`;
```

- [ ] **Step 3.3: Wrap step slide zones (lines 1693-1704)**

```javascript
case'step':return`
  <div style="word-break:keep-all;border-left:4px solid ${ac};padding-left:24px">
    <div data-zone="top" style="${zT(i,'top')}">
      <div style="font-size:${Math.round(16*cap.sizeMul)}px;letter-spacing:0.15em;color:${ac};${cc}font-weight:${cap.weight};margin-bottom:28px;text-transform:uppercase;font-family:${cap.family}">${e(s.label||'STEP')}</div>
    </div>
    <div data-zone="main" style="${zT(i,'main')}">
      <div style="width:110px;height:110px;border:2px solid ${ac};border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:${Math.round(44*ttl.sizeMul)}px;font-weight:${ttl.weight};color:${ac};font-family:${ttl.family};margin-bottom:44px">${e(s.n)}</div>
      <div style="font-size:${Math.round(56*ttl.sizeMul)}px;font-weight:${ttl.weight};${tc}margin-bottom:24px;letter-spacing:0.01em;line-height:1.3;font-family:${ttl.family}">${e(s.tt)}</div>
      <div style="width:40px;height:2px;background:${ac};margin-bottom:32px;border-radius:1px"></div>
      <div style="font-size:${Math.round(40*bod.sizeMul)}px;font-weight:${bod.weight};${bc}line-height:1.7;white-space:pre-line;margin-bottom:40px;font-family:${bod.family}">${e(s.tx)}</div>
      <div style="background:${ac}06;border-radius:16px;padding:28px 32px;border-left:3px solid ${ac}">
        <div style="font-size:${Math.round(16*cap.sizeMul)}px;color:${ac};${cc}font-weight:${cap.weight};letter-spacing:0.15em;margin-bottom:8px;font-family:${cap.family}">IM TIP</div>
        <div style="font-size:${Math.round(28*bod.sizeMul)}px;${bc}line-height:1.5;font-family:${bod.family}">${e(s.tip||s.tx)}</div>
      </div>
    </div>
  </div>`;
```

- [ ] **Step 3.4: Wrap content slide zones (lines 1705-1715)**

```javascript
case'content':return`
  <div style="word-break:keep-all;position:relative">
    <div data-zone="top" style="${zT(i,'top')}">
      <div style="font-size:${Math.round(16*cap.sizeMul)}px;letter-spacing:0.15em;color:${ac};${cc}font-weight:${cap.weight};margin-bottom:24px;text-transform:uppercase;font-family:${cap.family}">${e(s.label||'POINT')}</div>
    </div>
    <div data-zone="main" style="${zT(i,'main')}">
      <div style="font-size:${Math.round(56*ttl.sizeMul)}px;font-weight:${ttl.weight};${tc}margin-bottom:28px;letter-spacing:0.01em;line-height:1.3;font-family:${ttl.family}">${e(s.tt||'')}</div>
      <div style="width:40px;height:2px;background:${ac};margin-bottom:36px;border-radius:1px"></div>
      <div style="font-size:${Math.round(40*bod.sizeMul)}px;font-weight:${bod.weight};${bc}line-height:1.7;white-space:pre-line;margin-bottom:40px;font-family:${bod.family}">${e(s.tx)}</div>
      <div style="background:${ac}06;border-radius:16px;padding:28px 32px;border-left:3px solid ${ac}">
        <div style="font-size:${Math.round(16*cap.sizeMul)}px;color:${ac};${cc}font-weight:${cap.weight};letter-spacing:0.15em;margin-bottom:8px;font-family:${cap.family}">KEY POINT</div>
        <div style="font-size:${Math.round(28*bod.sizeMul)}px;${bdc}line-height:1.5;font-weight:500;font-family:${bod.family}">${e(s.tip||s.tx||'')}</div>
      </div>
    </div>
  </div>`;
```

- [ ] **Step 3.5: Wrap myth slide zones (lines 1716-1725)**

```javascript
case'myth':return`
  <div style="position:absolute;top:40px;left:40px;width:20px;height:20px;border-left:1.5px solid #E8453C30;border-top:1.5px solid #E8453C30;pointer-events:none"></div>
  <div style="position:absolute;bottom:40px;right:40px;width:20px;height:20px;border-right:1.5px solid #E8453C30;border-bottom:1.5px solid #E8453C30;pointer-events:none"></div>
  <div style="text-align:center;word-break:keep-all">
    <div data-zone="top" style="${zT(i,'top')}">
      <div style="width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 32px;background:rgba(232,69,60,0.08);box-shadow:0 0 0 12px rgba(232,69,60,0.06),0 0 40px rgba(232,69,60,0.08)">
        <span style="font-size:32px;color:#E8453C;font-weight:700;font-family:'Playfair Display',serif">X</span>
      </div>
      <div style="font-size:${Math.round(16*cap.sizeMul)}px;font-weight:${cap.weight};color:#E8453C;${cc}letter-spacing:0.15em;margin-bottom:32px;text-transform:uppercase;font-family:${cap.family}">MYTH</div>
    </div>
    <div data-zone="main" style="${zT(i,'main')}">
      <div style="font-size:${Math.round(52*ttl.sizeMul)}px;font-weight:${ttl.weight};${ttl.color?'color:'+ttl.color+';':'color:#3D2E24;'}line-height:1.45;white-space:pre-line;letter-spacing:0.01em;font-family:${ttl.family}">${e(s.tx)}</div>
    </div>
  </div>`;
```

- [ ] **Step 3.6: Wrap fact slide zones (lines 1726-1739)**

```javascript
case'fact':return`
  <div style="position:absolute;top:40px;left:40px;width:20px;height:20px;border-left:1.5px solid #22C55E30;border-top:1.5px solid #22C55E30;pointer-events:none"></div>
  <div style="position:absolute;bottom:40px;right:40px;width:20px;height:20px;border-right:1.5px solid #22C55E30;border-bottom:1.5px solid #22C55E30;pointer-events:none"></div>
  <div style="text-align:center;word-break:keep-all">
    <div data-zone="top" style="${zT(i,'top')}">
      <div style="width:72px;height:72px;border-radius:50%;display:flex;align-items:center;justify-content:center;margin:0 auto 32px;background:rgba(34,197,94,0.08);box-shadow:0 0 0 12px rgba(34,197,94,0.06),0 0 40px rgba(34,197,94,0.08)">
        <span style="font-size:32px;color:#22C55E;font-weight:700;font-family:'Playfair Display',serif">✓</span>
      </div>
      <div style="font-size:${Math.round(16*cap.sizeMul)}px;letter-spacing:0.15em;margin-bottom:32px;text-transform:uppercase;font-family:${cap.family};font-weight:${cap.weight};color:#22C55E;${cc}">FACT</div>
    </div>
    <div data-zone="main" style="${zT(i,'main')}">
      ${s.tt?`<div style="font-size:${Math.round(48*ttl.sizeMul)}px;font-weight:${ttl.weight};${tc}margin-bottom:20px;font-family:${ttl.family}">${e(s.tt)}</div>`:''}
      <div style="position:relative;background:${light?'rgba(34,197,94,0.03)':'rgba(255,255,255,0.04)'};padding:32px 36px;border-radius:16px;border:0.5px solid #22C55E20">
        <div style="position:absolute;top:0;left:50%;transform:translateX(-50%);width:60%;height:2px;background:linear-gradient(90deg,transparent,#22C55E40,transparent);border-radius:1px"></div>
        <div style="font-size:${Math.round(36*ttl.sizeMul)}px;font-weight:500;${tc}line-height:1.6;white-space:pre-line;font-family:${ttl.family}">${e(s.tx)}</div>
      </div>
    </div>
  </div>`;
```

- [ ] **Step 3.7: Wrap checklist, program, cause, recommend, ugc, highlight, cta, ba zones**

Apply the same TOP/MAIN zone wrapper pattern for the remaining slide types using the zone mapping table above. Each type follows the same pattern:
```javascript
case'TYPE':return`
  ...decorative elements (pointer-events:none)...
  <div data-zone="top" style="${zT(i,'top')}">
    ...label/badge/icon element...
  </div>
  <div data-zone="main" style="${zT(i,'main')}">
    ...title, body, list items...
  </div>
  ...`;
```

- [ ] **Step 3.8: Add has-bg class to .sf when image present (in slideHTML, line 1655)**

Change:
```javascript
return`<div class="sf" data-idx="${i}" style="background:${bg}">
```
To:
```javascript
return`<div class="sf${hasImg?' has-bg':''}" data-idx="${i}" style="background:${bg}">
```

- [ ] **Step 3.9: Commit**
```bash
git add card_news_maker.html
git commit -m "feat(card-news): wrap slide inner content in TOP/MAIN/BOTTOM drag zones"
```

---

## Task 4: Update drag handler to use data-zone

**Files:**
- Modify: `card_news_maker.html:1519-1585` (initTextDrag function)

- [ ] **Step 4.1: Replace initTextDrag with zone-aware version**

Replace the entire `initTextDrag` function (lines 1519-1585):

```javascript
function initTextDrag(){
  const grid=document.getElementById('pgrid');
  if(!grid||grid._textDragInit)return;
  grid._textDragInit=true;

  // Suppress .pw onclick during drag
  grid.addEventListener('click',function(e){
    if(_textDragActive){e.stopPropagation();e.preventDefault();_textDragActive=false;}
  },true);

  function startDrag(idx,zone,sf,startX,startY){
    if(!ELEM_OFFSETS[idx])ELEM_OFFSETS[idx]={};
    const off=ELEM_OFFSETS[idx][zone]||{x:0,y:0};
    const startOffX=off.x,startOffY=off.y;
    const sfRect=sf.getBoundingClientRect();
    const actualW=SIZES[currentSize]?.w||1080;
    const scale=actualW/sfRect.width;
    let moved=false;
    function onMove(cx,cy){
      const dx=(cx-startX)*scale;
      const dy=(cy-startY)*scale;
      if(!moved&&Math.abs(dx)<4&&Math.abs(dy)<4)return;
      moved=true;
      ELEM_OFFSETS[idx][zone]={x:startOffX+dx,y:startOffY+dy};
      refreshPrev(idx);
    }
    return{onMove,isMoved:()=>moved,cleanup:()=>{if(moved)_textDragActive=true;autoSave();}};
  }

  function getZoneTarget(e){
    const zoneEl=e.target.closest('[data-zone]');
    if(!zoneEl)return null;
    const sf=zoneEl.closest('.sf');
    if(!sf)return null;
    const idx=parseInt(sf.dataset.idx,10);
    if(isNaN(idx))return null;
    return{zoneEl,sf,idx,zone:zoneEl.dataset.zone};
  }

  // Mouse drag
  grid.addEventListener('mousedown',function(e){
    const t=getZoneTarget(e);
    if(!t)return;
    e.preventDefault();e.stopPropagation();
    t.zoneEl.classList.add('zone-dragging');
    const drag=startDrag(t.idx,t.zone,t.sf,e.clientX,e.clientY);
    function onMove(ev){drag.onMove(ev.clientX,ev.clientY);}
    function onUp(){
      document.removeEventListener('mousemove',onMove);
      document.removeEventListener('mouseup',onUp);
      t.zoneEl.classList.remove('zone-dragging');
      drag.cleanup();
    }
    document.addEventListener('mousemove',onMove);
    document.addEventListener('mouseup',onUp);
  });

  // Touch drag
  grid.addEventListener('touchstart',function(e){
    const t=getZoneTarget(e);
    if(!t||e.touches.length!==1)return;
    e.preventDefault();e.stopPropagation();
    t.zoneEl.classList.add('zone-dragging');
    const touch=e.touches[0];
    const drag=startDrag(t.idx,t.zone,t.sf,touch.clientX,touch.clientY);
    function onTouchMove(ev){ev.preventDefault();const tt=ev.touches[0];drag.onMove(tt.clientX,tt.clientY);}
    function onTouchEnd(){
      document.removeEventListener('touchmove',onTouchMove);
      document.removeEventListener('touchend',onTouchEnd);
      t.zoneEl.classList.remove('zone-dragging');
      drag.cleanup();
    }
    document.addEventListener('touchmove',onTouchMove,{passive:false});
    document.addEventListener('touchend',onTouchEnd);
  },{passive:false});

  // Double-click to reset individual zone
  grid.addEventListener('dblclick',function(e){
    const t=getZoneTarget(e);
    if(!t)return;
    e.stopPropagation();
    resetZone(t.idx,t.zone);
  });

  // Double-tap to reset individual zone (touch)
  let _lastTap={el:null,time:0};
  grid.addEventListener('touchend',function(e){
    const zoneEl=e.target.closest('[data-zone]');
    if(!zoneEl)return;
    const now=Date.now();
    if(_lastTap.el===zoneEl&&now-_lastTap.time<400){
      const sf=zoneEl.closest('.sf');
      const idx=parseInt(sf?.dataset.idx,10);
      if(!isNaN(idx))resetZone(idx,zoneEl.dataset.zone);
    }
    _lastTap={el:zoneEl,time:now};
  });
}
```

- [ ] **Step 4.2: Commit**
```bash
git add card_news_maker.html
git commit -m "feat(card-news): update drag handler for per-zone independent dragging"
```

---

## Task 5: Add per-slide "위치 초기화" button in preview

**Files:**
- Modify: `card_news_maker.html:1591-1597` (render function)

- [ ] **Step 5.1: Add reset button to .pilbl in render()**

Change the pilbl HTML in `render()` (lines 1593-1594):
```javascript
g.innerHTML=SLIDES.map((s,i)=>`
  <div class="pi">
    <div class="pilbl">
      <span>${i+1}/${n} · ${RL[s.r]||s.r}</span>
      <button class="btn btn-o btn-sm" onclick="dlOne(${i})">다운로드</button>
      <button class="btn btn-sm" onclick="resetTextPos(${i})" style="font-size:10px;padding:3px 8px;border:1px solid var(--color-border);background:var(--color-bg);color:var(--color-text-light);border-radius:4px;cursor:pointer" title="텍스트 위치 초기화">↺ 위치초기화</button>
    </div>
    <div class="pw" onclick="dlOne(${i})" title="클릭하면 다운로드 (텍스트 영역은 드래그로 위치 조정, 더블탭/더블클릭으로 해당 영역 초기화)">
      <div id="pw${i}"></div>
    </div>
  </div>`).join('');
```

- [ ] **Step 5.2: Commit**
```bash
git add card_news_maker.html
git commit -m "feat(card-news): add per-slide position reset button"
```

---

## Task 6: Verify and test

- [ ] **Step 6.1: Open card_news_maker.html in browser (iPad Air emulation in DevTools)**

- [ ] **Step 6.2: Load a post with multiple slide types (hook, step, content)**

- [ ] **Step 6.3: Upload a background image to a hook slide**
  - Verify: zone borders appear on hover (dashed orange)
  - Drag TOP zone (eyebrow) → only eyebrow moves
  - Drag MAIN zone (title) → only title+body moves
  - Drag BOTTOM zone (스와이프 확인) → only bottom text moves

- [ ] **Step 6.4: Test double-tap reset**
  - Move a zone, then double-tap it → returns to original position
  - Other zones unaffected

- [ ] **Step 6.5: Test "↺ 위치초기화" button**
  - Click → all zones for that slide reset to original position

- [ ] **Step 6.6: Refresh page**
  - Zone positions persist from localStorage

- [ ] **Step 6.7: Test on slide without background image**
  - No zone borders visible (has-bg class absent)
  - Drag still works if needed (cursor changes on hover)

- [ ] **Step 6.8: Final commit + push**
```bash
git add card_news_maker.html
git commit -m "feat(card-news): 3-zone independent text drag with per-zone reset"
git push
```
