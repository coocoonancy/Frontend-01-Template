const http = require('http');
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'Bar');
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end('OK');
});
server.listen('8080');