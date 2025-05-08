<script lang="ts">
    import { onMount } from "svelte";
    import { noteSymbols } from "../scripts/fretboard.svelte";
    import options from "../scripts/options.svelte";
    import type { NoteSymbol } from "../types/NoteSymbol";
    import type { TunningOptionsKey } from "../types/TunningOptionsKey";
    
    const SAVE_KEY: string = "FRETBOARD-MEMORIZER-OPTIONS";

    let tunningOptionsMap: Map<string, NoteSymbol[]> = $state(new Map([
      ["string-1", ["E"]],
      ["bass-4", ["G", "D", "A", "E"]],
      ["bass-5", ["G", "D", "A", "E", "B"]],
      ["guitar-6", ["E", "B", "G", "D", "A", "E"]],
      ["guitar-7", ["E", "B", "G", "D", "A", "E", "B"]],
      ["guitar-8", ["E", "B", "G", "D", "A", "E", "B", "F#"]]
    ]));

    let selectedTunningKey: TunningOptionsKey = $state("guitar-6");
    let selectedTunning: NoteSymbol[] | undefined = $state(tunningOptionsMap.get(selectedTunningKey));
    let selectedSingleNote: NoteSymbol = $state("E");
    let numberOfFrets: string = $state(`${options.fretsCount}`);

    const setTunningAndSave = (noteSymbols: NoteSymbol[]) => {
      selectedTunning = noteSymbols;
      options.setTunning(noteSymbols, parseInt(numberOfFrets));
      saveToLS();
    }

    // LS - Local storage

    const saveToLS = () => {
      const object = { selectedTunningKey, numberOfFrets, selectedSingleNote };

      localStorage.setItem(SAVE_KEY, JSON.stringify(object));
    }

    const readFromLS = () => {
      const savedObject = localStorage.getItem(SAVE_KEY);

      if (!savedObject) {
        return;
      }

      try {
        const savedParsedObject = JSON.parse(savedObject);
        const { selectedTunningKey: newTunningKey, numberOfFrets: newNumberOfFrets, selectedSingleNote: newSingleNote } = savedParsedObject;

        const newSelectedTunning: NoteSymbol[] = tunningOptionsMap.get(newTunningKey) ?? [];

        selectedTunningKey = newTunningKey;
        selectedTunning = newSelectedTunning
        numberOfFrets = newNumberOfFrets;
        selectedSingleNote = newSingleNote;

        let tunning: NoteSymbol[] = newTunningKey === "string-1" ? [newSingleNote]: newSelectedTunning;

        tunningOptionsMap.set("string-1", [newSingleNote]);
        
        options.setTunning(tunning, parseInt(newNumberOfFrets));
      }
      catch (error) {
        console.error('Failed to read tuning from localStorage', error);
      }
      
    }

    onMount(() => {
      readFromLS();
    })
</script>


<div class="options-container">
    <div class="field is-grouped is-align-items-center">
      <label class="label mr-2" for="instrument">Instrument:</label>
      <div class="control">
        <div class="select is-primary">
          <select name="instrument" bind:value={selectedTunningKey}
            onchange={() => {
              const newTunning = tunningOptionsMap.get(selectedTunningKey) ?? [];
              setTunningAndSave(newTunning);
            }}
          >
            <option value="string-1">1 String</option>
            <option value="bass-4">Bass 4 String</option>
            <option value="bass-5">Bass 5 String</option>
            <option value="guitar-6">Guitar 6 String</option>
            <option value="guitar-7">Guitar 7 String</option>
            <option value="guitar-8">Guitar 8 String</option>
          </select>
        </div>
      </div>
    </div>
    
    {#if selectedTunningKey === "string-1"}
      <div class="field is-grouped is-align-items-center">
        <label class="label mr-2" for="custom-single-note">Custom note:</label>
        <div class="control">
          <div class="select is-primary">
            <select name="custom-single-note" bind:value={selectedSingleNote}
              onchange={() => {
                tunningOptionsMap.set(selectedTunningKey, [selectedSingleNote]);
                setTunningAndSave([selectedSingleNote]);
              }}
            >
              {#each noteSymbols as note}
                <option value="{note}">{note}</option>
              {/each}
            </select>
          </div>
        </div>
      </div>
    {/if}
    
    <div class="field is-grouped is-align-items-center mt-2 mb-2">
      <label class="label mr-2" for="number-of-frets">Number of Frets:</label>
      <div class="control">
        <div class="select is-primary">
          <select name="number-of-frets" bind:value={numberOfFrets}
            onchange={() => {
              const newTunning = tunningOptionsMap.get(selectedTunningKey) ?? [];
              setTunningAndSave(newTunning);
            }}
          >
            <option value="5">5</option>
            <option value="12">12</option>
            <option value="22">22</option>
            <option value="24">24</option>
          </select>
        </div>
      </div>
    </div>

</div>


<style lang="scss">
  .options-container {
      margin-top: .2em;
  }

</style>