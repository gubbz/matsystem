import React, { Component } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import Planning from './Planning'
import Statistics from './Statistics';
import QuestionView from './QuestionView'
import ErrorPage from './ErrorPage'

export default class Admin extends Component {
    constructor(props) {
        var color = "white";
        super(props);
        this.onSend = this.onSend.bind(this);
        this.displayVote = this.displayVote.bind(this);
        this.child = React.createRef();
    }

    onSend(date, question, waste) {
        this.props.onSend(date, question, waste);
    }

    displayVote(type) {
        this.child.current.displayVote(type);
    }
    ChangeQuestion(question) {
        this.child.current.ChangeQuestion(question);
    }
    render() {
        return (
            <Router>
                <div className="AdminContainer">
                    <Sidebar />
                    <div className="RightAdmin">
                        <div className="AdminMainContainer">
                            <Switch>
                                <Route exact path="/admin/" render={() => <Planning
                                    onSend={this.onSend}
                                    pageName={"Planering"}
                                    planningMeals={this.props.planningMeals}
                                />}
                                />
                                <Route path="/admin/planning" render={() => <Planning
                                    onSend={this.onSend}
                                    pageName={"Planering"}
                                    planningMeals={this.props.planningMeals}
                                />}
                                />
                                <Route path="/admin/statistics" render={() => <Statistics
                                    pageName={"Statistik"}
                                    shadow={0}
                                    allStats={this.props.allStats}
                                    lineStats={this.props.lineStats}
                                    lineLabels={this.props.lineLabels}
                                    pieStats={this.props.pieStats}
                                />}
                                />
                                <Route path="/admin/question" render={() => <QuestionView
                                    ref={this.child}
                                />}
                                />
                                <Route path="*" component={ErrorPage} />
                            </Switch>
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}
