const fs = require('fs')
const path = require('path')

function clean(dirname) {
  let files = [];
  if (fs.existsSync(dirname)) {
    files = fs.readdirSync(dirname);
    files.forEach(function (file) {
      let curPath = dirname + '/' + file;
      if (fs.statSync(curPath).isDirectory()) {
        deleteFolder(curPath);
      } else {
        fs.unlinkSync(curPath);
      }
    });
    fs.rmdirSync(dirname);
  }
}

try {
  clean(path.resolve(__dirname, '../lib'))
  clean(path.resolve(__dirname, '../assets'))
  clean(path.resolve(__dirname, '../style'))
} catch (err) {
  console.log(err);
}
