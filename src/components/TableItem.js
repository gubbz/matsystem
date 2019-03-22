import React, { Component } from 'react'
import '../styles/TableItem.css'
export default class TableItem extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="TableItem">
                <p>{this.props.datum}</p>
                <p>{this.props.måltid}</p>
                <p>{this.props.fråga}</p>
            </div>
        )
    }
}
