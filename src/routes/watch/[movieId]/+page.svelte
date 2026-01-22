<script lang="ts">
	import ArrowLeftIcon from 'lucide-svelte/icons/arrow-left';
	import { page } from '$app/state';
	import type { Movie } from '$lib/types';
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	let movie: Movie | null = $state(null);

	async function fetchMovie(movieId?: string) {
		if (!movieId) return;
		const res = await fetch(`/api/movies/${movieId}`);
		if (res.ok) {
			movie = await res.json();
		}
	}

	onMount(() => {
		fetchMovie(page.params.movieId);
	});
</script>

<div class="h-screen w-screen bg-black">
	<nav class="fixed z-10 flex w-full items-center gap-8 bg-black/70 p-4">
		<button class="cursor-pointer text-white" onclick={() => goto('/')}>
			<ArrowLeftIcon size={40} />
		</button>
		<p class="text-xl font-bold text-white md:text-3xl"><span class="font-light">Watching {' '}</span>{movie?.title}</p>
	</nav>
	<video autoplay controls src={movie?.videoUrl} class="size-full">
		<track kind="captions" />
	</video>
</div>
