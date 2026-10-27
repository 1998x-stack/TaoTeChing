import { readFileSync, existsSync } from "node:fs";
import { CHAPTERS, THEMES } from "../data/chapters.js";
import { PASSAGE_INDEX, PASSAGE_COUNT, getPassages, splitClassicalSentences } from "../data/passages.js";

let fail=0,pass=0;
function assert(condition,message){
 if(!condition){fail++;console.error("FAIL "+message)}
 else{pass++;}
}
assert(CHAPTERS.length===81,"There must be exactly 81 chapters");
assert(CHAPTERS.filter(c=>c.number<=37).length===37,"Dao Jing: 37 chapters");
assert(CHAPTERS.filter(c=>c.number>=38).length===44,"De Jing: 44 chapters");
assert(new Set(CHAPTERS.map(c=>c.number)).size===81,"Chapter numbers unique");
assert(PASSAGE_INDEX.length===81,"81 passage arrays");
assert(PASSAGE_COUNT===506,"Exactly 506 manually aligned reading sentences");
assert(THEMES.length>=5 && new Set(THEMES).size===THEMES.length,"Theme taxonomy unique");
for(let number=1;number<=81;number++){
 const ch=CHAPTERS[number-1];
 assert(ch?.number===number,"Chapter continuity #"+number);
 assert(typeof ch?.original==="string"&&ch.original.length>=20&&typeof ch?.translation==="string"&&ch.translation.length>20,"Chapter content #"+number);
 assert(!!ch?.title&&THEMES.includes(ch?.theme),"Chapter title and theme #"+number);
 const sentences=getPassages(ch);
 assert(sentences.length>0,"Passages nonempty #"+number);
 assert(sentences.map(x=>x.original).join("")===ch.original,"Source text round-trip #"+number);
 assert(splitClassicalSentences(ch.original).length===sentences.length,"Correct punctuation boundaries #"+number);
 assert(sentences.every((s,i)=>s.index===i+1&&s.chapter===number&&s.id===String(number).padStart(2,"0")+"-"+String(i+1).padStart(2,"0")&&typeof s.translation==="string"&&s.translation.trim().length>=2),"Sentence ids and human translations #"+number);
}
assert(CHAPTERS[0].original.startsWith("道可道"),"First chapter beginning");
assert(CHAPTERS[80].original.endsWith("为而不争。"),"Last chapter ending");
assert(PASSAGE_INDEX[0][0].translation.includes("恒常"),"Chapter 1: first sentence translation");
assert(PASSAGE_INDEX[7][0].original==="上善若水。","Chapter 8: correct first sentence");
assert(PASSAGE_INDEX[10].length===4,"Chapter 11: four matched sentences");
assert(PASSAGE_INDEX[37].length===11,"Chapter 38: eleven matched sentences");
assert(PASSAGE_INDEX[63].length===13,"Chapter 64: thirteen matched sentences");
assert(PASSAGE_INDEX[80].at(-1).translation.includes("不与人争功"),"Chapter 81 ending aligned");
const required=[
 "index.html","styles.css","app.js","data/chapters.js","data/passages.js",
 "data/sentence-parts/01-27.js","data/sentence-parts/28-54.js","data/sentence-parts/55-81.js",
 "SKILL.md","references/practical-wisdom.md","references/reading-experience.md",
 "README.md","docs/README.md","docs/TEXTUAL-CRITICISM.md",".github/workflows/pages.yml"
];
required.forEach(path=>assert(existsSync(path),"Required file "+path));
const html=readFileSync("index.html","utf8");
const js=readFileSync("app.js","utf8");
const css=readFileSync("styles.css","utf8");
const ids=[...html.matchAll(/id="([^"]+)"/g)].map(m=>m[1]);
assert(new Set(ids).size===ids.length,"HTML has no duplicate element ids");
for(const id of ["reader-lines","reveal-count","collapse-all","chapter-grid","chapter-nav","chapter-search","theme-toggle","bookmark-toggle","prev-chapter","next-chapter","scroll-progress"]){
 assert(ids.includes(id),"HTML defines "+id);
 assert(js.includes('"'+id+'"'),"App references "+id);
}
assert(!ids.includes("reader-columns"),"Old horizontal parallel view removed");
assert(!html.includes('class="pane pane-original"'),"Old separate original pane removed");
assert(!js.includes("innerHTML"),"Dynamic chapter content never uses innerHTML");
assert(js.includes("renderSentences(ch)"),"Every chapter reloads the sentence view");
assert(js.includes("translation.hidden=true"),"All sentence translations initially concealed");
assert(js.includes('reveal.setAttribute("aria-expanded","false")'),"Accessible progressive disclosure default");
assert(js.includes('reveal.setAttribute("aria-controls","translation-"+passage.id)'),"Every reveal controls unique matching translation");
assert(js.includes('reveal.addEventListener("click"'),"Per-sentence reveal event bound");
assert(js.includes('"collapse-all"'),"Explicit collapse-all behavior");
assert(css.includes(".sentence-meaning[hidden]{display:none!important}"),"Hidden translation removed from visual flow");
assert(css.includes(".sentence-list{display:flex;flex-direction:column"),"All screen sizes vertically stack sentences");
assert(html.includes('type="module" src="./app.js"'),"Correct ES module entrypoint");
assert(html.includes('href="./styles.css"'),"Stylesheet loads relatively");
assert(CHAPTERS.every(c=>!c.original.includes("TODO")&&!c.translation.includes("TODO")),"No placeholder chapters");
console.log("Checked "+pass+" assertions; "+(fail?"FAILED "+fail:"all passed")+".");
if(fail)process.exitCode=1;
