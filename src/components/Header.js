import React, { Component } from 'react'
import '../styles/Header.css'
import HeaderItem from './HeaderItem.js'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Header extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    /*adminHeader() {
        return (
            <div className="AdminHeaderContainer">
                <div className="AdminHeader">
                    <div><h1>MealRate Admin</h1></div>
                </div>
            </div>
        );
    }*/

    handleClick() {
        this.props.click();
    }

    render() {
        var urlCheck = window.location.toString();
        if (urlCheck.includes("question")) {
            return null;
        } else if (urlCheck.includes("admin")) {
            return null
        }
        else {
            return (
                <div className="HeaderContainer">
                    <div className="Header">
                        <div><h1 className="Logo">mealrate</h1></div>
                        <div className="HeaderLinks">
                            <HeaderItem
                                text="Idag"
                                route="/today"
                            />
                            <HeaderItem
                                text="Statistik"
                                route="/statistics"
                            />
                            <HeaderItem
                                text="Måltider"
                                route="/meals"
                            />
                            <HeaderItem
                                text="Logga in"
                                route="/login"
                            />
                        </div>
                    </div>
                </div>
            )
        }
    }
}
