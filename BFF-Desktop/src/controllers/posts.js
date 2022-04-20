const postsService = require('../services/posts');

class PostsController{

    constructor(){}

    getPost = async(req, res) => {
        try {
            const post = await postsService.getPost(req.params.id);
            console.log(post);
            if(post){
                return res.status(200).send({
                    status: 'success',
                    data: this.formatPost(post)
                });
            }else{
                return res.status(404).send({
                    status: 'error',
                    message: 'Post not found'
                });
            }
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
                data: posts.map(post => this.formatPost(post))
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
                data: this.formatPost(post)
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

    deletePost = async(req,res) => {

        try {
            const post = await postsService.deletePost(req.params.id);
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
                data: this.formatPost(post)
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }

    }


    // Utils
    formatPost = (post) => {
        return {
            id: post.id,
            title: post.title,
            content: post.content,
            image: `https://picsum.photos/id/${post.id}/1280/720`
        }
    }

}

module.exports = new PostsController();