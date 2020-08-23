const http = require('http');
const fs = require('fs');
const archiver = require('archiver');
const child_process = require('child_process');
let packname = './package';
const options = {
  hostname: 'localhost',
  port: 8081,
  path: '/?filename=package.zip',
  method: 'POST',
  headers: {
    'Content-Type': 'application/octet-stream'
  }
};
const req = http.request(options, (res) => {
  console.log(`STATUS: ${res.statusCode}`);
  console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
});
req.on('error', (e) => {
  console.error(`problem with request: ${e.message}`);
});
const archive = archiver('zip', {
  zlib: { level: 9 }
});
archive.directory(packname, false);
archive.pipe(fs.createWriteStream('/package.zip'));
archive.on('end', () => {
  console.log('Data has been drained');
  req.end();
  let redirect_uri = encodeURIComponent('http://localhost:8081/auth');
  let code = '';
  let state = '';
  let client_id = 'Iv1.30cddfdbec9fab28';
  let client_secret = '80606a1d0de5f5c97d6146afd789ce2e841d9291';
  let redirect_uri = '';
  child_process.exec(`open https://github.com/login/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_uri}&state=abc123`)
});
archive.finalize();

archive.pipe(req);  
archive.on('end', () => {
  req.end();
})