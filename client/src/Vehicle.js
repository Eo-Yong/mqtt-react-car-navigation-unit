import turf from 'turf'

export default class Vehicle {

  constructor(id, name, layers) {
    this.id = id
    this.name = name
    this.route = null
    //this.color = this.getRandomColor()
    this.layers = layers
  }

  addVehicleToMap(locationCoords) {
    const vehicleId = "vehicle" + this.id
    this.location = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": locationCoords
      },
      "properties": {
        "title": this.name
      }
    }
    this.layers.addVehicle(vehicleId, this.location)
  }

  addTaskToMap(taskType, bookingId, locationCoords) {
    const taskId = "task" + taskType + bookingId
    const name = bookingId.substring(0, 6)
    let icon = "police"
    if (taskType === "dropoff") {
      icon = "star"
    }
    const location = {
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": locationCoords
      },
      "properties": {
        "title": name,
        "icon": icon
      }
    }
    this.layers.addTask(taskId, location)
  }

  addRouteToVehicle(coords) {
    this.timeAdded = new Date().getTime()
    const routeId = "route" + this.id
    if (this.route != null) {
      this.layers.removeRoute(routeId)
      }
      this.route = {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": coords
        }
      }
      const lineDistance = turf.lineDistance(this.route, 'kilometers')
      const arc = []
      for (let i = 0; i < lineDistance * 1000; i++) {
        const segment = turf.along(this.route, lineDistance * i / (lineDistance * 1000), 'kilometers')
        arc.push(segment.geometry.coordinates)
      }
      this.route.geometry.coordinates = arc
      this.layers.addRoute(routeId, this.route)
  }

  // removeTask(type, bookingId) {
  //   const taskId = "task" + type + bookingId
  //   this.layers.removeTask(taskId)
  // }

  advance() {
    if (this.route != null) {
      const vehicleId = "vehicle" + this.id
      const actualTimePassed = new Date().getTime() - this.timeAdded
      // move the car 25 km/h and multiply that with the speedFactor
      const position = 80 * actualTimePassed * 25 / 36000
      const coordinates = this.route.geometry.coordinates

      if (position < coordinates.length) {
        this.location.geometry.coordinates = coordinates[Math.floor(position)]
        this.layers.updateElementOnMap(vehicleId, this.location)
      } else {
        const routeId = "route" + this.id;
        this.layers.removeRoute(routeId)
        this.route = null;
      }
    }
  }

  // getRandomColor() {
  //   const letters = '0123456789ABCDEF'.split('');
  //   let color = '#';
  //   for (let i = 0; i < 6; i++ ) {
  //     color += letters[Math.floor(Math.random() * 16)];
  //   }
  //   return color;
  // }

}
