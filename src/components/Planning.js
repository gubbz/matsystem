import React, { Component } from 'react'
import '../styles/Planning.css'
import '../styles/MainContainer.css'
import TableItem from './TableItem'

export default class Planning extends Component {


    constructor(props) {
        super(props);
        this.state = {
            meals: [
                {
                    date: "03-18",
                    meal: "Tomatsoppa med brödbuffé & ost, frukt",
                    question: "Vad tyckte du om maten?",
                    waste: "10 kg",
                },
                {
                    date: "03-18",
                    meal: "Tomatsoppa med brödbuffé & ost, frukt",
                    question: "Vad tyckte du om maten?",
                    waste: "10 kg",
                },
                {
                    date: "03-18",
                    meal: "Tomatsoppa med brödbuffé & ost, frukt",
                    question: "Vad tyckte du om maten?",
                    waste: "10 kg",
                },
                {
                    date: "03-18",
                    meal: "Tomatsoppa med brödbuffé & ost, frukt",
                    question: "Vad tyckte du om maten?",
                    waste: "10 kg",
                },
                {
                    date: "03-18",
                    meal: "Tomatsoppa med brödbuffé & ost, frukt",
                    question: "Vad tyckte du om maten?",
                    waste: "10 kg",
                },
            ]
        }
    }
    render() {


        //alert(this.state.mealObj.dates);
        return (
            <div className="MainContainer">
                <table className="Table">
                    <TableItem
                        isHeader={true}
                        datum="DATUM"
                        måltid="MÅLTID"
                        fråga="FRÅGA"
                        slängt="SLÄNGT"
                    />
                    {
                        this.state.meals.map((items, i) =>
                            <TableItem
                                datum={items.date}
                                måltid={items.meal}
                                fråga={items.question}
                                slängt={items.waste}
                                index={i}
                            />
                        )
                    }
                </table>
            </div>
        )
    }
}
