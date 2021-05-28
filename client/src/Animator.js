import React, { Component } from 'react'
import Queue from './Queue'
import Buttons from './Buttons'

export default class Animator extends Component {

  constructor(props) {
    super(props)
    this.queue = new Queue()
    this.vehicles = this.props.vehicles
    this.path = [];
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
    if (event["event"] === "shift_start") {
      this.vehicles.addVehicle("car01", "토르 드라이브", [event["route"][0], event["route"][1]])
    } else {
      const id = "car01";
      this.path.push(event["route"]);

      //console.log(typeof event["route"]);
      console.log(this.path);

      // if (this.path.length === 2) {
      this.vehicles.addRouteToVehicle(id, this.path);
      this.path = [];
      // }
      
    }

    // if (event["event"] === "shift_start") {
    //   const loc = event["location"]  
    //   this.vehicles.addVehicle(event["id"], event["label"], [loc["lat"], loc["lng"]])
    // } else if (event["event"] === "passenger_request") {
    //   const id = event["vehicle_id"]
    //   this.vehicles.addRouteToVehicle(id, event["route"])
    //   for (let taskId in event["tasks"]) {
    //     const task = event["tasks"][taskId]
    //     this.vehicles.addTaskToVehicle(id, task["type"], task["booking_id"], 
    //       [task["location"]["lat"], task["location"]["lng"]])
    //   }
    // } else if (event["event"] === "task") {
    //   this.vehicles.removeTask(event["vehicle_id"], event["type"], event["booking_id"])
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
