<script lang="ts">
  import Options from "./lib/components/Options.svelte";
  import { Fretboard as FretBoardClass } from "./lib/scripts/fretboard.svelte";
  import options from "./lib/scripts/options.svelte";
  import "./styles/style.scss"
  import 'bulma/css/bulma.min.css';
  import Fretboard from "./lib/components/Fretboard.svelte";
    

</script>

<div class="wrapper">
  <Options/>

  <div class="container-fretboard">
    <div class="fretboard">
      <Fretboard/>
    </div>
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
    display: flex;
    justify-content: center;
  }

  .fretboard {
    width: clamp(300px, 100vw, 1200px);
  }

  .container-grid-buttons {
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