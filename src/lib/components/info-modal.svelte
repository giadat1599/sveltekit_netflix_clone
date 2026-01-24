<script lang="ts">
	import XIcon from 'lucide-svelte/icons/x';
	import PlayIcon from 'lucide-svelte/icons/play';
	import { resolve } from '$app/paths';
	import type { Movie } from '$lib/types';
	import { cn } from '$lib/utils';
	import { infoModal } from '../../stores/info-modal';
	import PlayButton from './play-button.svelte';
	import FavoriteButton from './favorite-button.svelte';

	type InfoModalProps = {
		visible?: boolean;
		onClose?: () => void;
	};

	let { visible, onClose }: InfoModalProps = $props();

	let movie = $state<Movie | null>(null);
	let isVisible = $state(false);

	async function fetchMovie(movieId: string) {
		const res = await fetch(resolve('/api/movies/[movieId]', { movieId }));

		if (res.ok) {
			movie = await res.json();
		}
	}

	function handleClose() {
		isVisible = false;
		setTimeout(() => {
			onClose?.();
			movie = null;
		}, 300);
	}

	$effect(() => {
		if (visible) {
			// Small delay to trigger the animation after mount
			setTimeout(() => (isVisible = true), 10);

			if (movie === null && $infoModal.movieId) {
				fetchMovie($infoModal.movieId);
			}
		} else {
			isVisible = false;
		}
	});
</script>

{#if visible}
	<div
		class="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto bg-black/80 transition duration-300"
	>
		<div class="relative mx-auto w-auto max-w-3xl overflow-hidden rounded-md">
			<div
				class={cn(
					isVisible ? 'scale-100' : 'scale-0',
					'relative flex-auto transform bg-zinc-900 drop-shadow-md duration-300'
				)}
			>
				{#if movie}
					<div class="relative h-96">
						<video
							class="size-full object-cover brightness-60"
							autoplay
							muted
							loop
							poster={movie?.thumbnailUrl}
							src={movie?.videoUrl}
						>
						</video>
						<button
							class="absolute top-3 right-3 flex size-10 cursor-pointer items-center justify-center rounded-full bg-black/70"
							onclick={handleClose}
						>
							<XIcon class="text-white" size={20} />
						</button>
						<div class="absolute bottom-[10%] left-10">
							<p class="mb-8 h-full text-3xl font-bold text-white md:text-4xl lg:text-5xl">{movie?.title}</p>
							<div class="flex items-center gap-4">
								<PlayButton movieId={movie?.id} />
								<FavoriteButton movieId={movie?.id} isFavorite={movie?.isFavorite} />
							</div>
						</div>
					</div>
					<div class="px-12 py-8">
						<p class="text-lg font-semibold text-green-400">New</p>
						<p class="text-lg text-white">{movie?.duration}</p>
						<p class="text-lg text-white">{movie?.genre}</p>
						<p class="text-lg text-white">{movie?.description}</p>
					</div>
				{/if}
			</div>
		</div>
	</div>
{/if}
