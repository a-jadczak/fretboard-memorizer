<script lang="ts">
    import { calcFretsSlotWidth } from "../scripts/fretboardCalculation";
    import FretSlot from "./FretSlot.svelte";
    import options from "../scripts/options.svelte";

    const scaleLength: number = 648;

    const fretsSlotWidth: number[] = calcFretsSlotWidth(scaleLength, 12);
</script>


<div class="fretboard">
    <!-- Guitar tuning -->
    <div class="fret-column">
        {#each options.tunning as note}
            <div class="sound-symbol">{note}</div>
        {/each}
    </div>

    <!-- Fretboard -->
    {#each new Array(options.fretsCount) as _, i}
        <div class="fret-column">
            {#each new Array(options.stringsCount) as _}
                <FretSlot 
                    width={fretsSlotWidth[i]}
                    fretDistance={i}
                />
            {/each}
        </div>
    {/each}

</div>

<!-- Numeration -->
<div class="fret-numeration-container">
    <div class="fret-numeration">0</div>
    {#each new Array(options.fretsCount) as _, i}
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