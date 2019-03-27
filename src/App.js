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

const socketURL = "localhost:8080";
class App extends Component {

  constructor() {
    super();
    this.url = window.location.toString();
    this.chartElement = React.createRef();
    this.isAdminPage = this.isAdminPage.bind(this);
    this.updateChart = this.updateChart.bind(this);

    if (localStorage.getItem("good")) {
      this.state = {
        vGood: parseInt(localStorage.getItem("vGood")),
        good: parseInt(localStorage.getItem("good")),
        bad: parseInt(localStorage.getItem("bad")),
        vBad: parseInt(localStorage.getItem("vBad")),
        data: [parseInt(localStorage.getItem("vGood")), parseInt(localStorage.getItem("good")), parseInt(localStorage.getItem("bad")), parseInt(localStorage.getItem("vBad"))],
        socket: null,
        sideBarState: false,
        coverDisplay: "none",
      };
    } else {
      this.state = {
        vGood: 0,
        good: 0,
        bad: 0,
        vBad: 0,
        data: null,
      }
    }

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
        this.state.socket.emit('response', "HELLO SERVER GE MIG GRADES och veckans måltider");
      }
    })

    socket.on('vote', (typeOfVote) => {
      if (this.url.substring(this.url.lastIndexOf("/")) === "/" || this.url.substring(this.url.lastIndexOf("/")) === "/today") {
        // console.log("röst mottagen " + typeOfVote);
        // console.log(this.state.data);
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
    localStorage.setItem("vBad", this.state.vBad);
    localStorage.setItem("bad", this.state.bad);
    localStorage.setItem("good", this.state.good);
    localStorage.setItem("vGood", this.state.vGood);
    return (
      <Router>
        <div className="Container">
          <div
            className="CoverDiv"
            style={{ display: this.state.coverDisplay }}
          ></div>
          <Header
            click={this.toggleSidebar}
          />
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
          <Route path="/planning" component={Planning} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/meals" component={Meals} />
          <Route path="/admin/" exact component={Planning} />
          <Route path="/admin/question" exact component={QuestionView} />
        </div>
      </Router>
    );

  }

}

export default App;

