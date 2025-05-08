import type { NoteSymbol } from "./NoteSymbol";
import type { TunningOptionsKey } from "./TunningOptionsKey";

export default interface OptionsToSave { 
    selectedTunningKey: TunningOptionsKey,
    numberOfFrets: string, 
    selectedSingleNote: NoteSymbol,
}