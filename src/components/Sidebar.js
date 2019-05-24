import React, { Component } from 'react'
import '../styles/Sidebar.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {};

        //Om skärmen är fullstor skapas sidebar annars header
        if(window.innerWidth >= 992) {
            this.state.renderSidebar = (
                <div className="Sidebar">
                    <div className="SidebarLogo"><h1>MealRate</h1></div>
                    <div className="SidebarItem"><i className="material-icons">calendar_today</i>
                        <Link to="/admin/planning" className="SidebarLink">Planering</Link>
                    </div>
                    <div className="SidebarItem"><i className="material-icons">bar_chart</i>
                        <Link to="/admin/statistics" className="SidebarLink">Statistik</Link>
                    </div>
                    <div className="SidebarItem"><i className="material-icons">exit_to_app</i>
                        <Link to="logout" className="SidebarLink">Logga ut</Link>
                    </div>
                </div>
            );
        } else {
            this.state.renderSidebar = (
                <div className="MobileSidebar">
                    <div className="SidebarLogo"><h1>MealRate</h1></div>
                    <div className="SidebarItem">
                        <Link to="/admin/planning" className="SidebarLink"><i className="material-icons">calendar_today</i></Link>
                    </div>
                    <div className="SidebarItem">
                        <Link to="/admin/statistics" className="SidebarLink"><i className="material-icons">bar_chart</i></Link>
                    </div>
                    <div className="SidebarItem">
                        <Link to="logout" className="SidebarLink"><i className="material-icons">exit_to_app</i></Link>
                    </div>
                </div>
            )
        }
    }
    render() {
        if (!window.location.toString().includes("question") && window.location.toString().includes("admin")) {
            return this.state.renderSidebar;
        }
        return null;
    }
}
