import type { NoteSymbol } from "../types/NoteSymbol";
import type Options from "../types/Options";

// Guitar tunning
export const EStandard: NoteSymbol[] = ["E", "B", "G", "D", "A", "E"]

let options: Options = $state({
    tunning: EStandard,
    fretsCount: 5,
    stringsCount: EStandard.length,
    fretSlotDividerValue: 5,
    setTunning(newTunning: NoteSymbol[], numberOfFrets: number) {
        this.tunning = newTunning;
        this.stringsCount = newTunning.length;
        this.fretsCount = numberOfFrets;

        this.updateFretboardResponsiveness();
    },
    updateFretboardResponsiveness(): void {
        this.fretSlotDividerValue = window.innerWidth < 568 ? 10 : 5;
    }
}); 


export default options;