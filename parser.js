const util = require('util');
const parse = require('bash-parser');
const fs = require('fs')


const args = process.argv

fs.readFile(args[2], 'utf8', (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const ast = parse(data);
  // console.log(util.inspect(ast, {depth: null}));
  let output = JSON.stringify(ast, null, 2);
  fs.writeFileSync(args[2] + '-output.json', output);
})
