const authService = require('../services/auth');

class UsersController {

    constructor(){

    }

    register = async(req, res) => {

        try {
            const { email, password } = req.body;
            const user = await authService.register(email, password);
            return res.status(200).send({
                status: 'success',
                data: user
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

    login = async(req, res) => {
        try {
            const { email, password } = req.body;
            const user = await authService.login(email, password);
            return res.status(200).send({
                status: 'success',
                data: user
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

}

module.exports = new UsersController();