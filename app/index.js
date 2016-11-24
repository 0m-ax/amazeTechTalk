var express = require('express');
var request = require('request');
var app = express.Router();
app.get('/load',(req,res)=>{
    request('http://localhost:8080/',(err,resp)=>{
        if(err){
            res.send("<h1 style='color:red'>"+err.code+"</h1>"+'<meta http-equiv="refresh" content="3">')
        }else{
            res.send(resp.body+'<meta http-equiv="refresh" content="3">')
        }
    })
})
module.exports = app;
