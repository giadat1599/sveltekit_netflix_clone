import { randomUUID } from 'crypto';
import { pgTable, text, timestamp, unique } from 'drizzle-orm/pg-core';
import movie from './movie';
import { user } from './auth';
import { relations } from 'drizzle-orm';

const favoriteMovies = pgTable(
	'favorite_movies',
	{
		id: text('id')
			.primaryKey()
			.$defaultFn(() => randomUUID()),
		movieId: text('movie_id')
			.notNull()
			.references(() => movie.id, { onDelete: 'cascade' }),
		userId: text('user_id')
			.notNull()
			.references(() => user.id, { onDelete: 'cascade' }),
		createdAt: timestamp('created_at').defaultNow().notNull(),
		updatedAt: timestamp('updated_at')
			.$onUpdate(() => /* @__PURE__ */ new Date())
			.notNull()
	},
	(t) => [unique().on(t.movieId, t.userId)]
);

export const favouriteMoviesRelations = relations(favoriteMovies, ({ one }) => ({
	movie: one(movie, { fields: [favoriteMovies.movieId], references: [movie.id] }),
	user: one(user, { fields: [favoriteMovies.userId], references: [user.id] })
}));

export default favoriteMovies;
