import React, { Component } from 'react'
import '../styles/ErrorPage.css'
import Error from '../resources/error.png'

export default class ErrorPage extends Component {
    render() {
        return (
            <div className="MainContainer">
                <div className="Error">
                    <div>
                        <h1>Här var det tomt!</h1>
                        <p>Klicka på knappen så kommer du tillbaka till förstasidan!</p>
                        <a href="/">Tillbaka till hem</a>
                    </div>
                    <div>
                        <img src={Error} alt="Error!" />
                    </div>
                </div>
            </div>
        )
    }
}
