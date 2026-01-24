import { db } from '$lib/server/db';
import { favoriteMovies, movie } from '$lib/server/db/schemas';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { eq, sql } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	if (!params.movieId) {
		throw error(400, 'Bad Request');
	}

	const [foundMovie] = await db
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
		.where(eq(movie.id, params.movieId))
		.leftJoin(favoriteMovies, eq(favoriteMovies.movieId, movie.id))
		.limit(1);

	if (!foundMovie) {
		throw error(404, 'Not Found');
	}

	return json(foundMovie);
};
