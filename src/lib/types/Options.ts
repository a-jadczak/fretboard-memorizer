import type { NoteSymbol } from "./NoteSymbol";

export default interface Options {
    tunning: NoteSymbol[],
    fretsCount: number,
    stringsCount: number,
}