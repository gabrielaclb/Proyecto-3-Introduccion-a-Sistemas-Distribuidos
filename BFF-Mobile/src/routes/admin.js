const { Router } = require('express');

const routes = Router();

routes.all('*', (req,res)=>{
    res.status(200).send({
        status: '403',
        message: 'No está permitido acceder a esta ruta desde una aplicación móvil'
    })
});

module.exports = routes;