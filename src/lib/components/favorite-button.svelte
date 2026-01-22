<script lang="ts">
	import PlusIcon from 'lucide-svelte/icons/plus';
	import CheckIcon from 'lucide-svelte/icons/check';
	import { invalidateFavoriteMovies, invalidateTrendingMovies } from '../../stores/invalidates';

	type FavoriteButtonProps = {
		movieId: string;
		isFavorite: boolean;
	};

	let { movieId, isFavorite }: FavoriteButtonProps = $props();

	let optimisiticIsFavorite = $derived(isFavorite);

	async function toggleFavorite() {
		let res: Response | null = null;
		try {
			if (optimisiticIsFavorite) {
				optimisiticIsFavorite = false;
				res = await fetch('/api/movies/favorites', {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ movieId })
				});
			} else {
				optimisiticIsFavorite = true;

				res = await fetch('/api/movies/favorites', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify({ movieId })
				});
			}

			if (res.status !== 200) {
				alert('Something went wrong. Please try again later.');
				optimisiticIsFavorite = isFavorite;
			}

			invalidateFavoriteMovies();
			invalidateTrendingMovies();
		} catch (error) {
			alert('Something went wrong. Please try again later.');
			optimisiticIsFavorite = isFavorite;
		}
	}
</script>

<button
	class="group/item flex size-6 cursor-pointer items-center justify-center rounded-full border-2 border-white transition hover:border-neutral-300 lg:size-10"
	onclick={toggleFavorite}
>
	{#if optimisiticIsFavorite}
		<CheckIcon class="text-white" size={25} />
	{:else}
		<PlusIcon class="text-white" size={25} />
	{/if}
</button>
