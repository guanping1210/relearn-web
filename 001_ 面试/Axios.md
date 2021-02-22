#### axios

- axios 是一个网络请求库，以基于 Promise 的方式封装了浏览器的 XMLHttpRequest 和服务器端的 node http 请求，使得我们能够用 es6 的异步方式处理网络请求
- 功能特性：
  - 从浏览器建立 XMLHttpRequest
  - 从 node 端建立 http 请求
  - 支持 Promise API
  - 拦截请求与响应
  - 转换请求与响应数据
  - 取消请求
  - 自动转换 JSON 数据
  - 支持客户端 XSRF 攻击防御

#### axios 基础配置

```
{
    url, 请求的url
    method, 请求的方法
    baseURL，将自动加在url前
    headers： {}, 自定义请求头
    params, URL参数，必须是一个无格式对象或URLSearchParams对象
    data,  请求发送的数据
    timeout，超时时间
    adapter, 自定义处理请求
    cancelToken, 取消请求
    ......
}
```

#### axios.interceptors --> 拦截器

- 用户能够经过 then 方法为请求添加回调，而拦截器中的回调将在 then 中的回调以前执行
- 请求拦截器
- 响应拦截器

```
    // 添加拦截器
    const inter = axios.interceptors.request.use(function(config) {
        ...
        return config
    }, function(err) {
        return Promise.reject(error)
    })

    axios.interceptor.response.use(function(response) {
        ...
        return response
    }, function(err) {
        return Promise.reject(error)
    })

    // 移除添加的拦截器
    axios.interceptors.request.eject(inter)
```
