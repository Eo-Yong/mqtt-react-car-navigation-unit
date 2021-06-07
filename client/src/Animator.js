import React, { Component } from 'react'
import Queue from './Queue'
import Buttons from './Buttons'

export default class Animator extends Component {

  constructor(props) {
    super(props)
    this.queue = new Queue()
    this.vehicles = this.props.vehicles
    this.path = [];
    this.addVehicle = false;
  }

  animate() {
    if (!this.queue.isEmpty()) {
      this.processNextEvent()
    }
    this.vehicles.advance()
    requestAnimationFrame(() => this.animate())
  }

  nextEventTimestamp() {
    const nextEvent = this.queue.peek()
    if (nextEvent != null) {
      return new Date(nextEvent["at"])
    } else {
      return null
    }
  }

  processNextEvent() {
    this.lastEventTimestamp = this.nextEventTimestamp()
    const event = this.queue.poll()

    this.path.push(event["route"]);

    //console.log(JSON.stringify(this.path));
    if(this.addVehicle === false) {
      this.addVehicle = this.vehicles.addVehicle("car01", "토르 드라이브", [event["route"][0], event["route"][1]])
    } else {
      const id = "car01";
      if (this.path.length === 2) {
        this.vehicles.addRouteToVehicle(id, this.path);
        this.path.shift();
      }
    }


    // if (event["event"] === "shift_start" && this.addVehicle === false) {
    //   this.addVehicle = this.vehicles.addVehicle("car01", "토르 드라이브", [event["route"][0], event["route"][1]])
    // } else {
    //   const id = "car01";
    //   this.path.push(event["route"]);

    //   if (this.path.length === 2) {
    //     this.vehicles.addRouteToVehicle(id, this.path);
    //     this.path.shift();
    //   }
    // }
  }

  startSimulation() {
    this.queue.clear()
    this.vehicles.clearAll()
    this.startTime = null
    //this.stats.resetState()
    this.animate(this.vehicles)
  }

  q() {
    return this.queue
  }

  render() {
    return (
      <div>
        <Buttons animator={this} />
      </div>
    )
  }
}
