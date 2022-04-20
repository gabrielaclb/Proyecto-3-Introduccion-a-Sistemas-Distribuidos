//Import Library External
const express = require('express');
const winstonServer = require('winston-dashboard');
const path = require('path');

//Import File Internal
const routes = require('./src/routes');

// Init App
const app = express();

// Configure Express
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ limit: '50mb' }));

app.use(routes);

// Env
const port = process.env.PORT || 3005;

app.listen(port, ()=>{
    console.log(`Services Logger is running on port ${port}`);
})

winstonServer({
    path: path.join(__dirname, 'logs'),
    logFiles: '/**/*.log',
    port: 8002,
    
})