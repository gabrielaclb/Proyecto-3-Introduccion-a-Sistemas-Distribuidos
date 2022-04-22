const jwtService = require('../services/utils/jwt');

const ensureAuth = async (req, res, next) => {
    
    const token = req.headers['Authorization'] || req.headers['authorization'] || '';
    
    if (!token) {
        return res.status(401).send({
            status: 'error',
            message: 'No token provided'
        });
    }

    const tokenWithoutBearer = token.replace('Bearer ', '');
    const decoded = await jwtService.decodeToken(tokenWithoutBearer);

    if (!decoded) {
        return res.status(401).send({
            status: 'error',
            message: 'Invalid token'
        });
    }

    req.user = decoded;
    next();
}

module.exports = ensureAuth;