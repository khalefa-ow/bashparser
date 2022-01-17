// import * as fs from 'fs';
const fs = require('fs');

class ProcessFile {
  constructor() {
    var ht = {};
    var n = 0;
  }
  /*
     process(key, value) {
      console.log(key + ' : ' + value);
    }
  */
  process(v) {
    this.n++;
    console.log(v);
    this.ht[this.n] = v;
    return this.n;
  }

  traverse(o, func) {
    var l = func.apply(this, [o]);
    console.log('------');

    if (Array.isArray(o)) {
      for (var i = 0; i < o.length; i++) {
        var v = o[i];
        this.traverse(v, func);
      }
    } else if (typeof (o) == 'object') {
      var type = o['type'];
      if (type === 'Script' || type === 'CompoundList' || type === 'Pipeline')
        this.traverse(o['commands'], func);
      else if (type === 'If') {
        // then

        // else
      } else if (type === 'Command')
        func.apply(this, [o]);
    }
  }

  readfile() {
    var rawdata = fs.readFileSync('terad-output.json');
    return JSON.parse(rawdata);
  }

  processfile() {
    let x = this.readfile();
    this.traverse(x, process);
    return this.ht;
  }

  getElements() {
    this.processfile();
    var arr = [];
    var n = 0;
    for (var x in this.ht) {
      var m = {};
      m['id'] = n++;
      m['data'] = x;
      arr.push(m);
      console.log(m);
    }

    return arr;
  }
}


for (var x in ProcessFile.getElements()) {
  console.log(x);
}