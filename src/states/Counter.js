export default {
  counter: 0,
  getNextCounter() {
    this.counter = this.counter + 1;
    return this.counter;
  },
  setCounter(startNumber) {
    this.counter = startNumber;
  },
  getCurrentCounter() {
    return this.counter;
  },
};
