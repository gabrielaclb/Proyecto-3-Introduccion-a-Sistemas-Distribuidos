const authService = require('../services/auth');

const ensureAuth = (req, res, next) => {
    
    const token = req.headers['Authorization'] || req.headers['authorization'] || '';
    
    if (!token) {
        return res.status(401).send({
            status: 'error',
            message: 'No token provided'
        });
    }

    authService.ping(token.split(' ')[1])
        .then(response => {
            if (response.status === 'success') {
                req.user = response.data;
                next();
            }else{
                return res.status(401).send({
                    status: 'error',
                    message: 'Invalid token'
                });
            }
        })
}

module.exports = ensureAuth;