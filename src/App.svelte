<script lang="ts">
	import Options from '@/lib/components/Options.svelte'
	import Fretboard from '@/lib/components/Fretboard.svelte'
</script>

<div class="wrapper">
	<header>
		<Options />
	</header>

	<main class="container-fretboard">
		<Fretboard />
	</main>
</div>

<style>
	.wrapper {
		display: flex;
		flex-direction: column;
		min-height: 100svh;
	}

	header {
		margin: 0.5em;
	}

	main {
		width: 100%;
		flex: 1;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}
</style>
