/**
 * 实现commonjs的 requir 导入功能 
 */
const path = require('path')
const fs = require('fs')
const vm = require('vm')

// 将相对路径处理为绝对路径
function readfile (filename) {
  const pathToFile = path.resolve(__dirname, filename)
  // 读取文件内容, 其实是个字符串，需要特殊处理
  const content = fs.readFileSync(pathToFile, 'UTF-8')
  // 用函数来隔离每个模块变量的作用域
  const wrapper = [
    '(function(require, module, exports) {',
    '})'
  ]
  const wrapperContent = wrapper[0] + content + wrapper[1]
  
  // 将字符串变为可执行的代码
  const script = new vm.Script(wrapperContent, {
    filename: 'index.js'
  })
  const result = script.runInThisContext()

  const module = {
    exports: {}
  }

  result(readfile, module, module.exports)

  return module.exports
}

readfile('./index.js')

/**
 * 总体思路：
 * 1、node定义了一个构造函数Module, 所有的模块都是Module的实例
 *    id 、filename、loaded、parent、children、exports
 * 
 * 2、export 原理
 *   (1)、找到文件的路径，相对路径变为绝对路径
 *   (2)、读取文件内容, 其实就是字符串
 *   (3)、将文件内容包裹在一个匿名函数表达式中 (function(){})
 *   (4)、将字符串变为可执行的代码
 */
