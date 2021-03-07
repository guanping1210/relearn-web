// 保护代理：实现访问主体的限制行为，以过滤字符作为简单的例子
// 主体，发送信息
function sendMsg(msg) {
  console.log(msg)
}

// 代理，对消息进行过滤
function proxySendMsg(msg) {
  // 无消息直接返回
  if(typeof msg === 'undefined') {
    retrun 
  }

  // 有消息则进行过滤
  msg = ('' + msg).replace(/\你没/g, '')

  sendMsg(msg)
}

sendMsg('你没 你妹你啊你') // 你没 你妹你啊你
proxySendMsg('你没 你妹你啊你') // ' 你妹你啊你'
proxySendMsg() // undefined


// 虚拟代理：在控制对主体的访问时，加入了额外的操作
// 函数防抖，频繁操作不处理，直到操作完成之后，经过delay的时间，再一次性处理
function debounce(fn, delay) {
  delay = delay || 200

  var timer = null

  return function() {
    var arg = arguments

    // 每次操作时，清除上次的定时器
    clearTimeout(timer)
    timer = null

    // 定义新的定时器，一段时间后进行操作
    timer = setTimeout(function() {
      fn.apply(this, arg)
    }, delay)
  }
}

// 缓存代理：可以为一些开销大的运算结果提供暂时的缓存，提升效率

