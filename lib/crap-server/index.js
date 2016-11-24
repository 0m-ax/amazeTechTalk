'use strict';
var http = require('http');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
class CrapServer{
    constructor(maxClients,port){
        EventEmitter.call(this);
        var self = this;
        self.maxClients = maxClients;
        self.server =  http.createServer(function(req, res) {
            req.on('end', function() {
                self.emit("update",{
                    activeConnections:(self.server._connections) || 0
                })
            });
            req.on('close', function() {
                self.emit("update",{
                    activeConnections:(self.server._connections) || 0
                })
            });
            res.end("<html><head><style>h1{color:blue;}</style></head><body><h1>The best website in the world</h1></body></html>")
        })
        self.server.on('connection',()=>{
            self.emit("update",{
                activeConnections:self.server._connections || 0
            })
        })
        self.server.listen(port);
        self.server.maxConnections = maxClients;
        self.server.close.bind(self);
    }
}
util.inherits(CrapServer, EventEmitter);

module.exports = CrapServer;