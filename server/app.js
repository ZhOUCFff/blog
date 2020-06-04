const express = require('express')
const cors = require('cors')
require('express-async-errors')
const app = express()

app.set('secret', 'zhoucf19970601')

// 允许跨域
app.use(cors())
//将请求体转为json对象
app.use(express.json())

app.use('/blog/back', express.static(__dirname + '/admin'))

// 连接数据库
const db = require('./plugins/db')()

// 后台接口
require('./routes/admin/login')(app, db)
require('./routes/admin/index')(app, db)

// 前台接口
require('./routes/blog/index')(app, db)

// 监听服务器其他错误
app.use(async (err, req, res, next) => {
  if (!err.statusCode) return res.status(500).send({ message: err.message })

  res.status(err.statusCode).send({
    message: err.message,
  })
})

app.listen(3005, () => {
  console.log('http://localhost:3005')
})
