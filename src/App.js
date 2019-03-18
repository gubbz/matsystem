import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header.js';
import MainContainer from './components/MainContainer.js';
import Meals from './components/Meals.js';
import TodayGrid from './components/TodayGrid.js'
import Planning from './components/Planning.js'
import Statistics from './components/Statistics.js'
import socketIOClient from 'socket.io-client'

class App extends Component {

  constructor() {
    super();

    /*
    this.state = {
      endpoint: "https://matsystem.herokuapp.com/"
    };
    */
  }

  send = (socket) => {
    console.log("send")
  }

  render() {
    console.log("render");
    //const socket = socketIOClient("localhost:8080");
    const socket = socketIOClient();

    socket.on('vote', (typeOfVote) => {
      console.log(typeOfVote)
    })

    socket.on('msg', (txt) => {
      console.log(txt)
    })
    return (
      <Router>
        <div>
          <Header />
          <Route exact path="/" component={TodayGrid}/>
          <Route path="/today" component={TodayGrid}/>
          <Route path="/planning" component={Planning}/>
          <Route path="/planning" component={Planning} />
          <Route path="/statistics" component={Statistics} />
          <Route path="/meals" component={Meals} />
        </div>
      </Router>
    );

  }

}


export default App;
