import React, { Component } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Sidebar from './Sidebar';
import Planning from './Planning'
import Statistics from './Statistics';
import QuestionView from './QuestionView'


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
    render() {
        
        
        return (
            <Router>
                <div className="AdminContainer">
                    <Sidebar />
                    <div className="RightAdmin">
                        <div className="AdminMainContainer">
                            <Route exact path="/admin/" render={() => <Planning
                                onSend={this.onSend}
                                pageName={"Planering"} 
                            />}
                            />
                            <Route path="/admin/planning" render={() => <Planning
                                onSend={this.onSend}
                                pageName={"Planering"}
                                
                            />}
                            />
                            <Route path="/admin/statistics" render={() => <Statistics
                                pageName={"Statistik"}
                                shadow={0}
                            />}
                            />
                            <Route path="/admin/question" render={() => <QuestionView
                                ref={this.child}
                            />}
                            />
                        </div>
                    </div>
                </div>
            </Router>
        )
    }
}
