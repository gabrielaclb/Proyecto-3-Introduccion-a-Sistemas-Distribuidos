const bcrypt = require('bcrypt');

class PasswordService {

    saltRound = 12;

    constructor(){
    }

    async comparePassword(password, hash){
        return bcrypt.compare(password, hash);
    }

    async generatePassword(password){
        return bcrypt.hash(password, this.saltRound);
    }

}

module.exports = new PasswordService();
