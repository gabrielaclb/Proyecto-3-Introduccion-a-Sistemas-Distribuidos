const fetch = require('node-fetch');

class AuthService {

    constructor(){
        this.urlServices = process.env.URL_SERVICES || 'http://172.17.0.1:8000';
    }

    async ping(token){
        try {
            const response = await fetch(`${this.urlServices}/users/check/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            const data = await response.json();
            return data;
        } catch (error) {
            throw error;  
        }
    }

}

module.exports = new AuthService();