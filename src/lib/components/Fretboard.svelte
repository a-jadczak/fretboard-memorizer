<script lang="ts">
    import FretSlot from "./FretSlot.svelte";
    import options from "../scripts/options.svelte";

    let props = $props();

    let fretsCount = $state(options.fretsCount);
    let tunning = $state(options.tunning);

    const scaleLength: number = 648;
    let fretsSlotWidth: number[] = $state(props.fretboard.calcFretsSlotWidth(scaleLength, fretsCount));

    $effect(() => { 
        tunning = options.tunning
        fretsCount = options.fretsCount
        fretsSlotWidth = props.fretboard.calcFretsSlotWidth(scaleLength, fretsCount);
    })

</script>


<div class="fretboard">

    <!-- Guitar tuning -->
    <div class="fret-column">
        {#each tunning as note}
            <div class="sound-symbol">{note}</div>
        {/each}
    </div>

    <!-- Fretboard -->
     <div class="frets">
        {#each props.fretboard.getFretboard() as fretNotes, i}
            <div class="fret-row">
                {#each fretNotes as fretNote, j}
                    <FretSlot
                        fretboardNotes={props.fretboard.getFretboard()}
                        position={{y: i, x: j}}
                        width={fretsSlotWidth[j]}
                        fretDistance={i}
                    />
                {/each}
            </div>
        {/each}
    </div>

</div>

<!-- Numeration -->
<div class="fret-numeration-container">
    <div class="fret-numeration">0</div>
    {#each {length: fretsCount} as _, i}
        <div
            class="fret-numeration"
            style="width: {fretsSlotWidth[i] / 5}vw;">
            <span>{i+1}</span>
        </div>
    {/each}
</div>

<style lang="scss">
    $default-fret-width: 1.75em;
    .fretboard {
        width: 100%;

        display: flex;
        flex-direction: row;
    }

    .fret-column {
        display: flex;
        flex-direction: column;
    }

    .frets {
        display: flex;
        flex-direction: column;
        align-items: stretch;
    }

    .fret-row {
        display: flex;
        flex: 1;
        flex-direction: row;
    }

    .sound-symbol {
        display: grid;
        place-items: center;
        width: $default-fret-width;

        border: 2px solid black;
    }

    .fret-numeration-container {
        display: flex;
        flex-direction: row;
    }

    .fret-numeration {
        width: $default-fret-width;
        text-align: center;
    }
</style>