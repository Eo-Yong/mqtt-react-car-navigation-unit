export default class Layers {

  constructor(map) {
    this.map = map
    this.vehicleOrder = []
    this.taskOrder = []
    this.routeOrder = []
  }

  addVehicle(vehicleId, location) {
    this.map.addSource(vehicleId, {
      "type": "geojson",
      "data": location
    })
    this.map.addLayer({
      "id": vehicleId,
      "source": vehicleId,
      "type": "symbol",
      "layout": {
        "icon-image": "car-15",
        "text-field": "{title}",
        "text-size": 10,
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.5],
        "text-anchor": "top"
      }
    })
    this.vehicleOrder.push(vehicleId)
  }

  addTask(taskId, location) {
    this.map.addSource(taskId, {
      "type": "geojson",
      "data": location
    })
    const layer = {
      "id": taskId,
      "source": taskId,
      "type": "symbol",
      "layout": {
        "icon-image": "{icon}-11",
        "text-field": "{title}",
        "text-size": 9,
        "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
        "text-offset": [0, 0.5],
        "text-anchor": "top"
      }
    }
    this.taskOrder.push(taskId)
    this.addLayerBelow(layer, this.vehicleOrder, null)
  }

  addRoute(routeId, coords) {
    this.map.addSource(routeId, {
      "type": "geojson",
      "data": coords
    })
    const layer = {
      "id": routeId,
      "source": routeId,
      "type": "line",
      "paint": {
        "line-width": 0,
        "line-color": '#3399FF'
      }
    }
    this.routeOrder.push(routeId)
    this.addLayerBelow(layer, this.taskOrder, this.vehicleOrder)
  }

  addLayerBelow(layer, array1, array2) {
    let belowLayer = null;
    if (array1 != null && array1.length > 0) {
      belowLayer = array1[0]
    }
    if (belowLayer == null && array2 != null && array2.length > 0) {
      belowLayer = array2[0]
    }
    if (belowLayer != null) {
      this.map.addLayer(layer, belowLayer)
    } else {
      this.map.addLayer(layer)
    }
  }

  updateElementOnMap(id, location) {
    this.map.getSource(id).setData(location)
  }

  removeVehicle(vehicleId) {
    this.removeLayerFromMap(vehicleId, this.vehicleOrder)
  }

  // removeTask(taskId) {
  //   this.removeLayerFromMap(taskId, this.taskOrder)
  // }

  removeRoute(routeId) {
    this.removeLayerFromMap(routeId, this.routeOrder)
  }

  removeLayerFromMap(entityId, array) {
    const index = array.indexOf(entityId)
    array.splice(index, 1)
    this.map.removeLayer(entityId)
    this.map.removeSource(entityId)
  }

  clearAllFromArray(array) {
    while (array.length > 0) {
      this.removeLayerFromMap(array[0], array)
    }
  }

  clearAll() {
    this.clearAllFromArray(this.vehicleOrder)
    this.clearAllFromArray(this.taskOrder)
    this.clearAllFromArray(this.routeOrder)
  }

}
