/**
 * Node的规范：commonjs
 * 由于是服务端，所以同步，快速
 * 每个文件就是一个模块，有自己的作用域；在一个文件内定义的变量、函数都是私有的
 * 导出：module.exports
 * 导入：require
 * 
 * 模块可以多次加载，但是只会在第一次加载时运行一次，然后运行结果被缓存了，以后再加载，直接读取缓存结果。
 * 模块加载的顺序，按照其在代码中出现的顺序
 * 
 */

 var x = 5

//  setTimeout(() => {
//     x = 100
//  }, 1000)

 var addX = function(value) {
     return value + x
 }

 module.exports = {
     x, 
     addX
 }

//  模块基本信息
console.log('module-id', module.id)
console.log('module-name', module.filename)
console.log('module-loaded', module.loaded)
console.log('module-parent', module.parent)

// 上面的module.exports生效，exports.a导出为undefined
exports.a = 300
exports.b = 800
