import type FretNote from "../types/FretNote";
import type { NoteSymbol } from "../types/NoteSymbol";
import type Position from "../types/Position";
import options from "./options.svelte";

export const noteSymbols: NoteSymbol[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

// Calculates the width of each fretSlot based on Selected Scale
export const calcFretsSlotWidth = (scaleLength: number, fretsCount: number): number[] => 
{
    const arr: number[] = [];

    for (let i = 0; i < fretsCount; i++) {        
        let Ln = scaleLength * Math.pow(0.5, i / 12);
        let Ln_next = scaleLength * Math.pow(0.5, (i + 1) / 12);
        let width = Ln - Ln_next;

        arr.push(width);
    }

    return arr;
}

export const initializeFretboard = (): FretNote[][] => {
    const { tunning, fretsCount, stringsCount } = options;

    const arr: FretNote[][] = [];

    for (let i = 0; i < stringsCount; i++) {
        const stringTune: NoteSymbol = tunning[i];
        arr.push([]);

        for (let j = 0; j < fretsCount; j++) {
            // fretsCount + 1 to include the (zero fret)
            arr[i].push({
                note: getFrettedNote(stringTune, j + 1),
                active: false
            });
        }
        
    }

    return arr;
}

/*

    C D E
    F G A B

    1  2      3  4      5 6 7       8 9       10 11      12
    C (C# Db) D (D# Eb) E F (F# Gb) G (G# Ab) A  (A# Bb) B
*/

export const getFrettedNote = (stringNote: NoteSymbol, fretNumber: number): NoteSymbol => {

    const noteIndex = noteSymbols.findIndex(e => e === stringNote);

    const targetIndex = (noteIndex + fretNumber) % 12;

    return noteSymbols[targetIndex];
}

export const getRandomFretPosition = (): Position => {
    const { fretsCount, stringsCount } = options;
    
    const rndString = Math.floor(Math.random() * stringsCount);
    const rndFret = Math.floor(Math.random() * fretsCount);
    
    return {y: rndString, x: rndFret};
}