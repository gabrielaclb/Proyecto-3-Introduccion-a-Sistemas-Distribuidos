const postsService = require('../services/posts');

class PostsController{

    constructor(){}

    getPost = async(req, res) => {
        try {
            const post = await postsService.getPost(req.params.id);
            return res.status(200).send({
                status: 'success',
                data: post
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

    getPosts = async(req, res) => {
        try {
            const posts = await postsService.getPosts();
            return res.status(200).send({
                status: 'success',
                data: posts
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

    createPost = async(req, res) => {
        try {
            const post = await postsService.createPost(req.body);
            return res.status(200).send({
                status: 'success',
                data: post
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

    updatePost = async(req, res) => {
        try {
            const post = await postsService.updatePost(req.body);
            return res.status(200).send({
                status: 'success',
                data: post
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

    deletePost = async(req, res) => {
        try {
            await postsService.deletePost(req.params.id);
            return res.status(200).send({
                status: 'success',
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

    getPostById = async(req, res) => {
        try {
            const post = await postsService.getPost(req.params.id);
            return res.status(200).send({
                status: 'success',
                data: post
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

}

module.exports = new PostsController();