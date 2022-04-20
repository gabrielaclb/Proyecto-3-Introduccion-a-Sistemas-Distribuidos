const { Router } = require('express');

const routes = Router();

const usersController = require('../controllers/users');

routes.post('/login', usersController.login);
routes.post('/register', usersController.register);

module.exports = routes;