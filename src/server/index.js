'use strict'
const express = require('express');
const helmet = require('helmet');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const DatabaseHandler = require('./DatabaseHandler.js');

const PORT = process.env.PORT || 8080;

const skolmatURL = "https://skolmaten.se/birger-sjoberggymnasiet/";

if(app.use(helmet())){
  console.log("helmet funkar egentligen inte, inte så schmutters");
}
//should hide the X-Powered-By in the header req and res
app.use(helmet.hidePoweredBy());
//should set the X-Powered-By to php to trick the enemy
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
//none of the above works

app.use(express.static(__dirname + '/../../build'));

var dbcon = new DatabaseHandler(skolmatURL);

io.on('connection', socket => {
  console.log('User connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  setInterval(function() {
    io.emit('vote', "good");
  }, 3000)
  

  socket.on('response', () => {
    dbcon.getGrades(socket);
    var menu = dbcon.getMenu();
    socket.emit('menu', menu);
  })  

  socket.on('vote', (typeOfVote) => {
    console.log("röst mottagen typeofvote: " + typeOfVote);
    dbcon.addVote(typeOfVote)
    io.emit('vote', typeOfVote);
  })
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
