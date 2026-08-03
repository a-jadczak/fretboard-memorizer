<script lang="ts">
	import { getNoteColor } from '@/lib/constants/note-color-mapper'
	import {
		type Fretboard,
		NOTE_SYMBOLS,
		NOTE_SYMBOLS_WITH_FLATS,
	} from '@/lib/scripts/fretboard.svelte'
	import options from '@/lib/scripts/options.svelte'

	let props: { fretboard: Fretboard } = $props()
</script>

<div class="container-grid-buttons">
	<div class="grid-buttons">
		{#each NOTE_SYMBOLS as note, i (note)}
			<button
				style="
            color: {getNoteColor(note)};
            boxShadow: 0 .01em .1em {getNoteColor(note)};
            border: .1em solid {getNoteColor(note)};
          "
				class="button is-inline-block m-1 is-primary is-inverted guess-button"
				onclick={() => {
					props.fretboard.checkNote(note, options)
				}}
			>
				{NOTE_SYMBOLS_WITH_FLATS[i]}
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
