import express from 'express';
import { rateLimit } from 'express-rate-limit';
import cors from 'cors';
import logger from './middlewares/logger.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());
app.use(logger);

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 100
});

app.use(limiter);

app.get('/', (req, res) => {
  res.send('Todo List API');
});

export default app;