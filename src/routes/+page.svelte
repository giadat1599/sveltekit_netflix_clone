<script lang="ts">
	import Billboard from '$lib/components/billboard.svelte';
	import MovieList from '$lib/components/movie-list.svelte';
	import Navbar from '$lib/components/navbar.svelte';
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import { favoriteMoviesInvalidation, trendingMoviesInvalidation } from '../stores/invalidates';

	let { data }: PageProps = $props();

	let trendingMovies = $state([]);
	let favoriteMovies = $state([]);

	async function fetchTrendingMovies() {
		const res = await fetch('/api/movies');
		if (res.ok) {
			trendingMovies = await res.json();
		}
	}

	async function fetchFavoriteMovies() {
		const res = await fetch('/api/movies/favorites');
		if (res.ok) {
			favoriteMovies = await res.json();
		}
	}

	onMount(() => {
		fetchTrendingMovies();
		fetchFavoriteMovies();
	});

	$effect(() => {
		if ($favoriteMoviesInvalidation || $trendingMoviesInvalidation) {
			fetchFavoriteMovies();
			fetchTrendingMovies();
		}
	});
</script>

<Navbar user={data.user} />
<Billboard />
<div class="pb-40">
	<MovieList title="Trending Now" data={trendingMovies} />
	<MovieList title="My List" data={favoriteMovies} />
</div>
