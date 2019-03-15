import React, { Component } from 'react'
import '../styles/Meals.css'
import Meal from './Meal.js';
import '../styles/MainContainer.css'
export default class Meals extends Component {
    render() {
        return (
            <div className="MainContainer">
                <div className="Meals">
                    <div className="MealTableLabels">
                        <h2>Måltider</h2>
                        <p>Sortera</p>
                    </div>
                    <hr />
                    <Meal
                        mealTitle="Köttbullar"
                        mealRating="54%"
                    />
                    <Meal
                        mealTitle="Köttbullar"
                        mealRating="54%"
                    />
                    <Meal
                        mealTitle="Köttbullar"
                        mealRating="54%"
                    />
                    <Meal
                        mealTitle="Köttbullar"
                        mealRating="54%"
                    />
                </div>
            </div>
        )
    }
}
