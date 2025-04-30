<script lang="ts">
  import type FretNote from "../types/FretNote";

    const { width, fretboardNotes, position } = $props<{ width: number; fretDistance: number; fretboardNotes: FretNote[][], position: {x:number, y:number} }>();

    let active: boolean = $state(false);

    const guitarStringThickness: number = 0.07;

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
        style="border: {guitarStringThickness}em solid {active ? "lawngreen" : "darkgray"}"
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


        border: 0.07em solid darkgray;
    }

    .fret {
        top: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        border-right: .1em solid gray;
    }

    .circle {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);

        width: 1em;
        height: 1em;
        border-radius: 100%;
        background-color: palegoldenrod;
    }

    .active {
        box-shadow: 0px 0px .2em .05em lawngreen;
    }

</style>