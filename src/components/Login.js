import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import "../styles/Login.css"

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.invalidInput = this.invalidInput.bind(this);
        this.state = {
            username: "",
            password: "",
            invalid: true,
            redirectPath: false
        }
    }

    handleSubmit(e) {
        if (this.state.username && this.state.password) {
            this.props.handleLogin(this.state.username, this.state.password);
            this.setState({redirectPath: true});
        }
        e.preventDefault();
    }

    invalidInput() {
        if (this.state.username && this.state.password) {
            this.setState({
                invalid: false,
            });
        } else {
            this.setState({
                invalid: true,
            })
        }
    }

    handleChange(evt) {
        this.setState({
            [evt.target.name]: evt.target.value
        }, () => {
            this.invalidInput();
        });
    }

    render() {
      if (this.state.redirectPath) {
        console.log("redirect to admin");
        window.location.href = "/admin";
        return true;
      }
      return (
          <div>
              <form onSubmit={this.handleSubmit} className="LoginForm">
                  <input
                      type="text"
                      placeholder="Användarnamn"
                      name="username"
                      onChange={this.handleChange}
                      className="LoginInput"
                  />
                  <input
                      type="password"
                      placeholder="Lösenord"
                      name="password"
                      onChange={this.handleChange}
                      className="LoginInput"
                  />
                  <input
                      type="submit"
                      value="Logga in"
                      name="submit"
                      disabled={this.state.invalid}
                      className="LoginSubmit"
                  />
              </form>
          </div>
      )
    }
}
