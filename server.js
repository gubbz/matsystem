'use strict';

var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const PORT = process.env.PORT || 3000;

app.use(express.static('public'));


app.get('/', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

http.listen(PORT, () => console.log(`Listening on ${ PORT }`));

io.on('connection', (socket) => {
  console.log('Client connected');
  socket.on('disconnect', () => console.log('Client disconnected'));
  socket.on('msg', (txt) => onMessage(txt));
});

function onMessage(txt) {
    io.emit('msg', txt)
}

//setInterval(() => io.emit('msg', new Date().toTimeString()), 1000);
