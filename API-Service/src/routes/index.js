const api = require('express');
const routes = api.Router();
const PostsController = require('../controllers/posts');

routes.get('/', PostsController.getPosts);
routes.get('/id/:id', PostsController.getPost);
routes.post('/', PostsController.createPost);
routes.put('/', PostsController.updatePost);
routes.get('/authorId/:authorId', PostsController.getPostsByAuthorId);
routes.delete('/id/:id', PostsController.deletePost);

routes.get('/health', (req,res)=>{
    res.send({
        status: 'OK',
        message: 'Service API is running'
    });
});

module.exports = routes;