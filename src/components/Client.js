import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import TodayGrid from './TodayGrid';
import Statistics from './Statistics';
import Login from './Login';
import Meals from './Meals';
import Header from './Header';
import ErrorPage from './ErrorPage'

export default class Client extends Component {
    constructor(props) {
        super(props);
        console.log("client cosntructor");
        console.log(props);
        this.handleLogin = this.handleLogin.bind(this);
    }

    handleLogin(username, password) {
        this.props.handleLogin(username, password);
    }

    render() {
        return (
            <Router>

                <div className="Client">
                    <Header />

                    <div className="MainContainer">
                        <Switch>
                            <Route exact path="/" render={() => <TodayGrid
                                vGood={this.props.vGood}
                                good={this.props.good}
                                bad={this.props.bad}
                                vBad={this.props.vBad}
                                data={this.props.data}
                                ref={this.chartElement}
                                meal={this.props.meal}
                            />}
                            />
                            <Route path="/today" render={() =>
                                <TodayGrid
                                    vGood={this.props.vGood}
                                    good={this.props.good}
                                    bad={this.props.bad}
                                    vBad={this.props.vBad}
                                    data={this.props.data}
                                    ref={this.chartElement}
                                    meal={this.props.meal}
                                />
                            }
                            />
                        } />
      <Route path="/statistics" render={() =>
                                <Statistics
                                    shadow="0 1px 2px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.08)"
                                />
                            } />
                        <Route path="/meals" render={() => <Meals
                          ratedFoods={this.props.ratedFoods}
                        />} />

                        <Route path="/login" render={() =>
                            <Login
                                handleLogin={this.handleLogin}
                            />} />
      <Route path="*" component={ErrorPage} />
      </Switch>
                    </div>

                </div>

            </Router >
        )
    }
}
