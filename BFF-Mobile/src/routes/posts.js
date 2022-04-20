const { Router } = require('express');

const postsController = require('../controllers/posts');
const routes = Router();

const ensureAuth = require('../middlewares/ensureAuth');

routes.get('/', ensureAuth, postsController.getPosts);
routes.get('/id/:id', ensureAuth, postsController.getPost);

const notAllow = (req,res)=>{
    res.status(200).send({
        status: '403',
        message: 'No está permitido acceder a esta ruta desde una aplicación móvil'
    })
}   

routes.post('/', ensureAuth, notAllow);
routes.put('/', ensureAuth,  notAllow);
routes.delete('/id/:id', ensureAuth,  notAllow);


module.exports = routes;