/**
 * 1、搭建网站服务器，实现客户端和服务器端通信
 * 2、连接数据库，创建用户集合，向集合中插入文档
 * 3、访问/list时，显示用户列表
 * 4、访问/add时，呈现新增用户页面
 * 5、访问/modify，呈现修改页面，并修改用户信息
 * 6、访问/delete，实现删除用户功能
 * 
 * art-template 模板引擎
 *  const html = template('模板路径', 数据) // 能够把对应的数据，渲染到模板中，形成html字符串
 */
const http = require('http')
const mongoose = require('mongoose')
const url = require('url')
const querystring = require('querystring')
const template = require('art-template')
const path = require('path')
const app = http.createServer()

//连接数据库
mongoose.connect('mongodb://localhost/playtest')
    .then(() => {
        console.log('数据库连接成功')
    })
    .catch(() => {
        console.log('数据库连接失败')
    })

// 创建数据集
const userSchema = new mongoose.Schema({
    name: { type: String, required: true, minlength: 2, maxlength: 20 },
    age: { type: Number, min: 18, max: 80},
    password: { type: String },
    email: { type: String },
    hobbits: [String],
})

const User = mongoose.model('User', userSchema)
// User.create({
//     name: 'guanping',
//     age: 20,
//     password: '123456',
//     email: 'gp@qq.com',
//     hobbits: ['看书']
// })

app.on('request', async (req, res) => {
    const method = req.method
    const { pathname } = url.parse(req.url)
    // console.log(555, method, pathname)
    if(method === 'GET') {
        if(pathname === '/' || pathname === '/index') {
            const users = await User.find()
            let list = ``
            users.forEach(item => {
                list += `
                <tr>
                    <td>${item.name}</td>
                    <td>${item.hobbits.join(',')}</td>
                    <td>${item.age}</td>
                    <td>${item.email}</td>
                    <td><button class="btn btn-danger">删除</button> | <button class="btn btn-success">修改</button></td>
                </tr>
                `
            })
            res.end(
                `<!DOCTYPE html>
                <html lang="en">
                  <head>
                    <meta charset="UTF-8" />
                    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                    <title>Document</title>
                    <!-- 最新版本的 Bootstrap 核心 CSS 文件 -->
                    <link
                      rel="stylesheet"
                      href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
                      integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu"
                      crossorigin="anonymous"
                    />
                  </head>
                  <body>
                    <div class="container">
                      <h6>
                        <a href="/add" class="btn btn-primary">添加用户</a>
                      </h6>
                      <table class="table table-striped table-bordered">
                        <tr>
                          <td>用户名</td>
                          <td>爱好</td>
                          <td>年龄</td>
                          <td>邮箱</td>
                          <td>操作</td>
                        </tr>
                        ${list}
                      </table>
                    </div>
                  </body>
                </html>`
            )
        } else if(pathname === '/add') {
            let form = `
            <form method="post" action="/add">
            <div class="form-group">
              <label for="name">姓名:</label>
              <input
                type="text"
                class="form-control"
                id="name"
                name="name"
                placeholder="姓名"
              />
            </div>
            <div class="form-group">
              <label for="age">年龄:</label>
              <input name="age" type="text" class="form-control" id="age" placeholder="年龄" />
            </div>
            <div class="form-group">
              <label for="email">邮箱:</label>
              <input
                type="email"
                class="form-control"
                id="email"
                name="email"
                placeholder="邮箱"
              />
            </div>
            <div class="form-group">
              <label for="password">密码:</label>
              <input
                type="password"
                class="form-control"
                id="password"
                placeholder="密码"
                name="password"
              />
            </div>
            <div class="form-group">
              <label for="hobbits">请选择爱好：</label>
              <label class="checkbox-inline">
                <input name="hobbits" type="checkbox" id="hobbits" value="看书" /> 看书
              </label>
              <label class="checkbox-inline">
                <input name="hobbits"  type="checkbox" id="hobbits" value="跳舞" /> 跳舞
              </label>
              <label class="checkbox-inline">
                <input name="hobbits"  type="checkbox" id="hobbits" value="唱歌" /> 唱歌
              </label>
            </div>
            <button type="submit" class="btn btn-primary">提交</button>
          </form>
            `
            res.end(`
            <!DOCTYPE html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>Document</title>
                <link
                  rel="stylesheet"
                  href="https://stackpath.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css"
                  integrity="sha384-HSMxcRTRxnN+Bdg0JdbxYKrThecOKuH5zCYotlSAcp1+c8xmyTe9GYg1l9a69psu"
                  crossorigin="anonymous"
                />
              </head>
              <body>
                <div class="container">
                  <h4>填写用户信息：</h4>
                  ${form}
                </div>
              </body>
            </html>
            `)
        }

    } else if(method === 'POST') {
        // 添加用户，需要把数据添加到数据库中
        console.log(123, method, pathname)
        if(pathname === '/add') {   
            let formData = ''
            // 接收post参数 --> 有bug，目前form表单并没有提交任何数据过来 --> 表单一定要写name,否则接收不到
            req.on('data', (param) => {
                formData += param
            })
            // post参数接收完毕
            req.on('end', async () => {
                // 将接收的参数添加到数据库中  formData = name=1&age=1&email=&password=1&hobbits=%E7%9C%8B%E4%B9%A6
                const user = querystring.parse(formData) // 解析后的user是个对象
                console.log(formData, user)
                await User.create({ ...user, hobbits: typeof user.hobbits === 'string' ? [user.hobbits] : user.hobbits })
                // 重定向, 回到首页，会多一条数据，表示新增成功
                res.writeHead(301, {
                    Location: '/index'
                })

                res.end()
            })
        }

        // res.end('ok')
    }
    
})

app.listen(9000)