import { readFileSync, existsSync } from "node:fs";
import { CHAPTERS, THEMES } from "../data/chapters.js";

let failures=0;
function check(condition,message){if(!condition){failures++;console.error("FAIL: "+message)}else console.log("PASS: "+message)}
check(CHAPTERS.length===81,"Exactly 81 chapters");
check(CHAPTERS.filter(c=>c.number<=37).length===37,"Dao Jing contains 37 chapters");
check(CHAPTERS.filter(c=>c.number>=38).length===44,"De Jing contains 44 chapters");
check(new Set(CHAPTERS.map(c=>c.number)).size===81,"Chapter identifiers unique");
for(let n=1;n<=81;n++){
 const ch=CHAPTERS[n-1];
 check(!!ch && ch.number===n && typeof ch.original==="string" && ch.original.length>25 && typeof ch.translation==="string" && ch.translation.length>20 && !!ch.title && THEMES.includes(ch.theme),"Chapter "+n+" has contiguous id, source, paraphrase and theme");
}
check(CHAPTERS[0].original.startsWith("道可道"),"First chapter matches expected opening");
check(CHAPTERS[80].original.endsWith("为而不争。"),"Last chapter matches expected ending");
check(THEMES.length>=5 && new Set(THEMES).size===THEMES.length,"Distinct nontrivial topic taxonomy");
for(const p of ["index.html","styles.css","app.js","data/chapters.js","SKILL.md","README.md","docs/README.md","docs/TEXTUAL-CRITICISM.md",".github/workflows/pages.yml"]){
 check(existsSync(p),"Required project file: "+p);
}
const html=readFileSync("index.html","utf8");
const js=readFileSync("app.js","utf8");
const ids=[...html.matchAll(/id="([^"]+)"/g)].map(x=>x[1]);
check(new Set(ids).size===ids.length,"No duplicate DOM IDs");
for(const id of ["chapter-grid","chapter-nav","chapter-search","original-text","translation-text","reader-columns","theme-toggle","bookmark-toggle","prev-chapter","next-chapter","scroll-progress"]){
 check(ids.includes(id),"HTML defines #"+id);
 check(js.includes('"'+id+'"'),"App references #"+id);
}
check(!js.includes("innerHTML"),"Reader has no innerHTML injection paths");
check(html.includes('type="module" src="./app.js"'),"ES module bootstrapped correctly");
check(html.includes('href="./styles.css"'),"Stylesheet linked");
check(CHAPTERS.every(c=>!c.original.includes("TODO")&&!c.translation.includes("TODO")),"No placeholder prose in chapters");
console.log("\n"+(failures?"FAILED: "+failures+" checks":"PASS: all validation checks passed"));
if(failures)process.exitCode=1;
