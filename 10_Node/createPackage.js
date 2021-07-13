// 创建package.json文件
/**
 * {
 *    名字，版本号，描述，入口文件，指令，依赖，作者
 * }
 */
const readline = require('readline')
const fs = require('fs')

const r1 = readline.createInterface({
  output: process.stdout,
  input: process.stdin,
})

// 设置提问
function setQuestion(title) {
  return new Promise((resolve, reject) => {
    r1.question(title, answer => {
      resolve(answer)
    })
  })
}

async function createPackage() {
  let name = await setQuestion('您的包名叫什么？')
  let description = await setQuestion('你的包的描述是什么?')
  let entry = await setQuestion('主程序入口文件是什么?')
  let author = await setQuestion('作者是谁?')

  // 写入文件
  fs.writeFile('package.json', `{
    "name": "${name}",
    "description": "${description}",
    "entry": "${entry}",
    "author": "${author}",
    "scripts": {
      "start":"test echo"
    }
  }`, { flag: 'a' }, function() {
    r1.close()

  })
} 
createPackage()
// 结束进程
r1.on('close', function() {
  process.exit(0)
})