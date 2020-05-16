import { Router } from 'express';
import UserController from '../controllers/UserController';
import RaffleController from '../controllers/RaffleController';
const routes = new Router();

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.get('/raffle', RaffleController.raffle);

export default routes;
