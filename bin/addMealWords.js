const pg = require('pg');
const mysql = require('mysql2');
const fs = require('fs');
const readline = require('readline');

var client = new pg.Client({
  host: 'ec2-79-125-4-72.eu-west-1.compute.amazonaws.com',
  user: 'eehwvfixxiwamp',
  database: 'df34h992q2uhdj',
  password: '55d64c3b425aebf6fce5678970cef00d3293df5896d7f43fbad2059297a979c8',
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
