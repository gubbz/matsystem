import React, { Component } from 'react'
import '../styles/TodayInfo.css'


export default class TodayInfo extends Component {
  render() {
    return (
      <div className="TodayItem">
        <p>{this.props.headline}</p>
        <p>{this.props.info}</p>
      </div>
    )
  }
}
