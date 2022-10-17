CREATE TABLE public.users (
	id SERIAL,
	"name" varchar NOT NULL,
	avatar varchar NOT NULL,
	registratedat timestamp NOT NULL,
	"password" varchar NOT NULL,
	"role" varchar NOT null,
	primary key(id)
);

CREATE TABLE public.posts (
	id SERIAL,
	createdat timestamp NOT NULL,
	authorid integer,
	title varchar NOT NULL,
	body varchar NOT null,
	primary key(id),
	foreign key(authorid) references users(id)
		on delete cascade on update cascade
);

CREATE TABLE public.comments (
	id SERIAL primary key,
	createdat timestamp NOT NULL,
	body varchar NOT null,
	authorid integer references users(id)
		on delete cascade on update cascade,	
	pageid integer references posts(id)
		on delete cascade on update cascade,
	answeron integer references comments(id)
		on delete cascade on update cascade
);

CREATE TABLE public.post_likes (
	id SERIAL primary key,
	"type" varchar,
	authorid integer references users(id)
		on delete cascade on update cascade,	
	postid integer references posts(id)
		on delete cascade on update cascade
);

CREATE TABLE public.comment_likes (
	id SERIAL primary key,
	"type" varchar,
	authorid integer references users(id)
		on delete cascade on update cascade,	
	commentid integer references comments(id)
		on delete cascade on update cascade
);

CREATE TABLE public.saved_posts (
	id SERIAL primary key,
	userid integer references users(id)
		on delete cascade on update cascade,	
	postid integer references posts(id)
		on delete cascade on update cascade
);
 