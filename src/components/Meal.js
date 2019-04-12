import React, { Component } from 'react'
import '../styles/Meal.css'


export default class Meal extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="Meal">
                <p className="MealTitle">{this.props.mealTitle}</p>
                <p className="MealRating">{this.props.mealRating}</p>
            </div>
        )
    }
}
