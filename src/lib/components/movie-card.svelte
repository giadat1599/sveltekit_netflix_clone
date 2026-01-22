<script lang="ts">
	import PlayIcon from 'lucide-svelte/icons/play';
	import FavoriteButton from './favorite-button.svelte';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import type { Movie } from '$lib/types';
	type MovieCardProps = {
		movie: Movie;
	};

	let { movie }: MovieCardProps = $props();
</script>

<div class="group col-span relative h-[12vw] bg-zinc-900">
	<img
		src={movie.thumbnailUrl}
		alt="Thumbnail Url"
		class="h-[12vw] w-full cursor-pointer rounded-md object-cover shadow-xl transition delay-300 duration-300 group-hover:opacity-90 sm:group-hover:opacity-0"
	/>
	<div
		class="invisible absolute top-0 z-10 w-full scale-0 opacity-0 transition delay-300 duration-200 group-hover:translate-x-[2vw] group-hover:-translate-y-[6vw] group-hover:scale-110 group-hover:opacity-100 sm:visible"
	>
		<img
			src={movie.thumbnailUrl}
			alt="Thumbnail Url"
			class="h-[12vw] w-full cursor-pointer rounded-t-md object-cover shadow-xl transition duration-300"
		/>
		<div class="z-10 w-full rounded-b-md bg-zinc-800 p-2 shadow-md transition lg:p-4">
			<div class="flex items-center gap-3">
				<button
					class="flex size-6 cursor-pointer items-center justify-center rounded-full bg-white transition hover:bg-neutral-300 lg:size-10"
					onclick={() => goto(resolve('/watch/[movieId]', { movieId: movie.id }))}
				>
					<PlayIcon class="fill-black" />
				</button>
				<FavoriteButton movieId={movie.id} isFavorite={movie.isFavorite} />
			</div>
			<p class="mt-4 font-semibold text-green-400">New <span class="text-white"> 2023 </span></p>
			<div class="mt-4 flex items-center gap-2">
				<p class="text-[10px] text-white lg:text-sm">{movie.duration}</p>
			</div>
			<div class="mt-4 flex items-center gap-2">
				<p class="text-[10px] text-white lg:text-sm">{movie.genre}</p>
			</div>
		</div>
	</div>
</div>
