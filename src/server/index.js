'use strict'
const express = require('express');
const helmet = require('helmet');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const DatabaseHandler = require('./DatabaseHandler.js');

const PORT = process.env.PORT || 8080;

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/../../build'));
}
app.get('/*',(req, res) => {
  res.sendFile(path.resolve('build/', 'index.html'));
});

var dbcon = new DatabaseHandler();

io.on('connection', socket => {
  console.log('User connected');
  io.emit('newQuestion', ('2019-03-29' ,"vad tyckte du om maten"));
  socket.on('disconnect', () => {
    console.log('user disconnected');
  })

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

  socket.on('newQuestion', (date, question) => {
    dbcon.addQuestion(date, question);

  })
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
