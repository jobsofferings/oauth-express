import express = require('express');
import path = require('path');
import bodyParser = require('body-parser');

const port = 3001;
const ALLOW_ORIGIN_LIST = ['http://localhost.meetwhale.com:3000', 'http://localhost:3000'];
const BASIC_URL = `http://localhost:${port}/`

const app: express.Application = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.all('*', function (req, res, next) {
  if (ALLOW_ORIGIN_LIST.includes(req.headers.origin || '')) {
    res.header('Access-Control-Allow-Origin', req.headers.origin); // 当允许携带cookies此处的白名单不能写’*’
    res.header('Access-Control-Allow-Headers', 'content-type,Content-Length, Authorization,Origin,Accept,X-Requested-With'); // 允许的请求头
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT'); // 允许的请求方法
    res.header('Access-Control-Allow-Credentials', 'true');
  }
  next();
});

app.post('/test_req', (req: any, res) => {
  console.log(req.body)
  console.log(req.query)
  console.log(req.params)
  console.log(req.headers)
  console.log(req.ip)
  res.send({
    msg: 'success',
    code: 200
  })
})
app.use((error: Error, req: any, res: any, next: Function) => {
  res.json({
    code: 10001,
    error
  })
})

app.listen(port, function () {
  console.info(`listening on port ${port}!`);
});

module.exports = app;