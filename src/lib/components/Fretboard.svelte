<script lang="ts">
    import FretSlot from "./FretSlot.svelte";
    import options from "../scripts/options.svelte";
    import { getColor } from "../constants/noteColorMapper";
    import { Fretboard } from "../scripts/fretboard.svelte";
    import GuessButtons from "./GuessButtons.svelte";
    import { fretsMarker } from "../constants/fretboard";

    let scrollContainer: HTMLDivElement;

    // Callback function to scroll the fretboard
    const scrollTo = (value: number): void => { 
        scrollContainer.scrollLeft = value;
    }

    const fretboard = new Fretboard(scrollTo, ()=> options.updateFretboardResponsiveness());

    let fretsCount = $state(options.fretsCount);
    let tunning = $state(options.tunning);
    let fretsSlotWidth: number[] = $state(fretboard.calcFretsSlotWidth(fretsCount));

    $effect(() => { 
        tunning = options.tunning
        fretsCount = options.fretsCount
        fretsSlotWidth = fretboard.calcFretsSlotWidth(fretsCount);
    })

    // To avoid multpiple $effect trigger while changing options
    let lastOptionsJSON: string = $state("");

    $effect(() => {
        // To avoid multpiple $effect trigger while changing options
        const json = JSON.stringify(options);

        if (json !== lastOptionsJSON) {
            lastOptionsJSON = json;
            fretboard.setFretboard(options);
        }

        options.updateFretboardResponsiveness();
    })

</script>


<div class="fretboard-container">
    <div class="fretboard" style="max-width: 90%;">
        <!-- Guitar tuning -->
        <div class="fret-column">
            {#each tunning as note}
                <div class="sound-symbol" 
                style="color: {getColor(note)};">{note}</div>
            {/each}
            
            <div class="sound-symbol" style="flex-shrink: 0;">
                <span class="fret-number"> &nbsp; </span>
            </div>
        </div>
        
        <!-- Fretboard -->
        <div class="frets-container" bind:this={scrollContainer} id="fretboard-scroll-container">
            <div class="frets" style="">
                {#each fretboard.getFretboard() as fretNotes, i}
                    <div class="fret-row">
                        {#each fretNotes as _, j}
                            <FretSlot
                                fretboardNotes={fretboard.getFretboard()}
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
                            style="width: {fretsSlotWidth[i] / options.fretSlotDividerValue}em;">
                            <span class="fret-number">{ fretsMarker.includes(i+1) ? (i+1) : ' ' }</span>
                        </div>
                    {/each}
                </div>

            </div>
        </div>
    </div>
</div>

<GuessButtons fretboard={fretboard}/>

<style lang="scss">
    $default-fret-width: 1.75em;

    .fretboard-container {
        display: flex;
        justify-content: center;
    }
    .fretboard {
        width: auto;
        max-width: 90%;

        display: flex;
        flex-direction: row;
        background: linear-gradient(135deg, #6e4b3a 25%, #7f5a3c 50%, #6e4b3a 75%);
        background-size: 400% 400%;

        font-size: 1.75em;
    }

    .fret-column {
        display: flex;
        flex-direction: column;
        background-color: rgb(42, 42, 42);
    }

    .frets-container {
        width: 100%;
        overflow: scroll;
        scrollbar-width: none; /* hides scrollbar */
        scrollbar-color: transparent transparent;
        scroll-behavior: smooth;
    }

    .frets {
        display: flex;
        flex-direction: column;
        align-items: stretch;
        height: 100%;
    }

    .fret-row {
        display: flex;
        flex: 1;
        flex-direction: row;
        width: fit-content;
    }

    .sound-symbol {
        display: grid;
        place-items: center;
        width: $default-fret-width;
    }

    .fret-numeration-container {
        width: fit-content;
        display: flex;
        flex: 1;
        flex-direction: row;
        background-color: rgb(42, 42, 42);;
    }

    .fret-numeration {
        width: $default-fret-width;
        text-align: center;
    }

    .fret-number {
        width: 100%;
        height: 100%;
        display: block;
        text-align: center;
        font-size: .9em;
    }
</style>