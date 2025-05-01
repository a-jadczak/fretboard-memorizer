import type { NoteSymbol } from "../types/NoteSymbol";
import type Options from "../types/Options";

// Guitar tunning
export const EStandard: NoteSymbol[] = ["E", "B", "G", "D", "A", "E"]

let options: Options = $state({
    tunning: EStandard,
    fretsCount: 5,
    stringsCount: EStandard.length,
    responsive: false,
    setTunning(newTunning: NoteSymbol[], numberOfFrets: number) {
        this.tunning = newTunning;
        this.stringsCount = newTunning.length;
        this.fretsCount = numberOfFrets;
        //@ts-ignore
        this.responsive = numberOfFrets > 12;
    },
    
}); 


export default options;