const api = require('express');
const routes = api.Router();
const AuthController = require('../controllers/auth');
const FollowController = require('../controllers/follow');
const ensureAuth = require('../middlewares/ensureAuth');



routes.post('/login', AuthController.login);
routes.post('/register', AuthController.register);
routes.get('/check', AuthController.checkSessionByToken);

routes.get('/users', AuthController.getUsers);

routes.get('/follow/user_id/:user_id', ensureAuth, FollowController.follow);
routes.delete('/unfollow/user_id/:user_id', ensureAuth, FollowController.unfollow);

routes.get('/followers/user_id/:user_id', FollowController.getFollowers)
routes.get('/follows/user_id/:user_id', FollowController.getFollows)

routes.get('/health', (req,res)=>{
    res.send({
        status: 'OK',
        message: 'Services Users is running'
    });
});

module.exports = routes;