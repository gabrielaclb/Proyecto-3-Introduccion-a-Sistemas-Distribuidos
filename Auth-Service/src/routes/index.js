const api = require('express');
const routes = api.Router();
const AuthController = require('../controllers/auth');


routes.post('/login', AuthController.login);
routes.post('/register', AuthController.register);
routes.post('/register/admin', AuthController.registerAdmin);
routes.get('/check', AuthController.checkSessionByToken);

routes.get('/users', AuthController.getUsers);
routes.delete('/id/:id', AuthController.deleteUser);

routes.get('/health', (req,res)=>{
    res.send({
        status: 'OK',
        message: 'Services Auth is running'
    });
});

module.exports = routes;