const { Router } = require('express');
const UserController = require('../controllers/UserController');
const RaffleController = require('../controllers/RaffleController');
const routes = new Router();

routes.get('/users', UserController.index);
routes.get('/users/:id', UserController.show);
routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.delete('/users/:id', UserController.destroy);

routes.get('/raffle', RaffleController.raffle);

module.exports = routes;
