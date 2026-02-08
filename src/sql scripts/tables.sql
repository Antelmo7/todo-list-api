CREATE TABLE users (
	userId SERIAL PRIMARY KEY,
	name varchar(50) not null,
	email varchar(100) UNIQUE not null,
	password text not null
);

CREATE TYPE status AS ENUM ('In progress', 'Pending', 'Done');

CREATE TABLE todos (
	todoId SERIAL PRIMARY KEY,
	title varchar(30) not null,
	description text not null,
	status status not null default 'Pending'
);