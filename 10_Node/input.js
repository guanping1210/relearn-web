// readline模块：逐行读取，可以设置问题，等待用户输入，然后收到恢复
const readline = require('readline')

// 实例话接口对象
var r1 = readline.createInterface({
  output: process.stdout,
  input: process.stdin
})

// 设置提问事件
r1.question('今晚吃啥?', function(asnwer) {
  console.log('答复：', asnwer)
  // 不加close，程序不会结束
  r1.close()
})

// 提问结束
r1.on('close', function() {
  // 结束进程
  process.exit(0)
})