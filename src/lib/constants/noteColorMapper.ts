import type { NoteColor } from "../types/NoteColor"
import type { NoteSymbol } from "../types/NoteSymbol"

export const noteColorMapper: Map<NoteSymbol, string> = new Map([
    ["C", "#FF0000"],
    ["C#", "#FF7F00"],
    ["D", "#FFBF00"],
    ["D#", "#FFFF00"],
    ["E", "#BFFF00"],
    ["F", "#00FF00"],
    ["F#", "#00FFFF"],
    ["G", "#007FFF"],
    ["G#", "#0000FF"],
    ["A", "#7F00FF"],
    ["A#", "#BF00FF"],
    ["B", "#FF00BF"]
]);

export const getColor = (note: NoteSymbol) => {
    return noteColorMapper.get(note);
}