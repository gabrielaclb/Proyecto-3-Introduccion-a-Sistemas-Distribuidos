const db = require('./utils/db');
const redis = require('./utils/redis');

class PostsService{

    constructor(){
    }

    /**
     * Get un post por su id
     * @param {number} id | Id del post a buscar
     * @returns 
     */
    getPost = async(id) => {
        try {
            
            let post;

            try {
                post = await redis.get(`post:${id}`);
            } catch (error) {
                post = await db.query(queries.getPost, [id]);
                post = post[0];
                await redis.setCache(`post:${id}`, post);
            }

            return post[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Get todos los posts
     * @returns 
     */
    getPosts = async() => {
        try {            
            let posts;
            try {
                posts = await redis.getCache('posts');
            } catch (error) {
                posts = await db.query(queries.getPosts);
                await redis.setCache('posts', posts);
            }
            return posts;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Creaa un nuevo post
     * @param {Object} post | Objeto con los datos del post
     * @param {string} post.title | Titulo del post
     * @param {string} post.content | Contenido del post
     * @returns 
     */
    createPost = async(post) => {
        try {
            const newPost = await db.query(queries.createPost, [post.title, post.content]);
            await redis.deleteCache(`posts`);
            return {
                id: newPost.insertId,
                ...post
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Actualiza un post
     * @param {Object} post | Objeto con los datos del post
     * @param {number} post.id | Id del post
     * @param {string} post.title | Titulo del post
     * @param {string} post.content | Contenido del post
     * @param {number} post.authorId | Id del autor del post
     * @returns 
     */
    updatePost = async(post) => {
        try {
            const updatedPost = await db.query(queries.updatePost, [post.title, post.content, post.id]);
            await redis.deleteCache(`posts`);
            await redis.deleteCache(`post:${post.id}`);
            return {
                ...post
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Elimina un post por su id
     * @param {number} id | Id del post a borrar
     * @returns 
     */
    deletePost = async(id) => {
        try {
            const deletedPost = await db.query(queries.deletePost, [id]);
            await redis.deleteCache(`posts`);
            await redis.deleteCache(`post:${post.id}`);
            return {
                id: deletedPost.insertId
            };
        } catch (error) {
            throw new Error(error);
        }
    }


}

const queries = {
    getPost: `SELECT * FROM posts WHERE id = ?`,
    getPosts: `SELECT * FROM posts`,
    createPost: `INSERT INTO posts (title, content) VALUES (?, ?)`,
    updatePost: `UPDATE posts SET title = ?, content = ? WHERE id = ?`,
    deletePost: `DELETE FROM posts WHERE id = ?`,
}

module.exports = new PostsService();