import React, { Component } from 'react'
import Dateformat from 'dateformat'

export default class Stats extends Component {

  constructor(props) {
    super(props)
    this.state = {}
  }

  resetState() {
    this.setState({})
  }

  updateTimes(absoluteTime, realTimePassed) {
    this.setState({
      currentTime: "Time: " + Dateformat(absoluteTime, "yyyy-mm-dd HH:MM:ss"),
      simulated: "Simulated: " + Math.floor(realTimePassed * process.env.REACT_APP_SPEED_FACTOR / (1000 * 60)) + " minutes",
      duration: "Simulated in: " + Math.floor(realTimePassed / 1000) + " seconds"
    })
  }

  render() {
    return (
      <div className='stats'>
        <span>
          {this.state.currentTime} <br />
          {this.state.simulated} <br />
          {this.state.duration}
        </span>
      </div>
    )
  }
}
