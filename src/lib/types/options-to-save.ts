import type { NoteSymbol } from './note-symbol'
import type { TunningOptionsKey } from './tuning-option-key'

export default interface OptionsToSave {
	selectedTunningKey: TunningOptionsKey
	numberOfFrets: string
	selectedSingleNote: NoteSymbol
}
