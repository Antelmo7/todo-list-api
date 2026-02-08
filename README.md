# todo-list-api
RESTful API to allow users to manage their to-do list.

## Installation and use
1. Clone the repository from GitHub using `git clone https://github.com/Antelmo7/todo-list-api`
2. Change to the new folder and run `npm install`
3. Create a .env file with the template from .env-example file and fill the variables with your credentiales from postgresql
4. Run `npm run dev`

```json
POST /register
{
  "name": "John Doe",
  "email": "john@doe.com",
  "password": "password"
}

RESPONSE:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}


POST /login
{
  "email": "john@doe.com",
  "password": "password"
}

RESPONSE:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9"
}

POST /todos
{
  "title": "Buy groceries",
  "description": "Buy milk, eggs, and bread"
}

INVALID TOKEN RESPONSE:
{
  "message": "Unauthorized"
}


RESPONSE:
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Buy milk, eggs, and bread"
}

PUT /todos/1
{
  "title": "Buy groceries",
  "description": "Buy milk, eggs, bread, and cheese"
}

INVALID TOKEN RESPONSE:
{
  "message": "Forbidden"
}

RESPONSE:
{
  "id": 1,
  "title": "Buy groceries",
  "description": "Buy milk, eggs, bread, and cheese"
}

DELETE /todos/1

GET /todos?page=1&limit=10
```

## Tech Stack
- Node.js
- Express.js

## Explanation
### Pagination

LIMIT: items to take

OFFSET: items to skip, if page = 1, offset = 0; if page = 2, offset = (page - 1) * limit (10, if limit default value is 10)

**totalItems** property is the result of the count query

**totalPages** is the result of rounding up the result of (totalItems / limit), this means if limit is 10, and we have 21 items, the total pages will be 3.

```javascript
export async function getTodos(userId, limit = 10, page = 1) {
  const offset = (page - 1) * limit; // items to skip

  const text = `SELECT * FROM todos WHERE userId = $1 LIMIT $2 OFFSET $3`;
  const res = await client.query(text, [userId, limit, offset]);

  const countText = `SELECT count(*) FROM todos WHERE userId = $1`;
  const countRes = await client.query(countText, [userId]);

  const todos = res.rows;
  const totalItems = parseInt(countRes.rows[0].count);
  const totalPages = Math.ceil(totalItems / limit); // nearest max number

  return {
    data: todos,
    page,
    pageItems: res.rowCount,
    totalItems,
    totalPages
  };
}
```

Solution for the [Todo List API Challenge](https://roadmap.sh/projects/todo-list-api) from [roadmap.sh](https://roadmap.sh)