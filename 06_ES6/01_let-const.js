// @ts-nocheck
/**
 * 题目1: 用let或const改写这段使用var的旧程序
 */
var subTotal = 19.9
var tax = 0.13
var total = subTotal * (1 + tax)
console.log(total)


/**
 * 题目2: 用let或者const改写
 * 如果成绩在60分以上，则课程pass
 */
var point = 95
if(point >= 60) {
  var pass = true
}
console.log(pass)


/**
 * 计数器打印错误
 * 原因：i是var定义的，在全局范围内有效，所以全局只有一个变量i, 
 *      每一次循环，i的值都会发生改变，被赋值给函数内部的i，里面的i就指向全局的i。
 *      也就是说，数组成员内的i，指向的都是同一个i
 * 解决方案：(1)、var i 用 let 定义
 *          (2)、用闭包
 */
var a = []
var b = []
var c = []

for(var i = 0; i < 10; i ++) {
  a[i] = function() {
    console.log(i)
  }
  // 闭包写法
  b[i] = (function(j) {
    return () => { console.log(j) }
  })(i)
}
a[6](); // 打印的10.。why?
b[6]; // 打印的

/**
 * ES5不合理场景1：内层变量覆盖外层变量
 */
var temp = new Date()
function f() {
  console.log(temp)
  if(false) {
    var temp = 'hello world'
  }
}

f() // 输出结果是undefined, 因为内层的temp提升了，默认值是undefined

/**
 * ES5不合理场景2：用来计数的循环变量泄露为全局变量
 */
var a = []

for(var i = 0; i < 10; i ++) {
  a[i] = function() {
    console.log(i)
  }
}
a[6](); // 理想是打印6，但是实际打印的10



/**
 * 块级作用域与函数声明：
 *   ES5中打印出来的是个函数，执行出来打印的是i am inside, 因为函数整体提升了；
 *   ES6中打印出来的是undefined, 因为ff在块作用域中，有提升，但是没有赋值
 */
function ff() { console.log('i am outside') }
(function() {
  if(false) {
    function ff() { console.log('i am inside') }
  }
  console.log(ff) // 打印出来是undefined，函数在ES6情况下依然有声明提前
})()

/**
 * const: 声明常量，不能更改，而且只声明不赋值，是会报错的
 */
const name_x = 'hello'
const name_y  // 必须初始化赋值


/**
 * ES5的顶层对象属性于全局变量是挂钩的，var定义的变量能通过window.xxx访问
 */
var name_a = 10
console.log(window.name_a) // 打印10

const name_const = 100
console.log(window.name_const) // 打印undefined


/**
 * let: 声明变量，在代码块内有效，可更改
 * const: 声明常量，在代码块内有效，不可更改
 * 
 * 暂时性死区：
 *    代码块中存在let和const命令，这个区块对这些命令声明的变量，就会形成封闭作用域，
 *    凡是在声明之前就使用这些变量，会报错。
 * 
 * 没有变量提升的原因：
 *    为了减少运行时错误，防止在变量声明前就使用这个变量。
 * 
 * 为什么需要块级作用域：
 *    ES5只有全局作用域和函数作用域，会有很多不合理的场景。一个就是内层变量会覆盖外层变量，
 *    另一个场景就是用来计数的循环变量泄露为全局变量。
 * 
 * 函数声明：
 *    ES5中和ES6中对于函数在块级中声明，都有提升，此时的函数声明类似于var，即提升到全局作用域或者
 *    函数作用域的头部，同时，函数声明还会提升到所在的块级作用域的头部。
 *    所以ES6中的块级作用域内声明的函数，行为类似于var声明的变量，有提升。
 * 
 * const本质：
 *    const实际上不可重新赋值，并不是变量的值不得改动，而是变量指向的那个内存地址所保存的数据不得改动。
 *    对于简单数据类型来说，值就保存在变量指向的那个内存地址，等同于常量。但是对于引用类型的数据来说，
 *    变量指向的内存地址，保存的只是一个指向实际数据的指针，const只能保证这个指针是固定的，至于指向的
 *    数据是否可变，就不能控制了。
 * 
 * 顶层对象的属性：
 *    ES5中：顶层对象的属性于全局变量是挂钩的，因此 var 声明的变量能通过windw.xx访问，而let/const声明的则不能。
 *           所以导致的问题就是，无法在编译时就爆出变量未声明的错误，只有运行时才知道；其次，可能会不知不觉的创造
 *           一些全局变量；最后，window对象有自己的实体含义，而顶层对象时另一个有实体含义的对象，也不合适。
 *    ES6中：为了解决ES5的错误设计，在ES6中，使用let/const定义的全局变量，于顶层对象的属性是脱钩的，也就是不能再
 *          通过window.xxx访问了。
 * 
 * globalThis对象：
 *    这个对象就是顶层对象，提供全局环境，也就是全局作用域。所有代码都在这个环境中运行。
 *    
 */