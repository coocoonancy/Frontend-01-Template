const http = require('http');
const fs = require('fs');
let filename = './animation.js.png';
fs.stat(filename, (err, stats) => {
  const options = {
    hostname: 'localhost',
    port: 8081,
    path: '/?filename=animation.js.png',
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
      'Content-Length': stats.size
    }
  };
  const req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
  });
  req.on('error', (e) => {
    console.error(`problem with request: ${e.message}`);
  });
  const stream = fs.createReadStream('./animation.js.png');
  stream.pipe(req);
  stream.on('end', () => {
    req.end();
  })
});