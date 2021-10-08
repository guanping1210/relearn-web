/**
 * JS在使用时存在两个问题：文件依赖和命名冲突；
 * 
 * 模块化开发：一个功能就是一个模块，多个模块组成完整应用，抽离一个模块不会影响其他功能的运行
 * 
 * node.js中的模块化开发规范：
 *  1、一个JS文件就是一个模块，模块内部定义的变量和函数默认情况下在外部无法得到
 *  2、模块内部可以使用 exports/module.exports 对象进行成员的导出，使用 require 方法导入其他模块
 *  3、require 导入的是个对象，对象内部是模块导出的对象
 *  4、当exports对象和module.exports对象指向的不是同一个对象时，以module.exports为准
 *  5、当exports和module.exports导出的对象不同名时，会同时导出
 * 
 * module 本身自己就是一个对象：
 *  {
 *      id, path, filename, loaded, 
 *      exports: {},
 *      children: [],
 *      paths: []
 *  }
 */

const moduleA = require('./module-a')
// console.log(module)
console.log(moduleA)
console.log(moduleA.add())

