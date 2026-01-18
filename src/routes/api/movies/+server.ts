import { db } from '$lib/server/db';
import type { RequestHandler } from '@sveltejs/kit';
import { error, json } from '@sveltejs/kit';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	const movies = await db.query.movie.findMany();
	return json(movies);
};
