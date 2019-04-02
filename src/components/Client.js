import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import TodayGrid from './TodayGrid';
import Statistics from './Statistics';
import Meals from './Meals';
import Header from './Header';


export default class Client extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <Router>
                <div className="Client">
                    <Header />
                    <div className="MainContainer">
                        <Route exact path="/" render={() => <TodayGrid
                            vGood={this.props.vGood}
                            good={this.props.good}
                            bad={this.props.bad}
                            vBad={this.props.vBad}
                            data={this.props.data}
                            ref={this.chartElement}
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
                            />
                        }
                        />
                        <Route path="/statistics" component={Statistics} />
                        <Route path="/meals" component={Meals} />
                    </div>
                </div>
            </Router>
        )
    }
}
