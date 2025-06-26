import { scaleLength } from "../constants/fretboard";
import type FretNote from "../types/FretNote";
import type { NoteSymbol } from "../types/NoteSymbol";
import type Options from "../types/Options";
import type Position from "../types/Position";

export const noteSymbols: NoteSymbol[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];

export class Fretboard {
    #fretboardNotes: FretNote[][]  = $state<FretNote[][]>([]);
    #randomNotePos: Position = $state({x: -1, y: -1})

    #scrollMoveOffset = 50;
    #lastRandomNote: Position = {x: -1, y: -1};
    onRandom: ((value: number) => void)

    constructor(onRandomCB: ((value: number) => void)) {
        this.onResize();
        
        this.onRandom = onRandomCB;
        window.addEventListener("resize", this.onResize);        
    }

    onResize = () => {
        this.calcScrollMoveOffset();
    }
    
    calcScrollMoveOffset = (): void => { 
        const width = window.innerWidth;
        const calculation = 100 / Math.pow(width, .95);
        const multiplier = calculation > 0.17 ? 0.17 : calculation;

        this.#scrollMoveOffset = width * multiplier;
        console.log(multiplier);
    }

    setFretboard(options: Options) {
        this.#fretboardNotes = this.initializeFretboard(options);
        options.updateFretSlotWidth();
        this.pickRandomNote(options);
    }

    getRandomNotePos() {
        return this.#randomNotePos;
    }

    getFretboard() {
        return this.#fretboardNotes;
    }

    calcFretsSlotWidth = (fretsCount: number): number[] => 
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
    initializeFretboard = (options: Options): FretNote[][] => {
        const tunning = [...options.tunning];
        const fretsCount = options.fretsCount;
        const stringsCount = options.stringsCount;

        const arr: FretNote[][] = [];
    
        for (let i = 0; i < stringsCount; i++) {
            const stringTune: NoteSymbol = tunning[i];
            arr.push([]);
    
            for (let j = 0; j < fretsCount; j++) {
                // fretsCount + 1 to include the (zero fret)
                arr[i].push({
                    note: this.getFrettedNote(stringTune, j + 1),
                    active: false
                });
            }
            
        }
        
        return arr;
    }
    getFrettedNote = (stringNote: NoteSymbol, fretNumber: number): NoteSymbol => {

        const noteIndex = noteSymbols.findIndex(e => e === stringNote);
    
        const targetIndex = (noteIndex + fretNumber) % 12;
    
        return noteSymbols[targetIndex];
    }
    getRandomFretPosition = (options: Options): Position => {
        const { fretsCount, stringsCount } = options;
        
        let rndString: number, rndFret: number;
        do {
            rndString = Math.floor(Math.random() * stringsCount);
            rndFret = Math.floor(Math.random() * fretsCount);
        }
        while (this.#lastRandomNote.x === rndFret && this.#lastRandomNote.y === rndString);
        
        this.#lastRandomNote = {x: rndFret, y: rndString};
        return { x: rndFret, y: rndString };
    }
    pickRandomNote = (options: Options) => {
        const {x, y} = this.getRandomFretPosition(options);
        this.#randomNotePos = {x: x, y: y}

        this.#fretboardNotes[y][x].active = true;

        console.log(this.#fretboardNotes[y][x].note);
        
        setTimeout(() => {this.onRandom(x * this.#scrollMoveOffset)}, 0); // to force reactivity
        
    }
    checkNote = (note: NoteSymbol, options: Options) => {
        const {x, y} = this.#randomNotePos;

        const correctNote = this.#fretboardNotes[y][x]

        if (correctNote.note === note) {
            this.#fretboardNotes[y][x].active = false;
            this.pickRandomNote(options);
        }
    }
}