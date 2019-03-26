import React, { Component } from 'react'
import '../styles/Sidebar.css'

export default class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }

    getLeft() {
        var left;

        if (this.props.isVisible) {
            return left = "0";
        } else {
            return left = "-25vw";
        }
    }

    handleClick() {
        this.props.click();
    }

    render() {

        if (!window.location.toString().includes("question") && window.location.toString().includes("admin")) {
            return (
                <div
                    className="Sidebar"
                    style={{ left: this.getLeft() }}
                >
                    <button
                        className="Menu_Close"
                        type="button"
                        onClick={this.handleClick}
                    ><i class="material-icons">close</i></button>
                    <ul className="SidebarList">
                        <li>Planering</li>
                        <li>Statistik</li>
                        <li>Inställningar</li>
                        <li>Logga ut</li>
                    </ul>
                </div>
            )
        }
        return null;
    }
}
