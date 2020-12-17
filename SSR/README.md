#### react + node SSR

1、SSR：首屏渲染时间短，代码运行在服务器，消耗服务器性能
2、Node.js 作为服务端和客户端的中间层，承担 proxy 代理，处理 cookie 等操作
3、react 在服务端渲染情况下，用 hydrate 代替 render \* 主要讲相关的事件注入进 HTML 页面中
(让 React 组件的数据随着 HTML 文档一直传递给浏览器网页，能够包吃服务端数据和浏览器端数据一直，避免闪屏)
3.1 ReactDOM.hydrate(<App />, document.getElementById('root'))
