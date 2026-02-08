import jwt from 'jsonwebtoken';

export default async function authenticate(req, res, next) {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    const error = new Error('Unauthorized');
    error.statusCode = 401;

    throw error;
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, user) => {
    if (error) {
      error.statusCode = 401;

      throw error;
    }

    req.user = user;
  });

  next();
}