const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const getLocalIp = require('./localIP');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(express.static(path.resolve(__dirname, './mockStatic')));

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Credentials', true);
    next();
});

let baseRoot = './mockData'; // mock数据文件夹路径

app.get('/imgcode/getCaptchaBase64', (req, res) => {
    console.log('method:', req.method);
    console.log('url:', req.originalUrl);
    console.log('params:', req.body, '\n');
    res.send(require(`${baseRoot}/captcha`)());
});

app.get('/layout', (req, res) => {
    console.log('method:', req.method)
    console.log('url:', req.originalUrl)
    console.log('params:', req.body, '\n')
    res.send(require(`${baseRoot}/layout`)())
})

app.get('/dynamic', (req, res) => {
    console.log('method:', req.method)
    console.log('url:', req.originalUrl)
    console.log('params:', req.body, '\n')
    res.send(require(`${baseRoot}/dynamic`)())
})

app.get('/info', (req, res) => {
    console.log('method:', req.method)
    console.log('url:', req.originalUrl)
    console.log('params:', req.body, '\n')
    res.send(require(`${baseRoot}/info`)())
})

let server = app.listen(9992, () => {
    let port = server.address().port;
    console.log('Mock Server Running Successfully...');
    console.log(`server listening at http://${getLocalIp()}:${port}`);
});
