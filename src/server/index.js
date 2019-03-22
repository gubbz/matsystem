const mysql = require('mysql')
const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)
const pg = require('pg')
const PORT = process.env.PORT || 8080
const DBURL = process.env.DATABASE_URL || "postgres://eehwvfixxiwamp:55d64c3b425aebf6fce5678970cef00d3293df5896d7f43fbad2059297a979c8@ec2-79-125-4-72.eu-west-1.compute.amazonaws.com:5432/df34h992q2uhdj"

var con = new pg.Client({
  host: 'ec2-79-125-4-72.eu-west-1.compute.amazonaws.com',
  user: 'eehwvfixxiwamp',
  database: 'df34h992q2uhdj',
  password: '55d64c3b425aebf6fce5678970cef00d3293df5896d7f43fbad2059297a979c8',
  port: 5432,
  ssl: true
});

con.connect(function(err) {
  if (err) return console.log(err);
  else {
    console.log("CONNECTED TO DB")
  }
});

app.use(express.static(__dirname + '/../../build'))

io.on('connection', socket => {
  console.log('User connected')

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })

  socket.on('response', () => {
    retriveGradesFromDB(socket);
  })

  socket.on('vote', (typeOfVote) => {
    //skicka vilken röst sorts röst och eventuellt hur många.
    console.log("röst mottagen");
    io.emit('vote', typeOfVote);
  })

})

function retriveGradesFromDB(socket) {
  console.log("retrieve");
  var grades = [];
  var date = new Date();
  var today = date.toISOString().substring(0, 10);

  const query = {
    text: 'SELECT * FROM grades WHERE date_pk = $1',
    values: [today],
  }
  // callback
  con.query(query, (err, res) => {
    console.log("query")
    if (err) {
      return console.log(err.stack)
    } else {
      for (var i = 1; i < res.fields.length; i++) {
          var fieldName = res.fields[i].name;
          var grade = new Array();
          grade[0] = fieldName;
          grade[1] = res.rows[0][fieldName];
          grades.push(grade);
      }
    }
    console.log(grades);
    socket.emit('grades', grades);
  })
}

function sendGradeToDB(typeOfVote) {

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

server.listen(PORT, () => console.log(`Listening on port ${PORT}`))
