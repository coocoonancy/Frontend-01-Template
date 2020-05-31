const http = require('http');
const server = http.createServer((req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('X-Foo', 'Bar');
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(`<html lang="en">
    <head>
        <style>
            body div #myid {
                width: 100px;
                background: pink;
            }
            body div img {
                width: 30px;
                background: green;
            }
        </style>
    </head>
    <body>
        <div>
            <img id="myid">
            <img />
        </div>
    </body>
</html>`);
});
server.listen('8080');