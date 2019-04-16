import React, { Component } from 'react'
import '../styles/Meals.css'
import Meal from './Meal.js';
import '../styles/MainContainer.css'
import MealSorter from './MealSorter.js';
export default class Meals extends Component {

    constructor(props) {
      super(props);
      this.state = {
        ratedFoods: this.props.ratedFoods,
        displayForm: false
      }
      console.log(this.state);
    }

    createMealComponent = () => {

      var meals = [];
      for (var i = 0; i < this.state.ratedFoods.length; i++) {
        console.log("create meal tagg");
        meals.push(<Meal
          key={"meal" + i}
          mealTitle = {this.state.ratedFoods[i][0]}
          mealRating = {this.state.ratedFoods[i][1]}
        />);
      }
      return meals;
    }

    componentDidUpdate(previousProps) {
        if (previousProps.data !== this.props.data) {
            this.setState({
              ratedFoods: this.props.ratedFoods
            })
        }
    }

    displayForm = () => {
      this.setState({displayForm: !this.state.displayForm});
    }

    updateRatedFoods = (text) => {
      console.log(text);
      if (text === "option1") {
        this.state.ratedFoods.sort(function(a,b) {
          return a[1] - b[1];
        });
        this.setState({ratedFoods: this.state.ratedFoods});
      } else if (text === "option2") {
        this.state.ratedFoods.sort(function(a,b) {
          return a[1] - b[1];
        });
        this.state.ratedFoods.reverse();
        this.setState({ratedFoods: this.state.ratedFoods});
      } else {
        this.state.ratedFoods.sort();
        console.log(this.state.ratedFoods);
        var startpos;
        for (var i = 0; i < this.state.ratedFoods.length; i++) {
          console.log(this.state.ratedFoods[i][0]);
          console.log(this.state.ratedFoods[i][0].includes(text));
          if (this.state.ratedFoods[i][0].includes(text)) {
            startpos = i;
            console.log("startpos" + startpos);
            break;
          }
        }
        var tempArr = this.state.ratedFoods;
        var newNum = 0;
        for (var i = 0; i < this.state.ratedFoods.length; i++) {
          if (startpos + i === this.state.ratedFoods.length) {
            tempArr[i][0] = this.state.ratedFoods[newNum][0];
            tempArr[i][1] = this.state.ratedFoods[newNum][1];
            newNum++;
          } else {
            tempArr[i][0] = this.state.ratedFoods[startpos + i][0];
            tempArr[i][1] = this.state.ratedFoods[startpos + i][1];
          }
          console.log("sdfsdf");
          console.log(tempArr);
        }
        this.setState({ratedFoods: tempArr});
      }
    }

    render() {
      let form = null;
      if (this.state.displayForm) {
        form = (
          <MealSorter
            updateRatedFoods = {this.updateRatedFoods}
          />
        )
      }
      return (
          <div className="MainContainer">
              <div className="Meals">
                  <div className="MealTableLabels">
                      <h2>Måltider</h2>
                      <button onClick={this.displayForm}>Sortera</button>
                  </div>
                  {form}
                  <hr/>
                  {this.createMealComponent()}
              </div>
          </div>
      )
    }
}
