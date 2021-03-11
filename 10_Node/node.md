#### node 是什么 --> 是一个基于 V8 引擎的 JS 代码运行环境，可以理解为是一个软件，这个软件能够运行代码

- 浏览器软件，是 JS 代码的运行环境
- Node 软件，也是 JS 代码的运行环境 --> node 能够运行 JS 代码，是因为内部包含了 Chrome V8 引擎

#### node 组成 --> ECMAScript, Node 模块 API

- Javascript 组成：ECMAScript, DOM, BOM

#### nodejs 模块化开发

- 规定一个 Javascript 文件就是一个模块，模块内部定义的变量和函数在默认情况下外部不能访问
- 模块内部可以使用 exports 对象进行成员导出，使用 require 导入其他模块

#### 系统模块 --> fs 文件系统

- 文件模块 fs --> 读取文件、写入文件、操作文件夹
- 读取的是系统磁盘的文件

- fs.readFile(url, encode, callback) 读取文件
- fs.writeFile(url, encode, callback) 写入文件

```
const fs = require('fs')

fs.readFile(文件路径, 编码格式，callback)
```

#### 系统模块 --> path 路径操作 --> 因为各个系统的路径不一致，所以需要拼接路径

- 会在内部判断当前系统的路径语法，然后按照当前系统的语法去拼接路径
- 相对路径与绝对路径

- path.join(a, b, c) 拼接为 a\b\c 路径
- \_\_dirname, 表示的是当前所在的绝对路径

```
const path = require('path')

const url = path.join('a', 'b')

console.log(url) // a\b
```

#### node 中的第三方模块 --> 别人已经写好的，直接引用即可的模块

- 以 js 文件的形式存在，提供实现项目具体功能的 API 接口
- 以命令行工具形式存在，辅助项目开发

- npm node 管理包，使用 npm install xx 可以下载 xx 包
- nodemon，一个命令行工具，用来辅助项目开发
- nrm, 是 npm 下载地址切换工具，因为 npm 默认地址是在国外，访问慢，所以可以切换到国内
  ```
    nrm list // 查看模块地址列表
    nrm use xxx // 使用xxx这个下载地址
  ```
- gulp , 基于 node 平台开发的前端构建工具

  - 根目录下建立 gulpfile.js 文件
  - 在 gulpfile.js 文件中编写任务
  - 在命令行工具中执行 gulp 任务
  - gulp.src() 获取任务要处理的文件
  - gulp.dest() 输出的文件
  - gulp.task() 建立 gulp 任务
  - gulp.watch() 监控文件的变化

  ```
    const gulp = require('gulp')

    gulp.task('first', () => { // 建立任务
        gulp.src('./src/css/base.css')
        .pipe(gulp.dest('./dist/css')) // 将处理后的文件输出到dist目录
    })
  ```

#### nodejs 中的所有回调函数，第一个参数都是 err，也就是错误优先

#### package.json --> 记录依赖模块以及模块版本

- scripts , 记录的命令别名
- dependencies, 依赖，开发环境和生产环境共用的依赖
- devDependencies, 开发环境特有的依赖

#### package-lock.json --> 锁定包版本、加快下载速度

#### nodejs 中模块的加载机制 --> commonjs

- 查找规则：当模块拥有路径但没有后缀时

  - require 根据模块路径查找模块，如果是完整路径，直接引入模块
  - 后缀省略，则先找同名 JS 文件再找同名 JS 文件夹
  - 找到同名文件夹，找文件夹中的 index.js
  - 如果文件夹中的 index.js 找不到，会去当前文件夹中的 package.json 文件中查找 main 选项的入口文件
  - 如果还找不到，就报错，表示模块没有找到

- 查找规则：当模块没有路径且没有后缀时
  - nodejs 会假设它是系统模块，然后去 node_modules 文件中中查找
  - 找是否有同名文件夹，有的话查找里面是否有 index.js
  - 没有 index.js，就查看该文件夹中的 package.json 中的 main 来确定入口
  - 还找不到，就报错

#### 服务端基础概念

- URL，统一资源定位符，是专为识别 Internet 网上资源位置而设的一种编码方式

```
  URL 的组成：
    传输协议://IP地址:端口号/资源位置

    http: 超文本传输协议，提供来一种发布和接收HTML页面的方法
```

#### 创建 web 服务器

- http 模块 --> http.createServer(), 新建服务器

#### http 协议 --> 客户端与服务端沟通的规范 --> 超文本传输协议

- 报文：在 http 请求和响应的过程中传递的数据块，包括要传送的数据和一些附加信息，并且要遵循规定好的格式
- 请求报文 request
  - 请求方式 get\post...
  - 其他设置
- 响应报文 response

#### 路由 --> 客户端请求地址与服务器端代码的对应关系，请求什么就响应什么

#### 静态资源 --> 相同的请求得到相同的响应资源（例如图片啊这些，地址一般不会变动）

#### 动态资源 --> 相同的请求不同的响应资源

#### 异步编程

- 同步 API：path、url, 当前 API 执行完毕才能执行下一个 API

  ```
  console.log('before')
  console.log('after')

  // before -> after
  ```

- 异步 API: fs..., 当前 API 的执行不会阻塞后续 API 的执行

  ```
  console.log('before')
  setTimeout(() =>{
    console.log('last)
  }, 2000)
  console.log('after)

  // before -> after -> last
  ```
