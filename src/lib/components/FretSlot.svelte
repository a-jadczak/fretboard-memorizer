<script lang="ts">
  import type FretNote from "../types/FretNote";

    const { width, fretboardNotes, position } = $props<{ width: number; fretDistance: number; fretboardNotes: FretNote[][], position: {x:number, y:number} }>();

    let active: boolean = $state(false);

    let stringCounter = $state(position.y);

    const guitarStringsThickness: number[] = [
        0.009, 0.03, 0.05, 0.06, 
        0.09, 0.1, 0.12, 0.15
    ];


    $effect(() => {
        active = fretboardNotes[position.y][position.x].active;
        console.log(position)
    })

</script>

<div 
    class="fret-slot" 
    style="width: {width}%;">
    <div class="fret"></div>
    <div
        class:active
        style="border: {guitarStringsThickness[stringCounter]}em solid {active ? "lawngreen" : "darkgray"}"
        class="string" 
    >

    </div>
</div>


<style>
    .fret-slot {
        height: 100%;
        display: flex;
        position: relative;

        background-color: saddlebrown;
        padding: .4em 0em;

    }

    .string {
        position: absolute;
        width: 100%;
        top: 40%;


        border: .009em solid darkgray;
    }

    .fret {
        top: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        border-right: .1em solid gray;
    }

    .active {
        box-shadow: 0px 0px .2em .05em lawngreen;
    }

</style>