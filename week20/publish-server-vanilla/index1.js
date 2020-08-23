const http = require('http');
const https = require('https');
const fs = require('fs');
const unzip = require('unzipper');
const server = http.createServer((req, res) => {
    if (req.url.match(/^\/auth/)) {
        return auth(req, res);
    }
    if (!req.url.match(/^\/?/)) {
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('error q');
        return;
    }
    // let matched = req.url.match(/filename=([^&]+)/);
    // let filename = matched && matched[1];
    // if (!filename) return;
    // let writeStream = fs.createWriteStream('../server/public/' + filename);
    let writeStream =  unzip.Extract({ path: '../server/public/' });
    req.pipe(writeStream);
    req.on('end', (e) => {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('okay');
    });
});
function auth(req, res) {
    let code = req.url.match(/code=([^&]+)/)[1];
    let state = '';
    let client_id = '';
    let client_secret = '';
    let redirect_uri = '';
    let params = `code=${code}&state=${state}&client_id=${client_id}&client_secret=${client_secret}&redirect_uri=${redirect_uri}`;
    const https = require('https');
    const options = {
      hostname: 'github.com',
      port: 443,
      path: `/login/oauth/access_token?${params}`,
      method: 'POST'
    };
    
    const reqs = https.request(options, (res) => {
    //   console.log('statusCode:', res.statusCode);
    //   console.log('headers:', res.headers);
    
      res.on('data', (d) => {
        // process.stdout.write(d);
        let result = d.toString().match(/acesss_token=([^&]+)/);
        if (result) {
            let acesss_token = result[1];
            res.writeHead(200, {
                'Content-Type': 'text/plain',
                acesss_token: acesss_token
            });
            res.end('okay');
        } else {
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('error');
        }
      });
    });
    
    reqs.on('error', (e) => {
      console.error(e);
    });
    reqs.end();
}
server.listen(8081);