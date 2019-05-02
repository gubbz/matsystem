'use strict'
const express = require('express');
const helmet = require('helmet');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const path = require('path');
const DatabaseHandler = require('./DatabaseHandler.js');

const PORT = process.env.PORT || 8080;

server.use(helmet()); //varför funkar inte den
app.disable('x-powered-by');

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/../../build'));
}
app.get('/*',(req, res) => {
  res.sendFile(path.resolve('build/', 'index.html'));
});

var dbcon = new DatabaseHandler();

io.on('connection', socket => {
  dbcon.getQuestion();
  console.log('User connected');
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

  socket.on('updateQuestion', (date, question) => {
    console.log("newquestion körs");
    dbcon.updateQuestion(date, question);
  })



  socket.on('getQuestion', () => {
    var question = dbcon.getQuestion();
    io.emit(getQuestion, question);
  })

  socket.on('updateWaste', (waste, date, menu) => {
    dbcon.updateWaste(waste, date, menu);
  })

  socket.on('login', (username, password) =>  {
    dbcon.login(username, password);
  })
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
