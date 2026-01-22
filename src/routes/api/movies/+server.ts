import { db } from '$lib/server/db';
import { favoriteMovies, movie } from '$lib/server/db/schemas';
import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { and, eq, sql } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	const moviesWithFavorites = await db
		.select({
			id: movie.id,
			title: movie.title,
			description: movie.description,
			videoUrl: movie.videoUrl,
			thumbnailUrl: movie.thumbnailUrl,
			genre: movie.genre,
			duration: movie.duration,
			isFavorite: sql<boolean>`${favoriteMovies.id} IS NOT NULL`.as('is_favorite')
		})
		.from(movie)
		.leftJoin(favoriteMovies, and(eq(favoriteMovies.movieId, movie.id), eq(favoriteMovies.userId, locals.user.id)));

	return json(moviesWithFavorites);
};
