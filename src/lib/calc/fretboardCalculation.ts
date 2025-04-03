export const calcFretsSlotWidth = (scaleLength: number, fretsCount: number): number[] => 
{
    const arr: number[] = [];

    for (let i = 0; i < fretsCount; i++) {        
        let Ln = scaleLength * Math.pow(0.5, i / 12);
        let Ln_next = scaleLength * Math.pow(0.5, (i + 1) / 12);
        let width = Ln - Ln_next;

        arr.push(width);
    }

    return arr;
}
