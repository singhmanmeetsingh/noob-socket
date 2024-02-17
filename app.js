var express = require('express')
var app = express();

var http = require('http').Server(app);

var path = require('path');

var io = require('socket.io')(http); // pass the server protocol

//need to setup socket at the server side 

var users = 0;

var cnsp = io.of('/custom-namespace');


var roomNo = 1;
var full = 0;
io.on('connection', (socket) => {
  console.log("a user connected");

  socket.join('room-' + roomNo);
  if (full >= 2) {
    full = 0;
    roomNo++;
  }

  socket.on('disconnect', () => console.log('a user disconnected'))
})



//io.on('connection', (socket) => { // on is just to catch the event   this is a single connection  
//  console.log("User connected"); // this works for different user when they establish connection
//  users++;
//
//  socket.emit('newConnection', { desc: "hello welcome to chat" }); // this is for new user conected 
//  // io.sockets.emit('broadcast', {
//  //   desc: "this is bradcasted messge users " + users,
//
//  // })
//
//  socket.broadcast.emit("newConnection", { desc: "users connected" + users });  /// this event id for the already connected user 
//
//  //setTimeout(() => {
//  //  //    socket.send("this is msg from server");
//  //  socket.emit('myCustomEvent', {
//  //    desc: "this is a custom event server side"
//  //  });
//  //}, 3000);
//
//  // socket.on('customEventFormClient', (data) => console.log(data.desc));
//
//  socket.on('disconnect', () => {
//    console.log('User Disconnected') // this is for different users disconnected connected  .......
//    users--;
//
//    socket.broadcast.emit("newConnection", { desc: "user Disconnected" + users })  /// this event id for the already connected user 
//    // io.sockets.emit('broadcast', {
//    //   desc: "this is bradcasted message Total users " + users,
//    // })
//  })
//})



app.get("/", async (req, res) => {
  var opt = {
    ro eot: path.join(__dirname)
  }
  var filename = 'index.html'
  res.sendfile(filename, opt);

})

http.listen(3000, () => {
  console.log('server is ready');
});
