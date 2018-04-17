const express = require('express')
const bodyParser = require('body-parser')
const fs = require('fs')
const jwt = require('jsonwebtoken')
const _ = require('lodash')
const multer = require('multer')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    let filename = file.originalname.split('.')
    cb(null, filename[0] + '-' + Date.now() + '.' + filename[1])
  }
})
let upload = multer({ storage: storage })

const app = express()

app.use(express.static('./'));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.all('*', function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.post('/dsp-admin/user/login', (req, res) => {
  let obj = {
    code: 1,
    msg: '用户名或密码输入有误'
  }
  console.log(req.body)
  let userData = fs.readFileSync(__dirname + '/userInfo.json') + ''
  userData = JSON.parse(userData)
  userData.forEach((item, i) => {
    if (item.user === req.body.user && item.ps === req.body.ps) {
      Object.assign(obj, {
        code: 0,
        msg: '登录成功',
        userInfo: item,
        token: jwt.sign(req.body, '鲁攀峰', {
          expiresIn: 60 * 60
        })
      })
    }
  })
  res.send(obj)
})

app.post('/dsp-creative/creative/upload', upload.single('file'), (req, res) => {
  res.send({
    "data": {
      "size": req.file.size,
      "value": req.file.path,
      "key": "2A36B67C6"
    },
    "status": 0
  }
  )
})

app.post('/dsp-creative/creative/up', (req, res) => {
  let obj = {
    code: 1,
    msg: '上传失败'
  }
  let data = JSON.parse(fs.readFileSync(__dirname + '/creatives.json', { encoding: "utf-8" }))
  if (data[req.body.user]) {
    data[req.body.user].push(req.creative)
  } else {
    data[req.body.user] = [req.creative]
  }
  fs.writeFile(__dirname + '/creatives.json', JSON.stringify(data), (err) => {
    if (!err) {
      Object.assign(obj, {
        code: 0,
        msg: '上传成功'
      })
    } 
    console.log('what')
    res.send(obj)
  })
  
})

app.listen(9999, () => console.log('listening port 9999'))