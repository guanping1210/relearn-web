// @ts-nocheck
/**
 * 高阶函数: 接收函数作为参数或将函数作为返回值输出
 *  1、回调函数
 *  2、
 */
function fn(a, b, cb) {
    cb(a, b)
}

function cb(a, b) {
    console.log('高阶函数', a + b)
}

fn(1, 2, cb)


function fn2() {
    return function() {}
}