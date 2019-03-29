'use strict'
const express = require('express');
const helmet = require('helmet');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const DatabaseHandler = require('./DatabaseHandler.js');

const PORT = process.env.PORT || 8080;

const skolmatURL = "https://skolmaten.se/birger-sjoberggymnasiet/";

if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static(__dirname + '/../../build'));
}
app.get('/*',(req, res) => {
  console.log("routing test dirname = " + __dirname)
  res.sendFile(path.resolve(__dirname + '/../public/', 'index.html'));
});

var dbcon = new DatabaseHandler(skolmatURL);

io.on('connection', socket => {
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

  socket.on('questionInfo', (question) => {
    dbcon.addQuestion(question);
  //  io.emit('newQuestion', (""))
  })
})

server.listen(PORT, () => console.log(`Listening on port ${PORT}`));
