const db = require('./utils/db');

class FollowService{

    constructor(){

    }

    /**
     * 
     * @param {number} follow || Seguir
     * @param {number} follower || Seguidor
     * @returns 
     */
    async follow (follow, follower){
        try{
            const result = await db.query(queries.follow, [follow, follower]);
            return result;
        }catch(err){
            throw err;
        }
    }

    /**
     * 
     * @param {number} user_id | Traer los seguidos
     * @returns 
     */
    async getFollows (user_id){
        try{
            const result = await db.query(queries.getFollows, [user_id]);
            return result;
        }catch(err){
            throw err;
        }
    }

    /**
     * 
     * @param {number} user_id | Traer los seguidores
     * @returns 
     */
    async getFollowers (user_id){
        try{
            const result = await db.query(queries.getFollowers, [user_id]);
            return result;
        }catch(err){
            throw err;
        }
    }

    /**
     * 
     * @param {number} follow | Seguir
     * @param {number} follower | Seguidor
     * @returns 
     */
    async unfollow (follow, follower){
        try{
            const result = await db.query(queries.unfollow, [follow, follower]);
            return result;
        }catch(err){
            throw err;
        }
    }

}

const queries = {
    follow: `
        INSERT INTO follows (follow_user_id, follower_user_id) VALUES(?,?);
    `,
    unfollow: `
        DELETE FROM follows WHERE follow_user_id = ? AND follower_user_id = ?;
    `,
    getFollowers: `
        SELECT 
            users.id, 
            users.email
        FROM users
        INNER JOIN follows ON users.id = follows.follower_user_id
        WHERE follows.follow_user_id = ?
    `,
    getFollows: `
        SELECT
            users.id,
            users.email
        FROM users
        INNER JOIN follows ON users.id = follows.follow_user_id
        WHERE follows.follower_user_id = ?
    `
}

module.exports = new FollowService();