const authService = require('../services/auth');

class AdminController {

    constructor(){

    }

    register = async(req, res) => {

        try {
            const { email, password } = req.body;
            const user = await authService.registerAdmin(email, password);
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

    getUsers = async(req, res) => {
        try {
            const users = await authService.getUsers();
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
            await authService.deleteUser(id);
            return res.status(200).send({
                status: 'success'
            });
        } catch (error) {
            return res.status(500).send({
                status: 'error',
                message: error.message
            });
        }
    }

}

module.exports = new AdminController();