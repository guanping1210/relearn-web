#### AMD

1、异步加载，允许指定回调函数，适用于浏览器环境(所有的模块语句，都定义在一个回调函数中)

- require([moduleName], callback)
  2、用 define 方法定义模块
  3、输出的模块可以兼容 CommonJS 规范
  define(function( require, exports, module) {
  var moduleA, moduleB

moduleA.something()
moduleB.something()

  <!-- 兼容commonjs -->

exports.asplode = function() {
moduleA.something()
moduleB.something()
}
})

4、define 在 node 环境下直接用 node 执行的话会报错，需要借助 requirejs 库

5、require([moduleName], callback)调用组件
