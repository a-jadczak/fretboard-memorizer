<script lang="ts">
  import options from "../scripts/options.svelte";
  import type FretNote from "../types/FretNote";

    const { width, fretboardNotes, position } = $props<{ width: number; fretDistance: number; fretboardNotes: FretNote[][], position: {x:number, y:number} }>();

    let stringActive: boolean = $state(false);

    $effect(() => {
        stringActive = fretboardNotes[position.y][position.x].active;
    })

</script>

<div 
    class="fret-slot" 
    style="width: {width / options.fretSlotDividerValue}em;">
    <div class="fret"></div>
    <div class:stringActive class="string">

    </div>
</div>


<style lang="scss">
    .fret-slot {
        height: 100%;
        display: flex;
        position: relative;
        padding: .4em 0em;
    }

    .string, .string-active {
        position: absolute;
        width: 100%;
        top: 40%;
        height: .25em;
    }

    .string {
        background: 
            repeating-linear-gradient(
            123deg, #545454,
            #545454 .025em,
            #666666 .07em, 
            #666666 .3em);
        border-top: .01em solid black;
        border-bottom: .01em solid black;

        box-shadow: 0px -4px .2em .0025em rgba(0, 0, 0, 0.35);
    }

    .stringActive {
        background: 
            repeating-linear-gradient(
            123deg, lawngreen,
            lawngreen .025em,
            rgb(99, 193, 6) .07em, 
            rgb(99, 193, 6) .3em);
    
        border-top: .01em solid lawngreen;
        border-bottom: .01em solid lawngreen;
        box-shadow: 0px 0px .2em .05em lawngreen;
    }

    .fret {
        top: 0;
        position: absolute;
        width: 100%;
        height: 100%;
        border-right: .2em solid gray;
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