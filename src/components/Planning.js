import React, { Component } from 'react'
import '../styles/Planning.css'
import '../styles/MainContainer.css'
import TableItem from './TableItem'

export default class Planning extends Component {
    render() {
        return (
            <div className="MainContainer">
                <div className="Planning">
                    <div className="WeekSelector">
                        <p>Denna vecka</p>
                        <p>Nästa vecka</p>
                    </div>
                    <div className="PlanTable">
                        <div className="TableLabels">
                            <h3>Datum</h3>
                            <h3>Måltid</h3>
                            <h3>Fråga</h3>

                        </div>
                        <hr />
                        <TableItem
                            datum="datum"
                            måltid="måltid"
                            fråga="fråga"
                        />
                        <TableItem
                            datum="datum"
                            måltid="måltid"
                            fråga="fråga"
                        />
                        <TableItem
                            datum="datum"
                            måltid="måltid"
                            fråga="fråga"
                        />
                        <TableItem
                            datum="datum"
                            måltid="måltid"
                            fråga="fråga"
                        />
                        <TableItem
                            datum="datum"
                            måltid="måltid"
                            fråga="fråga"
                        />
                    </div>
                </div>
            </div>
        )
    }
}
