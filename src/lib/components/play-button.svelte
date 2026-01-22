<script lang="ts">
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import PlayIcon from 'lucide-svelte/icons/play';

	type PlayButtonProps = {
		movieId: string;
	};

	let { movieId }: PlayButtonProps = $props();
</script>

<button
	class="flex w-auto cursor-pointer items-center justify-center rounded-md bg-white px-2 py-1 text-xs font-semibold transition hover:bg-neutral-300 md:px-4 md:py-2 lg:text-lg"
	onclick={() => goto(resolve('/watch/[movieId]', { movieId }))}
>
	<PlayIcon size={25} class="mr-1 fill-black" />
	Play
</button>
