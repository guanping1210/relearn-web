const express = require('express')
const bodyParser = require('body-parser')

// use 用来做中间件的一些操作
// app.use(bodyParser.json())

const app = express()

// 接口路由 --> get/post/delete
app.get('/', function(req, res) {
  res.send('hello222 world444')
})

app.get('/api/json', (req, res) => {
  console.log(333)
  const { page, size } = req.query
  res.json({
    name: 20
  })
})

app.post('/json', (req, res) => {
  console.log(333)
  const { page, size } = req.query
  res.json({
    name: 20
  })
})

app.listen(8001, () => {
  console.log('8001 is listening ...')
})