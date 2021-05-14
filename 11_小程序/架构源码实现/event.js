// 观察者模式，这儿用的这个
// 发布订阅模式：与观察者模式有些不同（下来了解一下区别）
/**
 * 观察者模式，这儿用的这个：a = b, ab直接通信
 *    新建一个c，那么a = c
 * 发布订阅模式：a = middle = b, ab不会直接通信，与观察者模式有些不同（下来了解一下区别）
 *    新建一个c ，直接与middle沟通
 */
class Event {
  constructor(name) {
    this.name = name
    this.observers = {}
  }

  // emit
  emit(type, fn) {
    
  }

  // on
  on(type, fn) {

  }
}