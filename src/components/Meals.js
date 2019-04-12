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
        stateOfArray: false,
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
      //ligger en efter från formet i mealsorer så radiobuttons börjar tvärtom får fixas senare stateOfArray är false när den ska vara true
      console.log(text);
      if (text === "option1" && !this.state.stateOfArray) {
        const reverseData = this.state.ratedFoods.reverse().map((data, i) => {})
        this.setState({ratedFoods: this.state.ratedFoods});
        this.setState({stateOfArray: true});
      } else if (text === "option2" && this.state.stateOfArray) {
        const reverseData = this.state.ratedFoods.reverse().map((data, i) => {})
        this.setState({ratedFoods: this.state.ratedFoods});
        this.setState({stateOfArray: false});
      } else {
        this.state.ratedFoods.sort();

        this.setState({ratedFoods: this.state.ratedFoods});
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
