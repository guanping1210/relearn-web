#### websocket

- websocket，是一种 html5 协议，实现了双全功通信，是一种在单个 TCP 连接上进行双全工通信的协议
- 主要是能够使得服务端和客户端，双方都能主动通信

- 特点：
  - 有良好的兼容性
  - 建立在 TCP 协议只是，与 http 协议同属应用层
  - 数据格式比较轻量，性能开销小，通信更高效
  - 可以发送文本，或二进制
  - 没有同源策略，可以与任意服务器通信
  - 协议标识符是 ws，加密是 wss

#### UDP / TCP

- TCP 连接传输的协议，也就是必须先建立连接
- UDP 无连接传输协议，也就是通信前不需要建立连接

#### 双全工

- 是通讯传输的一个术语，允许数据在两个方向上同时传输
- 双全工：例如手机，同一时刻，两个用户可以同时给对象传送数据
- 半双工：例如对讲机，当一方按住通话按钮才能向另一方传送数据，同一时刻只能有一个用户传送数据
- 单工：例如看电视，我们只能接收对象发的信息，不能给对方发送信息

#### websocket、ajax 轮训、Long Poll 长轮询

- ajax 轮训，就是浏览器每隔一段时间发送一次请求，询问浏览器是否有新的信息
- long poll, 也是采用轮询的方式，采用的是阻塞模型，也就是客户端发起连接，没消息，服务器会将请求挂起，等到有消息才返回。然后客户端拿到消息或者主动断开，后面再主动建立连接，周而复始

#### 基础 API

- WebSocket，是个构造函数，通过 new 构建实例
- 实例的相关属性：
  - readyState, 表示实例当前的状态，一共有四种：
    - CONNECTION 0, 正在连接
    - OPEN 1， 连接成功
    - CLOSING 2， 连接正在关闭
    - CLOSED 3， 连接已经关闭或者打开连接失败
  - onopen, 用于指定连接成功后的回调函数，(多个回调函数可以用 addEventListener 方法 ws.addEventListener('open', cb))
  - onclose, 用于指定连接关闭后的回调函数，同 onopen
  - onmessage, 用于指定收到服务器数据后的回调函数，数据可能是文本或二进制 Blob 对象或者 ArrayBuffer 对象
  - send, 向服务器发送数据
  - bufferedAmount, 表示还有多少字节的二进制数据没有发送出去，可以用来判断发送是否结束
  - onerror，用于指定报错时的回调函数

```
    const ws = new WebSocket(url)

    ws.onopen = function(){}
    ws.onclose = function(){}
    ws.onmessage = function(){}
    ws.send = function(){}
    ws.onerror = functon(){}
```

#### websocket 心跳检测 和 重连机制

- 因为 websocket 是可以双方通信的，那么任意一方断开连接，都会导致数据丢包，发出去，没收到

  - 前端断开：比如网络不好啥的，不同的浏览器有不同的机制，触发 onclose 的时机不同，使得我们无法知道是否已经断开了
  - 后端断开：例如后端断开，常理是需要先通知下前端的。但是异常情况，是感知不到的

- 心跳检测：双发约定一个信息，间隔指定时间内发送一次，确保客户端和服务端能收到信息和发送信息
- 重连机制：发下连接不到对方了，一直发重连，如果太长时间重连不上，就算了

- 核心：主要是在 onclose、onerror 函数中添加重连机制；在 onmessage 里面，进行心跳检测

```
    const ws = new WebSocket(url)

    function init() {
        ws.onclose = function() {
            ...
            reconnect(wsurl)
        }

        ws.onopen = function() {
            heartCheck.start()
        }

        ws.onerror = function() {
            ...
            reconnect(wsurl) // 拿到任何消息都说明当前连接是正确的
        }

        ws.onmessage = function() {
            ...
            heartCheck.start()
        }
    }

    headerCheck = {
        timeout: 3000, 每隔3s 发送心跳
        num: 3, // 3次心跳均未响应，就尝试重连
        serverTimeout: 5000, 服务端超时时间
        timeObj: null,
        serverTimeObj: null,
        start: function() {
            var that = this
            var num = this.num

            this.timeoutObj = setTimeout(function() {
                ws.send('ping') // 发送的心跳包
                num --

                if(num === 0) {
                    ws.close()
                }
            }, this.timeout)
        }
    }
```
