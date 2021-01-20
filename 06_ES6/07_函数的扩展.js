/**
 * 1、length属性：返回没有默认值的参数个数，也就是参数个数减去设置了默认值的个数
 */
console.log((function(a, b) {}).length) // 2

console.log((function(a, b = 10) {}).length) // 1, 因为b设置了默认值

/**
 * 2、name属性：返回函数的函数名
 */
function ff() {}

console.log(ff.name) // ff

/**
 * 3、箭头函数：=>
 *    注意点：(1)、函数体内的this，是定义时所在的对象，而不是使用时所在的对象
 *           (2)、不可以当构造函数
 *           (3)、不可以使用arguments对象，该对象在函数体内不存在，如果要用，用rest参数替代
 *           (4)、不可以使用yield命令，因为箭头函数不能用作Generator函数
 */
function ffo() {
    setTimeout(() => {
        console.log('id', this, this.id)
    }, 100)
}
var id = 21

ffo() // window下是打印 21， node环境下是undefined
ffo.call({ id: 42 }) // 42

/**
 * 4、尾部调用：一个函数的最后一步，调用的另一个函数(一定是最后一条语句直接调用一个函数)
 * 
 * 特殊点：函数内部会形成一个调用记录，会保存调用位置的内部变量等信息，形成一个调用栈
 */
function g() {
    return 20
}

function gg() {
    // 不算尾部调用
    // const y = g()
    // return y

    // 不算尾部调用
    // return g() + 1

    // 尾部调用
    return g()
}

/**
 * 5、尾递归：函数调用自身，称为递归；如果尾调用自身，则是尾递归
 *    递归消耗内存多，因为需要保留成千上百个调用帧，容易栈溢出；但是尾递归不会，因为只存在一个调用帧。
 */
// 容易溢出，因为需要保存n个调用记录
function factorial(n) {
    if(n === 1) return 1
    return n * factorial(n - 1)
}

// 尾递归改造 --> 把中间数据记录下来，复杂度为O(1)
function factorial2(n, total) {
    if(n === 1) return total
    return factorial2(n - 1, n * total)
}

// 非尾递归的Fibonacci函数
function Fibonacci (n) {
    if ( n <= 1 ) {return 1};

    return Fibonacci(n - 1) + Fibonacci(n - 2);
}

Fibonacci(10) // 89
Fibonacci(100) // 超时
Fibonacci(500) // 超时

// 尾递归优化
function Fibonacci2 (n , ac1 = 1 , ac2 = 1) {
    if( n <= 1 ) {return ac2};
  
    return Fibonacci2 (n - 1, ac2, ac1 + ac2);
}

Fibonacci2(100) // 573147844013817200000
Fibonacci2(1000) // 7.0330367711422765e+208
Fibonacci2(10000) // Infinity

/**
 * 6、函数柯里化：将多参数的函数转换为单参数的形式
 */