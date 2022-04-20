const api = require('express');
const routes = api.Router();
const postsRoutes = require('./posts');
const adminRoutes = require('./admin');
const userRoutes = require('./users');

routes.use('/posts', postsRoutes);
routes.use('/admin', adminRoutes);
routes.use('/users', userRoutes);

routes.get('/health', (req,res)=>{
    res.send({
        status: 'OK',
        message: 'Server BFF-Desktop is running'
    });
});

module.exports = routes;