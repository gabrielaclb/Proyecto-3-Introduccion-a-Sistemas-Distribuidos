const logsService = require("../services/logs");

class LogsController{

    constructor(){}

    debug = async (req,res) => {
        try{
            logsService.debug(req.body);
            res.send({status: 'success'});
        }catch(err){
            res.status(500).send(err);
        }
    }

    error = async (req,res) => {
        try{
            logsService.error(req.body);
            res.send({status: 'success'});
        }catch(err){
            res.status(500).send(err);
        }
    }

    http = async (req,res) => {
        try{
            logsService.http(req.body);
            res.send({status: 'success'});
        }catch(err){
            res.status(500).send(err);
        }
    }

    info = async (req,res) => {
        try{
            logsService.info(req.body);
            res.send({status: 'success'});
        }catch(err){
            res.status(500).send(err);
        }
    }

    warn = async (req,res) => {
        try{
            logsService.warn(req.body);
            res.send({status: 'success'});
        }catch(err){
            res.status(500).send(err);
        }
    }

}

module.exports = new LogsController();