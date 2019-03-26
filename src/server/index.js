'use strict'
const express = require('express');
const helmet = require('helmet');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const DatabaseHandler = require('./DatabaseHandler.js');

const PORT = process.env.PORT || 8080;

if(app.use(helmet())){
  console.log("helmet funkar, schmutters");
}
//should hide the X-Powered-By in the header req and res
app.use(helmet.hidePoweredBy());
//should set the X-Powered-By to php to trick the enemy
app.use(helmet.hidePoweredBy({ setTo: 'PHP 4.2.0' }));
//none of the above works

app.use(express.static(__dirname + '/../../build'));

var dbcon = new DatabaseHandler();
dbcon.addVote("very_good");

io.on('connection', socket => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  socket.on('response', () => {
    dbcon.getGrades(socket);
  })

  socket.on('vote', (typeOfVote) => {
    console.log("röst mottagen typeofvote: " + typeOfVote + " toString: " + typeofVote.toString);
    dbcon.addVote(typeofVote)
    io.emit('vote', typeOfVote);
  })

})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
