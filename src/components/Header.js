import React, { Component } from 'react'
import '../styles/Header.css'
import HeaderItem from './HeaderItem.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Header extends Component {
    render() {
        var urlCheck = window.location.toString();
        if (urlCheck.includes("admin")) {
            return null;
        }
        else {


            return (

                <div className="HeaderContainer">
                    <ul className="Header">
                        <li><h1>Matsystem</h1></li>
                        <HeaderItem
                            text="IDAG"
                            route="/today"
                        />
                        <HeaderItem
                            text="PLANERING"
                            route="/planning"
                        />
                        <HeaderItem
                            text="STATISTIK"
                            route="/statistics"
                        />
                        <HeaderItem
                            text="MÅLTIDER"
                            route="/meals"
                        />
                        <HeaderItem
                            text="LOGGA UT"
                            route="/"
                        />
                    </ul>
                </div>
            )
        }
    }
}
