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

var socketsConnected = new Set();

setInterval(function() {
  console.log("sockets connected " + socketsConnected.size);
}, 60000);

io.on('connection', (socket) => {
  console.log('User connected');
  socketsConnected.add(socket);

  socket.on('disconnect', () => {
    console.log('user disconnected');
    socketsConnected.delete(socket);
  })

  socket.on('response', () => {
    dbcon.getGrades(socket, "grades");
    dbcon.checkQuestion(socket);
    dbcon.getTopRatedFood(socket);
    dbcon.getStatistics(socket);
    var menu = dbcon.getMenu();
    socket.emit('menu', menu);
    setInterval(() => {
      console.log("Antal sockets anslutna " + socketsConnected.size);
      dbcon.checkQuestion(socket);
      dbcon.getGrades(socket, "grades");
    }, 60000);
  })

  socket.on('vote', (typeOfVote) => {
    console.log("röst mottagen typeofvote: " + typeOfVote);
    dbcon.addVote(typeOfVote);
    dbcon.checkQuestion(socket);
    io.emit('vote', typeOfVote);
  })

  socket.on('updateQuestion', (date, question) => {
    console.log("newquestion körs");
    dbcon.updateQuestion(date, question);
  })

  socket.on('getQuestion', () => {
    var question = dbcon.getQuestion();
    io.emit(getQuestion, question);
  })

  socket.on('ChangeQuestion', (question) => {
    var question = dbcon.getQuestion();
    socket.emit('ChangeQuestion', question);

  })

  socket.on('login',function (data) {
    dbcon.login(data.username, data.password, socket);

  })

  socket.on('updateWaste', (waste, date, menu) => {
    dbcon.updateWaste(waste, date, menu);
  })

})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
