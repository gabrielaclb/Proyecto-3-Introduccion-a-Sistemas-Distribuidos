const api = require('express');
const routes = api.Router();
const PostsController = require('../controllers/posts');
const ensureAuth = require('../middlewares/ensureAuth');
const ensureAdmin = require('../middlewares/ensureAdmin');

routes.get('/',[ensureAuth], PostsController.getPosts);
routes.get('/id/:id',[ensureAuth], PostsController.getPost);
routes.post('/', [ensureAuth], PostsController.createPost);
routes.put('/', [ensureAuth], PostsController.updatePost);
routes.delete('/id/:id', [ensureAuth], PostsController.deletePost);

routes.get('/health', (req,res)=>{
    res.send({
        status: 'OK',
        message: 'Service API is running'
    });
});

module.exports = routes;