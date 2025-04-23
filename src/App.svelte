<script lang="ts">
  import Options from "./lib/components/Options.svelte";
  import { Fretboard as FretBoardClass, noteSymbols } from "./lib/scripts/fretboard.svelte";
  import options from "./lib/scripts/options.svelte";
  import "./styles/style.scss"
  import Fretboard from "./lib/components/Fretboard.svelte";
  import { getColor } from "./lib/constants/noteColorMapper";
  
  const fretboard = new FretBoardClass(options);

  // To avoid multpiple $effect trigger
  let lastOptionsJSON: string = $state("");
  $effect(() => {
    // To avoid multpiple $effect trigger
    const json = JSON.stringify(options);
    if (json !== lastOptionsJSON) {
      lastOptionsJSON = json;
      fretboard.setFretboard(options);
    }
  })
</script>

<Options/>
<Fretboard fretboard={fretboard}/>

{#each noteSymbols as note}
  <button
    style="background-color: {getColor(note)};"
    class="guess-note-button"
    onclick={() => { fretboard.checkNote(note, options) }}
  >
    {note}
  </button>
{/each}

<style>
  .guess-note-button {
    padding: .2em;
  }

</style>