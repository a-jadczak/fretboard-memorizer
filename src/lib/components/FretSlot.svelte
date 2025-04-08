<script lang="ts">
    const { width, fretDistance }: {width: number, fretDistance: number} = $props();

    const onFretClick = () => {
        console.log(fretDistance);
    }

    let active: boolean = $state(false);
</script>


<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore event_directive_deprecated -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div 
    class="fret-slot" 
    style="width: {width / 5}vw;"
    >
    <div class="fret"></div>
    <div class="string" 
        class:active
        on:mouseenter={() => active = true}
        on:mouseleave={() => active = false}
        on:click={onFretClick}
    ></div>
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