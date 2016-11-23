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
                    currentClients:(self.server._connections-1) || 0
                })
            });
            req.on('close', function() {
                self.emit("update",{
                    currentClients:(self.server._connections-1) || 0
                })
            });
            self.emit("update",{
                currentClients:self.server._connections || 0
            })
        })
        self.server.listen(port);
        self.server.maxConnections = maxClients;
        self.server.close.bind(self);
    }
}
util.inherits(CrapServer, EventEmitter);

module.exports = CrapServer;