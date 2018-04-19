const fs = require('fs')
const Koa = require('koa')
const app = new Koa()
const path = require('path')
const serve = require('koa-static')
const main = serve(path.join(__dirname, '..'))
const router = require('koa-router')()
const bodyParser = require('koa-bodyparser')
app.use(bodyParser())

// 全局数据库
let z_data = {}

// 启动静态服务器
app.use(main)

// 首页默认地址
router.get('/', ctx => {
  let data = fs.readFileSync(path.resolve(__dirname, '../client_index.html'))
  ctx.type = 'html'
  console.log(data)
  ctx.body = data
})

router.get('/result', ctx => {
  let data = fs.readFileSync(path.resolve(__dirname, '../res_index.html'))
  ctx.type = 'html'
  ctx.body = data
})

router.get('/reset', ctx => {
  z_data = {}
  ctx.body = []
})

router.get('/sum', ctx => {
  let res = []
  res[0] = z_data[1]
  res[1] = z_data[2]
  res[2] = z_data[3]
  res[3] = z_data[5]
  res[4] = z_data[8]
  res[5] = z_data[13]
  res[6] = z_data[20]
  ctx.body = res
})

router.post('/sum', ctx => {
  console.log(ctx.request.body, 'sum')
  let temp = {
    'plus/one.html': '1',
    'plus/two.html': '2',
    'plus/three.html': '3',
    'plus/eight.html': '8',
    'plus/thirteen.html': '13',
    'plus/five.html': '5',

    'plus/twenty.html': '20'
  }
  let id = temp[ctx.request.body.params.id + '']
  console.log(typeof id, 'id')
  if (!!z_data[id]) {
    z_data[id] += 1
  } else {
    z_data[id] = 1
  }
  console.log(z_data, '统计')
})

app.use(router.routes()).use(router.allowedMethods())

app.listen(3000)
