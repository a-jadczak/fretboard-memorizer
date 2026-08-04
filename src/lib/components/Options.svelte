<script lang="ts">
	import { onMount } from 'svelte'
	import { NOTE_SYMBOLS } from '@/lib/scripts/fretboard.svelte'
	import { readOptions, saveOptions } from '@/lib/scripts/local-storage'
	import options from '@/lib/scripts/options.svelte'
	import type { NoteSymbol } from '@/lib/types/note-symbol'
	import type { TunningOptionsKey } from '@/lib/types/tuning-option-key'
	import type OptionsToSave from '@/lib/types/options-to-save'
	import SelectField from './SelectField.svelte'

	const INSTRUMENT_OPTIONS: { value: TunningOptionsKey; label: string }[] = [
		{ value: 'string-1', label: '1 String' },
		{ value: 'bass-4', label: 'Bass 4 String' },
		{ value: 'bass-5', label: 'Bass 5 String' },
		{ value: 'guitar-6', label: 'Guitar 6 String' },
		{ value: 'guitar-7', label: 'Guitar 7 String' },
		{ value: 'guitar-8', label: 'Guitar 8 String' },
	]

	const NOTE_OPTIONS = NOTE_SYMBOLS.map((value) => ({ value, label: value }))
	const FRET_OPTIONS = ['5', '12', '22', '24'].map((value) => ({ value, label: value }))

	let tunningOptionsMap: Map<string, NoteSymbol[]> = $state(
		new Map([
			['string-1', ['E']],
			['bass-4', ['G', 'D', 'A', 'E']],
			['bass-5', ['G', 'D', 'A', 'E', 'B']],
			['guitar-6', ['E', 'B', 'G', 'D', 'A', 'E']],
			['guitar-7', ['E', 'B', 'G', 'D', 'A', 'E', 'B']],
			['guitar-8', ['E', 'B', 'G', 'D', 'A', 'E', 'B', 'F#']],
		]),
	)

	let selectedTunningKey: TunningOptionsKey = $state('guitar-6')
	let selectedSingleNote: NoteSymbol = $state('E')
	let numberOfFrets: string = $state(`${options.fretsCount}`)

	const setTunningAndSave = (noteSymbols: NoteSymbol[]) => {
		options.setTunning(noteSymbols, parseInt(numberOfFrets))

		saveOptions({ selectedTunningKey, numberOfFrets, selectedSingleNote })
	}

	const setSelectedTunningAndSave = () => {
		const newTunning = tunningOptionsMap.get(selectedTunningKey) ?? []
		setTunningAndSave(newTunning)
	}

	const setSelectedSingleNoteAndSave = () => {
		tunningOptionsMap.set(selectedTunningKey, [selectedSingleNote])
		setTunningAndSave([selectedSingleNote])
	}

	const setSavedOptions = (savedOptions: OptionsToSave) => {
		const {
			selectedTunningKey: newTunningKey,
			numberOfFrets: newNumberOfFrets,
			selectedSingleNote: newSingleNote,
		} = savedOptions

		const newSelectedTunning: NoteSymbol[] = tunningOptionsMap.get(newTunningKey) ?? []
		const tunning: NoteSymbol[] =
			newTunningKey === 'string-1' ? [newSingleNote] : newSelectedTunning

		selectedTunningKey = newTunningKey
		numberOfFrets = newNumberOfFrets
		selectedSingleNote = newSingleNote

		// Update the selected tuning in the map
		tunningOptionsMap.set('string-1', [newSingleNote])

		// Set the tuning in the options
		options.setTunning(tunning, parseInt(newNumberOfFrets))
	}

	onMount(() => {
		const savedOptions: OptionsToSave | null = readOptions()

		if (!savedOptions) return

		setSavedOptions(savedOptions)
	})
</script>

<div class="options-container">
	<SelectField
		id="instrument"
		label="Instrument:"
		options={INSTRUMENT_OPTIONS}
		bind:value={selectedTunningKey}
		onChange={setSelectedTunningAndSave}
	/>

	{#if selectedTunningKey === 'string-1'}
		<SelectField
			id="custom-single-note"
			label="Custom note:"
			options={NOTE_OPTIONS}
			bind:value={selectedSingleNote}
			onChange={setSelectedSingleNoteAndSave}
		/>
	{/if}

	<SelectField
		id="number-of-frets"
		label="Number of Frets:"
		options={FRET_OPTIONS}
		bind:value={numberOfFrets}
		fieldClass="mt-2 mb-2"
		onChange={setSelectedTunningAndSave}
	/>
</div>
