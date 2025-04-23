<script lang="ts">
  import { noteSymbols } from "../scripts/fretboard.svelte";
    import options from "../scripts/options.svelte";
    import type { NoteSymbol } from "../types/NoteSymbol";
    import type { TunningOptionsKey } from "../types/TunningOptionsKey";
    
    const tunningOptions: Map<string, NoteSymbol[]> = $state(new Map([
        ["string-1", ["E"]],
        ["bass-4", ["G", "D", "A", "E"]],
        ["bass-5", ["G", "D", "A", "E", "B"]],
        ["guitar-6", ["E", "B", "G", "D", "A", "E"]],
        ["guitar-7", ["E", "B", "G", "D", "A", "E", "B"]],
        ["guitar-8", ["E", "B", "G", "D", "A", "E", "B", "F#"]]
    ]));

    let selectedTunningKey: TunningOptionsKey = $state("guitar-6");
    let selectedTunning: NoteSymbol[] | undefined = $state(tunningOptions.get(selectedTunningKey));
    let selectedSingleNote: NoteSymbol = $state("E");
    let numberOfFrets: number = $state(5);



    const setTunning = (noteSymbols: NoteSymbol[]) => {
        //@ts-ignore
        options.setTunning(noteSymbols, numberOfFrets);
    }

    $inspect("Options:", options.tunning)
</script>


<div class="options-container">
    <div class="control-container">
        <label for="instrument">Instrument:</label>
        <select name="instrument" bind:value={selectedTunningKey} onchange={() => {
            selectedTunning = tunningOptions.get(selectedTunningKey);
            //@ts-ignore
            setTunning(selectedTunning)
        }}>
            <option value="string-1">1 String</option>
            <option value="bass-4">Bass 4 String</option>
            <option value="bass-5">Bass 5 String</option>
            <option selected value="guitar-6">Guitar 6 String</option>
            <option value="guitar-7">Guitar 7 String</option>
            <option value="guitar-8">Guitar 8 String</option>
        </select>
    </div>

    
    {#if selectedTunningKey === "string-1"}
        <div class="control-container">
            <label for="custom-single-note">Custom note:</label>
            <select name="custom-single-note" bind:value={selectedSingleNote} onchange={() => {
                selectedTunning = [selectedSingleNote];

                setTunning(selectedTunning)
            }}>
                {#each noteSymbols as note}
                    <option value="{note}">{note}</option>
                {/each}
            </select>
        </div>
    {/if}

    <br>
    <div class="control-container">
        <label for="number-of-frets">Number of Frets:</label>
        <select name="number-of-frets" bind:value={numberOfFrets} onchange={() => {
            // @ts-ignore
            setTunning(selectedTunning)
        }}>
            <option value="5">5</option>
            <option value="12">12</option>
            <option value="22">22</option>
            <option value="24">24</option>
        </select>
    </div>
</div>


<style lang="scss">

    .options-container {

    }

    .control-container {

    }

</style>