export default function validateTodo(todo, props = ['title', 'description']) {
  if (!todo) return false;

  return props.every(prop => {
    const value = todo[prop];

    if (!(prop in todo)) return false;

    if (value === null || value === undefined) return false;

    if (typeof value === 'string' && value.trim() === '') return false;

    return true;
  });
}