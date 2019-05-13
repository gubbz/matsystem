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
    console.log("connection succesful scheduled job addNewQuestion");
  }
});

var currentDate = new Date();
var startOfWeek = startOfWeek(currentDate);
var date = startOfWeek;

for(var i = 0; i < 7; i++)  {

  console.log("fuckk my family: " + date);

  var chosenDate = date;

  var query = {
    name: 'insertQuestion',
    text: 'INSERT INTO question(date_pk, question) VALUES($1, $2)',
    values: [chosenDate.toISOString().substring(0, 10), "Vad tyckte du om maten"],
  }
  client.query(query, (err) =>  {
    if(err) {
      console.log("görgött kanske funka");
    } else {
      console.log("questions for the week inserted");
    }
  })
  var nextDate =  new Date(chosenDate.setTime(chosenDate.getTime() + 86400000));
  chosenDate = nextDate;
}

function startOfWeek(date) {
  console.log("date i startOfWeek: " + date);
  var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}
