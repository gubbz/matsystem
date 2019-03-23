'use strict'
const curl = require("curl");
const jsdom = require("jsdom");

module.exports = class SchoolFoodScraper{
  constructor(url, ) {
    this.url = url;
    this.meals = [];
    this.getCurlPage();
  }

  getCurlPage() {
    curl.get(this.url, null, (err,resp,body)=>{
      if(resp.statusCode == 200){
       this.parseData(body);
      }
      else{
       //some error handling
       console.log("error while fetching url");
      }
    });
  }

  parseData(html){
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
      var meal = new Array();
      meal[0] = date;
      meal[1] = meal;
      this.meals.push(meal);
    }
  }

  getWeekFood(callback) {
    console.log(this.meals);
    return callback(this.meals);
  }

}
