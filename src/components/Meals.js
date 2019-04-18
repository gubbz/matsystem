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
      this.setState({displayForm: !this.state.displayForm}, () => {
        if(this.state.displayForm) {
          this.setState({
            arrowDirection: "rotate(180deg)"
          })
        } else {
          this.setState({
            arrowDirection: "rotate(0deg)"
          })
        }
      });
    }

    updateRatedFoods = (text) => {
      console.log(text);
      if (text === "option1") {
        this.state.ratedFoods.sort(function(a,b) {
          return a[1] - b[1];
        });
        this.state.ratedFoods.reverse();
        this.setState({ratedFoods: this.state.ratedFoods});
      } else if (text === "option2") {
        this.state.ratedFoods.sort(function(a,b) {
          return a[1] - b[1];
        });
        this.setState({ratedFoods: this.state.ratedFoods});
      } else if (text.length > 2) {
        var tempArr = new Array();
        var usedFoods = new Array();
        for (var i = 0; i < this.state.ratedFoods.length; i++) {
          if (this.state.ratedFoods[i][0].includes(text)) {
            tempArr.push(this.state.ratedFoods[i]);
            usedFoods.push(i);
          }
        }
        for (var i = 0; i < this.state.ratedFoods.length; i++) {
          if (!usedFoods.includes(i)) {
            tempArr.push(this.state.ratedFoods[i]);
          }
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
              <button onClick={this.displayForm}><i style={{transform: this.state.arrowDirection, transition: "transform 0.5s"}} className="material-icons">arrow_drop_down</i>Sortera</button>
                  </div>
                  {form}
                  <hr/>
                  {this.createMealComponent()}
              </div>
          </div>
      )
    }
}