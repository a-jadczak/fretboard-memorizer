<script lang="ts">
  import { onMount } from "svelte";
  import Fretboard from "./lib/components/Fretboard.svelte";
  import Options from "./lib/components/Options.svelte";
  import { getRandomFretPosition, initializeFretboard, noteSymbols } from "./lib/scripts/fretboardCalculation";
  import type FretNote from "./lib/types/FretNote";
  import type { NoteSymbol } from "./lib/types/NoteSymbol";
  import "./styles/style.scss"
  import type Position from "./lib/types/Position";
  
  let fretboardNotes: FretNote[][] = $state(initializeFretboard());
  let randomNotePos : Position = $state({x: -1, y: -1});

  const check = (note: NoteSymbol) => {
    const {x, y} = randomNotePos;

    const correctNote = fretboardNotes[y][x]

    if (correctNote.note === note) {
      console.log("yes")
      fretboardNotes[y][x].active = false;
      pickRandomNote();
    } else {
      console.log("no")
    }
  }

  const pickRandomNote = () => {
    const {x, y} = getRandomFretPosition();
    randomNotePos = {x: x, y: y}

    fretboardNotes[y][x].active = true;
    console.log(fretboardNotes[y][x].note)
  }

  onMount(() => {
    pickRandomNote();
  })

  
</script>

<Options/>
<Fretboard fretboardNotes={fretboardNotes}/>

{#each noteSymbols as note}
  <button 
    class="guess-note-button"
    onclick={() => { check(note) }}
  >
    {note}
  </button>
{/each}

<style>
  .guess-note-button {
    padding: .2em;
  }

</style>