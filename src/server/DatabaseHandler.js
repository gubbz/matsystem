'use strict'
const pg = require('pg');
const mysql = require('mysql2');
const bcrypt = require('bcrypt');
const saltRounds = 12;
const jwt = require('jsonwebtoken');
const secret = 'mysecretsshhh';
var cookie  = require('cookie');
/**
  Database communication and functionality
**/
module.exports = class DatabaseHandler {
  //const DBURL = process.env.DATABASE_URL || "postgres://eehwvfixxiwamp:55d64c3b425aebf6fce5678970cef00d3293df5896d7f43fbad2059297a979c8@ec2-79-125-4-72.eu-west-1.compute.amazonaws.com:5432/df34h992q2uhdj"
  constructor() {
    console.log("DatabaseHandler constructor")

    this.con;
    this.meal = new Array();
    this.weekFoodMenu = new Array();
    this.currentVotes = new Array();
    this.currentSubVotes = new Array();
    this.weekQuestions = new Array();
    this.establishConnection();
    this.getMenuFromDB();

  }

  establishConnection() {
    console.log("början på db conn");
    this.con = new pg.Client({
      host: 'ec2-54-247-72-30.eu-west-1.compute.amazonaws.com',
      user: 'wneyxoesnscgzy',
      database: 'drkgu78hpqtso',
      password: '9f1537d79e9e919240cf324b0abbff6c40ff864c0f9ecf94f196e73a0ed24180',
      port: 5432,
      ssl: true
    });

    this.con.connect(function (err) {
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
          if (this.currentVotes.length < 4) {
            this.currentVotes.push(res.rows[0][fieldName]);
          }
        }

      }
      socket.emit(typeOfCall, grades);
    });

    const query2 = {
      text: 'SELECT * FROM "subQuestions" WHERE date_fk = ($1)',
      values: [today]
    }
    this.con.query(query2, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        this.currentSubVotes = res.rows;
      }
    });

  }

//hämta vilken fråga som ska stå på fråge sidan
  async subQuestions(antalElever, todaysQuestions, today){
    return new Promise(resolve => {
      setTimeout(() => {
        var question;
        const frågor={
          name: 'getQuestion',
          text: 'SELECT * FROM "subQuestions" WHERE date_fk = ($1)',
          values: [today]
        }
        this.con.query(frågor, (err, res) => {
          if(err){

            console.log(err);
          }else{
            if(res.rows == ""){
              for (var i = 0; i < todaysQuestions.length; i++) {
                console.log(todaysQuestions[i]);

              const insertquestion={
                name: 'InsertQuestion',
                text: 'INSERT INTO "subQuestions" (date_fk, question, v_good, good, bad, v_bad) VALUES ($1, $2 ,0 ,0 ,0 ,0)',
                values: [today, todaysQuestions[i]]
              }
              this.con.query(insertquestion, (err, res) => {
                if(err){
                  console.log(err);
                }else{
                  console.log("succes");
                }
              });
            }
            }else{
            var antalSubRöster = Number(Number(res.rows[0]['v_bad']) +Number(res.rows[0]['bad']) +Number(res.rows[0]['good']) +Number(res.rows[0]['v_good']));

            question = todaysQuestions[0]
            for(var p = 0; p < todaysQuestions.length; p++){
              if ((antalSubRöster > (antalElever/12) && Number(Number(res.rows[p]['v_bad']) +Number(res.rows[p]['bad'])) > antalSubRöster *(2/3)) || antalSubRöster > antalElever*(1/6)){
                if(todaysQuestions[p] == (res.rows[p]['question'])){

                  if(p == todaysQuestions.length -1){
                    question = "";
                  }else{
                    question = todaysQuestions[p+1];
                  }
                }
              }
            }
            resolve(question);
          }
          }
        });
      }, 30);
    });
  }

//hämta antalElever på skolan
  async elever(){
    return new Promise(resolve => {
      setTimeout(() => {
        var antalElever;

        const elever={
          name: 'getStudents',
          text: 'SELECT * FROM "schools"',
          values: []
        }
        this.con.query(elever, (err, res) => {
          if(err){

            console.log(err);
          }else{
            resolve( Number(res.rows[0]['students']));
          }
        });
    }, 30);
  });
  }

//hämta ordmaten ur matsedel
  async getMealWord(ord){
    return new Promise(resolve => {
      setTimeout(() => {
        var todaysQuestions = new Array;
        const array = {
          name: 'getMealWord',
          text: "SELECT * FROM meal_word_list WHERE $1 LIKE CONCAT('%',meal_word,'%')",
          values: ['%'+ ord+ '%' ]
        }

      this.con.query(array, (err, res) => {
        if(err){
          console.log(err);
        }else{
          if(res.rows == ""){
            resolve("");
          }else{
              for(var y = 0; y<res.rows.length; y++){
                if(ord.includes( res.rows[y]['meal_word'])){
                  if(todaysQuestions.includes(ord)){
                  }else{

                    this.question = ord;
                    todaysQuestions.push(ord);
                    resolve(ord);
                    }
                  }
                }
            }
            }
          });
    }, 30);
  });
  }

  //hämta dagensmat
  async todayFood(today){
  return new Promise(resolve => {
    setTimeout(() => {
      var word = [];
      const mat = {
        text: 'SELECT * FROM menu WHERE date_pk = $1',
        values: [today]
      }

      this.con.query(mat, (err, res) => {
        if(err){
          console.log(err);
        }else{
          if(res.rows == ""){
            resolve("");
          }else{
            var dagens = (res.rows[0]['menu']);
            word.push(dagens.toLowerCase().split(' '));
            resolve(word);
          }
        }
      });
    }, 30);
  });
  }

//hämta betygen från dag
  async todayGrade(today){
  return new Promise(resolve => {
    setTimeout(() => {
      var grades = new Array();

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

            resolve(grades);
          }
        });
      }, 30);
    });
  }

//main matod för att kolla vilken fråga som ska vara aktiv.
  async checkQuestion(socket){

    var today = new Date().toISOString().substring(0, 10);
    var todaysQuestions = new Array();

    var grade = await this.todayGrade(today);
    var totalVotes = Number(Number(grade[0][1])+Number(grade[1][1])+Number(grade[2][1])+Number(grade[3][1]))
    var antalElever = await this.elever();

    if(totalVotes >= antalElever*(1/10) && Number(Number(grade[2][1])+Number(grade[3][1])) >= totalVotes *(2/4) ){


      var word = await this.todayFood(today);
      for(var i = 0; i < word[0].length; i++){
        var mealWord = await this.getMealWord(word[0][i]);
        if(mealWord != ""){
          todaysQuestions.push(mealWord);
        }
      }

      if (todaysQuestions.length <= 4 && todaysQuestions != undefined) {
        var subquestion = await this.subQuestions(antalElever, todaysQuestions, today);

        if(subquestion == ""){
          this.question = "";
          socket.emit("ChangeQuestion", "Vad tyckte du om dagensmaten?  What did you think of the food today?")
        }else{
          this.question = subquestion;

          socket.emit("ChangeQuestion", "Vad tyckte du om "+ subquestion +"?")
        }
      }
    }
  }

  addVote(typeOfVote) {

    var currentVote, currentSubVote;
    var query, query2;
    var currentDate = new Date().toISOString().substring(0, 10);
    var x;
    for (var i = 0; i < this.currentSubVotes.length; i++) {
      if (this.currentSubVotes[i]['question'] == this.question) {
          x = i;
      }
    }

    switch (typeOfVote) {
      case "very_bad":
        currentVote = parseInt(this.currentVotes[3], 10) + 1;
        currentSubVote = Number(this.currentSubVotes[x]['v_bad']) + 1;
        this.currentVotes[3] = currentVote;
        this.currentSubVotes[3] = currentSubVote;


        query = "UPDATE grades SET very_bad = ($1) WHERE date_pk = ($2)";

        if (this.question != "") {
          query2 = "UPDATE subQuestions SET v_bad = ($1) WHERE date_fk = ($2) AND question = ($4)"
        }
        console.log("currentvote: " + currentVote);
        console.log("query i switchen: " + query);
        break;
      case "bad":
        currentVote = parseInt(this.currentVotes[2], 10) + 1;
        currentSubVote = Number(this.currentSubVotes[x]['bad']) + 1;
        this.currentVotes[2] = currentVote;
        this.currentSubVotes[2] = currentSubVote;
        if(this.question != ""){
          query2 = "UPDATE subQuestions SET bad = ($3) WHERE date_fk = ($2) AND question = ($4)"
        }
        query = "UPDATE grades SET bad = ($1) WHERE date_pk = ($2)";
        console.log("currentvote: " + currentVote);
        break;
      case "good":
        currentVote = parseInt(this.currentVotes[1], 10) + 1;
        currentSubVote = Number(this.currentSubVotes[x]['good']) + 1;
        this.currentVotes[1] = currentVote;
        this.currentSubVotes[1] = currentSubVote;
        if(this.question != ""){
          query2 = "UPDATE subQuestions SET good = ($3) WHERE date_fk = ($2) AND question = ($4)"
        }
        query = "UPDATE grades SET good = ($1) WHERE date_pk = ($2)";
        console.log("currentvote: " + currentVote);
        break;
      case "very_good":
        currentVote = parseInt(this.currentVotes[0], 10) + 1;
        currentSubVote = Number(this.currentSubVotes[x]['v_good']) + 1;
        this.currentVotes[0] = currentVote;
        this.currentSubVotes[0] = currentSubVote;
        if(this.question != ""){
          query2 = "UPDATE subQuestions SET v_good = ($3) WHERE date_fk = ($2) AND question = ($4)"
        }
        query = "UPDATE grades SET very_good = ($1) WHERE date_pk = ($2)";
        console.log("currentvote: " + currentVote);
        break;
    }

    console.log("query: " + query)
    //+1 vote to grades when someone press on of the buttons
    var values = [currentVote, currentDate, currentSubVote, this.question];

    this.con.query(query, values, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        console.log("grades + 1 successful");
      }
    });

    this.con.query(query2, values, (err, res) => {
      if (err) {
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

    for (var i = 0; i < 5; i++) {
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
        this.weekFoodMenu.push({ localDate, meal });
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
    console.log("login början");
    var self = this;
    const query = {
      name: 'getUsers',
      text: 'SELECT password FROM users where username = $1',
      values: [username]
    }

    this.con.query(query, (err, res) => {

      if(res.rows[0]) {
        if(bcrypt.compareSync(password, res.rows[0]["password"])){
          var cookief = socket.handshake.headers.cookie;
          var cookies = cookie.parse(socket.handshake.headers.cookie);
          console.log("login " + cookies['token']);
          if (!cookies['token']) {
            console.log("new token " + username);
            const payload = {username};
            const token = jwt.sign(payload, secret, {
              expiresIn: '1h'
            });
            console.log("token innan addTokenToDB " + token);
            self.addTokenToDB(username, res.rows[0]["password"], token, socket, self);
            console.log("socket emit return login " + token);
            socket.emit("returnlogin", token, username);
          } else {
            console.log("cookies token exists");
            self.checkAuthentication(socket, cookies['token'], username);
          }
        } else {
          socket.emit('returnlogin', null);
        }
      } else {
        socket.emit('returnlogin', null);
      }
    });
  }

  addTokenToDB(username, password, token, socket, self) {
    console.log("addTokenToDB början");
    const query = {
      name: 'updateToken',
      text: 'UPDATE users SET token = $1 WHERE username = $2 AND password = $3',
      values: [token, username, password]
    }

    this.con.query(query, (err, res) => {
      if (err) {
        return console.log(err.stack);
      } else {
        console.log("updated token");
      }
    });
  }

  checkAuthentication(socket, token, user) {

    console.log("checkAuthentication " + user + " ; " + token);
      const query = {
        name: 'verifyAuth',
        text: 'SELECT token from users WHERE username = $1',
        values: [user]
      }

      this.con.query(query, (err, res) => {
        if (err) {
          return console.log(err.stack);
        } else {
          console.log(res.rows[0]['token']);
          console.log(token);
          if (res.rows[0]['token'] == token) {
            console.log("auth socket emit");
            socket.emit('auth', true);
          } else {
            socket.emit('auth', false);
          }
        }
      })
  }

  updateWaste(waste, date, menu)  {

    var query = "UPDATE menu SET waste = $1 WHERE date_pk = $2 AND menu = $3";
    var values = [waste, date, menu];

    this.con.query(query, values, (err, res) => {
      if (err) {
        return console.log(err.stack);
      } else {
        console.log("waste updated");
      }
    });
  }

  getStatistics(socket) {

    var pie = new Array();
    var stats = new Array();

    const query = {
      name: 'getStatistics',
      text: 'SELECT * FROM grades',
    }

    this.con.query(query, (err, res) => {
      if (err) {
        console.log(err.stack);
      } else {
        for (var i = 0; i > res.fields.length; i++)
          var k = res.rows[i];
        JSON.stringify(k);
      }
      var dateName = res.fields[0].name;
      var v_goodName = res.fields[1].name;
      var goodName = res.fields[2].name;
      var badName = res.fields[3].name;
      var v_badName = res.fields[4].name;
      var mealRatingName = res.fields[5].name;

      var v_goodTotal = 0;
      var goodTotal = 0;
      var badTotal = 0;
      var v_badTotal = 0;

      /**
       * 
       */

      var linelabels = [];
      var linestats = [];
      var line = [];
      
      for (var i = 2; i < res.rows.length; i++) {
        var date = res.rows[i][dateName];
        linestats.push(res.rows[i][mealRatingName]);
        linelabels.push(date.toISOString().substring(5, 7));

        v_goodTotal += parseInt(res.rows[i][v_goodName], 10);
        goodTotal += parseInt(res.rows[i][goodName], 10);
        badTotal += parseInt(res.rows[i][badName], 10);
        v_badTotal += parseInt(res.rows[i][v_badName], 10);
      }
      line = {stats: linestats, labels: linelabels};
      pie.push(v_goodTotal, goodTotal, badTotal, v_badTotal);
      stats.push(pie, line);
      socket.emit('stats', stats);
      /**
       * skapa array med mycket dåligt, dåligt, bra, mycket bra röster
       * stats ska innehålla piedata och linedata så att dessa går att ta ut
       * linedata ska innehålla mealrating för varje dag i den valda perioden.
       *
       * typ stats = line, pie
       *     line = linestats, linelabels
       *     pie = linestats, linelabels
       *  */

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
      if (err) {
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
