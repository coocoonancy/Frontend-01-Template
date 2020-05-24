const net = require('net');
// const parser = require('./parser.js');
// const render = require('./render.js');
// const images = require('images');

class Request {
    constructor(options) {
        let { host, port, method, path, body, headers } = options
        this.host = host;
        this.port = port || '80';
        this.method = method || 'GET';
        this.path = path || '/';
        this.body = body || {};
        this.headers = headers || {};
        if (!this.headers['Content-Type']) {
            this.headers['Content-Type'] = 'application/x-www-form-urlencoded';
            this.bodyText = Object.keys(this.body).map(key => `${key}=${encodeURIComponent(this.body[key])}`).join('&');
        }
        else if (this.headers['Content-Type'] === 'application/json')
            this.bodyText = JSON.stringify(this.body);
        this.headers['Content-Length'] = this.bodyText.length;
    }
    toString() {
        return `${this.method} ${this.path} HTTP/1.1\r
${Object.keys(this.headers).map(key => `${key}: ${this.headers[key]}`).join('\r\n')}\r
\r${this.bodyText}\r\n`
    }
    send(connection) {
        return new Promise((resolve, reject) => {
            const parser = new ResponseParser();
            if (connection) {
                connection.write(this.toString);
            } else {
                const client = net.createConnection({
                    host: this.host,
                    port: this.port
                }, () => {
                    client.write(this.toString());
                });
                client.on('data', data => {
                    // console.log(data.toString());
                    parser.receive(data.toString());
                    // console.log(parser.statusLine);
                    if (parser.isFinished) resolve(parser.response);
                    client.end();
                });
                client.on('end', () => {
                    console.log('connected from server');
                });
                client.on('error', (err) => {
                    console.log('connected from server error');
                    reject(err);
                    client.end();
                })
            }
        })
    }
}

class Response {
    
}

class ResponseParser {
    constructor() {
        this.WATING_STATUS_LINE = 0;
        this.WATING_STATUS_LINE_END = 1;
        this.WATING_HEADER_NAME = 2;
        this.WAITING_HEADER_SPACE = 3;
        this.WATING_HEADER_VALUE = 4;
        this.WATING_HEADER_LINE_END = 5;
        this.WATING_HEADER_BLOCK_END = 6;
        this.WAITING_BODY = 7;
        this.bodyParser = null;

        this.current = this.WATING_STATUS_LINE;
        this.statusLine = '';
        this.headers = {};
        this.headerName = '';
        this.headerValue = '';
    }
    receive(str) {
        for (let i = 0; i < str.length; i++) {
            console.log('str', str.charAt(i));
            this.receiveChar(str.charAt(i));
        }
    }
    receiveChar(char) {
        if (this.current === this.WATING_STATUS_LINE) {
            if (char === '\r') this.current === this.WATING_STATUS_LINE_END;
            else this.statusLine += char;
        } else if (this.current === this.WAITING_STATUS_LINE_END) {
            if (char === '\n') {
              this.current = this.WAITING_HEADER_NAME;
            }
        } else if (this.current = this.WAITING_HEADER_NAME) {
            if (char === ':') {
                this.current = this.WAITING_HEADER_SPACE;
            } else if (char === '\r') {
                this.current = this.WATING_HEADER_BLOCK_END;
                if (this.headers['Transfer-Encoding'] === 'chunked') {
                  this.bodyParser = new TrunkedBodyParser();
                }
            } else {
                this.headerName += char;
            }
        } else if (this.current = this.WAITING_HEADER_SPACE) {
            if (char === ' ') {
                this.current = this.WATING_HEADER_VALUE;
            }
        } else if (this.current = this.WATING_HEADER_VALUE) {
            if (char = '\r') {
                this.current = this.WATING_HEADER_LINE_END;
                this.headers[this.headerName] = this.headerValue;
                this.headerValue = '';
                this.headerName = '';
            } else {
                this.headerValue += char;
            }
        } else if (this.current = this.WATING_HEADER_LINE_END) {
            if (char = '\n') {
                this.current = this.WATING_HEADER_NAME
            }
        } else if (this.current = this.WATING_HEADER_BLOCK_END) {
            this.current = this.WAITING_BODY;
        } else if (this.current = this.WAITING_BODY) {
            this.bodyParser.receiveChar(char);
        }
    }
    get isFinished() {
        return this.bodyParser && this.bodyParser.isFinished;
    }
    get response() {
        this.statusLine.match(/HTTP\/1.1 ([0-9]+) ([\s\S]+)/);
        return {
            statusCode: RegExp.$1,
            statusText: RegExp.$2,
            headers: this.headers,
            body: this.bodyParser.content.join('')
        }
    }
}

class TrunkedBodyParser {
    constructor() {
        this.WAITING_LENGTH = 0;
        this.WAITING_LENGTH_LINE_END = 1;
        this.READING_TRUNK = 2;
        this.WAITING_NEW_LINE = 3;
        this.WAITING_NEW_LINE_END = 4;
        this.length = 0;
        this.content = [];
        this.isFinished = false;
        this.current = this.WAITING_LENGTH;
    }
    receiveChar(char) {
        if (this.current = this.WAITING_LENGTH) {
            if (char === '\r') {
                if (this.length === 0) {
                    this.isFinished = true;
                }
                this.current = this.WAITING_LENGTH_LINE_END;
            } else {
                this.length *= 16;
                this.length += parseInt(char, 16);
            }
        } else if (this.current = this.WAITING_LENGTH_LINE_END) {
            if (char === '\n') {
                this.current = this.READING_TRUNK;
            }
        } else if (this.current = this.READING_TRUNK) {
            this.content.push(char);
            this.length--;
            if (this.length === 0) {
                this.current = this.WAITING_NEW_LINE;
            }
        } else if (this.current = this.WAITING_NEW_LINE) {
            if (char === '\r') {
                this.current = this.WAITING_NEW_LINE_END;
            }
        } else if (this.current = this.WAITING_NEW_LINE_END) {
            if (char === '\n') {
                this.current = this.WAITING_LENGTH;
            }
        }
    }
}
void (async function() {
    let req = new Request({
        host: '127.0.0.1',
        port: '8080',
        path: '/',
        body: {
            name: 'coocoonancy',
            love: 'code'
        },
        headers: {
            'X-Foo2': 'Bar'
        }
    });
    let res = await req.send();
    console.log('res', res);
})();
// const client = net.createConnection({
//     host: 'localhost',
//     port: '8080'
// }, () => {
//     let req = new Request({
//         host: '127.0.0.1',
//         port: '8080',
//         body: {
//             name: 'coocoonancy',
//             love: 'code'
//         },
//         headers: {
//             'X-Foo2': 'Bar'
//         }
//     });
//     console.log(req.toString());
//     client.write(req.toString());
// });
// client.on('data', data => {
//     client.end();
// });
// client.on('end', () => {
//     console.log('connected from server');
// })