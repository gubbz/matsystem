'use strict'
const pg = require('pg');
const mysql = require('mysql2');
/**
  Database communication and functionality
**/
module.exports = class DatabaseHandler {
  //const DBURL = process.env.DATABASE_URL || "postgres://eehwvfixxiwamp:55d64c3b425aebf6fce5678970cef00d3293df5896d7f43fbad2059297a979c8@ec2-79-125-4-72.eu-west-1.compute.amazonaws.com:5432/df34h992q2uhdj"
  constructor() {
    console.log("DatabaseHandler constructor")
    this.con;
    this.date = new Date();
    this.establishConnection();
    this.currentVotes = new Array();
  }

  establishConnection() {
    this.con = new pg.Client({
      host: 'ec2-79-125-4-72.eu-west-1.compute.amazonaws.com',
      user: 'eehwvfixxiwamp',
      database: 'df34h992q2uhdj',
      password: '55d64c3b425aebf6fce5678970cef00d3293df5896d7f43fbad2059297a979c8',
      port: 5432,
      ssl: true
    });

    this.con.connect(function(err) {
      if (err) return console.log(err);
      else {
        console.log("CONNECTED TO DB");
      }
    });
  }

 getGrades(socket) {
    //Get Grades from DB when client first opens the webapplication
    console.log("retrieveGradesFromDB");
    var grades = [];
    var today = this.date.toISOString().substring(0, 10);

    const query = {
      name: 'get-user',
      text: 'SELECT * FROM grades WHERE date_pk = $1',
      values: [today],
    }
    // callback
    this.con.query(query, (err, res) => {
      console.log("query, prepared statement");
      if (err) {
        return console.log(err.stack);
      } else {
        for (var i = 1; i < res.fields.length; i++) {
            var fieldName = res.fields[i].name;
            var grade = new Array();
            grade[0] = fieldName;
            grade[1] = res.rows[0][fieldName];
            grades.push(grade);
            if(this.currentVotes.length < 4){
            this.currentVotes.push(res.rows[0][fieldName]);
          }
        }
      }
      console.log(grades);
      socket.emit('grades', grades);
    })
  }

 addVote(typeOfVote) {

   console.log("typeofvote in addVote: " + typeOfVote);

    console.log("currentvotes (addVote) " + this.currentVotes);

    var currentVote;
    var query;
    var currentDate = this.date.toISOString().substring(0, 10);

    switch(typeOfVote)  {
      case "very_bad":
        currentVote = (parseInt(this.currentVotes[3], 10) + 1);
        query = "UPDATE grades SET very_bad = ($1) WHERE date_pk = ($2)";
        console.log("currentvote: " + currentVote);
        console.log("query i switchen: " + query);
        break;
      case "bad":
        currentVote = parseInt(this.currentVotes[2], 10) + 1;
        query = "UPDATE grades SET bad = ($1) WHERE date_pk = ($2)";
        console.log("currentvote: " + currentVote);
        break;
      case "good":
        currentVote = parseInt(this.currentVotes[1], 10) + 1;
        query = "UPDATE grades SET good = ($1) WHERE date_pk = ($2)";
        console.log("currentvote: " + currentVote);
        break;
      case "very_good":
        currentVote = parseInt(this.currentVotes[0], 10) + 1;
        query = "UPDATE grades SET very_good = ($1) WHERE date_pk = ($2)";
        console.log("currentvote: " + currentVote);
        break;
    }

    console.log("query: " + query)
    //+1 vote to grades when someone press on of the buttons
    this.con.query(query, [currentVote, currentDate], (err, res) => {
      if(err){
        return console.log(err.stack);
      } else {
        console.log("grades + 1 successful");
      }
    });
  }

  insertFood() {
    //Insert a new row in the food Database each day to get the meal
    //Get data from skolmaten api?
  }

  insertQuestions() {
    //get question from form
    //form pushes info to here, insert to DB
  }
}
