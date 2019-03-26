import React, { Component } from 'react'
import '../styles/Sidebar.css'

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
     
    }
    render() {
        if (!window.location.toString().includes("question") && window.location.toString().includes("admin")) {
            return (
                <div className="Sidebar">
                    <ul className="SidebarList">
                        <li>P</li>
                        <li>S</li>
                        <li>I</li>
                        <li>L</li>
                    </ul>
                </div>
            )
        }
        return null;
    }
}
