import type { NoteSymbol } from "../types/NoteSymbol";
import type Options from "../types/Options";

// Guitar tunning
export const EStandard: NoteSymbol[] = ["E", "B", "G", "D", "A", "E"]

let options: Options = $state({ 
    tunning: EStandard,
    fretsCount: 12,
    stringsCount: EStandard.length,
    setTunning(newTunning: NoteSymbol[], numberOfFrets: number) {
        this.tunning = newTunning;
        this.stringsCount = newTunning.length;
        this.fretsCount = numberOfFrets;
    }
}); 


export default options;