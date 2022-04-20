//Import Library External
const express = require('express');

//Import File Internal
const routes = require('./src/routes');
const logger = require('./src/services/logger');
const morgan = require('morgan');

// Init App
const app = express();

// Configure Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

// Configuro el middleware morgan
app.use(morgan(function (tokens, req, res){
    
    let log = [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ');

    logger(log, 'info');
    return log;
}))

// Configuro las rutas
app.use(routes);

// Env
const port = process.env.PORT || 3000;

app.listen(port, ()=>{
    logger(`Server BFF-Desktop is running on port ${port}`);
})