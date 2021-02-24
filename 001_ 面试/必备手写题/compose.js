// @ts-nocheck
/**
 * 合成函数compose: 函数的扁平化，把层级嵌套的函数扁平化，把一个函数的运行结果当做下一个函数的参数的操作过程，叫做compose
 * 
 */
function fn1(x) {
    return x + 10
}

function fn2(x) {
    return x * 2
}

function fn3(x) {
    return x + 100
}

var x = 5
x = fn1(x) // 15
x = fn2(x) // 30
x = fn2(x) // 130

// compose 要得形式：compose(fn1, fn2, fn3)(5), 最后得出的结果还是130

/**
 * 从左往右执行：
 * compose核心： 使用迭代或者递归，在函数体内不断执行funcs中的函数，将上一个函数的执行结果传递给下一个函数
 *  1、最后返回的是一个函数, 这个函数能够接收参数
 *  2、接收的参数都是函数， 不限个数
 *  3、上一个函数的运算结果，是下一个函数的参数
 */
function compose(...funcs) {
    return function(...args) {
        // 第一个函数是接收的args参数，后面的函数接收的是上一次执行的结果
        let res = funcs[0](...args)

        for(let i = 1; i < funcs.length; i ++) {
            // 第一个函数是接收的args参数，后面的函数接收的是上一次执行的结果
            res = funcs[i](res)
        }

        return res
    }
}

var fn = compose(fn1, fn2, fn3) // 简单实现了
fn(5) // 得出结果130

// 上面是单个参数的版本，如果是多个参数呢 --> 好像多个参数和结果只返回一个值，对应不起来。。

// 上面是从左到右执行，如果是从右到左执行呢 --> 使用reduce或者修改遍历从尾巴上开始遍历即可

