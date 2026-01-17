import { db } from '$lib/server/db';
import { movie } from '$lib/server/db/schemas';
import { error, json, type RequestHandler } from '@sveltejs/kit';
import { count } from 'drizzle-orm';

export const GET: RequestHandler = async ({ locals }) => {
	if (!locals.user) {
		throw error(401, 'Unauthorized');
	}

	const moviesCount = await db.select({ count: count() }).from(movie);
	const randomIndex = Math.floor(Math.random() * moviesCount[0].count);
	const [randomMovie] = await db.select().from(movie).limit(1).offset(randomIndex);

	return json(randomMovie);
};
