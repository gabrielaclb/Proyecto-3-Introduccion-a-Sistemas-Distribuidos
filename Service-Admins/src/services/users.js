const db = require('./utils/db');

class UsersService{

    constructor(){

    }

    /**
     * 
     * @param {string} email | Email del usuario a buscar
     * @returns Object | Objeto con los datos del usuario
     */
    getUserByEmail = async(email) => {
        try {
            const user = await db.query(queries.getUserByEmail, [email]);
            return user[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * 
     * @param {number} id | Id del usuario a buscar
     * @returns 
     */
    getUserById = async(id) => {
        try {
            const user = await db.query(queries.getUserById, [id]);
            return user[0];
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * 
     * @returns 
     */
     getUsers = async() => {
        try {
            const user = await db.query(queries.getUsers, []);
            return user;
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * 
     * @param {Object} user | Objeto con los datos del usuario
     * @param {string} user.email | Email del usuario
     * @param {string} user.password | Password del usuario
     * @param {number} user.isAdmin | Indica si el usuario es administrador
     * @returns 
     */
    createUser = async(user) => {
        try {
            const newUser = await db.query(queries.createUser, [user.email, user.password, user.isAdmin]);
            return {
                id: newUser.insertId,
                ...user
            };
        } catch (error) {
            throw new Error(error);
        }
    }

    /**
     * 
     * @param {number} id | Id del usuario a eliminar
     */
    deleteUser = async(id) => {
        try {
            await db.query(queries.deleteUser, [id]);
        } catch (error) {
            throw new Error(error);
        }
    }


}

const queries = {
    getUsers: `SELECT * FROM users`,
    getUserByEmail: `SELECT * FROM users WHERE email = ?`,
    getUserById: `SELECT * FROM users WHERE id = ? LIMIT 1`,
    createUser: `INSERT INTO users (email, password, isAdmin) VALUES (?, ?, ?)`,
    deleteUser: `DELETE FROM users WHERE id = ?`
}

module.exports = new UsersService();