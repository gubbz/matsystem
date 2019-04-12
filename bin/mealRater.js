const pg = require('pg');
const mysql = require('mysql2');

var today = new Date().toISOString().substring(0, 10);
var client;
var grades = new Array();

establishConnection();

function getTodaysGrades() {

  const query = {
    text: 'SELECT * FROM grades WHERE date_pk = $1',
    values: [today]
  }
  // callback
  client.query(query, (err, res) => {

    if (err) {
      console.log(err.stack);
    } else {
      for (var i = 1; i < res.fields.length; i++) {
        var fieldName = res.fields[i].name;
        var grade = parseInt(res.rows[0][fieldName]);
        grades.push(grade);
      }
    }
    updateMealPoint();
  });

}

function updateMealPoint() {
  //calculate mealPoint
  console.log(grades)
  console.log((grades[0] + (grades[1] * (2/3)) + (grades[2] * (1/3))));
  console.log((grades[0] + grades[1] + grades[2] + grades[3]));
  var mealRating = parseInt((grades[0] + (grades[1] * (2/3)) + (grades[2] * (1/3)))/(grades[0] + grades[1] + grades[2] + grades[3]) * 100);
  console.log("MealRating = " + mealRating);

  const query = {
    text:  "UPDATE grades SET meal_rating = ($1) WHERE date_pk = ($2)",
    values: [mealRating, today]
  }

  client.query(query, (err, res) => {

    if (err) {
      console.log(err.stack);
    } else {
      console.log("mealRating updated successful!");
      client.end();
    }
  });

}

function establishConnection() {
  client = new pg.Client({
    host: 'ec2-79-125-4-72.eu-west-1.compute.amazonaws.com',
    user: 'eehwvfixxiwamp',
    database: 'df34h992q2uhdj',
    password: '55d64c3b425aebf6fce5678970cef00d3293df5896d7f43fbad2059297a979c8',
    port: 5432,
    ssl: true
  });

  client.connect(function(err) {
    if (err) {
      console.log(err);
    } else {
      console.log("CONNECTED TO DB");
      getTodaysGrades()
    }
  });
}
