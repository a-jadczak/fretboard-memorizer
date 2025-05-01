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
        
        <div class="sound-symbol" style="flex-shrink: 0;">
            <span>0</span>
        </div>
    </div>
    
    <!-- Fretboard -->
    <div class="frets-container">
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
         
            <div class="fret-numeration-container">
                {#each {length: fretsCount} as _, i}
                    <div
                        class="fret-numeration"
                        style="width: {fretsSlotWidth[i]}%;">
                        <span>{ fretsMarker.includes(i+1) ? (i+1) : ' ' }</span>
                    </div>
                {/each}
            </div>
        </div>
    </div>

</div>

<!-- Numeration -->
<!-- <div class="fret-numeration-container">
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
</div> -->

<style lang="scss">
    $default-fret-width: 1.75em;

    .fretboard {
        width: 100%;
        display: flex;
        flex-direction: row;
        background: linear-gradient(135deg, #6e4b3a 25%, #7f5a3c 50%, #6e4b3a 75%);
        background-size: 400% 400%;
    }

    .fret-column {
        display: flex;
        flex-direction: column;
        background-color: rgb(42, 42, 42);
    }

    .frets-container {
        width: 100%;
        overflow: scroll;
        scrollbar-width: none; /* ukrywa scrollbar */
        scrollbar-color: transparent transparent;
    }

    .frets-container::-webkit-scrollbar {
        height: 0px;
        background: transparent;
    }

    .frets {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        width: 100%; // TOEDIT
        height: 100%;
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

        // border: .125em solid black;
    }

    .fret-numeration-container {
        display: flex;
        flex: 1;
        flex-direction: row;
        background-color: rgb(42, 42, 42);;
    }

    .fret-numeration {
        width: $default-fret-width;
        text-align: center;
    }
</style>