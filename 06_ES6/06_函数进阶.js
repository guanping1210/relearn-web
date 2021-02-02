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
document.body.onclick = function() {}

// 5、定时器函数 --> 内部的this一直是window
setTimeout(function(){}, 1000);

var btn = document.querySelector('button')
btn.onclick = function() {
  this.disable = true // this --> btn

  setTimeout(function(){
    this.disable = false // this --> window
  }.bind(this), 3000) // 通过bind绑定，可以将内部的this指向为btn, 而且可以延迟执行
};

// 6、立即执行函数
(function() {
  console.log('立即执行函数')
})()


/**
 * 改变内部this指向：call、apply、bind
 * 
 * 
 */


 /**
  * 函数的参数：
  *   形参：没有赋予过初始值的参数
  *   实参：赋予过初始值的参数
  *   length: 统计的是第一个实参之前的形参个数
  */
 function fn(a, b) {}
 fn.length // 2

 function fn(a = 1, b) {}
 fn.length // 0

 function fn(a, b = 1) {}
 fn.length // 1

 /**
  * 箭头函数：this是在定义函数时绑定的，不是在执行过程中绑定的。
  * 
  * 简单来说：不管在什么情况下，箭头函数的this跟外层function 的this一致，外层function的this指向谁，箭头函数就指向谁，
  *          如果外层不是function，则指向window
  */
 var shape = {
  radius: 10,
  // diameter也是shape的属性，但是不是箭头函数，所以指向的是调用者，所以下面shape.diameter，就指向的shape
  diameter() {
    return this
  },
  // perimeter是shape的属性，但是由于是箭头函数，箭头函数的this是指向定义时的上下文，而此时shape的上下文是全局作用域
  perimeter: () => {
    console.log(this) // 这个this指向window，时因为没有被其他函数包裹，最外层的this就指向window，所以这儿的this指得就是window对象
  }
};
shape.perimeter() // this指向window了
shape.diameter() // 指向shape

var aa = {
  fn: function() {
    shape.perimeter() // window
  }
}

aa.fn()



function foo() {
  setTimeout(function() {   // 普通函数，打印的是21； 箭头函数打印的是42
    console.log('id: ', this.id)
  }, 1000)
}
var id = 21
foo.call({ id: 42 })


var star = {
  fn: function() {
    
  }
}
