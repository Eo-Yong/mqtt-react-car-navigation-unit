import Mqtt from 'mqtt';

export default class WebsocketInput {

  constructor(queue, onOpenCallback) {
    this.queue = queue
    this.mqtt = Mqtt.connect('ws://localhost:9001')

    this.mqtt.on('message', function(topic, message) {
      queue.offer(JSON.parse(message))
    })

    this.mqtt.on('connect', function() {
      this.subscribe("THOR_VEHICLE_DRIVING_INFO");
      onOpenCallback()
    })
  }

  sendMessage(msg) {
    this.mqtt.publish('start_simulation', msg)
  }

  close() {
    //console.log("close function activated..")
    this.mqtt.end();
  }
}