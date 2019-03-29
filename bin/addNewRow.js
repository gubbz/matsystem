#! /app/bin/node
'use strict'
const pg = require('pg');
const mysql = require('mysql2');

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
    console.log("connection succesful scheduled job");
  }
});

var date = new Date().toISOString().substring(0, 10);

const query = {
  name: 'addRow',
  text: 'INSERT INTO grades(date_pk, very_good, good, bad, very_bad) VALUES ($1, $2, $3, $4, $5)',
  values: [date, 0 , 0, 0, 0,],
}

console.log(query);
client.query(query, (err, res) => {
  if(err) {
    console.log(err.stack);
  } else {
    console.log("scheduled job succesfull");
  }
  client.end();
});
