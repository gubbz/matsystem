import React, { Component } from 'react'
import '../styles/Meals.css'
import Meal from './Meal.js';
import '../styles/MainContainer.css'
export default class Meals extends Component {

    constructor(props) {
      super(props);
      this.state = {
        ratedFoods: this.props.ratedFoods,
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

    render() {
        return (
            <div className="MainContainer">
                <div className="Meals">
                    <div className="MealTableLabels">
                        <h2>Måltider</h2>
                        <p>Sortera</p>
                    </div>
                    <hr />
                    {this.createMealComponent()}
                </div>
            </div>
        )
    }
}
