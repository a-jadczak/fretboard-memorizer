import type OptionsToSave from "../types/OptionsToSave";

const SAVE_KEY: string = "FRETBOARD-MEMORIZER-OPTIONS";

export const saveOptions = (options: OptionsToSave) => {
    const optionsToSave: OptionsToSave = options;
    localStorage.setItem(SAVE_KEY, JSON.stringify(optionsToSave));
}

export const readOptions = (): OptionsToSave | null => {
    const savedObject = localStorage.getItem(SAVE_KEY);

    if (!savedObject) {
        return null;
    }

    try {
        const savedParsedObject: OptionsToSave = JSON.parse(savedObject);
        const newOptions: OptionsToSave = savedParsedObject;

        return newOptions;
    }
    catch (error) {
        console.error('Failed to read tuning from localStorage', error);
        return null;
    }

}