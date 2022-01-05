const util = require('util');
const parse = require('bash-parser');
const fs = require('fs')


const args = process.argv
console.log(args[2])
fs.readFile(args[2], 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const ast = parse(data);
  console.log(util.inspect(ast, {depth: null}));
})
