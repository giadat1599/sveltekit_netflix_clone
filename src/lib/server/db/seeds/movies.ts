import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import movies from './movies.json';
import { movie as movieSchema } from '../schemas/movie';
import { exit } from 'process';

const db = drizzle({ client: postgres(process.env.DATABASE_URL!) });

console.log(`Seeding database with ${movies.length} movies...`);

export async function seed() {
	for (const movie of movies) {
		await db.insert(movieSchema).values(movie);
	}
}

await seed();

console.log('Database seeding completed.');
exit(0);
