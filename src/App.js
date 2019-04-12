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
import './styles/MainContainer.css'
import Sidebar from './components/Sidebar.js'
import AdminContainer from './components/AdminContainer.js'
import socketIOClient from 'socket.io-client'
import { NONAME } from 'dns';
import Admin from './components/Admin';
import Client from './components/Client';

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
  todaysMeal: null,
  displayVote: null,
  ratedFoods: [],
  planningMeals: []
}
class App extends Component {
  constructor() {
    super();
    this.url = window.location.toString();
    this.chartElement = React.createRef();
    this.isAdminPage = this.isAdminPage.bind(this);
    this.updateChart = this.updateChart.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
    this.child = React.createRef();
    this.state = state;
  }



  //FIXA HÄR TB
  sendMealInfo(date, question) {
    var getYear = new Date();
    date = getYear.getFullYear() + "-" + date;
    this.state.socket.emit('newQuestion', (date, question) => {
    });
  }

  sendWaste(waste, date, menu){
    this.state.socket.emit('updateWaste', (waste, date, menu) => {
    });
  }

  handleLogin(username, password) {
    this.state.socket.emit('login',{username: username, password: password});
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
      this.state.socket.emit('response', "HELLO SERVER GE MIG GRADES och veckans måltider");
    })

    socket.on('vote', (typeOfVote) => {
        this.updateChart(typeOfVote, 1);
        if (this.url.substring(this.url.lastIndexOf("/")) === "/question") {
          this.child.current.displayVote(typeOfVote);
        }
    })
    socket.on('returnlogin',function (data) {
      console.log("login");
      if(data){
        alert("success");
      }else{
        alert("u tink im stoopid??");
      }
    })

    socket.on('grades', (arr) => {
      console.log(arr)
      for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr[i].length; j += 2) {
          this.resetChart(arr[i][j], parseInt(arr[i][j + 1]));
        }
      }
    })

    socket.on('menu', (arr) => {
      console.log(arr);
      today = new Date();
      mm = String(today.getMonth() + 1).padStart(2, '0');
      dd = String(today.getDate()).padStart(2, '0');
      console.log(mm + "-" + dd);
      if (arr.length == 5) {
        for (var i = 0; i < arr.length; i++) {
          if (arr[i]['localDate'] == (mm + "-" + dd)) {
            var todaysMeal = arr[i]['meal'];
            console.log(todaysMeal);
            this.setState({todaysMeal: todaysMeal});
          }
        }
        this.setState({planningMeals: arr});
      }
    })

    socket.on('ratedFood', (arr) => {
      console.log(arr);
      this.setState({ratedFoods: arr});
    })
    socket.on('getQuestion', (question) => {
      //do something with the question ALBZZ, yeet
    })
  }

  updateChart(data, amount) {
    switch (data) {
      case "very_bad":
        this.setState({
          vBad: this.state.vBad + amount,
        });
        break;
      case "bad":
        this.setState({
          bad: this.state.bad + amount,
          });
        break;
      case "good":
        this.setState({
          good: this.state.good + amount,
        });
        break;
      case "very_good":
        this.setState({
          vGood: this.state.vGood + amount,
        });
        break;
    }
    this.setState({
      data: [this.state.vGood, this.state.good, this.state.bad, this.state.vBad]
    });
  }

  resetChart(data, amount) {
    switch (data) {
      case "very_bad":
        this.setState({
          vBad: amount
        });
        break;
      case "bad":
        this.setState({
          bad: amount
          });
        break;
      case "good":
        this.setState({
          good: amount
        });
        break;
      case "very_good":
        this.setState({
          vGood: amount
        });
        break;
    }
    this.setState({
      data: [this.state.vGood, this.state.good, this.state.bad, this.state.vBad]
    });
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
          <Route path="/admin" render={() =>
            <Admin
              onSend={this.sendMealInfo}
              ref={this.child}
              planningMeals={this.state.planningMeals}
            />
          } />
          <Route path="/" render={() =>
            <Client
              vGood={this.state.vGood}
              good={this.state.good}
              bad={this.state.bad}
              vBad={this.state.vBad}
              data={this.state.data}
              meal={this.state.todaysMeal}
              ref={this.chartElement}
              handleLogin={this.handleLogin}
              ratedFoods={this.state.ratedFoods}
            />
          } />

        </div>
      </Router>
    );
  }
}

export default App;
