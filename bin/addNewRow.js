#! /app/bin/node
'use strict'
const pg = require('pg');
const mysql = require('mysql2');

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
    console.log("connection succesful scheduled job add newrow");
  }
});

var date = new Date().toISOString().substring(0, 10);

const query = {
  name: 'addRow',
  text: 'INSERT INTO grades(date_pk, very_good, good, bad, very_bad) VALUES ($1, $2, $3, $4, $5)',
  values: [date, 0 , 0, 0, 0,]
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
