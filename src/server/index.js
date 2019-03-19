
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const PORT = process.env.PORT || 8080
/*
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
*/

app.use(express.static(__dirname + '/../../build'))

io.on('connection', socket => {
  console.log('User connected')
  io.emit('msg', "HELLO")

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('msg', (txt) => {
    console.log(txt)
  })

  /*
  var i = 1;
  setInterval(function () {
    if(i===5) {
      i=1;
    }
    io.emit('vote', i);
    i++;
  }, 2000);
*/

  socket.on('vote', (typeOfVote) => {
    //skicka vilken röst sorts röst och eventuellt hur många.
    console.log("röst mottagen");
    io.emit('vote', typeOfVote);
  })

})

/*
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
*/
server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
