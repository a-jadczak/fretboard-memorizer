import type { NoteSymbol } from './note-symbol'

export default interface Options {
	updateFretboardResponsiveness(): void
	tunning: NoteSymbol[]
	fretsCount: number
	stringsCount: number
	fretSlotDividerValue: number
	setTunning: (newTunning: NoteSymbol[], numberOfFrets: number) => void
}
