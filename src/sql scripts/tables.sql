CREATE TABLE users (
	userId SERIAL PRIMARY KEY,
	name varchar(50) not null,
	email varchar(100) UNIQUE not null,
	password text not null
);

