import React, { Component } from 'react'
import Animator from './Animator';
import Vehicle from './Vehicle';
import Layers from './Layers';

export default class Vehicles extends Component {

  constructor(props) {
    super(props)
    this.vehicles = {}
  }

  componentWillReceiveProps(nextProps) {
    if (this.layers == null && nextProps.map != null) {
      this.layers = new Layers(nextProps.map)
    }
  }

  advance() {
    for(let id in this.vehicles) {
      const vehicle = this.vehicles[id]
      vehicle.advance()
    }
  }

  addVehicle(id, name, location) {
    const vehicle = new Vehicle(id, name, this.layers)
    //const isFirst = Object.keys(this.vehicles).length === 0
    vehicle.addVehicleToMap(location)
    this.vehicles[id] = vehicle
    /*if (isFirst) {
      this.props.map.jumpTo({ center: location, zoom: 11 })
    }*/
    return true;
  }

  addRouteToVehicle(id, coords) {
    const vehicle = this.vehicles[id]
    vehicle.addRouteToVehicle(coords)
  }

  addTaskToVehicle(id, type, bookingId, coords) {
    const vehicle = this.vehicles[id]
    vehicle.addTaskToMap(type, bookingId, coords)
  }

  // removeTask(vehicleId, type, bookingId) {
  //   const vehicle = this.vehicles[vehicleId]
  //   vehicle.removeTask(type, bookingId)
  // }

  clearAll() {
    this.vehicles = {}
    this.layers.clearAll()
  }

  render() {
    return (
      <div>
        <Animator vehicles={this} />
      </div>
    );
  }
}
