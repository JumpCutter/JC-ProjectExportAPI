const fs =   require('fs');
const path = require('path');

const USAGE = "Usage: node cp.js [SOURCE_FILE] [DESTINATION_DIR]\n";

const args = process.argv.slice(2);

if(args.length != 2){
  console.error(USAGE);
  throw new SyntaxError();
}
const src = args[0];
const dest = args[1];

if(src.includes("*") || dest.includes("*")){
  throw new SyntaxError("globbing is not supported");
}



if(!(fs.existsSync(src) && fs.statSync(src).isFile())){
  throw new TypeError(`${src} is not a file`);
}

if(!(fs.existsSync(dest) && fs.statSync(dest).isDirectory())){
  throw new TypeError(`${dest} is not a directory`);
}

fs.copyFileSync(src, path.join(dest, path.basename(src)));
