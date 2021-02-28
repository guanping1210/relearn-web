/**
 * new的过程：
 *  1、创建一个新对象
 *  2、该对象继承构造函数的原型与原型属性(将构造函数的作用域赋值给新对象)
 *  3、作为实例返回
 */
function myNew(parent, ...args) {
  var obj = {}
  obj.__proto__ = parent.prototype
  const res = parent.call(obj, args) // 执行构造函数，是把属性共享给obj

  return typeof res === 'object' ? res : obj
}