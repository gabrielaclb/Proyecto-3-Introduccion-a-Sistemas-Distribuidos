const jwt = require('jsonwebtoken');

class JWTService{

    //Generate token
    token = process.env.JWT_SECRET || 'secret';

    constructor(){
    }

    generateToken(payload){
        return jwt.sign(payload, this.token);
    }

    verifyToken(token){
        return jwt.verify(token, this.token);
    }

    decodeToken(token){
        return jwt.decode(token);
    }

}

module.exports = new JWTService();