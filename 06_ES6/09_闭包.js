/**
 * 变量作用域：
 *  全局变量：
 *  局部变量：
 * 
 *  1、函数内部可以使用全局变量
 *  2、函数外部不可以使用局部变量
 *  3、当函数执行完毕，本作用域内的局部变量会销毁
 * 
 * 闭包: 只要有权访问另一个函数作用域中变量的函数，也就是一个作用域可以访问另一个作用域的变量
 * 作用：延申了变量的作用范围
 * 
 *  表现形式：返回一个函数
 */

const { isJSDocClassTag } = require("typescript")

function fn() {
    var num = 10

    function fun() {
        console.log(num)
    }

    // fun()  已经产生了闭包，因为fun能够访问fn作用域内的变量num

    return fun
}

var f = fn() // 把fun返回给f, 那么f能够访问到fn作用域内的变量num, 也就是fn外部的作用域能够访问到内部的num
f() 



var funs = []

for(var i = 0; i < 5; i ++) {
    // 数组中的每个函数执行打印的结果都是5，因为访问的是全局的i
    // funs[i] = function() {
    //     console.log(i)
    // }

    // 方案一：闭包，其实是内部形成了一个独立的函数作用域, 创建了多个立即执行函数
    (function(j) {
        funs[j] = function() {
            console.log(j)
        }
    })(i)

    // 方案二：把var i 改为 let i， 因为let自带块作用域，限定在当前块内才有用
}

funs[2]()


var name = 'hello'
var obj = {
    name: 'world',
    getName: function() {
        return function() {
            return this.name
        }
    },
    getName2: function() {
        var that = this
        return function() {
            return that.name
        }
    }
}
var ff = obj.getName()  // 类似于ff = function(){ return this.name }, 匿名函数，没有闭包产生，此时this指向全局window
ff() // 'hello'

var fff = obj.getName2() // 类似于fff = function(){ return that.name }, 引用了其他作用域的that，就产生了闭包, 此时this指向的是obj
fff() // 'world'


/**
 * 闭包：就是一个函数，能够扩展
 * 作用：延申变量的作用范围
 */



