/**
 * 手写原生Ajax:  https://blog.csdn.net/yesir_mao/article/details/93185843
 *  1、new一个XMLHttpRequest实例
 *  2、实例.open，连接服务器
 *  3、实例.send, 发送请求
 *  4、根据返回的状态码获取数据
 */
function ajax(options = {}) { // options代表请求路径，请求方式，请求参数类型，返回的字符串类型
  const { url, type, data, dataType } = options
  const isPost = type === 'post'

  return new Promise(function(resolve, reject) {
    // 创建异步请求对象
    const xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHttp')

    // 绑定监听事件
    xhr.onreadyStatechange = function() {
      if(xhr.readyState === 4 && xhr.status === 200) {
        resolve(xhr.responseText)
      }
    }

    // 处理参数请求 GET、POST

    // 打开连接
    xhr.open(type, url , true)

    // 发送请求 --> 传递给服务器的参数, get是带url上，post是通过body传递的
    xhr.send(isPost ? data : null)
  })
  
}