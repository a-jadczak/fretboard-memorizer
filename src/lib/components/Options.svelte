<script lang="ts">
  import { onMount } from "svelte";
  import { noteSymbols } from "../scripts/fretboard.svelte";
  import options from "../scripts/options.svelte";
  import type { NoteSymbol } from "../types/NoteSymbol";
  import type { TunningOptionsKey } from "../types/TunningOptionsKey";
  import { readOptions, saveOptions } from "../scripts/localstorage";
  import type OptionsToSave from "../types/OptionsToSave";
 
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

    saveOptions({ selectedTunningKey, numberOfFrets, selectedSingleNote });
  }

  const setSavedOptions = (savedOptions: OptionsToSave) => {
    const { selectedTunningKey: newTunningKey, numberOfFrets: newNumberOfFrets, selectedSingleNote: newSingleNote } = savedOptions;
    const newSelectedTunning: NoteSymbol[] = tunningOptionsMap.get(newTunningKey) ?? [];
    const tunning: NoteSymbol[] = newTunningKey === "string-1" ? [newSingleNote] : newSelectedTunning;

    selectedTunningKey = newTunningKey;
    numberOfFrets = newNumberOfFrets;
    selectedSingleNote = newSingleNote;
    selectedTunning = newSelectedTunning;

    // Update the selected tuning in the map
    tunningOptionsMap.set("string-1", [newSingleNote]);
        
    // Set the tuning in the options
    options.setTunning(tunning, parseInt(newNumberOfFrets));

  }

  onMount(() => {
    const savedOptions: OptionsToSave | null = readOptions();

    if (!savedOptions)
      return;

    setSavedOptions(savedOptions);
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