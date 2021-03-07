function getSingleton(fn) {
  var instance = null

  return function() {
    if(!instance) {
      instance = fn.apply(this, arguments)
    }

    return instance
  }
}

function SetManager(name) {
  this.manager = name
}

// 获取单例实例
var managerSingleton = getSingleton(function(name) {
  var manager = new SetManager(name)

  return manager
})

managerSingleton('a').getName() // a
managerSingleton('b').getName() // a
managerSingleton('c').getName() // a

// class 写法
class WebsocketSingleton {
  static instance = null

  static getInstance() {
    if(!this.instance) {
      this.instance = new WebsocketSingleton()
    }

    return this.instance
  }
}

// 生成唯一的实例
WebsocketSingleton.getInstance()

let a = WebsocketSingleton.getInstance()
let b = WebsocketSingleton.getInstance()

console.log(a === b) // true, 说明a和b指的是同一个实例