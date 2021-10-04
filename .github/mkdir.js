const fs = require('fs');

const WARNINGS_ON = true;

const USAGE = "Usage: node mkdir.js [DIR_NAME]\n";

const args = process.argv.slice(2);

if(args.length != 1){
  console.error(USAGE);
  throw new SyntaxError();
}
const dir = args[0];

if(dir.includes("*")){
  throw new SyntaxError("globbing is not supported");
}

if(fs.existsSync(dir)){
  if(fs.statSync(dir).isFile()){
    throw new Error(`${dir} is a file`);
  }
  fs.statSync(dir).isDirectory() && WARNINGS_ON && console.warn(`${dir} already exists, doing nothing`);
  return;
}

fs.mkdirSync(dir);
