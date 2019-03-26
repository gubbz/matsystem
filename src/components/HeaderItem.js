import React, { Component } from 'react'
import '../styles/HeaderItem.css'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
export default class HeaderItem extends Component {
    
    
    render() {
        
        
        return (
            <div className="HeaderItem">
                <Link to={this.props.route}>{this.props.text}</Link>
            </div>
        )
    }
}
