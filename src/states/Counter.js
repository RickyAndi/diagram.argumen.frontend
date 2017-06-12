 /* eslint-disable */
export default {
  counter: 0,
  getNextCounter() {
    this.counter++;
    return this.counter;
  },
  setCounter(startNumber) {
    this.counter = startNumber;
  },
  getCurrentCounter() {
    return this.counter;
  }
}