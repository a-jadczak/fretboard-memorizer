<script lang="ts">
  import type FretNote from "../types/FretNote";

    const { width, fretDistance, fretboardNotes, position } = $props<{ width: number; fretDistance: number; fretboardNotes: FretNote[][], position: {x:number, y:number} }>();

    let active: boolean = $state(false);

    $effect(() => {
        active = fretboardNotes[position.y][position.x].active;
    })

</script>

<div 
    class="fret-slot" 
    style="width: {width / 5}vw;">
    <div class="fret"></div>
    <div class="string" class:active></div>
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
        border: .05em solid darkgray;
    }

    .fret {
        top: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        border-right: .1em solid gray;
    }

    .active {
        border: .05em solid lawngreen;
        box-shadow: 0px 0px .2em .05em lawngreen;
    }

</style>