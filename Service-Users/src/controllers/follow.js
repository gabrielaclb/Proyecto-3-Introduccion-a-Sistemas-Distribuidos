const usersService = require('../services/users');
const followService = require('../services/follow');

class FollowController{
    
    constructor(){

    }

    follow = async(req, res) => {
        try {
            const { user_id } = req.params; //Sigue
            const { id } = req.user; //Seguidor
            const user = await followService.follow(user_id, id);
            return res.status(200).send({
                status: 'success',
                data: 'User followed'
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

    unfollow = async(req, res) => {
        try {
            const { user_id } = req.params; //Sigue
            const { id } = req.user; //Seguidor
            const user = await followService.unfollow(user_id, id);
            return res.status(200).send({
                status: 'success',
                data: 'User unfollowed'
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

    getFollowers = async(req, res) => {
        try {
            const { user_id } = req.params;
            const followers = await followService.getFollowers(user_id);
            return res.status(200).send({
                status: 'success',
                data: followers
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

    getFollows = async(req, res) => {
        try {
            const { user_id } = req.params;
            const follows = await followService.getFollows(user_id);
            return res.status(200).send({
                status: 'success',
                data: follows
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

}

module.exports = new FollowController();