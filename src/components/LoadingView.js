import React, { Component } from 'react'
import '../styles/LoadingDots.css'

export default class LoadingView extends Component {
  render() {
    
    return (
      <div className="LoadingDots">
          <div className="dot1"></div>
          <div className="dot2"></div>
          <div className="dot3"></div>
          <div className="dot4"></div>
        </div>
    )
  }
}
