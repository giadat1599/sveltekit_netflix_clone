<script lang="ts">
	import type { HTMLInputTypeAttribute } from 'svelte/elements';

	type InputProps = {
		id: string;
		value?: string;
		label: string;
		name?: string;
		type?: HTMLInputTypeAttribute;
	};

	let { value = $bindable(), id, label, ...restProps }: InputProps = $props();
</script>

<div class="relative">
	<input
		{id}
		class="peer block w-full appearance-none rounded-md bg-neutral-700 px-6 pt-6 pb-1 text-base text-white focus:ring-0 focus:outline-none"
		placeholder=" "
		bind:value
		{...restProps}
	/>
	<label
		class="absolute top-4 left-6 z-10 origin-left -translate-y-3 scale-75 transform text-base text-zinc-400 duration-100 peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 peer-focus:-translate-y-3 peer-focus:scale-75"
		for={id}
	>
		{label}
	</label>
</div>
