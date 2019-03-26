"use strict"
const curl = require("curl");
const jsdom = require("jsdom");

module.exports = class SchoolFoodScraper{
  constructor(url, dbh) {
    console.log("SchoolFoodScraper constructor")
    this.url = url;
    this.meals = [];
    this.getCurlPage(dbh);
  }
  /*
  static create(url) {
       var obj = new SchoolFoodScraper(url);
       obj.getCurlPage();
       return obj;
   }
*/
  getCurlPage(dbh) {
    curl.get(this.url, null, (err,resp,body)=>{
      if(resp.statusCode == 200){
       this.parseData(body, dbh);
      }
      else{
       //some error handling
       console.log("error while fetching url");
      }
    });
  }

  parseData(html, dbh){
    const {JSDOM} = jsdom;
    const dom = new JSDOM(html);
    const $ = (require('jquery'))(dom.window);
    //let's start extracting the data
    var items = $(".row");
    for(var i = 0; i < items.length; i++){
      var innerInfo = $(items[i]).children('.items');
      var datediv = $(items[i]).children('.date');
      var date = $(datediv).find('.date').text();
      var meal = $($(innerInfo).find('span')[0]).text();
      //console.log(date + " " + meal);
      var dateMeal = new Array();
      dateMeal[0] = date;
      dateMeal[1] = meal;
      this.meals.push(dateMeal);
    }
    dbh.insertFood(this.meals);
  }

}
