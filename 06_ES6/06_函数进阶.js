/**
 * 函数定义：
 *  1、函数声明
 *  2、函数表达式
 *  3、构造函数
 */
// 函数申明
function fn() {}

// 函数表达式
const fn2 = function() {}

// new + 构造函数
const fn3 = new Function('console.log(123k)')
const fn4 = new Function('a', 'b', 'console.log(a, b)')
fn4(1,2)

/**
 * 函数的调用方式：    this指向；一般指向调用者
 *  1、普通函数        window
 *  2、对象的方法      当前对象
 *  3、构造函数        实例对象
 *  4、绑定事件函数     函数的调用DOM
 *  5、定时器函数       window
 *  6、立即执行函数     window
 * 
 * 改变this指向：
 *  call: 调用函数 + 改变this指向（主要用来实现继承）
 *  apply: 调用函数 + 改变this指向, 参数必须是数组
 *  bind: 改变this指向，不会调用函数，返回的是原函数改变this之后产生的新函数
 */
// 1、普通函数
function fn() {}

fn();
fn.call()

// 2、对象的方法
var obj = {
  sayHi() {}
}
obj.sayHi()

// 3、构造函数
function Star() {}
new Star()

// 4、绑定事件函数
document.onClick = function() {}

// 5、定时器函数
setInterval(function(){}, 1000)

// 6、立即执行函数
(function() {
  console.log('立即执行函数')
})()







/**
 * new Function 用法
 */