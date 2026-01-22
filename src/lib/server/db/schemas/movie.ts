import { randomUUID } from 'crypto';
import { relations } from 'drizzle-orm';
import { pgTable, text, timestamp } from 'drizzle-orm/pg-core';
import favoriteMovies from './favorite-movies';

const movie = pgTable('movies', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	title: text('title').notNull(),
	description: text('description').notNull(),
	videoUrl: text('video_url').notNull(),
	thumbnailUrl: text('thumbnail_url').notNull(),
	genre: text('genre').notNull(),
	duration: text('duration').notNull(),
	createdAt: timestamp('created_at').defaultNow().notNull(),
	updatedAt: timestamp('updated_at')
		.$onUpdate(() => /* @__PURE__ */ new Date())
		.notNull()
});

export const movieRelations = relations(movie, ({ many }) => ({
	favoriteMovies: many(favoriteMovies)
}));

export default movie;
