<script lang="ts">
    import { getColor } from "../constants/noteColorMapper";
    import { noteSymbols, type Fretboard } from "../scripts/fretboard.svelte";
    import options from "../scripts/options.svelte";

    let props: { fretboard: Fretboard } = $props();

</script>


<div class="container-grid-buttons">
    <div class="grid-buttons">
      {#each noteSymbols as note}
        <button
          style="
            color: {getColor(note)};
            boxShadow: 0 .01em .1em {getColor(note)};
            border: .1em solid {getColor(note)};
          "
          class="button is-inline-block m-1 is-primary is-inverted guess-button"
          onclick={() => { props.fretboard.checkNote(note, options) }}
        >
          {note}
        </button>
      {/each}
    </div>
</div>



<style>
  .container-grid-buttons {
    height: 100%;
    width: 100%;
    flex: 1;

    display: flex;
    justify-content: center;
    align-items: center;
  }
    
	.grid-buttons {
    width: clamp(300px, 100vw, 1200px);
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		gap: 0.5em;
	}

  .guess-button {
    font-size: 1.5em;
  }
</style>