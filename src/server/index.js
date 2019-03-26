'use strict'
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const DatabaseHandler = require('./DatabaseHandler.js');

const PORT = process.env.PORT || 8080;

app.use(express.static(__dirname + '/../../build'));

var dbcon = new DatabaseHandler();

io.on('connection', socket => {
  console.log('User connected');

  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

  socket.on('response', () => {
    dbcon.getGrades(socket);
    dbcon.getMeals(socket);
  })

  socket.on('vote', (typeOfVote) => {
    console.log("röst mottagen");
    dbcon.addGrade(typeOfVote);
    io.emit('vote', typeOfVote);
  })

})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
