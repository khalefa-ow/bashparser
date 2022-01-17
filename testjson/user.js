export default class User {
  constructor(n, a) {
    this.name = n;
    this.age = a;
  }

  get_name() {
    return this.name;
  }

  get_age() {
    return this.age;
  }
}

/*


var User= require('./user.js');
var test = new User("hi",1);
*/