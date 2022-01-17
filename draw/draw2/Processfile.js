// import * as fs from 'fs';
const fs = require('fs');



module.exports = class ProcessFile {
  constructor() {
    this.ht = {};
    this.n = 0;
  }
  /*
     process(key, value) {
      console.log(key + ' : ' + value);
    }
  */

  process2(v) {
    this.n++;
    console.log(this.n);
    console.log(v);
    this.ht[this.n] = v;
    return this.n;
  }

  traverse(o) {
    // var l = func.apply(this, [this, o]);
    this.process2(o);
    console.log('------');

    if (Array.isArray(o)) {
      for (var i = 0; i < o.length; i++) {
        var v = o[i];
        this.traverse(v);
      }
    } else if (typeof (o) == 'object') {
      var type = o['type'];
      if (type === 'Script' || type === 'CompoundList' || type === 'Pipeline')
        this.traverse(o['commands']);
      else if (type === 'If') {
        // then

        // else
      } else if (type === 'Command')
        this.process2(o);
    }
  }

  readfile() {
    var rawdata = fs.readFileSync('terad-output.json');
    return JSON.parse(rawdata);
  }

  processfile() {
    let x = this.readfile();
    this.traverse(x);
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
/*
 var t=require('./Processfile.js');
 var tt=new t.Processfile();
 tt.getElements()
*/
// module.exports = Processfile
/*
var p = new ProcessFile();
for (var l in p.getElements()) {
  console.log(l);
}
console.log('das');
*/
