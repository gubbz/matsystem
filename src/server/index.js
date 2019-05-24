var express = require('express');
var app     = express();
const path  = require('path');
var cookie  = require('cookie');
const PORT  = process.env.PORT || 8080;

const DatabaseHandler = require('./DatabaseHandler.js');

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(__dirname + '/../../build'));
    app.get('/*',(req, res) => {
      res.sendFile(path.resolve('build/', 'index.html'));
    });
} else {
  app.get('/*',(req, res) => {
    res.sendFile(path.resolve( __dirname + '/../../public/', 'index.html'));
  });
}

var server = app.listen(PORT);
var io     = require('socket.io').listen(server);

var dbcon = new DatabaseHandler();
var socketsConnected = new Set();

setInterval(function() {
  console.log("sockets connected " + socketsConnected.size);
}, 60000);

io.on('connection', (socket) => {
  //console.log('User connected' + socket.id);
  socketsConnected.add(socket);
  socket.on('disconnect', () => {
    //console.log('user disconnected');
    socketsConnected.delete(socket);
  })

  socket.on('response', () => {
    //console.log("socket.id " + socket.id);
    dbcon.getGrades(socket, "grades");
    dbcon.checkQuestion(socket);
    dbcon.getTopRatedFood(socket);
    var cookief = socket.handshake.headers.cookie;
    var cookies = cookie.parse(socket.handshake.headers.cookie);
    if (cookies['token'] && cookies['user']) {
      dbcon.checkAuthentication(socket, cookies['token'], cookies['user']);
    } else {
      socket.emit('auth', false);
    }
    dbcon.getStatistics(socket);
    var menu = dbcon.getMenu();
    socket.emit('menu', menu);

    setInterval(() => {
      console.log("Antal sockets anslutna " + socketsConnected.size);
      dbcon.getGrades(socket, "grades");
    }, 60000);

  })

  socket.on('vote', (typeOfVote) => {
    console.log("röst mottagen typeofvote: " + typeOfVote);
    dbcon.addVote(typeOfVote);
    io.emit('vote', typeOfVote);
    dbcon.checkQuestion(socket);
  })


  socket.on('ChangeQuestion', (question) => {
    var question = dbcon.getQuestion();
    //console.log(question);
    socket.emit('ChangeQuestion', question);
  })

  socket.on('login',function (data) {
    dbcon.login(data.username, data.password, socket);
  })

  socket.on('updateWaste', (waste, date, menu) => {
    dbcon.updateWaste(waste, date, menu);
  })

})
