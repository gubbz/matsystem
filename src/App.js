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
import Sidebar from './components/Sidebar.js'
import AdminContainer from './components/AdminContainer.js'
import socketIOClient from 'socket.io-client'
import { NONAME } from 'dns';


var today;
var mm;
var dd;

const socketURL = "localhost:8080";
var state = {
  vGood: 0,
  good: 0,
  bad: 0,
  vBad: 0,
  socket: null,
}
class App extends Component {

  constructor() {
    super();
    this.url = window.location.toString();
    this.chartElement = React.createRef();
    this.isAdminPage = this.isAdminPage.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.state = state;
  }


  //FIXA HÄR TB

  sendMealInfo(date, question, waste) {
    var getYear = new Date();
    date = getYear.getFullYear() + "-" + date;
    this.state.socket.emit('newQuestion', () => {
    });
  }

  componentWillMount() {
    this.initSocket()
  }

  componentWillUnmount() {
    state = this.state;
  }

  initSocket = () => {
    const socket = socketIOClient(socketURL);
    this.setState({ socket });

    socket.on('connect', () => {
      console.log("Connected");
      if (this.url.substring(this.url.lastIndexOf("/")) === "/" || this.url.substring(this.url.lastIndexOf("/")) === "/today") {
        socket.emit('response', "HELLO SERVER GE MIG GRADES och veckans måltider");
      }
    })

    socket.on('vote', (typeOfVote) => {
      if (this.url.substring(this.url.lastIndexOf("/")) === "/" || this.url.substring(this.url.lastIndexOf("/")) === "/today") {
        // console.log("röst mottagen " + typeOfVote);
        // console.log(this.state.data);np
        this.updateChart(typeOfVote, 1);
      }
    })

    socket.on('grades', (arr) => {
      console.log(arr)
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j += 2) {
          this.updateChart(arr[i][j], parseInt(arr[i][j + 1]));
        }
      }
    })

    socket.on('menu', (arr) => {
      console.log(arr);
      today = new Date();
      mm = String(today.getMonth()+1).padStart(2,'0');
      dd = String(today.getDate()).padStart(2, '0');
      console.log(mm+"-"+dd);

    })

  }


  updateChart(data, amount) {
    switch (data) {
      case "very_bad":
        this.setState({
          vBad: this.state.vBad + amount,
        }, () => {
          this.setState({
            data: [this.state.vGood, this.state.good, this.state.bad, this.state.vBad],
          });
        });
        break;
      case "bad":
        this.setState({
          bad: this.state.bad + amount,
        }, () => {
          this.setState({
            data: [this.state.vGood, this.state.good, this.state.bad, this.state.vBad],
          });
        });
        break;
      case "good":
        this.setState({
          good: this.state.good + amount,
        }, () => {
          this.setState({
            data: [this.state.vGood, this.state.good, this.state.bad, this.state.vBad],
          });
        });
        break;
      case "very_good":
        this.setState({
          vGood: this.state.vGood + amount,
        }, () => {
          this.setState({
            data: [this.state.vGood, this.state.good, this.state.bad, this.state.vBad],
          });
        });
        break;
    }
  }





  isAdminPage() {
    if (window.location.toString().includes("question")) {
      return false;
    } else if (window.location.toString().includes("admin")) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    return (
      <Router>
        <div className="Container">
          <Header/>
          <Route exact path="/" render={() => <TodayGrid
            vGood={this.state.vGood}
            good={this.state.good}
            bad={this.state.bad}
            vBad={this.state.vBad}
            data={this.state.data}
            ref={this.chartElement}
          />}
          />
          <Route path="/today" render={() => <TodayGrid
            vGood={this.state.vGood}
            good={this.state.good}
            bad={this.state.bad}
            vBad={this.state.vBad}
            data={this.state.data}
            ref={this.chartElement}
          />}
          />
          <Route path="/statistics" component={Statistics} />
          <Route path="/meals" component={Meals} />
          <Route path="/admin/" render={()=><Planning
            onSend={this.sendMealInfo}
          />}/>
          <Route path="/admin/question" exact component={QuestionView} />
        </div>
      </Router>
    );

  }

}

export default App;
