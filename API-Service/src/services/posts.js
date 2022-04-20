const db = require('./utils/db');

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
            const post = await db.query(queries.getPost, [id]);
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
            const posts = await db.query(queries.getPosts);
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
     * @param {number} post.authorId | Id del autor del post
     * @returns 
     */
    createPost = async(post) => {
        try {
            const newPost = await db.query(queries.createPost, [post.title, post.content, post.authorId]);
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
            const updatedPost = await db.query(queries.updatePost, [post.title, post.content, post.authorId, post.id]);
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
            return {
                id: deletedPost.insertId
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * Delete todos los posts de un autor
     */
    deletePostsByAuthor = async(authorId) => {
        try {
            const deletedPosts = await db.query(queries.deletePostsByAuthor, [authorId]);
            return {
                deletedPosts
            };
        } catch (error) {
            throw new Error(error);
        }
    }

}

const queries = {
    getPost: `SELECT * FROM posts WHERE id = ?`,
    getPosts: `SELECT * FROM posts`,
    getPostsByAuthor: `SELECT * FROM posts WHERE authorId = ?`,
    createPost: `INSERT INTO posts (title, content, authorId) VALUES (?, ?, ?)`,
    updatePost: `UPDATE posts SET title = ?, content = ?, authorId = ? WHERE id = ?`,
    deletePost: `DELETE FROM posts WHERE id = ?`,
    deletePostsByAuthor: `DELETE FROM posts WHERE authorId = ?`
}

module.exports = new PostsService();