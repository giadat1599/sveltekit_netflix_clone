import { randomUUID } from 'crypto';
import { pgTable, text } from 'drizzle-orm/pg-core';

export const movie = pgTable('movies', {
	id: text('id')
		.primaryKey()
		.$defaultFn(() => randomUUID()),
	title: text('title').notNull(),
	description: text('description').notNull(),
	videoUrl: text('video_url').notNull(),
	thumbnailUrl: text('thumbnail_url').notNull(),
	genre: text('genre').notNull(),
	duration: text('duration').notNull()
});
