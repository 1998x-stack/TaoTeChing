import { CHAPTERS, THEMES, byNumber } from "./data/chapters.js";
import { byChapter } from "./data/passages.js";

/* A framework-free, accessible reader. User preferences never leave this browser. */
const $ = id => document.getElementById(id);
const storage = {
 read(key,fallback){try{return JSON.parse(localStorage.getItem("tao:"+key))??fallback}catch{return fallback}},
 write(key,val){try{localStorage.setItem("tao:"+key,JSON.stringify(val))}catch{/* storage is optional */}}
};
const state = {
 current:Math.max(1,Math.min(81,Number(location.hash.match(/^#chapter-(\d+)$/)?.[1]) || storage.read("last",1))),
 part:"dao",
 size:storage.read("size",20),
 bookmarks:storage.read("bookmarks",[]),
 query:"",
 theme:""
};
if(!Array.isArray(state.bookmarks))state.bookmarks=[];
state.size=Number.isFinite(state.size)?Math.max(16,Math.min(28,state.size)):20;
const digits=["零","一","二","三","四","五","六","七","八","九"];
function numeral(n){return n<10?digits[n]:n<20?"十"+(n%10?digits[n%10]:""):digits[Math.floor(n/10)]+"十"+(n%10?digits[n%10]:"")}
const chapterName=n=>"第"+numeral(n)+"章";
function create(tag,className,textValue){
 const e=document.createElement(tag);
 if(className)e.className=className;
 if(textValue!==undefined)e.textContent=textValue;
 return e;
}
let toastTimer;
function toast(text){
 const e=$("toast");e.textContent=text;e.classList.add("show");
 clearTimeout(toastTimer);toastTimer=setTimeout(()=>e.classList.remove("show"),2000);
}
async function copy(value,message){
 try{await navigator.clipboard.writeText(value);toast(message)}
 catch{const t=create("textarea");t.value=value;document.body.append(t);t.select();const ok=document.execCommand("copy");t.remove();toast(ok?message:"复制失败，请手动复制")}
}
function setAppearance(theme){
 document.documentElement.dataset.theme=theme;
 const dark=theme==="dark";
 $("theme-toggle").setAttribute("aria-label",dark?"切换为宣纸浅色模式":"切换为墨色深色模式");
 document.querySelector('meta[name="theme-color"]').content=dark?"#101816":"#f4f0e6";
 storage.write("theme",theme);
}
setAppearance(storage.read("theme","dark")==="light"?"light":"dark");
$("theme-toggle").addEventListener("click",()=>setAppearance(document.documentElement.dataset.theme==="dark"?"light":"dark"));

const filter=$("theme-filter");
THEMES.forEach(theme=>{
 const option=create("option",null,theme);option.value=theme;filter.append(option);
});
function renderLibrary(){
 const q=state.query.trim().toLocaleLowerCase("zh-CN");
 const matches=CHAPTERS.filter(ch=>{
  if(state.theme&&state.theme!==ch.theme)return false;
  if(!q)return true;
  return [ch.number,chapterName(ch.number),ch.title,ch.theme,ch.original,ch.translation].join(" ").toLocaleLowerCase("zh-CN").includes(q);
 });
 $("result-count").textContent="找到 "+matches.length+" / 81 章";
 $("no-results").hidden=matches.length>0;
 const fragment=document.createDocumentFragment();
 for(const ch of matches){
  const card=create("button","chapter-card");card.type="button";
  card.setAttribute("aria-label",chapterName(ch.number)+"，"+ch.title+"，进入阅读");
  const top=create("span","card-top");
  top.append(create("span",null,String(ch.number).padStart(2,"0")+" / 81"),create("span","card-star",state.bookmarks.includes(ch.number)?"★":"↗"));
  card.append(top,create("span","card-title",ch.title),create("span","card-theme",ch.theme));
  card.addEventListener("click",()=>navigate(ch.number,true));
  fragment.append(card);
 }
 $("chapter-grid").replaceChildren(fragment);
}
function renderNav(){
 const isDao=state.part==="dao";
 for(const btn of document.querySelectorAll(".part-switch button")){
  const active=btn.dataset.part===state.part;
  btn.classList.toggle("active",active);btn.setAttribute("aria-pressed",String(active));
 }
 const items=isDao?CHAPTERS.slice(0,37):CHAPTERS.slice(37);
 const fragment=document.createDocumentFragment();
 items.forEach(ch=>{
  const active=ch.number===state.current;
  const button=create("button","nav-chapter"+(active?" active":""));
  button.type="button";
  if(active)button.setAttribute("aria-current","location");
  button.append(create("small",null,String(ch.number).padStart(2,"0")),create("span",null,ch.title));
  button.addEventListener("click",()=>navigate(ch.number,false));
  fragment.append(button);
 });
 const nav=$("chapter-nav");
 nav.replaceChildren(fragment);
 const active=nav.querySelector(".active");
 if(active){
  if(innerWidth>760)nav.scrollTop=Math.max(0,active.offsetTop-nav.offsetTop-nav.clientHeight/2);
  else nav.scrollLeft=Math.max(0,active.offsetLeft-nav.offsetLeft-nav.clientWidth/2);
 }
}
function updateRevealCount(){
 const total=$("reader-lines").querySelectorAll(".sentence-card").length;
 const open=$("reader-lines").querySelectorAll('.reveal-button[aria-expanded="true"]').length;
 $("reveal-count").textContent="已读 "+open+" / "+total+" 句";
}
function revealSentence(button,translation){
 const visible=button.getAttribute("aria-expanded")==="true";
 button.setAttribute("aria-expanded",String(!visible));
 translation.hidden=visible;
 button.textContent=visible?"轻触见译 ＋":"收起此句译文 −";
 button.closest(".sentence-card").classList.toggle("revealed",!visible);
 updateRevealCount();
}
function renderSentences(chapter){
 const fragment=document.createDocumentFragment();
 for(const passage of byChapter(chapter.number)){
  const card=create("article","sentence-card");
  card.setAttribute("role","listitem");
  card.dataset.sentenceId=passage.id;
  const marker=create("div","sentence-marker");
  marker.append(create("span",null,"句 "+String(passage.index).padStart(2,"0")),create("span",null,"原典 · ORIGINAL"));
  const source=create("p","classical-sentence",passage.original);
  const reveal=create("button","reveal-button","轻触见译 ＋");
  reveal.type="button";
  reveal.setAttribute("aria-expanded","false");
  reveal.setAttribute("aria-controls","translation-"+passage.id);
  reveal.setAttribute("aria-label","第"+passage.index+"句，点击揭晓白话译文");
  const translation=create("div","sentence-meaning");
  translation.id="translation-"+passage.id;
  translation.hidden=true;
  translation.append(create("span","meaning-label","白话译文 · INTERPRETATION"),create("p","meaning-text",passage.translation));
  reveal.addEventListener("click",()=>revealSentence(reveal,translation));
  card.append(marker,source,reveal,translation);
  fragment.append(card);
 }
 $("reader-lines").replaceChildren(fragment);
 updateRevealCount();
}
function renderChapter(){
 const ch=byNumber(state.current);if(!ch)return;
 state.part=ch.number<=37?"dao":"de";
 $("chapter-part").textContent=state.part==="dao"?"上篇 · 道经":"下篇 · 德经";
 $("chapter-heading").textContent=chapterName(ch.number);
 $("chapter-title").textContent=ch.title;
 $("chapter-large").textContent=String(ch.number).padStart(2,"0");
 $("sidebar-count").textContent=String(ch.number).padStart(2,"0")+" / 81";
 renderSentences(ch);
 $("reader-tags").replaceChildren(create("span",null,ch.theme),create("span",null,state.part==="dao"?"道经":"德经"));
 document.documentElement.style.setProperty("--reader-size",state.size+"px");
 const bookmarked=state.bookmarks.includes(ch.number);
 $("bookmark-toggle").setAttribute("aria-pressed",String(bookmarked));
 $("bookmark-toggle").textContent=bookmarked?"★ 已收藏":"☆ 收藏本章";
 $("prev-chapter").disabled=ch.number===1;
 $("next-chapter").disabled=ch.number===81;
 $("prev-label").textContent=ch.number>1?byNumber(ch.number-1).title:"已是第一章";
 $("next-label").textContent=ch.number<81?byNumber(ch.number+1).title:"已是最后一章";
 storage.write("last",ch.number);
 renderNav();
}
function navigate(number,scrollToReader){
 if(!Number.isInteger(number)||number<1||number>81)return;
 state.current=number;renderChapter();
 history.replaceState(null,"","#chapter-"+number);
 if(scrollToReader)$("reading").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth",block:"start"});
}
document.querySelectorAll(".part-switch button").forEach(button=>button.addEventListener("click",()=>{
 navigate(button.dataset.part==="dao"?1:38,false);
}));
$("font-larger").addEventListener("click",()=>{state.size=Math.min(28,state.size+2);storage.write("size",state.size);document.documentElement.style.setProperty("--reader-size",state.size+"px")});
$("font-smaller").addEventListener("click",()=>{state.size=Math.max(16,state.size-2);storage.write("size",state.size);document.documentElement.style.setProperty("--reader-size",state.size+"px")});
$("prev-chapter").addEventListener("click",()=>navigate(state.current-1,false));
$("next-chapter").addEventListener("click",()=>navigate(state.current+1,false));
$("bookmark-toggle").addEventListener("click",()=>{
 if(state.bookmarks.includes(state.current))state.bookmarks=state.bookmarks.filter(n=>n!==state.current);
 else state.bookmarks.push(state.current);
 storage.write("bookmarks",state.bookmarks);renderChapter();renderLibrary();
 toast(state.bookmarks.includes(state.current)?"已加入书签":"已取消书签");
});
$("copy-link").addEventListener("click",()=>copy(new URL("#chapter-"+state.current,location.href).href,"链接已复制"));
$("collapse-all").addEventListener("click",()=>{
 $("reader-lines").querySelectorAll('.reveal-button[aria-expanded="true"]').forEach(button=>{
  const target=document.getElementById(button.getAttribute("aria-controls"));
  revealSentence(button,target);
 });
});
$("chapter-search").addEventListener("input",event=>{state.query=event.target.value;renderLibrary()});
filter.addEventListener("change",event=>{state.theme=event.target.value;renderLibrary()});
document.querySelectorAll(".theme-jump").forEach(button=>button.addEventListener("click",()=>{
 state.theme=button.dataset.theme;filter.value=state.theme;renderLibrary();
 $("library").scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
}));
window.addEventListener("keydown",event=>{
 const input=["INPUT","TEXTAREA","SELECT"].includes(document.activeElement?.tagName);
 if(event.key==="/"&&!input){event.preventDefault();$("chapter-search").focus();return}
 if(input||event.altKey||event.metaKey||event.ctrlKey)return;
 if(event.key==="ArrowLeft"&&state.current>1)navigate(state.current-1,false);
 if(event.key==="ArrowRight"&&state.current<81)navigate(state.current+1,false);
});
window.addEventListener("hashchange",()=>{
 const n=Number(location.hash.match(/^#chapter-(\d+)$/)?.[1]);
 if(n>=1&&n<=81){state.current=n;renderChapter()}
});
let scrolling=false;
function progress(){
 const total=document.documentElement.scrollHeight-innerHeight;
 $("scroll-progress").style.width=(total>0?100*scrollY/total:0)+"%";
 scrolling=false;
}
window.addEventListener("scroll",()=>{if(!scrolling){scrolling=true;requestAnimationFrame(progress)}},{passive:true});
if("IntersectionObserver" in window){
 const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add("visible");observer.unobserve(entry.target)}
 }),{threshold:.12});
 document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));
}else document.querySelectorAll(".reveal").forEach(el=>el.classList.add("visible"));
renderLibrary();renderChapter();progress();
if(/^#chapter-\d+$/.test(location.hash))requestAnimationFrame(()=>$("reading").scrollIntoView({behavior:"instant",block:"start"}));
