import { db } from '$lib/server/db';
import { favoriteMovies, movie } from '$lib/server/db/schemas';
import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';
import { asc, sql } from 'drizzle-orm';
import { and, eq } from 'drizzle-orm';

export const POST: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	const { movieId } = await request.json();
	const [createdFavoriteMovie] = await db
		.insert(favoriteMovies)
		.values({ movieId, userId: locals.user.id })
		.returning();

	if (!createdFavoriteMovie) {
		throw error(404, 'Not found');
	}

	return json(createdFavoriteMovie);
};

export const DELETE: RequestHandler = async ({ locals, request }) => {
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	const { movieId } = await request.json();
	const favoriteMovie = await db.query.favoriteMovies.findFirst({
		where: (favoriteMovies, { eq, and }) =>
			and(eq(favoriteMovies.movieId, movieId), eq(favoriteMovies.userId, locals.user!.id))
	});

	if (!favoriteMovie) {
		throw error(404, 'Not found');
	}

	const [deletedfavoriteMovie] = await db
		.delete(favoriteMovies)
		.where(eq(favoriteMovies.id, favoriteMovie.id))
		.returning();

	return json(deletedfavoriteMovie);
};

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	const favoriteMoviesList = await db
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
		.innerJoin(favoriteMovies, and(eq(favoriteMovies.userId, locals.user.id), eq(favoriteMovies.movieId, movie.id)))
		.orderBy(asc(favoriteMovies.createdAt));

	return json(favoriteMoviesList);
};
