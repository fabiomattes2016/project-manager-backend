import { Router } from 'express';
import userRoutes from './user';
import sessionRoutes from './session';
import clientRoutes from './client';

const routes = Router();
const prefixRoutes = '/api/v1';

routes.get('/', (request, response) => {
  return response.status(200).json({
    message: 'Olá mundo!!!',
  });
});

routes.use(`${prefixRoutes}/users`, userRoutes);
routes.use(`${prefixRoutes}/sessions`, sessionRoutes);
routes.use(`${prefixRoutes}/clients`, clientRoutes);

export default routes;
