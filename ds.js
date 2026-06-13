/* ============================================================
   SAVER — DESIGN SYSTEM (ds.js)
   Theme + accent engine, icon set, category tiles, helpers.
   ============================================================ */
(function(){
const root=document.documentElement;

/* ---- accents (mint default) ---- */
const ACCENTS={
  mint:    {dark:"#5FE3C0",light:"#0D9488",onDark:"#06251F",onLight:"#fff"},
  sage:    {dark:"#93CFA8",light:"#3F8C63",onDark:"#082018",onLight:"#fff"},
  ocean:   {dark:"#86B5E6",light:"#3E72B0",onDark:"#06182E",onLight:"#fff"},
  lavender:{dark:"#C0A9E6",light:"#6E5AB8",onDark:"#1A1040",onLight:"#fff"},
  rose:    {dark:"#F1AECB",light:"#C25480",onDark:"#3A0E20",onLight:"#fff"},
  honey:   {dark:"#E6C98A",light:"#8A6A2E",onDark:"#241A06",onLight:"#fff"}
};
let accent=localStorage.getItem("ds-accent")||"mint";
let theme=localStorage.getItem("ds-theme")||root.getAttribute("data-theme")||"dark";
root.setAttribute("data-theme",theme);

function lighten(h,p){const n=parseInt(h.slice(1),16);let r=n>>16,g=(n>>8)&255,b=n&255;
  r=Math.round(r+(255-r)*p);g=Math.round(g+(255-g)*p);b=Math.round(b+(255-b)*p);
  return"#"+((1<<24)+(r<<16)+(g<<8)+b).toString(16).slice(1);}
function applyAccent(){const a=ACCENTS[accent],c=a[theme];
  root.style.setProperty("--ac",c);root.style.setProperty("--ac2",lighten(c,.18));
  root.style.setProperty("--onacc",theme==="dark"?a.onDark:a.onLight);}
function setTheme(t){theme=t;root.setAttribute("data-theme",t);localStorage.setItem("ds-theme",t);applyAccent();}
function setAccent(k){accent=k;localStorage.setItem("ds-accent",k);applyAccent();
  document.querySelectorAll("#dots .dot").forEach(x=>x.setAttribute("aria-current",x.dataset.k===k));}
applyAccent();

function mountControls(){
  const d=document.getElementById("dots");
  if(d&&!d.dataset.mounted){d.dataset.mounted=1;
    Object.keys(ACCENTS).forEach(k=>{const b=document.createElement("button");b.className="dot";b.dataset.k=k;
      b.style.background=ACCENTS[k].light;b.setAttribute("aria-current",k===accent);b.title=k;
      b.onclick=()=>setAccent(k);d.appendChild(b);});}
  const t=document.getElementById("themeBtn");
  if(t&&!t.dataset.mounted){t.dataset.mounted=1;t.onclick=()=>setTheme(theme==="dark"?"light":"dark");}
}

/* ---- icons (Lucide-style, 24 grid) ---- */
const SS='fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"';
const ICONS={
 search:`<circle cx="11" cy="11" r="7" ${SS}/><path d="m21 21-4.3-4.3" ${SS}/>`,
 plus:`<path d="M12 5v14M5 12h14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`,
 cal:`<rect x="3" y="5" width="18" height="16" rx="2" ${SS}/><path d="M3 9h18M8 3v4M16 3v4" ${SS}/>`,
 back:`<path d="m15 18-6-6 6-6" ${SS}/>`,
 chev:`<path d="m9 18 6-6-6-6" ${SS}/>`,
 close:`<path d="M6 6 18 18M18 6 6 18" ${SS}/>`,
 check:`<path d="m20 6-11 11-5-5" ${SS}/>`,
 note:`<path d="M4 7h16M4 12h16M4 17h10" ${SS}/>`,
 lock:`<rect x="4" y="11" width="16" height="9" rx="2" ${SS}/><path d="M8 11V8a4 4 0 0 1 8 0v3" ${SS}/>`,
 bell:`<path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9M13.7 21a2 2 0 0 1-3.4 0" ${SS}/>`,
 eye:`<path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" ${SS}/><circle cx="12" cy="12" r="3" ${SS}/>`,
 wallet:`<path d="M3 7a2 2 0 0 1 2-2h13a1 1 0 0 1 1 1v3M3 7v10a2 2 0 0 0 2 2h14a1 1 0 0 0 1-1v-4M3 7h16" ${SS}/><circle cx="17" cy="13" r="1.4" fill="currentColor" stroke="none"/>`,
 zap:`<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" ${SS}/>`,
 card:`<rect x="2" y="5" width="20" height="14" rx="2.5" ${SS}/><path d="M2 10h20" ${SS}/>`,
 target:`<circle cx="12" cy="12" r="9" ${SS}/><circle cx="12" cy="12" r="5" ${SS}/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/>`,
 layers:`<path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5" ${SS}/>`,
 home:`<path d="M3 10.5 12 3l9 7.5M5 9.5V21h14V9.5" ${SS}/>`,
 activity:`<path d="M3 12h4l3 8 4-16 3 8h4" ${SS}/>`,
 budget:`<path d="M21 12A9 9 0 1 1 12 3v9z" ${SS}/>`,
 you:`<circle cx="12" cy="8" r="4" ${SS}/><path d="M4 21c0-4 4-6 8-6s8 2 8 6" ${SS}/>`,
 shield:`<path d="M12 3 5 6v5c0 4.5 3 7.7 7 9 4-1.3 7-4.5 7-9V6l-7-3Z" ${SS}/>`,
 sparkles:`<path d="M12 3l1.8 4.7L18 9.5l-4.2 1.8L12 16l-1.8-4.7L6 9.5l4.2-1.8L12 3Z" ${SS}/><path d="M19 14l.8 2.2L22 17l-2.2.8L19 20l-.8-2.2L16 17l2.2-.8L19 14Z" ${SS}/>`,
 palette:`<path d="M12 3a9 9 0 1 0 0 18c1 0 1.5-.8 1.5-1.6 0-.5-.3-.9-.5-1.3-.2-.3-.4-.7-.4-1.1 0-.9.7-1.5 1.6-1.5H16a5 5 0 0 0 5-5c0-3.9-4-7.4-9-7.4Z" ${SS}/><circle cx="7.5" cy="11" r="1.2" fill="currentColor" stroke="none"/><circle cx="12" cy="7.5" r="1.2" fill="currentColor" stroke="none"/><circle cx="16.5" cy="11" r="1.2" fill="currentColor" stroke="none"/>`,
 book:`<path d="M5 4h12a2 2 0 0 1 2 2v14H7a2 2 0 0 0-2 2V4Z" ${SS}/><path d="M5 4v16" ${SS}/>`,
 download:`<path d="M12 4v11m0 0 4-4m-4 4-4-4M5 20h14" ${SS}/>`,
 trash:`<path d="M4 7h16M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2M6 7l1 13h10l1-13" ${SS}/>`,
 grip:`<circle cx="9" cy="6" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="6" r="1.4" fill="currentColor" stroke="none"/><circle cx="9" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="9" cy="18" r="1.4" fill="currentColor" stroke="none"/><circle cx="15" cy="18" r="1.4" fill="currentColor" stroke="none"/>`,
 pencil:`<path d="M4 20h4L18.5 9.5a2 2 0 0 0-3-3L4 16v4Z" ${SS}/>`,
 moon:`<path d="M21 12.8A8 8 0 1 1 11.2 3a6 6 0 0 0 9.8 9.8Z" ${SS}/>`,
 sun:`<circle cx="12" cy="12" r="4" ${SS}/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5 19 19M19 5l-1.5 1.5M6.5 17.5 5 19" ${SS}/>`
};
function svg(inner,sz){return `<svg width="${sz}" height="${sz}" viewBox="0 0 24 24">${inner}</svg>`;}
function ico(name,sz){return svg(ICONS[name]||"",sz||20);}

/* ---- category tiles (colored circle + white glyph) ---- */
/* category glyphs use currentColor (model: fixed neutral tile + COLOURED glyph) */
const W='stroke="currentColor" stroke-width="2.1" fill="none" stroke-linecap="round" stroke-linejoin="round"';
const CATS={
 food:["#F59E0B",`<path d="M5 3v7a3 3 0 0 0 3 3v8M8 3v7M18 3c-1.5 0-2.5 2-2.5 5v4H18V3Zm0 11v7" ${W}/>`],
 coffee:["#B07A4A",`<path d="M5 8h11v5a5 5 0 0 1-5 5H10a5 5 0 0 1-5-5V8ZM16 9h2a2 2 0 0 1 0 6h-2M8 3v2M11 3v2" ${W}/>`],
 salary:["#0E9F6E",`<rect x="3" y="6" width="18" height="12" rx="2" ${W}/><circle cx="12" cy="12" r="2.3" ${W}/>`],
 shopping:["#8B5CF6",`<path d="M6 8h12l-1 12H7L6 8ZM9 8V6a3 3 0 0 1 6 0v2" ${W}/>`],
 transport:["#3B82F6",`<path d="M5 13l1.5-5h11L19 13M5 13h14v5H5zM5 18v2M19 18v2" ${W}/>`],
 bill:["#3B82F6",`<path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" ${W}/>`],
 phone:["#A78BFA",`<rect x="7" y="3" width="10" height="18" rx="2.5" ${W}/><path d="M11 18h2" ${W}/>`],
 travel:["#16BFA6",`<path d="M2 16l9-3 7-7a2 2 0 0 1 3 3l-7 7-3 9-2-6-7-3Z" ${W}/>`],
 home:["#E5544E",`<path d="M4 11 12 5l8 6M6 10v9h12v-9" ${W}/>`]
};
// fixed neutral tile + coloured glyph (icon-colour model, locked)
function catTile(name,sz){const c=CATS[name]||["#888",""];return `<span class="circ" style="width:${sz}px;height:${sz}px;border-radius:14px;background:var(--catTile);border:1px solid var(--catTileBorder);color:${c[0]}">${svg(c[1],Math.round(sz*0.56))}</span>`;}

/* bank / account icons — monogram on the bank's brand colour (generic = neutral tile) */
const BANKS={
 hsbc:["#DB0011","HSBC"], cib:["#7A1F3D","CIB"], banquemisr:["#C8102E","Misr"], nbe:["#00833E","NBE"],
 revolut:["#0A1B2A","R"], monzo:["#FF3464","monzo"], barclays:["#1CA3DE","B"], lloyds:["#024731","Lloyds"],
 enbd:["#C8102E","ENBD"], qnb:["#7B1E3B","QNB"], n26:["#1A1A1A","N26"], cash:["#0E9F6E","Cash"]
};
function bankIcon(name,sz){const k=(name||'').toLowerCase().replace(/[^a-z]/g,'');const b=BANKS[k];const color=b?b[0]:null;const mono=b?b[1]:(name||'?').slice(0,1).toUpperCase();
 const fs=Math.max(9,Math.round(sz*(mono.length>3?0.26:mono.length>1?0.40:0.44)));
 const base=`width:${sz}px;height:${sz}px;border-radius:14px;font-weight:800;font-size:${fs}px;letter-spacing:-.3px`;
 if(color)return `<span class="circ" style="${base};background:${color};color:#fff">${mono}</span>`;
 return `<span class="circ" style="${base};background:var(--catTile);border:1px solid var(--catTileBorder);color:var(--muted)">${mono}</span>`;}

/* ---- phone chrome ---- */
function navHTML(active){const items=["home","activity","budget","you"];
  return '<div class="nav">'+items.map(it=>`<div class="it ${active===it?'on':''}">${ico(it,22)}</div>`).join('')+'</div>';}
function statusHTML(){return `<div class="statusbar"><span>9:41</span><span class="ic"><svg width="17" height="11" viewBox="0 0 18 12" fill="currentColor"><rect x="0" y="7" width="3" height="5" rx="1"/><rect x="4.5" y="4.5" width="3" height="7.5" rx="1"/><rect x="9" y="2" width="3" height="10" rx="1"/><rect x="13.5" y="0" width="3" height="12" rx="1"/></svg><svg width="16" height="11" viewBox="0 0 17 12" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><path d="M1 4.2C4.8 1 12.2 1 16 4.2M3.6 6.8C6 4.6 11 4.6 13.4 6.8M6 9.3c1.4-1.1 3.6-1.1 5 0"/></svg><svg width="24" height="11" viewBox="0 0 25 12" fill="none"><rect x="1" y="1" width="20" height="10" rx="3" stroke="currentColor" stroke-width="1.2" opacity=".5"/><rect x="3" y="3" width="14" height="6" rx="1.5" fill="currentColor"/><rect x="22.5" y="4" width="1.6" height="4" rx="1" fill="currentColor" opacity=".6"/></svg></span></div>`;}

/* ---- count-up ---- */
function countUp(el){const target=parseFloat(el.dataset.count),pre=el.dataset.prefix||'',suf=el.dataset.suffix||'',dur=950,st=performance.now();
  function step(t){let p=Math.min(1,(t-st)/dur);p=1-Math.pow(1-p,3);el.textContent=pre+Math.round(target*p).toLocaleString()+suf;if(p<1)requestAnimationFrame(step);}
  requestAnimationFrame(step);}

/* ---- reveal on scroll (showcase) ---- */
function mountReveal(){
  const els=document.querySelectorAll('.reveal');
  if(!('IntersectionObserver'in window)){els.forEach(e=>e.style.opacity=1);return;}
  const io=new IntersectionObserver((ents)=>{ents.forEach(e=>{if(e.isIntersecting){e.target.style.animationPlayState='running';io.unobserve(e.target);}});},{threshold:.12});
  els.forEach(e=>{e.style.animationPlayState='paused';io.observe(e);});
}

/* ---- init ---- */
function init(){
  document.querySelectorAll('[data-ico]').forEach(e=>{e.innerHTML=ico(e.dataset.ico,+e.dataset.sz||20);});
  document.querySelectorAll('[data-cat]').forEach(e=>{e.outerHTML=catTile(e.dataset.cat,+e.dataset.csz||44);});
  document.querySelectorAll('.screen').forEach(s=>{
    s.insertAdjacentHTML('afterbegin',statusHTML());
    const nv=s.getAttribute('data-nav');
    if(nv&&nv!=='none')s.insertAdjacentHTML('beforeend',navHTML(nv)+'<div class="hind"></div>');
  });
  setTimeout(()=>document.querySelectorAll('[data-count]').forEach(countUp),300);
  mountControls();mountReveal();
}
if(document.readyState!=='loading')init();else document.addEventListener('DOMContentLoaded',init);
window.SaverDS={ico,catTile,bankIcon,setTheme,setAccent};
})();
