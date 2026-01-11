<script lang="ts">
	import { goto } from '$app/navigation';
	import DefaultBlue from '$lib/assets/default-blue.png';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="flex h-full items-center justify-center">
	<div class="flex flex-col">
		<h1 class="text-center text-3xl text-white md:text-6xl">Who is watching?</h1>
		<div class="mt-10 flex items-center justify-center gap-8">
			<button
				type="button"
				onclick={() => goto('/')}
				class="group mx-auto flex w-44 flex-col border-none bg-transparent p-0 focus:outline-none"
			>
				<div
					class="flex size-44 items-center justify-center overflow-hidden rounded-md border-2 border-transparent group-hover:cursor-pointer group-hover:border-white"
				>
					<img src={DefaultBlue} alt="Profiles" />
				</div>
				<div class="mt-4 text-center text-2xl text-gray-400 group-hover:text-white">{data.user.name}</div>
			</button>
		</div>
	</div>
</div>
