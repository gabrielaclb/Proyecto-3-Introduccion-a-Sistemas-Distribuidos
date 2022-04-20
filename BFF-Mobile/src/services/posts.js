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

}

module.exports = new PostsService();