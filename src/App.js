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
import socketIOClient from 'socket.io-client'

const socketURL = "localhost:8080";
class App extends Component {

  constructor() {
    super();
    this.chartElement = React.createRef();
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.state = {
      vGood: 2,
      good: 2,
      bad: 2,
      vBad: 2,
      socket: null,
      yeet: "yeet",
      sideBarState: false,
    };

  }

  componentWillMount() {
    this.initSocket()
  }

  initSocket = () => {
    const socket = socketIOClient(socketURL);
    socket.on('connect', () => {
      console.log("Connected");
      socket.emit('msg', "HELLO SERVER")
    })
    socket.on('vote', (typeOfVote) => {
      var url = window.location.toString();
      
      if (url.substring(url.lastIndexOf("/")) === "/" || url.substring(url.lastIndexOf("/")) === "/today") {
        console.log("röst mottagen " + typeOfVote); 
        this.chartElement.current.updateChart(typeOfVote);
      }

    })

    socket.on('msg', (txt) => {
      console.log(txt)
    })

    this.setState({ socket });
  }

  toggleSidebar() {
    var toggle = !this.state.sideBarState;
    this.setState({
      sideBarState: toggle,
    });
  }

  render() {
    return (
      <Router>
        <div className="Container">
          <Header 
            click={this.toggleSidebar}
          />
          <Sidebar 
            isVisible={this.state.sideBarState}
            click={this.toggleSidebar}
          />
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
          <Route path="/admin/" exact component={Planning} />
          <Route path="/admin/question" exact component={QuestionView} />
        </div>
      </Router>
    );

  }

}
export default App;