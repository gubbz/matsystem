import React, { Component } from 'react'
import '../styles/MobileCard.css'
export default class MobileCard extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="MobileCard">
                <p>{this.props.datum}</p>
                <p className="MobileMealTitle">{this.props.måltid}</p>
                <p>Fråga: {this.props.fråga}</p>
                <p>Slängt: {this.props.slängt}</p>
            </div>
        )
    }
}
