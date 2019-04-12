import React, { Component } from 'react'
import '../styles/Meals.css'
import Meal from './Meal.js';
import '../styles/MainContainer.css'
export default class Meals extends Component {
    render() {
        return (
            <div className="Meals">
                <div className="MealTableLabels">
                    <h2>Måltider</h2>
                    <p>Sortera</p>
                </div>
                <hr />
                <Meal
                    mealTitle="Köttbullar & potatis"
                    mealRating="73%"
                />
                <Meal
                    mealTitle="Tomatsoppa"
                    mealRating="64%"
                />
                <Meal
                    mealTitle="Kycklinggryta & ris"
                    mealRating="46%"
                />
                <Meal
                    mealTitle="Fiskgratäng & ris"
                    mealRating="42%"
                />
            </div>
        )
    }
}
