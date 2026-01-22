CREATE TABLE "favorite_movies" (
	"id" text PRIMARY KEY NOT NULL,
	"movie_id" text NOT NULL,
	"user_id" text NOT NULL,
	CONSTRAINT "favorite_movies_movie_id_user_id_unique" UNIQUE("movie_id","user_id")
);
--> statement-breakpoint
ALTER TABLE "favorite_movies" ADD CONSTRAINT "favorite_movies_movie_id_movies_id_fk" FOREIGN KEY ("movie_id") REFERENCES "public"."movies"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite_movies" ADD CONSTRAINT "favorite_movies_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;