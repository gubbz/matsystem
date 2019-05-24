import React, { Component } from 'react'
import '../styles/QuestionView.css';
import { GREEK_BIN } from 'mysql2/lib/constants/charsets';
// emojis
import emoji_good from "../resources/good.png"
import emoji_verygood from "../resources/verygood.png"
import emoji_bad from "../resources/bad.png"
import emoji_verybad from "../resources/verybad.png"


export default class QuestionView extends Component {

    constructor(props) {
        var color;
        var text;
        var original = "Vad tyckte du om maten?";
        super(props);
        this.displayVote = this.displayVote.bind(this);
    }

    componentWillMount() {
        this.text = "white";
        this.text = "Vad tyckte du om maten?";
    }
    ChangeQuestion(data){
        this.text = data;
        console.log(data);
        this.original = data;
        this.forceUpdate();
    }

    displayVote(type) {
        switch (type) {
            case "very_bad":
                this.color = "#F44336";
                break;
            case "bad":
                this.color = "#F57C00";
                break;
            case "good":
                this.color = "#EEFF41";
                break;
            case "very_good":
                this.color = "#64DD17";
                break;
        }
        this.text = "Tack för din röst";
        this.forceUpdate();
        var that = this;
        setTimeout(function () {
            that.color = "white";
            that.text = "Vad tyckte du om maten?";
            that.forceUpdate();
        }, 1340);
    }

    render() {
        return (
            <div className="QuestionView"
                style={{
                    backgroundColor: this.color
                }}
            >
                <h1 className="QuestionText">{this.text}</h1>
                <div className="emojis">
                    <img src={emoji_verygood} alt="Dåligt"/>
                    <img src={emoji_good} alt="Dåligt" />
                    <img src={emoji_bad} alt="Dåligt" />
                    <img src={emoji_verybad} alt="Dåligt" />
                </div>
            </div>
        )
    }
}
