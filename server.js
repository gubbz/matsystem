const express = require('express')
const http = require('http')
const socketIO = require('socket.io')

var mysql = require('mysql')

const port = process.env.PORT || 4000

const app = express()

const server = http.createServer(app)

const io = socketIO(server)

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "matsystem"
})

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to db!");
})

// This is what the socket.io syntax is like, we will work this later
io.on('connection', socket => {
  console.log('User connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('msg', (txt) => {
    console.log(txt)
  })

  socket.on('vote', (typeOfVote) => {
    //skicka vilken röst sorts röst och eventuellt hur många.
    console.log("röst mottagen")
    io.emit('vote', typeOfVote);
  })

})

function sendVoteToDB(typeOfVote) {

}

function checkLogin(username, password) {
  var loginInfo = [];
  var sql = "SELECT * FROM login";
  con.query(sql, function (err, results, fields) {
    if (err) throw err;
    else {
      for (var i = 0; i < results.length; i++) {
        for (var j = 0; j < fields.length; j++) {
          var fieldName = fields[j].name;
          console.log(fieldName + " = " + results[i][fieldName]);
          loginInfo.push(results[i][fieldName]);
        }
      }
    }
  });
  return loginInfo;
}
server.listen(port, () => console.log(`Listening on port ${port}`))
