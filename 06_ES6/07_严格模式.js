const { StrictMode } = require("react");

/**
 * 严格模式：消除代码不安全的地方，禁用了未来的高级语法；
 *           全局脚本或个别函数中，都可以开启严格模式
 * 
 * 变化：
 *  1、变量规定：变量没声明就赋值，是错误的
 *  2、this指向：非严格模式在全局作用域下this指向window，严格模式先全局作用域中this指向的undefined
 *  3、构造函数：严格模式下，构造函数不加new来调用this绑定的内部属性，都是undefined
 *  4、new 实例化的构造函数指向创建的对象实例
 *  5、定时器还是指向window
 *  6、事件、对象还是指向调用者 
 *  7、禁止函数参数重名
 *  8、函数必须在调用前声明
 */
'use strict' // 开启严格模式

function Star() {
    this.xxx = 'mmmm'
}

console.log(Star.xxx) // undefined, 和模式没什么关系。这是构造函数的特性

function fn(a, a) {
    console.log(a + a)
}

fn(1, 2) // 普通模式下结果为4， 严格模式下报错，不允许形参重名