import type { NoteSymbol } from "./NoteSymbol";

export default interface Options {
    updateFretSlotWidth(): unknown;
    tunning: NoteSymbol[],
    fretsCount: number,
    stringsCount: number,
    responsive: boolean,
    fretSlotDividerValue: number,
    setTunning: (newTunning: NoteSymbol[], numberOfFrets: number) => void
}