const pg = require('pg');
const mysql = require('mysql2');
const fs = require('fs');
const readline = require('readline');

var client = new pg.Client({
  host: 'ec2-54-247-72-30.eu-west-1.compute.amazonaws.com',
  user: 'wneyxoesnscgzy',
  database: 'drkgu78hpqtso',
  password: '9f1537d79e9e919240cf324b0abbff6c40ff864c0f9ecf94f196e73a0ed24180',
  port: 5432,
  ssl: true
});

client.connect(function(err){
  if(err) return console.log(err);
  else {
    console.log("connection succesful with db");
  }
});

const rl = readline.createInterface({
  input: fs.createReadStream('database.txt'),
  crlfDelay: Infinity
});

rl.on('line', (line) => {
  console.log(`Line from file: ${line}`);

  var query = {
    name: 'insertWords',
    text: "INSERT INTO meal_word_list(meal_word) VALUES($1)",
    values: [line],
  }

  client.query(query, (err) =>  {
    if(err) {
      console.log(err.stack);
    } else {
      console.log("line inserted successfully");
    }
  })
});
