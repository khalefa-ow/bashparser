module.exports = class Test {
  constructor(size) {
    this.map = new Map();
    this.size = size;
  }

  get(key) {
    return this.map.get(key);
  }

  length() {
    return this.map.size;
  }
}
// var Test= require('./Test.js');
// var test = new Test(1);
