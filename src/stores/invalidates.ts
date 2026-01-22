import { writable } from 'svelte/store';

export const invalidateFavoriteMovies = writable<string>(new Date().toISOString());
export const invalidateTrendingMovies = writable<string>(new Date().toISOString());
