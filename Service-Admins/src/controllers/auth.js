const jwtService = require('../services/utils/jwt');
const usersService = require('../services/users');
const passwordService = require('../services/utils/password');

class AuthController {

    constructor(){
    }

    login = async(req, res) => {
        try {
            
            const { email, password } = req.body;
            const user = await usersService.getUserByEmail(email);
            
            if(!user) {
                return res.status(400).send({
                    status: 'error',
                    message: 'User not found'
                });
            }
            const isPasswordValid = await passwordService.comparePassword(password, user.password);
            
            if(!isPasswordValid) {
                return res.status(400).send({
                    status: 'error',
                    message: 'Password is invalid'
                });
            }

            delete user.password;

            const token = await jwtService.generateToken({
                id: user.id,
                email: user.email,
                isAdmin: user.isAdmin
            });

            return res.status(200).send({
                status: 'success',
                data: {
                    token,
                    user
                }
            });

        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

    registerAdmin = async(req, res) => {
        try {
            const { email, password} = req.body;
            const user = await usersService.getUserByEmail(email);
            if(user) {
                return res.status(400).send({
                    status: 'error',
                    message: 'User already exists'
                });
            }
            const hashedPassword = await passwordService.generatePassword(password);
            const newUser = await usersService.createUser({
                email,
                password: hashedPassword,
                isAdmin: 1
            });
            const token = await jwtService.generateToken({
                id: newUser.id,
                email: newUser.email,
                isAdmin: newUser.isAdmin
            });

            delete newUser.password;

            return res.status(200).send({
                status: 'success',
                data: {
                    token,
                    user: {...newUser}
                }
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

    checkSessionByToken = async(req, res) => {
        try {

            const token = req.headers['authorization'] || req.headers['Authorization'] || '';
            const tokenWithoutBearer = token.replace('Bearer ', '');
            const decoded = await jwtService.decodeToken(tokenWithoutBearer);

            if(decoded){
                return res.status(200).send({
                    status: 'success',
                    data: {
                        ...decoded
                    }
                });
            }else{
                return res.status(401).send({
                    status: 'error',
                    message: 'Invalid token'
                });
            }


        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

    getUsers = async(req, res) => {
        try {
            const users = await usersService.getUsers();
            return res.status(200).send({
                status: 'success',
                data: users
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

    deleteUser = async(req, res) => {
        try {
            const { id } = req.params;
            const user = await usersService.getUserById(id);
            if(!user) {
                return res.status(400).send({
                    status: 'error',
                    message: 'User not found'
                });
            }
            await usersService.deleteUser(id);
            return res.status(200).send({
                status: 'success',
                data: {
                    message: 'User deleted'
                }
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

}

module.exports = new AuthController();