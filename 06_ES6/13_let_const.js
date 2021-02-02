// @ts-nocheck
/**
 * ES6新增的声明变量的语法：都会产生块级作用域
 *  let 
 *  const
 */

//  let 声明的变量只能在块级内部访问
if(true) {
    let a = 10
};

console.log(a) // ReferenceError，找不到a

// const 声明常量，就是内存地址不能变的，而且必须赋予初始值
const PI = 3.1415926

if(true) {
    const a = 10
    if(true) {
        const a = 20
        console.log(a) // 20
    }
    console.log(a) // 10
}
console.log(a) // a is not defined


/**
 * JS错误类型：
 *  1、SynataxError： 错误类型
 *  2、Uncaught ReferenceError: 引用错误
 *  3、RangeError: 范围错误
 *  4、TypeErrpr: 类型错误
 *  5、URIError: 类型错误
 *  6、EvalError: eval()函数执行错误
 */


