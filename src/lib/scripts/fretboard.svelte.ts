import { SCALE_LENGTH } from '@/lib/constants/fretboard'
import type FretNote from '@/lib/types/fret-note'
import type { NoteSymbol } from '@/lib/types/note-symbol'
import type Options from '@/lib/types/options'
import type Position from '@/lib/types/position'

export const NOTE_SYMBOLS: NoteSymbol[] = [
	'C',
	'C#',
	'D',
	'D#',
	'E',
	'F',
	'F#',
	'G',
	'G#',
	'A',
	'A#',
	'B',
]
export const NOTE_SYMBOLS_WITH_FLATS: string[] = [
	'C',
	'C#/D♭',
	'D',
	'D#/E♭',
	'E',
	'F',
	'F#/G♭',
	'G',
	'G#/A♭',
	'A',
	'A#/B♭',
	'B',
]

export class Fretboard {
	#fretboardNotes: FretNote[][] = $state<FretNote[][]>([])
	#randomNotePos: Position = $state({ x: -1, y: -1 })

	#scrollMoveOffset = 50
	#lastRandomNote: Position = { x: -1, y: -1 }
	onRandom: (value: number) => void

	constructor(onRandomCB: (value: number) => void, onResizeCB: () => void) {
		this.onResize(onResizeCB)

		this.onRandom = onRandomCB
		window.addEventListener('resize', () => this.onResize(onResizeCB))
	}

	onResize = (callback: () => void) => {
		this.calcScrollMoveOffset()
		callback()
	}

	calcScrollMoveOffset = (): void => {
		const width = window.innerWidth
		const calculation = 100 / Math.pow(width, 0.95)
		const multiplier = calculation > 0.17 ? 0.17 : calculation

		this.#scrollMoveOffset = width * multiplier
		console.log(multiplier)
	}

	setFretboard(options: Options) {
		this.#fretboardNotes = this.initializeFretboard(options)
		this.pickRandomNote(options)
	}

	getRandomNotePos() {
		return this.#randomNotePos
	}

	getFretboard() {
		return this.#fretboardNotes
	}

	calcFretsSlotWidth = (fretsCount: number): number[] => {
		const arr: number[] = []

		for (let i = 0; i < fretsCount; i++) {
			const Ln = SCALE_LENGTH * Math.pow(0.5, i / 12)
			const Ln_next = SCALE_LENGTH * Math.pow(0.5, (i + 1) / 12)
			const width = Ln - Ln_next

			arr.push(width)
		}

		return arr
	}
	initializeFretboard = (options: Options): FretNote[][] => {
		const tunning = [...options.tunning]
		const fretsCount = options.fretsCount
		const stringsCount = options.stringsCount

		const arr: FretNote[][] = []

		for (let i = 0; i < stringsCount; i++) {
			const stringTune: NoteSymbol = tunning[i]
			arr.push([])

			for (let j = 0; j < fretsCount; j++) {
				// fretsCount + 1 to include the (zero fret)
				arr[i].push({
					note: this.getFrettedNote(stringTune, j + 1),
					active: false,
				})
			}
		}

		return arr
	}
	getFrettedNote = (stringNote: NoteSymbol, fretNumber: number): NoteSymbol => {
		const noteIndex = NOTE_SYMBOLS.findIndex((e) => e === stringNote)

		const targetIndex = (noteIndex + fretNumber) % 12

		return NOTE_SYMBOLS[targetIndex]
	}
	getRandomFretPosition = (options: Options): Position => {
		const { fretsCount, stringsCount } = options

		let rndString: number, rndFret: number
		do {
			rndString = Math.floor(Math.random() * stringsCount)
			rndFret = Math.floor(Math.random() * fretsCount)
		} while (this.#lastRandomNote.x === rndFret && this.#lastRandomNote.y === rndString)

		this.#lastRandomNote = { x: rndFret, y: rndString }
		return { x: rndFret, y: rndString }
	}
	pickRandomNote = (options: Options) => {
		const { x, y } = this.getRandomFretPosition(options)
		this.#randomNotePos = { x: x, y: y }

		this.#fretboardNotes[y][x].active = true

		console.log(this.#fretboardNotes[y][x].note)

		setTimeout(() => {
			this.onRandom(x * this.#scrollMoveOffset)
		}, 0) // to force reactivity
	}
	checkNote = (note: NoteSymbol, options: Options) => {
		const { x, y } = this.#randomNotePos

		const correctNote = this.#fretboardNotes[y][x]

		if (correctNote.note === note) {
			this.#fretboardNotes[y][x].active = false
			this.pickRandomNote(options)
		}
	}
}
