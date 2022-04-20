const api = require('express');
const routes = api.Router();
const LogsController = require('../controllers/logs');

routes.post('/debug', LogsController.debug);
routes.post('/error', LogsController.error);
routes.post('/http', LogsController.http);
routes.post('/info', LogsController.info);
routes.post('/warn', LogsController.warn);

routes.get('/health', (req,res)=>{
    res.send({
        status: 'OK',
        message: 'Service Logger is running'
    });
});

module.exports = routes;