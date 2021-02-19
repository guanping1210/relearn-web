https://juejin.cn/post/6844904073737535496

#### 缓存 --> 性能优化（需要自己画一下那个缓存的流程图）

1、强缓存 --> 缓存有效期内，直接读取本地资源，状态码是 200，

- from memory cache 不请求网络资源，资源在内存中，页面关闭就不见了
- from disk cache 不请求忘了资源，资源在磁盘中，页面关闭磁盘中的资源还存在

- Expires: http1.0 中表示资源失效的时间点，与客户端的时间做对比
- Max-age: http1.1 中表示资源失效的时间点，与客户端的时间做对比

- Cache-control: 用指令来实现缓存机制
  - max-age: 强缓存的有效时间，单位秒
  - no-cache: 使用协商缓存
  - no-store: 禁止浏览器缓存数据
  - public：表示响应能够被任何对象缓存
  - private：表示响应只能被单个用户缓存

2、协商缓存 --> 发送请求与服务器端协商，服务器端决定资源是取本地资源还是新的资源

- 状态码

  - 本地资源是最新的，返回的是 304
  - 比对后，本地资源已经不是最新的了，那么从服务器获取最新资源，返回 200

- Last-modified 服务器资源的最新更新时间
- If-Modified-Since 客户端发起协商，把本地记录的文件更新时间传给服务器，服务器进行判断比较

- Etag 服务器根据内容生成唯一的字符串标识
- If-None-Match 客户端发起协商，把本地记录的 hash 标识传给服务器，服务端进行比较

#### PWA --> 渐进式 web 应用，核心是让页面尽快加载

- App Shell
- ServiceWork：离线缓存

  - 独立的 worker 线程
  - 被 install 之后永远存在，除非手动清除

#### URL 输入到渲染的过程 （画出渲染的图）

1、域名解析，找到服务器地址
2、构建 TCP 连接，若有 https，多一层 TLS 握手
3、特殊响应码处理 301 302
4、解析文档
5、构建 dom 树和 csscom
6、生成渲染树：从 DOM 树的根节点开始遍历每个可见节点，对于可见节点，找到 cssom 树中对应的规则，并应用他们，根据每个可见节点及其对应样式，组合生成渲染树
7、Layout 回流：根据生成的渲染树，进行回流，得到节点的集合信息 --> 改变元素的空间布局
8、Painting 重绘：根据渲染树及其回流得到的集合信息，得到节点的绝对像素 --> 改变元素外观
9、绘制，在页面上展示，涉及到绘制层级、GPU 相关的知识点
10、加载 js 脚本，加载完成解析 js 脚本

- 页面采用流式布局绘制，左到右，上到下，如果一个节点的空间属性发生变化，会影响到其他节点的空间布局，那么需要重新收集节点信息进行绘制 --> 回流
- 元素外观，例如颜色、背景、阴影等的改变，是重绘
- 回流一定会触发重绘

- 触发回流的场景

  - 添加或删除可见的 DOM 元素
  - 元素的位置发生变化
  - 元素的尺寸发生变化（边距、边框、高度、宽度等）
  - 页面一开始渲染的时候
  - 浏览器的窗口尺寸变化（回流是根据视口的大小来计算元素的位置和大小的）
  - 获取位置信息，因为需要回流计算最新的值
    - offsetTop offsetLeft offsetWidth offsetHeight 相对于父级容器的偏移量
    - scrollTop scrollLeft scrollWidth scrollHeight 相对于腹肌容器滚动上去的距离
    - clientTop clientLeft clientWidth clientHeight 元素边框的厚度
    - getComputedStyle()
    - getBoundingClientRect

- 回流的优化 --> 避免重复触发回流，因为对树的局部或者全局重新生成是非常消耗性能的
  - 现代浏览器采用队列存储多次的回流操作，然后批量执行，但获取布局信息例外
  - 编码上，避免连续多次修改，可通过合并修改，一次触发
  - 对于大量不同的 dom 修改，可以使其先脱离文档流，比如绝对定位，修改完后再回归文档
  - 通过防抖和节流控制触发频率
  - css3 硬件加速，transform, opacity、filters，开启后，会新创建渲染层

#### 开启 GPU 加速的方法 --> 开启后，会将 dom 元素提升为独立的渲染层，变化不会影响文档流中的布局

- transform: translateZ(0)
- opacity
- filters
- will-change

#### 说下对 http 协议的理解 --> http 是建立在 TCP 上的应用层协议，超文本传送协议（绘制三次握手、四次挥手图）

- http1.0: 每发送一个请求都会建立一个新连接，处理完请求之后，释放连接
- http1.1：一次连接中处理多个请求，请求还可以重叠进行
- http2.0： 支持多路复用，一个 tcp 可同时传输多个 http 请求，头部数据还做了压缩

- TCP --> 传输层协议，主要是三次握手和四次挥手

  - 三次握手

    - 客户端发送 SYN=1, 随机产生数据包到服务端， 服务端接收之后表示知道客户端要建立连接
    - 服务端向客户端发送 ack number=(客户端的 seq+1), SYN=1，ACK=1，随机产生数据包给客户端，表示服务端已经同意建立连接
    - 客户端收到 ack number 之后校验是否正确，随后发送 ack number=(服务器的 seq+1), ack=1 给服务端，表示建立成功

  - 四次挥手
    - 客户端发送消息给服务端，申请主动断开连接，进入等待状态，不往服务端发数据，但还能接收
    - 服务端收到后，告诉客户端知道了，随后服务端进入等待状态，不再接收消息，但是可以发送消息
    - 客户端收到服务端的告知，进去下一个阶段的等待
    - 服务端完成剩余数据的发送，告知客户端可以断开了，服务端不再接收消息和读取数据
    - 客户端收到消息后，告诉服务端，然后释放链接
    - 服务端收到消息后，也释放链接

- UDP --> 无链接的传输协议
  - 不建立可靠链接
  - 不保证数据的可靠性
  - 速度更快，实时性更高

#### https(https = http + TLS) --> 因为 http 是明文传输，抓包后容易看到报文内容，不安全，所以诞生了 https

- TLS 安全传输层协议，由 TLS 记录协议和 TLS 握手协议组成， 采用非对称加密算法进行加密
- https 分为两个阶段：通过非对称加解密确认对方身份，合法则生成回话秘钥；报文在发送钱，先用回话秘钥进行对称加密

- TLS 握手

  - 客户端请求服务端建立 SSL 链接，服务端向客户端发送一个随机数 randomC 和 CA 机构颁发的证书
  - 客户端对证书进行验证，验证通过后生成一个随机数 randomS, 用公钥对 randomS 加密，同时生成一段签名，发给服务端
  - 服务端接收后，用私钥对密文解密，用解密后的 key 生成签名，与客户端发来的签名进行比较，检验通过后，生成一个随机数 randomP，用私钥加密，还有随机数的 hash 值，发给客户端
  - 客户端用公钥解密，并校验 hash 之后，两端通过 randomC randomS randomP 通过一定算法生成 session key，后续报文通过 session key 对称加密进行传输

- CA 证书
  - 由 CA 机构颁发的一个凭证，包含签名算法、签名 hash 算法、颁发者、有效期、公钥、指纹等信息
  - 这个证书主要是用来验证公钥是来自服务端，没有被篡改的

#### options 请求 --> 预检请求

- 请求分类

  - 简单请求：请求方式是：GET POST HEAD，content-type 是 text/plain mutipart/from-data application/x-www-form-urlencode 三者之一

    - 请求头只能有以下这些
      - Accept
      - Accept-Language
      - Content-Language
      - Content-Type
      - DPR
      - Downlink
      - Save-Data
      - Viewport-Width
      - Width

  - 复杂请求：除开简单请求之外的都是, 都会触发预检请求

- 预检请求

  - Access-Control-Allow-Origin: 服务器可接收的请求来源
  - Access-Control-Request-Method：服务器实际请求所使用的 HTTP 方法
  - Access-Control-Request-Header：服务器实际请求所携带的自定义首部字段

- 客户端从预检请求获得的信息判断，是否需要执行跨域请求（服务器 Access-Control-Allow-Cedential: true, 客户端 withCredentials: true）

#### http 常见请求头

- request header

  - Accept：浏览器接受的格式
  - Accept-Encoding: 浏览器端接收的编码方式
  - Accept-Language：浏览器端接收的语音
  - Cache-Control：控制缓存的时效性
  - Connection：连接方式，如果是 keep-alive，如果服务端支持，则会复用连接
  - Host：http 访问使用的域名
  - If-Modified-Since: 上次访问的更改时间，如果服务端认为没有更新，则给出 304 响应
  - If-None-Match：文件内容更新的 E-Tag 值，比更改时间更准确
  - User-Agent：客户端标识
  - Cookie：客户端存储的 cookie 字符串

- response header
  - Cache-Control：缓存控制，max-age 标识不需要缓存
  - Connection：连接类型
  - Content-Encoding: 内容编码方式，通常是 gzip
  - Content-Length: 内容长度
  - Content-Type：内容类型，所有请求网页的都是 text/html
  - Date: 当前服务器日期
  - ETag：页面内容的唯一标识
  - Expires: 过期时间，可能不准确
  - Keep-Alive: 保持连接不断时需要的一些信息
  - Last-Modified: 页面上次修改的时间
  - Server：服务器类型
  - Set-Cookie：设置 cookie，可以存在多个
  - Via：服务端的请求链路

#### Content-Type 的集中区别

- application/json json 字符串
- application/x-www-form-urlencoded &将 key=value 进行拼接
- multipart/form-data 文件上传

#### 前端安全规范

- XSS 跨站脚本攻击 （防范：对网页上获取的内容做转义处理）
- CSRF 跨站请求伪造（防范：服务端校验 Referer、随机 token）

#### 跨域的解决方案

- 利用跨域标签 image script 发起 get 方法的跨域请求
- nginx 反向代理
- 本地开发 webpack proxy 代理
- CORS --> 服务端设置
  - Access-Control-Allow-Origin
  - Access-Control-Request-Method
  - Access-Control-Request-Header
- 中间层 BFF 做转换

#### JS 事件的几种绑定方式

- 在 dom 元素中直接绑定：<div onclick="xxx"></div>
- js 中绑定：dom.onclick = function(){}
- 监听绑定：dom.addEventListener('name', () => {})

#### 事件委托 --> 代理

- 浏览器事件阶段
  - 捕获
  - 目标
  - 冒泡

#### target 与 currentTarget 区别

- target：指的是事件流的目标阶段，获取的是被点击的元素
- currentTarget：在事件流的捕获和冒泡阶段，指的当前事件活动对象

#### CSS 加载问题

- 不会阻塞 DOM 树的解析
- 会阻塞 DOM 树的渲染
- 会阻塞后面 JS 语句的执行

#### 资源预加载 prefetch/preload async/deferg

- 告知浏览器提前加载文件，图片、视频、js、css 等

  - prefetch 利用浏览器空闲时间下载
  - preload 提前加载

- js 脚本预加载
  - async 加载脚本和渲染并行进行，脚本加载完成后，暂停 html 解析，立即解析 js 脚本
  - defer 加载脚本和渲染并行进行，脚本会等待 html 解析完成后再执行

#### viewport --> 指定浏览器可视区域的窗口属性（缩放比例等）

- width 页面宽度，具体数值或者 device-width，也就是取设备宽度
- height 页面高度，同 width 一样
- initial-scale 初始缩放比例
- minimun-scale 最小缩放比例
- maximun-scale 最大缩放比例
- user-scalable 是否允许用户缩放

#### 移动端点击延迟 300ms --> 因为移动端可以缩放或者滑动，用延迟来区分是点击还是双击

- 解决方案
  - css touch-action
  - touchstart touchend 模拟点击事件
  - fastclick

#### 浏览器性能监控 Performance --> performance.timing, 能够获取大部分性能相关的数据

- navigationStart 前一个网页 unload 的时间戳
- unloadEventStart 前一个网页 unload 的时间戳
- redirectStart 第一个 http 重定向发生的时间
- redirectEnd 最后一个 http 重定向完成的时间

- 开始加载当前页面

  - fetchStart 浏览器准备好使用 http 抓取文档的时间，发送在检查本地缓存之前

- 网络传输解读 DNS TCP

  - domainLookupStart DNS 域名开始查询的时间，如本地缓存，则与 fetchStart 相等
  - domainLookupENd DNS 域名查询完成的时间， 如本地缓存，则与 fetchStart 相等
  - connectStart http（TCO）开始建立连接的时间， 开始三次握手，如是持久连接，则于 fetchStart 想等
  - secureConnectionStart https 建立连接的时间，如果不是安全连接，则为 0
  - connectEnd http（TCP）完成建立连接的时间，完成三次握手

- 读取文档阶段

  - requestStart http 请求读取真实文档开始的时间
  - responseStart http 开始接受响应的时间，获取到第一个字节
  - responseEnd http 响应全部接收完成的时间，获取到最后一个字节

- 解析文档阶段

  - domLoading 开始解析渲染 DOM 树的时间
  - domInteractive 完成解析 DOM 树的时间
  - domContentLoadedEventStart DOM 解析完成后，网页内资源加载开始的时间
  - domContentLoadedEventEnd DOM 解析完成后，网页内资源加载完成的时间
  - domComplete DOM 树解析完成，资源也准备就绪的时间
  - loadEventStart loade 事件发送给文档
  - loadEventEnd load 事件的回调函数执行完毕的事件

- 各个阶段时间段获取
  - DNS 查询耗时：domainLookuoEnd - domainLookupStart
  - TCP 链接耗时：connectEnd - connectStart
  - request 请求耗时：responseEnd - responseStart
  - 解析 dom 树耗时：domComplete - domOnteractive
  - 白屏时间：domloading - fetchStart
  - domready 时间：domContentLoadedEventEnd - fetchStart
  - onload 时间： loadEventEnd - fetchStart

#### 常见浏览器内核
- Trident IE浏览器内核
- Gecko Firfox浏览器内核
- Presto Opera浏览器内核
- Webkit Safair浏览器内核
- Blink  谷歌浏览器内核
