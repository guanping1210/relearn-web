const fn = function() {
  console.log('hello world')
}

module.exports = fn

// 连续加载三次，第二次添加的message属性，在第三次调用时依然存在
// 说明require命令并没有重新加载模块文件，而是输出了缓存
require('./index')
requlre('./index').message = 'nice to meet u'
require('./index').message

// 删除缓存：让模块输出一个函数，每次require时都重新执行一下函数
// 删除指定模块的缓存
delete require.cache(moduleName)

// 删除所有模块的缓存
Object.keys(require.cache).forEach(function(key) {
  delete require.cache[key]
})
