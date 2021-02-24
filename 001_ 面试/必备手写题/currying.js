// @ts-nocheck
/**
 * 函数科里化curry：把一个多参数的函数改为接收单一参数的函数
 *  参数复用；
 *  
 */
// 普通函数
function add(x, y) {
    return x + y
}

// 科里化之后 --> 实际上就是把多个参数，改为调用N次，每次接收一个参数
function add(x) {
    return function(y) {
        return x + y
    }
}

add(1)(2) // add(1)执行之后，返回一个函数，使得2后面可以执行

/**
 * 核心原理：参数从右往左传递
 *  1、通过函数调用不断的收集参数
 *  2、等到收集的参数个数等于原始函数的参数个数的时候，执行函数; 而收集的参数是在作为函数调用的时候才会收集到参数
 *  3、如果接收的参数个数小于函数形参，那么一直收集
 * 
 *  1、每次只接收一个参数
 *  2、每个参数，都是被记录下来了的
 */
// 第一版是固定参数，后续应该要实现不固定参数个数的实现
function curry(func, args) {
    var length = func.length // funcs.length，获取的是形参的个数
    var args = args || [] // 把第一次初始化的参数获取到

    return function() {
        var totalArgs = [].slice.call(arguments) // 收集参数
        totalArgs = totalArgs.concat(args) // 将之前的参数和当前参数合并为一个数组

        if(totalArgs.length < length) { // 如果收集的参数个数小于形参个数，则继续收集
            return curry.call(this, func, totalArgs) // 不断的调用curry函数
        }

        // 参数收集完毕，执行func函数
        return func.apply(this, totalArgs)
    }
}   

function addSum(a,b,c,e,d) {
    return a + b + c + e + d
}

var getSum = curry(addSum)
getSum(1)(2)(3)(4)(5) // 15, 参数收集是[5,4,3,2,1]
