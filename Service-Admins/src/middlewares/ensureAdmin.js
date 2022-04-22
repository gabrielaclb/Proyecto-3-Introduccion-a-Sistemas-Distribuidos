const ensureAdmin = (req, res, next) => {
    if(req.user){
        if(req.user.isAdmin){
            next();
        }else{
            return res.status(403).send({
                status: 'error',
                message: 'You are not authorized to perform this action'
            });
        }
    }else{
        return res.status(401).send({
            status: 'error',
            message: 'You are not logged in'
        });
    }
}

module.exports = ensureAdmin;