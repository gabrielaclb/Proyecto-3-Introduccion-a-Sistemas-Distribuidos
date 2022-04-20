const { Router } = require('express');

const routes = Router();

const ensureAuth = require('../middlewares/ensureAuth');
const ensureAdmin = require('../middlewares/ensureAdmin');
const adminController = require('../controllers/admin');

routes.post('/login', adminController.login);
routes.post('/register', ensureAuth, ensureAdmin, adminController.register);
routes.get('/users', ensureAuth, ensureAdmin, adminController.getUsers);
routes.delete('/id/:id', ensureAuth, ensureAdmin, adminController.deleteUser);

module.exports = routes;