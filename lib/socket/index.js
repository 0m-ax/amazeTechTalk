module.exports = (server)=>{
    var io = require('socket.io')(server);
    var SlowLoris = require('../slow-loris')
    var CrapServer = new require('../crap-server')
    var cserver = {
        server:null,
        interval:null
    }
    var attcker= {
        server:null,
        interval:null
    }
    io.on('connection', function (socket) {
        socket.on('start-server',()=>{
            if(cserver.server){

            }else{
                cserver.server = new CrapServer(20,8080)
                cserver.server.on('update',(data)=>{
                    io.sockets.emit('server',data)
                })
                cserver.interval = setInterval(()=>{
                    io.sockets.emit('server',{
                        activeConnections:cserver.server.server._connections
                    })
                },1000)
            }

        })
        socket.on('stop-server',()=>{
            if(cserver.server){
                console.log("stoping")
                cserver.server.server.close()
                cserver.server = null;
                clearInterval(cserver.interval)
            }
        })
        socket.on('start-attack',()=>{
            if(attcker.server){
            }else{
                attcker.server = new SlowLoris('localhost',8080,1000)
                attcker.server.on('update',(data)=>{
                    io.sockets.emit('attack',data)
                })
                attcker.interval = setInterval(()=>{
                    io.sockets.emit('attack',{
                        activeConnections:attcker.server.activeConnections
                    })
                },1000)
            }
        })
        socket.on('stop-attack',()=>{
            if(attcker.server){
                attcker.server.stop()
                setTimeout(()=>{
                io.sockets.emit('attack',{
                        activeConnections:0
                    })
                },100)

                attcker.server = null;
                clearInterval(attcker.interval)
            }
        })
    })
}
