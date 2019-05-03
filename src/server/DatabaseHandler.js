'use strict'
const pg = require('pg');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 12;

/**
  Database communication and functionality
**/
module.exports = class DatabaseHandler {
  //const DBURL = process.env.DATABASE_URL || "postgres://eehwvfixxiwamp:55d64c3b425aebf6fce5678970cef00d3293df5896d7f43fbad2059297a979c8@ec2-79-125-4-72.eu-west-1.compute.amazonaws.com:5432/df34h992q2uhdj"
  constructor() {
    console.log("DatabaseHandler constructor")
    this.con;
    this.meal= new Array();
    this.weekFoodMenu = new Array();
    this.currentVotes = new Array();
    this.weekQuestions = new Array();
    this.establishConnection();
    this.getMenuFromDB();
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
      if (err) {
        console.log(err);
      } else {
        console.log("CONNECTED TO DB ");
      }
    });

  }

  getGrades(socket, typeOfCall) {
    //Get Grades from DB when client first opens the webapplication
    console.log("GET GRADES " + typeOfCall + " for " + socket.id);
    var grades = [];
    var today = new Date().toISOString().substring(0, 10);

    const query = {
      text: 'SELECT * FROM grades WHERE date_pk = $1',
      values: [today],
    }
    // callback
    this.con.query(query, (err, res) => {
      if (err) {
        console.log(err.stack);
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
    });
    console.log(grades);
    socket.emit(typeOfCall, grades);
  }
  checkQuestion(socket){

      //Get Grades from DB when client first opens the webapplication
      var grades = [];
      var today = new Date().toISOString().substring(0, 10);

      const query = {
        text: 'SELECT * FROM grades WHERE date_pk = $1',
        values: [today],
      }
      // callback
      this.con.query(query, (err, res) => {
        if (err) {
          console.log(err.stack);
        } else {
          for (var i = 1; i < res.fields.length; i++) {
              var fieldName = res.fields[i].name;
              var grade = new Array();
              grade[0] = fieldName;
              grade[1] = res.rows[0][fieldName];
              grades.push(grade);
          }
        }

        const mat = {
          text: '(SELECT * FROM menu WHERE date_pk = $1)',
          values: [today]
        }
        this.con.query(mat, (err, res) => {
          if(err){
            console.log(err);
          }else{

            var dagens = (res.rows[0]['menu']);
            var votes = Number(Number(grades[0][1]) +Number(grades[1][1]) +Number(grades[2][1]) +Number(grades[3][1]));
            var rating = Number(grades[4][1]);
            var ord = dagens.toLowerCase().split(' ');
            if(votes <= 10 && rating <= 25){
            for(i = 0; i < ord.length; i++ ){
              //fixa så att det finns nya tables för andra frågor som man kan pusha upp till för att man ska hålla koll på vilken fråga som det är just nu samt vad folk tyckte om frågan
              const array = {
                name: 'getMealWord',
                text: "SELECT * FROM meal_word_list WHERE $1 LIKE CONCAT('%',meal_word,'%')",
                values: ['%'+ ord[i]+ '%' ]
              }

              this.con.query(array, (err, res) => {
                if(err){
                  console.log(err);
                }else{
                  if(res.rows == ""){
                  }else{
                    socket.emit('ChangeQuestion','vad tyckte du om ' + res.rows[0]['meal_word']);
                  }
                }
              });
            }
            }
          }
        });
      });
  }



  addVote(typeOfVote) {

    var currentVote;
    var query;
    var currentDate = new Date().toISOString().substring(0, 10);

    switch(typeOfVote)  {
      case "very_bad":
        currentVote = (parseInt(this.currentVotes[3], 10) + 1);
        this.currentVotes[3] = currentVote;
        query = "UPDATE grades SET very_bad = ($1) WHERE date_pk = ($2)";
        console.log("currentvote: " + currentVote);
        console.log("query i switchen: " + query);
        break;
      case "bad":
        currentVote = parseInt(this.currentVotes[2], 10) + 1;
        this.currentVotes[2] = currentVote;
        query = "UPDATE grades SET bad = ($1) WHERE date_pk = ($2)";
        console.log("currentvote: " + currentVote);
        break;
      case "good":
        currentVote = parseInt(this.currentVotes[1], 10) + 1;
        this.currentVotes[1] = currentVote;
        query = "UPDATE grades SET good = ($1) WHERE date_pk = ($2)";
        console.log("currentvote: " + currentVote);
        break;
      case "very_good":
        currentVote = parseInt(this.currentVotes[0], 10) + 1;
        this.currentVotes[0] = currentVote;
        query = "UPDATE grades SET very_good = ($1) WHERE date_pk = ($2)";
        console.log("currentvote: " + currentVote);
        break;
    }

    console.log("query: " + query)
    //+1 vote to grades when someone press on of the buttons
    var values = [currentVote, currentDate];

    this.con.query(query, values, (err, res) => {
      if(err){
        console.log(err.stack);
      } else {
        console.log("grades + 1 successful");
      }
    });

 }

  startOfWeek(date) {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }
  getMenuFromDB() {
    //Get weekly menu from db when databse starts
    var startDate = this.startOfWeek(new Date());

    var tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds

    for(var i = 0; i < 5; i++) {
      var day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      day = day.toISOString().substring(0, 10);
      const query = {
        name: 'getMenu',
        text: 'SELECT * FROM menu WHERE date_pk = $1',
        values: [day]
      }
      this.con.query(query, (err, res) => {
        if (err) {
          return console.log(err.stack);
        } else {
          var dateName = res.fields[0].name;
          var mealName = res.fields[1].name;
          var date = res.rows[0][dateName];
          var localDate = (new Date(date - tzoffset)).toISOString().substring(5, 10);
          var meal = res.rows[0][mealName];
        }
        this.weekFoodMenu.push({localDate, meal});
      });
    }
  }

  getMenu() {
    return this.weekFoodMenu;
  }

  startOfWeek(date) {
    var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
  }

  login(username, password, socket) {

    const query = {
      name: 'getUsers',
      text: 'SELECT password FROM users where username = $1',
      values: [username]
    }

    this.con.query(query, (err, res) => {
        if(res.rows[0]){
        if(bcrypt.compareSync(password, res.rows[0]["password"])){
          socket.emit('returnlogin',true);
        } else {
          socket.emit('returnlogin',false);
          }
      }else{
        socket.emit('returnlogin',false);
      }
    });
  }

  updateWaste(waste, date, menu)  {


    var query = "UPDATE menu SET waste = $1 WHERE date_pk = $2 AND menu = $3";
    var values = [waste, date, menu];

    this.con.query(query, values, (err, res) => {
      if(err){
        return console.log(err.stack);
      } else {
        console.log("waste updated");
      }
    });
  }

getStatistics(socket) {
  var pie;
  var pieStats;
  var pieLabels;
  var line;
  var lineStats;
  var lineLabels;
  var stats;

  const query = {
    name: 'getStatistics',
    //text: 'SELECT';
  }

  this.con.query(query, (err, res) => {
    if(err) {
      console.log(err.stack);
    } else {
      /**
       * skapa array med mycket dåligt, dåligt, bra, mycket bra röster
       * stats ska innehålla piedata och linedata så att dessa går att ta ut 
       * linedata ska innehålla mealrating för varje dag i den valda perioden.
       * 
       * typ stats = line, pie
       *     line = linestats, linelabels
       *     pie = linestats, linelabels
       *  */
      
    }
  })

}

  getTopRatedFood(socket) {
   var meals = new Array();

   //hämta måltider och deras grades ordnade efter mealrating
   const query = {
     name: 'getRatedFood',
     text: 'SELECT M.menu, Max(G.meal_rating) FROM menu M join grades G ON M.date_pk=G.date_pk group by G.meal_rating, M.menu ORDER BY G.meal_rating DESC'
   }

   this.con.query(query, (err, res) => {
    if(err)  {
      console.log(err.stack);
    } else {
      var mealName = res.fields[0].name;
      var mealRatingName = res.fields[1].name;
      for (var i = 0; i < res.rows.length; i++) {
        var meal = new Array();
        meal[0] = res.rows[i][mealName];
        meal[1] = res.rows[i][mealRatingName];
        meals.push(meal);
      }

      socket.emit('ratedFood', meals);
    }
   });
 }

}
