import React, { Component } from 'react'
import '../styles/Planning.css'
import '../styles/MainContainer.css'
import '../styles/AdminContainer.css'
import TableItem from './TableItem'
import Sidebar from './Sidebar'

export default class Planning extends Component {
/*
  [
      {
          date: "03-18",
          meal: "Tomatsoppa med brödbuffé & ost, frukt",
          question: "Vad tyckte du om maten?",
          waste: "10 kg",
      }
  ]
*/
    constructor(props) {
        super(props);
        this.onSend = this.onSend.bind(this);
        this.state = {
            meals: this.props.planningMeals
        }
        console.log(this.state);
    }
    onSend(date, question, waste) {
        this.props.onSend(date, question, waste);
    }
    render() {
        //alert(this.state.mealObj.dates);
        return (
            <div>
                <h1>{this.props.pageName}</h1>
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
                                datum={items.localDate}
                                måltid={items.meal}
                                fråga={items.question}
                                slängt={items.waste}
                                index={i}
                                onSend={this.onSend}
                            />
                        )
                    }
                </table>
            </div>
        )
    }
}
