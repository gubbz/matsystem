import React, { Component } from 'react'
import '../styles/Header.css'
import HeaderItem from './HeaderItem.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    adminHeader() {
        return (
            <div className="AdminHeaderContainer">
                <div className="AdminHeader">
                    <div><h1>MealRate Admin</h1></div>
                </div>
            </div>
        );
    }

    handleClick() {
        this.props.click();
    }

    render() {
        var urlCheck = window.location.toString();
        if (urlCheck.includes("question")) {
            return null;
        } else if (urlCheck.includes("admin")) {
            return this.adminHeader();
        }
        else {
            return (

                <div className="HeaderContainer">
                    <div className="Header">
                        <div><h1>MealRate</h1></div>
                        <div className="HeaderLinks">
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
                        </div>
                    </div>
                </div>
            )
        }
    }
}
