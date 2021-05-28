export default class Queue {

  constructor() {
    this.q = []
  }

  offer(elem) {
    this.q.push(elem)
  }

  poll() {
    return this.q.shift();
  }

  peek() {
    return this.q[0];
  }

  isEmpty() {
    return this.q.length === 0
  }

  clear() {
    this.q = []
  }

}
