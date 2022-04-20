const fetch = require('node-fetch');

class AuthService {

    constructor(){
        this.urlServices = process.env.URL_SERVICES || 'http://172.17.0.1:8001';
    }

    async login(email, password){
        try {
            const response = await fetch(`${this.urlServices}/auth/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            return data.data;
        } catch (error) {
            return error;
        }
    }

    async register(email, password){
        try {
            const response = await fetch(`${this.urlServices}/auth/register/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email,
                    password
                })
            });
            const data = await response.json();
            return data.data;
        } catch (error) {
            return error;
        }
    }

    async ping(token){
        try {
            const response = await fetch(`${this.urlServices}/auth/check/`, {
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