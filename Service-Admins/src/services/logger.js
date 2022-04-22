const fetch = require('node-fetch');
const urlServices = process.env.URL_LOGGER || 'http://172.17.0.1:3005';

/**
 * @param {string} type 
 * @param {string} message 
 */
function logger(message, type = 'debug'){
    try {
        message = `ADMINS_Service: ${message}`; 
        console.log(message);
        fetch(`${urlServices}/${type}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message
            })
        }).then(res => res.json())   
    } catch (error) {
                
    }
}

module.exports = logger;
