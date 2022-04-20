const fetch = require('node-fetch');

class PostsService{

    constructor(){
        this.urlServices = process.env.URL_SERVICES || 'http://172.17.0.1:8001';
    }

    async getPost(id){
        try {
            const response = await fetch(`${this.urlServices}/api/id/${id}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data.data;
        } catch (error) {
            return error;
        }
    }

    async getPosts(){
        try {
            const response = await fetch(`${this.urlServices}/api/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data.data;
        } catch (error) {
            return error;
        }
    }

    /**
     * Crea un posteo en la base de datos
     * @param {Object} post | Posteo a crear
     * @param {string} post.title | Titulo del post
     * @param {string} post.content | Contenido del post
     * @param {number} post.authorId | Id del autor del post
     * @returns 
     */
    async createPost(post){
        try {
            const response = await fetch(`${this.urlServices}/api/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            });
            const data = await response.json();
            return data.data;
        } catch (error) {
            return error;
        }
    }

    /**
     * Actualizo un posteo
     * @param {Object} post | Posteo a actualizar
     * @param {number} post.id | Id del post
     * @param {string} post.title | Titulo del post
     * @param {string} post.content | Contenido del post
     * @param {number} post.authorId | Id del autor del post
     * @returns 
     */
    async updatePost(post){
        try {
            const response = await fetch(`${this.urlServices}/api/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(post)
            });
            const data = await response.json();
            return data.data;
        } catch (error) {
            return error;
        }
    }

    /**
     * Elimino un posteo
     * @param {number} id | Id del posteo
     * @returns
     */
    async deletePost(id){
        try {
            const response = await fetch(`${this.urlServices}/api/id/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            return data;
        } catch (error) {
            return error;
        }
    }

}

module.exports = new PostsService();