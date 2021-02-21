import 'reflect-metadata';
import './config/env';
import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';

import Logger from './lib/Logger';
import './database';
import routes from './routes';
import AppError from './errors/AppError';

const app = express();

app.use(express.json());
app.use(routes);

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    Logger.error(err);

    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal Server Error!' });
});

app.listen(3333, () => {
  Logger.debug('Server running on http://localhost:3333');
});
