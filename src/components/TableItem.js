import React, { Component } from 'react'
import '../styles/TableItem.css'

export default class TableItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            waste: this.props.slängt,
            question: 'Vad tyckte du om maten?',
            yeet: '',
            inputState: true,
        };
        this.handleChange = this.handleChange.bind(this);
        this.enableInput = this.enableInput.bind(this);
        this.disableInput = this.disableInput.bind(this);
        this.renderButton = this.renderButton.bind(this);
        this.onSend = this.onSend.bind(this);
    }

    enableInput() {
        this.setState({
            inputState: false,
        });
    }

    disableInput() {
        this.setState({
            inputState: true,
        });
    }

    onSend() {
      this.setState({
          inputState: true,
      },() => {
          this.props.onSend();
      });
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        });
        console.log(evt.target.value);
    }

    renderButton() {
        if (!this.state.inputState) {
            return (
                <div className="RowButtons">
                    <button
                        className="EditButton"
                        type="button"
                        onClick={this.onSend}
                    >
                        <i class="material-icons">check</i>
                    </button>
                    <button
                        className="EditButton"
                        type="button"
                        onClick={this.disableInput}
                    >
                        <i class="material-icons">close</i>
                    </button>
                </div>
            );
        } else {
            return (
                <button
                    type="button"
                    className="EditButton"
                    onClick={this.enableInput}
                >
                    <i className="material-icons">edit</i>
                </button>

            );

        }

    }

    tableHeader() {
        return (
            <tr className="TableHeader">
                <th>{this.props.datum}</th>
                <th>{this.props.måltid}</th>
                <th>{this.props.fråga}</th>
                <th>{this.props.slängt}</th>
                <th></th>
            </tr>
        );
    }

    render() {
        if (this.props.isHeader) {
            return this.tableHeader();
        }
        return (
            <tr className="TableItem">
                <td>{this.props.datum}</td>
                <td>{this.props.måltid}</td>
                <td><input
                    type="text"
                    value={this.state.question}
                    name="question"
                    onChange={this.handleChange}
                    readOnly={this.state.inputState}
                /></td>
                <td><input
                    type="text"
                    value={this.state.waste}
                    name="waste"
                    onChange={this.handleChange}
                    readOnly={this.state.inputState}
                />
                </td>
                <td>
                    {this.renderButton(this.state.inputState)}
                </td>

            </tr>
        )
    }
}
