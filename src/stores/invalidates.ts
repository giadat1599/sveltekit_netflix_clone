import { writable } from 'svelte/store';

export const favoriteMoviesInvalidation = writable<string>(new Date().toISOString());
export const trendingMoviesInvalidation = writable<string>(new Date().toISOString());

export function invalidateFavoriteMovies() {
	favoriteMoviesInvalidation.set(new Date().toISOString());
}

export function invalidateTrendingMovies() {
	trendingMoviesInvalidation.set(new Date().toISOString());
}
