const { Router } = require('express');

const postsController = require('../controllers/posts');
const routes = Router();

const ensureAuth = require('../middlewares/ensureAuth');
const ensureAdmin = require('../middlewares/ensureAdmin');

routes.get('/', ensureAuth, postsController.getPosts);
routes.get('/id/:id', ensureAuth, postsController.getPost);
routes.post('/', ensureAuth, ensureAdmin, postsController.createPost);
routes.put('/', ensureAuth, ensureAdmin, postsController.updatePost);
routes.delete('/id/:id', ensureAuth, ensureAdmin, postsController.deletePost);


module.exports = routes;