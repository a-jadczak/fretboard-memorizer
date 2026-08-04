<!-- Keeps `options` and `value` strongly typed using the same string-based type -->
<script lang="ts" generics="Value extends string">
	interface SelectOption {
		value: Value
		label: string
	}

	interface Props {
		id: string
		label: string
		options: readonly SelectOption[]
		value: Value
		fieldClass?: string
		onChange?: () => void
	}

	let { id, label, options, value = $bindable(), fieldClass = '', onChange }: Props = $props()
</script>

<div class="field is-grouped is-align-items-center {fieldClass}">
	<label class="label mr-2" for={id}>{label}</label>
	<div class="control">
		<div class="select is-primary">
			<select {id} bind:value onchange={onChange}>
				{#each options as option (option.value)}
					<option value={option.value}>{option.label}</option>
				{/each}
			</select>
		</div>
	</div>
</div>
