import type { NoteSymbol } from "./NoteSymbol";

export default interface FretNote {
    note: NoteSymbol,
    active: boolean,
}