#### AMD
1、异步加载，允许指定回调函数，适用于浏览器环境
2、用define方法定义模块
3、输出的模块可以兼容CommonJS规范
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

4、define在node环境下直接用node执行的话会报错，需要借助requirejs库