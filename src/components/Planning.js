import React, { Component } from 'react'
import '../styles/Planning.css'
import '../styles/MainContainer.css'
import '../styles/AdminContainer.css'
import TableItem from './TableItem'
import Sidebar from './Sidebar'
import MobileCard from './MobileCard'

export default class Planning extends Component {
    constructor(props) {
        super(props);
        this.onSend = this.onSend.bind(this);
        this.state = {
            meals: this.props.planningMeals 
        }

        //Om skärmen är fullstor skapas tabellen annars som en kortlayout
        if (window.innerWidth >= 992) {
            this.state.renderPlanning = (
                <div>
                    <h1 className="AdminPageName">{this.props.pageName}</h1>
                    <table className="Table">
                        <thead>
                            <TableItem
                                isHeader={true}
                                datum="DATUM"
                                måltid="MÅLTID"
                                fråga="FRÅGA"
                                slängt="SLÄNGT"
                            />
                        </thead>
                        <tbody>
                            {
                                this.state.meals.map((items, i) =>
                                    <TableItem
                                        key={i}
                                        datum={items.localDate}
                                        måltid={items.meal}
                                        fråga={items.question}
                                        slängt={items.waste}
                                        index={i}
                                        onSend={this.onSend}
                                    />
                                )
                            }
                        </tbody>
                    </table>
                </div>
            )
        } else {
            this.state.renderPlanning = (
                <div>
                    <div className="MobileTable">
                        {
                            this.state.meals.map((items, i) =>
                                <MobileCard
                                    datum={items.date}
                                    måltid={items.meal}
                                    fråga={items.question}
                                    slängt={items.waste}
                                    index={i}
                                    onSend={this.onSend}
                                />
                            )
                        }
                    </div>
                </div>
            )
        }
        console.log(this.state);
    }
    onSend(date, question, waste) {
        this.props.onSend(date, question, waste);
    }
    render() {
        return this.state.renderPlanning;
    }
}
