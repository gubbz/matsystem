import React, { Component } from 'react'
import '../styles/Sidebar.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (!window.location.toString().includes("question") && window.location.toString().includes("admin")) {
            return (
                <div className="Sidebar">
                    <div className="SidebarLogo"><h1>MealRate</h1></div>
                    <div className="SidebarItem"><i className="material-icons">calendar_today</i>
                        <Link to="#" className="SidebarLink">Planering</Link>
                    </div>
                    <div className="SidebarItem"><i className="material-icons">bar_chart</i>
                        <Link to="#" className="SidebarLink">Statistik</Link>
                    </div>
                    <div className="SidebarItem"><i className="material-icons">settings</i>
                        <Link to="#" className="SidebarLink">Inställningar</Link>
                    </div>
                    <div className="SidebarItem"><i className="material-icons">exit_to_app</i>
                        <Link to="#" className="SidebarLink">Logga ut</Link>
                    </div>
                </div>
            )
        }
        return null;
    }
}
