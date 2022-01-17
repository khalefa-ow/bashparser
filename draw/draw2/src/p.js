// import * as fs from 'fs';
const fs = require('fs');


function process(obj, v) {
  obj.n++;
  console.log(v);
  obj.ht[obj.n] = v;
  return obj.n;
}

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

var p = new ProcessFile();
for (var l in p.getElements()) {
  console.log(l);
}
console.log('das');
