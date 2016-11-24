  var socket = io.connect();
  socket.on('connect', function (data) {

    

  });
// socket.emit('start-attack')
// 

socket.on('server',(data)=>{
    $('.server-num').text(data.activeConnections)
})
socket.on('attack',(data)=>{
    $('.attack-num').text(data.activeConnections)

})
Reveal.addEventListener( 'slidechanged', function( event ) {
    console.log(event)
    if(event.currentSlide == 3){

    }
    // event.previousSlide, event.currentSlide, event.indexh, event.indexv
} );

Reveal.addEventListener( 'start-server', function() {
   socket.emit('start-server')
}, false );
Reveal.addEventListener( 'stop-server', function() {
   socket.emit('stop-server')
}, false );
Reveal.addEventListener( 'start-attack', function() {
   socket.emit('start-attack')
}, false );
Reveal.addEventListener( 'stop-attack', function() {
   socket.emit('stop-attack')
}, false );

$('iframe').on("load", function () {
    var el =  $(this).parent()
    console.log(el)
    el.addClass("loading")
    setTimeout(()=>{
        el.removeClass("loading")
    },1000)
})