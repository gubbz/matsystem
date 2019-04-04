import React, { Component } from 'react'
import '../styles/QuestionView.css';
import { GREEK_BIN } from 'mysql2/lib/constants/charsets';

const initialState = {

    display: "none",
    color: "",
}

export default class QuestionView extends Component {

    constructor(props) {
        super(props);
        this.state = {
            color: "white"
        };
        this.setColor = this.setColor.bind(this);
        //this.displayVote = this.displayVote.bind(this);
    }

    

    setColor() {
        if (this.props.displayVote) {
            switch (this.props.displayVote) {
                case "very_bad":
                    return "red";
                case "bad":
                    return "orange";
                case "good":
                    return "yellow";
                case "very_good":
                    return "green";
            }
        }

    }

    render() {
        return (
            <div className="QuestionView"
                style={{ backgroundColor: this.colorUpdate }}
            >
                <h1>Vad tyckte du om maten?</h1>
            </div>
        )
    }
}
