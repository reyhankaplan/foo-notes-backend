create table notes (
	id serial primary key,
	title varchar(32) not null,
	contentt varchar(140) not null,
	created timestamptz not null default current_timestamp
);
insert into notes (title, contentt, created) values 
	('play guitar', 'your guitar is about to die', '2018-01-25 22:07:29.26948'),
	('read the book',	'the book is "You don''t know JS"', '18-01-25 20:50:46.994054'), 
	('shopping',	'buy a new 4B pencil',	'2018-01-25 21:44:22.394629'),
	('play hs',	'your magic is falling down',	'2018-01-26 04:19:39.766791');