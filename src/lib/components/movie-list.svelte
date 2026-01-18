<script lang="ts">
	import MovieCard from './movie-card.svelte';

	type MovieListProps = {
		data: Record<string, any>[];
		title: string;
	};
	let { data, title }: MovieListProps = $props();
</script>

{#if data.length}
	<div class="mt-4 space-y-8 px-4 md:px-12">
		<div>
			<p class="mb-4 text-base font-semibold text-white md:text-xl lg:text-2xl">{title}</p>
			<div class="grid grid-cols-4 gap-2">
				{#each data as movie (movie.id)}
					<MovieCard {movie} />
				{/each}
			</div>
		</div>
	</div>
{/if}
