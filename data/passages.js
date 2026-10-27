import { CHAPTERS } from "./chapters.js";
import { PART_A } from "./sentence-parts/01-27.js";
import { PART_B } from "./sentence-parts/28-54.js";
import { PART_C } from "./sentence-parts/55-81.js";

/**
 * Sentence boundaries follow editorial punctuation (。！？；).
 * Original wording remains completely unchanged and can be reconstructed by joining.
 * All 506 sentence translations have been authored separately, not generated
 * by chopping up the former chapter-level summaries.
 */
const SENTENCE_TRANSLATIONS = Object.freeze({...PART_A,...PART_B,...PART_C});
export function splitClassicalSentences(original) {
  if (typeof original !== "string") throw new TypeError("Expected original Chinese text");
  const lines = (original.match(/[^。！？；]+[。！？；][”’]?|[^。！？；]+$/gu) || []);
  if (lines.join("") !== original) throw new Error("Sentence split lost or changed source characters");
  return lines;
}
export function getPassages(chapter) {
  const source = splitClassicalSentences(chapter.original);
  const translations = SENTENCE_TRANSLATIONS[chapter.number];
  if (!Array.isArray(translations) || source.length !== translations.length) {
    throw new Error("Sentence alignment missing for chapter " + chapter.number);
  }
  return source.map((original,index) => {
    const translation=translations[index];
    if(typeof translation!=="string" || !translation.trim()) throw new Error("Blank translation at " + chapter.number + ":" + (index+1));
    return Object.freeze({
      id:String(chapter.number).padStart(2,"0")+"-"+String(index+1).padStart(2,"0"),
      chapter:chapter.number,
      index:index+1,
      original,
      translation
    });
  });
}
export const PASSAGE_INDEX = Object.freeze(CHAPTERS.map(ch => getPassages(ch)));
export const PASSAGE_COUNT = PASSAGE_INDEX.reduce((sum,lines)=>sum+lines.length,0);
export function byChapter(number) { return PASSAGE_INDEX[Number(number)-1] || []; }
