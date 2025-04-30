<script lang="ts">
  import Options from "./lib/components/Options.svelte";
  import { Fretboard as FretBoardClass, noteSymbols } from "./lib/scripts/fretboard.svelte";
  import options from "./lib/scripts/options.svelte";
  import "./styles/style.scss"
  import 'bulma/css/bulma.min.css';
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
  
  function applyNoteStyle(e: MouseEvent, color: string | undefined) {
    const target = e.target as HTMLElement;
    target.style.boxShadow = `0 .01em .1em ${color}`;
    target.style.border = `.1em solid ${color}`;
  }

</script>

<Options/>
<Fretboard fretboard={fretboard}/>

<div class="has-text-centered">
  {#each noteSymbols as note}
    <button
      style="
        color: {getColor(note)};
        boxShadow: 0 .01em .1em {getColor(note)};
        border: .1em solid {getColor(note)};
      "
      class="button is-inline-block m-1 is-primary is-inverted"
      onclick={() => { fretboard.checkNote(note, options) }}
    >
      {note}
    </button>
  {/each}
</div>

<style>

</style>