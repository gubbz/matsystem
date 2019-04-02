"use strict"
const curl = require("curl");
const jsdom = require("jsdom");
const pg = require('pg');
const mysql = require('mysql2');

const SKOLMATURL = "https://skolmaten.se/birger-sjoberggymnasiet/";
var meals = [];
var client;
establishConnection();
getCurlPage();

function getCurlPage() {
  curl.get(SKOLMATURL, null, (err,resp,body)=>{
    if(resp.statusCode == 200){
     parseData(body);
    }
    else{
     //some error handling
     console.log("error while fetching url");
    }
  });
}

function parseData(html){
  const {JSDOM} = jsdom;
  const dom = new JSDOM(html);
  const $ = (require('jquery'))(dom.window);
  //let's start extracting the data
  var items = $(".row");
  for(var i = 0; i < items.length - 1; i++){
    var innerInfo = $(items[i]).children('.items');
    var datediv = $(items[i]).children('.date');
    var date = $(datediv).find('.date').text();
    var meal = $($(innerInfo).find('span')[0]).text();
    console.log(date + " " + meal);
    var dateMeal = new Array();
    dateMeal[0] = date;
    dateMeal[1] = meal;
    meals.push(dateMeal);
  }
  //Lägg in veckans maåltider med datum i databas
  insertFood(meals);
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
      console.log("SchoolFoodScraper CONNECTED TO DB");
    }
  });
}

function insertFood(weekFood, callback) {
  //Insert a new week of rows in the food Database each week to get the meal
  //Get data from skolmatens hemsida
  var j = 0;
  for (var i = 0; i < weekFood.length; i++) {
    var date = weekFood[i][0];
    var meal = weekFood[i][1];
    var query = {
      text: 'INSERT into menu (date_pk, menu) VALUES ($1, $2)',
      values: [date, meal]
    }

    client.query(query, (err) => {
      if (err) {
        console.log(err);
      } else {
        j++;
        console.log(date + " " + meal + " inserted");
        if (j == 5) {
          client.end();
        }
      }
    })
  }
}
