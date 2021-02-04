/**
 * 1、assert 断言库，主要提供了一组断言函数，用于验证不变量
 * 2、os 库，用来获取机器信息的
 * 3、path 库，操作路径
 * 4、
 */
// os
const os = require('os')

console.log(os.cpus()) // 获取当前机器的CPU信息
console.log(os.totalmem()) // memory 内存

// path
const path = require('path')

console.log(path.extname('./data/read.md')) // 获取扩展名