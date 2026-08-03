<script lang="ts">
	import Options from './lib/components/Options.svelte'
	import Fretboard from './lib/components/Fretboard.svelte'
</script>

<div class="wrapper">
	<Options />

	<div class="container-fretboard">
		<Fretboard />
	</div>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100vh;
	}

	.container-fretboard {
		width: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
