import type { NoteSymbol } from '../types/note-symbol'

const NOTE_COLORS = {
	C: '#FF0000',
	'C#': '#FF7F00',
	D: '#FFBF00',
	'D#': '#FFFF00',
	E: '#BFFF00',
	F: '#00FF00',
	'F#': '#00FFFF',
	G: '#007FFF',
	'G#': '#562DFA',
	A: '#9408FF',
	'A#': '#BF00FF',
	B: '#FF00BF',
} as const satisfies Record<NoteSymbol, string>

export const getNoteColor = (note: NoteSymbol): string => NOTE_COLORS[note]
