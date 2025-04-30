<script lang="ts">
    import FretSlot from "./FretSlot.svelte";
    import options from "../scripts/options.svelte";
  import { getColor } from "../constants/noteColorMapper";

    let props = $props();

    let fretsCount = $state(options.fretsCount);
    let tunning = $state(options.tunning);

    const scaleLength: number = 648;
    const fretsMarker: number[] = [3, 5, 7, 9, 12, 15, 17, 19, 21, 24];
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
            <div class="sound-symbol" 
            style="color: {getColor(note)};">{note}</div>
        {/each}
    </div>

    <!-- Fretboard -->
     <div class="frets">
        {#each props.fretboard.getFretboard() as fretNotes, i}
            <div class="fret-row">
                {#each fretNotes as _, j}
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
    <div class="fret-numeration" style="flex-shrink: 0;">
        <span>0</span>
    </div>
    {#each {length: fretsCount} as _, i}
        <div
            class="fret-numeration"
            style="width: {fretsSlotWidth[i]}%;">
            <span>{ fretsMarker.includes(i+1) ? (i+1) : ' ' }</span>
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
        width: 100%;
    }

    .fret-row {
        display: flex;
        flex: 1;
        flex-direction: row;
        width: 100%;
    }

    .sound-symbol {
        display: grid;
        place-items: center;
        width: $default-fret-width;

        border: .125em solid black;
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