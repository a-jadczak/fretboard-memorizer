import type { NoteSymbol } from "../types/NoteSymbol";
import type Options from "../types/Options";

// Guitar tunning
export const EStandard: NoteSymbol[] = ["E", "B", "G", "D", "A", "E"]


const options: Options = $state({ 
    tunning: EStandard,
    fretsCount: 12,
    stringsCount: EStandard.length,
}); 

export default options;