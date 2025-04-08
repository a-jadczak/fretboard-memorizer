<script lang="ts">
  import Fretboard from "./lib/components/Fretboard.svelte";
  import Options from "./lib/components/Options.svelte";
  import { getRandomFretPosition, initializeFretboard, noteSymbols } from "./lib/scripts/fretboardCalculation";
  import type { NoteSymbol } from "./lib/types/NoteSymbol";
  import "./styles/style.scss"
  
  const fretboardNotes: NoteSymbol[][] = initializeFretboard()

  const {y, x} = getRandomFretPosition();

  const check = (note: NoteSymbol) => {
    console.log(fretboardNotes)
    console.log(fretboardNotes[y][x], {y:y, x:x})
    
    const correctNote = fretboardNotes[y][x];

    if (correctNote === note) {
      console.log("yes")
    }else {
      console.log("no")
    }

  }

</script>

<Options/>
<Fretboard/>

{#each noteSymbols as note}
  <button 
  class="guess-note-button"
  onclick={() => { check(note) }}>{note}</button>
{/each}

<style>
  .guess-note-button {
    padding: .2em;
  }

</style>