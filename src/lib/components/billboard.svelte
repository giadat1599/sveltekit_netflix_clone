<script lang="ts">
	import type { Movie } from '$lib/types';
	import { onMount } from 'svelte';
	import InfoIcon from 'lucide-svelte/icons/info';

	let movie: Movie | null = $state(null);

	async function fetchBillboard() {
		const res = await fetch('/api/movies/random');
		if (res.ok) {
			movie = await res.json();
		}
	}

	onMount(() => {
		fetchBillboard();
	});
</script>

<div class="relative h-[56.25vw]">
	<video
		class="h-[56.25vw] w-full object-cover brightness-60"
		autoplay
		muted
		loop
		src={movie?.videoUrl}
		poster={movie?.thumbnailUrl}
	></video>
	<div class="absolute top-[30%] ml-4 md:top-[40%] md:ml-16">
		<p class="h-full w-[50%] text-xl font-bold text-white drop-shadow-xl md:text-5xl lg:text-6xl">{movie?.title}</p>
		<p class="mt-3 w-[90%] text-[8px] text-white drop-shadow-xl md:mt-8 md:w-[80%] md:text-lg lg:w-[50%]">
			{movie?.description}
		</p>
		<div class="mt-3 flex items-center gap-3 md:mt-4">
			<button
				class="flex w-auto cursor-pointer items-center rounded-md bg-white/30 px-2 py-1 text-xs font-semibold text-white transition hover:bg-white/20 md:px-4 md:py-2 lg:text-lg"
			>
				<InfoIcon class="mr-1" />
				More Info
			</button>
		</div>
	</div>
</div>
