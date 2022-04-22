const api = require('express');
const routes = api.Router();
const AuthController = require('../controllers/auth');
const ensureAdmin = require('../middlewares/ensureAdmin');
const ensureAuth = require('../middlewares/ensureAuth');

// Metodos publicos
routes.post('/login', AuthController.login);

// Metodos llamados por los admins
routes.post('/register', [ensureAuth, ensureAdmin], AuthController.registerAdmin);
routes.get('/users', [ensureAuth, ensureAdmin], AuthController.getUsers);
routes.delete('/id/:id', [ensureAuth, ensureAdmin], AuthController.deleteUser);

// Metodo llamado por los servicios
routes.get('/check', AuthController.checkSessionByToken);


routes.get('/health', (req,res)=>{
    res.send({
        status: 'OK',
        message: 'Services Admins is running'
    });
});

module.exports = routes;