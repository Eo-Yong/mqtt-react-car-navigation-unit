import React, { Component } from 'react'
import WebsocketInput from './WebsocketInput'

export default class Buttons extends Component {

  constructor(props) {
    super(props);
    this.connectAndStartSimulation = this.connectAndStartSimulation.bind(this)
    this.startSimulation = this.startSimulation.bind(this)
  }

  startSimulation() {
    this.props.animator.startSimulation()
    this.mqtt.sendMessage('start_simulation')
  }

  connectAndStartSimulation() {
    if (this.mqtt != null) {
      this.mqtt.close()
    }
    this.mqtt = new WebsocketInput(this.props.animator.q(), this.startSimulation)
  }

  render() {
    return (
      <div className='overlay'>
        <button onClick={this.connectAndStartSimulation}>
          Start Simulation
        </button>
      </div>
    )
  }
}
