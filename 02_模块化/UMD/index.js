// 兼容的核心代码
(function(self, factory) {
  // 当前环境是commonjs环境
  if(typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory()
  } else if(typeof define === 'function' && defined.amd) {
    // 当前环境是AMD规范
    define(factory)
  } else {
    // 什么环境都不是，直接挂载在全局对象上
    // umdModule绑定
    self.umdModule = factory()
  }
})(this, function() {
  return function() {
    return Math.random()
  }
})