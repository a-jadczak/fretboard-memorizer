<script lang="ts">
    const { width }: {width: number} = $props();

</script>


<div class="fret-slot" style="width: {width / 5}vw;">
    <div class="fret"></div>
    <div class="string"></div>
</div>


<style>
    .fret-slot {
        height: 100%;
        display: flex;
        position: relative;

        background-color: aquamarine;
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
</style>