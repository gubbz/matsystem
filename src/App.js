import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';
import Header from './components/Header.js';
import MainContainer from './components/MainContainer.js';
import Meals from './components/Meals.js';
import TodayGrid from './components/TodayGrid.js'
import Planning from './components/Planning.js'
import Statistics from './components/Statistics.js'
import QuestionView from './components/QuestionView.js'
import socketIOClient from 'socket.io-client'

const socketURL = "localhost:8080";
class App extends Component {

  constructor() {
    super();
    this.url = window.location.toString();
    this.chartElement = React.createRef();
    this.state = {
      vGood: 2,
      good: 2,
      bad: 2,
      vBad: 2,
      socket: null,
      yeet: "yeet"
    };

  }

  componentWillMount() {
    this.initSocket()
  }

  initSocket = () => {
    const socket = socketIOClient(socketURL);
    this.setState({ socket });

    socket.on('connect', () => {
      console.log("Connected");
      if (this.url.substring(this.url.lastIndexOf("/")) === "/" || this.url.substring(this.url.lastIndexOf("/")) === "/today") {
        this.state.socket.emit('response', "HELLO SERVER GE MIG GRADES");
      }
    })

    socket.on('vote', (typeOfVote) => {
      if (this.url.substring(this.url.lastIndexOf("/")) === "/" || this.url.substring(this.url.lastIndexOf("/")) === "/today") {
        console.log("röst mottagen " + typeOfVote);
        console.log(this.state.data);
        this.chartElement.current.updateChart(typeOfVote, 1);
        this.forceUpdate();
      }

    })

    socket.on('grades', (arr) => {
      console.log(arr)
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j += 2) {
            this.chartElement.current.updateChart(arr[i][j], parseInt(arr[i][j + 1]));
        }
      }
    })

  }

  render() {
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" render={() => <TodayGrid
            vGood={this.state.vGood}
            good={this.state.good}
            bad={this.state.bad}
            vBad={this.state.vBad}
            ref={this.chartElement}
          />}
          />
          <Route path="/today" render={() => <TodayGrid
            vGood={this.state.vGood}
            good={this.state.good}
            bad={this.state.bad}
            vBad={this.state.vBad}
            ref={this.chartElement}
          />}
          />
          <Route path="/planning" component={Planning} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/meals" component={Meals} />
          <Route path="/admin/question" exact component={QuestionView} />
        </div>
      </Router>
    );

  }

}


export default App;



/*
<Route path="/today" component={TodayGrid}
            chartData={this.state.chartData}
            vGood={this.state.vGood}
            good={this.state.good}
            bad={this.state.bad}
            vBad={this.state.vBad}
            yeet="yeet"
          />
*/
