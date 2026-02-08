export function validateUser(user, props = ['name', 'email', 'password']) {
  if (!user) return false;

  return props.every(prop => {
    const value = user[prop];

    if (!(prop in user)) return false;

    if (value === null || value === undefined) return false;

    if (typeof value === 'string' && value.trim() === '') return false;

    return true;
  });
}