import { db } from '$lib/server/db';
import { error, json, type RequestHandler } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals, params }) => {
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	if (!params.movieId) {
		throw error(400, 'Bad Request');
	}

	const foundMovie = await db.query.movie.findFirst({
		where: (movie, { eq }) => eq(movie.id, params.movieId!)
	});

	if (!foundMovie) {
		throw error(404, 'Not Found');
	}

	return json(foundMovie);
};
