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
            <div className="HeaderContainer">
                <ul className="AdminHeader">
                    <li>
                        <button
                            type="button"
                            className="Menu_Close"
                            onClick={this.handleClick}
                        >
                            <i class="material-icons">menu</i>
                        </button>
                    </li>
                    <li><h1>MealRate Admin</h1></li>
                </ul>
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
                    <ul className="Header">
                        <li><h1>MealRate</h1></li>
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
