// @ts-nocheck
/**
 * 函数：是JS的基本组件之一
 */

// 1、定义函数： 函数声明
function fn() {

}

// 1.1 定义函数：函数表达式
const fn = function() {}

// 1.2 定义函数：构造函数
const fn = new Function('a', 'b', 'console.log(a+b)')
fn(1,2) // 打印3


// 2、调用函数：因为定义了的函数，并不会自动执行，调用的时候才会真正执行这些操作
fn(4,5) // 打印9

/**
 * 3、函数作用域：在函数内部定义的变量不能在函数之外的地方访问，因为仅在内部有定义；但是一个函数，可以随意访问其范围外的任何变量和函数
 *    全局域中的函数可以访问所有在全局域中的变量；
 *    在另一个函数中定义的函数，也可以访问其父函数中的所有变量
 */
function fn() {
    var a = 10

    function cb() {
        console.log(a)
    }

    cb() // 打印出 10
}

/**
 * 4、作用域和函数堆栈
 */
// 4.1 递归：一个函数可以调用并指向自身（函数名调用、argument.callee、作用域的下一个指向该函数的变量名）--> 实际上内部就是函数堆栈
function factorial(n) {
    if(n <= 1) {
        return 1
    } else {
        // return n * factorial(n - 1) // 通过函数名，实现自己调用自己
        return n * arguments.callee(n - 1) // callee属性，返回正被执行的function对象，也就是所指定的function对象的上下文(不推荐使用，消耗很大)
    }
}

function foo(n) {
    if(n < 0) {
        return 
    }
    // 打印的是begin 3 2 1 0，然后再打印end 0 1 2 3 
    console.log('begin', n)
    foo(n - 1)
    console.log('end', n)
}

// 4.2 嵌套函数和闭包：函数内部可以嵌套函数，内部函数对外部的函数是私有的。
//  总结：内部函数只可以在外部函数中访问；内部形成了一个闭包：它可以访问外部函数的参数和变量，但是外部函数却不能使用它的参数和变量
function outSide(x) {
    function inSide(y) {
        return x + y
    }

    return inSide // 内部形成了闭包，因为可以调用外部函数并对外部函数和内部函数指定参数
}
var fn = outSide(10)
var fa = fn(5) // 得到结果 15

var fb = outSide(20)(10) // 得到结果30

// 4.3 保存变量：上面的inside被返回时，x是怎么被保留下来的 --> 一个闭包必须保存它可见作用域中的所有参数和变量
//  每一次对外部含糊的调用实际上都重新创建了一遍这个闭包，只有当返回的inside没有被再次引用时，内存才会被释放

// 4.4 多层嵌套函数：A包含B，B包含C，B和C就形成了闭包；同时C可以访问B和A，B可以访问A，因此，闭包可以包含多个作用域
//  闭包递归式的包含了所有包含它的函数作用域，这样就形成了作用域链
function A(x) {
    function B(y) {
        function C(z) {
            console.log(x + y + z)
        }

        C(10)
    }
    B(20)
}

A(30) // 得到最后的结果是30+20+10 = 60

// 4.5 命名冲突：同一个作用域下的参数和变量有同名时，更近的作用域有更高的优先权。
//  这就是作用域链，链的第一个元素就是最里面的作用域，最后一个元素便是最外层的作用域
function outside() {
    var x = 5
    function inside(x) {
        return x * 2
    }

    return inside
}
outside()(10) // 返回的的是20，并不是10，说明接收的x是等于10，而不是5
// 作用域链
//  | inside  |
//  | outside |
//  | window  |
//  -----------

// 4.6 闭包: 内部函数的作用域以任意方式被外部作用域所访问时，就产生了闭包 --> 事实上，闭包就是产生了一个延长作用域的作用
//  内部函数的生存周期比外部函数的生存周期长时，就产生了闭包

var getCode = (function() {
    var code = 'kfnslnf' // 本来code应该在自执行的时候就被GC的，但是被内部的匿名函数给引用了，延长了code的作用域
    return function() {
        return code
    }
})()

console.log(getCode()) // 得出的是kfnslnf

/**
 * 5、arguments 对象：函数的实际参数会被保存到arguments对象中，这是个类数组
 */
arguments[i] // i表示下标
arguments.length // 表示实际参数的数量

function fn() {
    console.log(arguments)
    console.log(arguments.length)
}

fn(1,2,3,4,5) // Arguments(5)[1,2,3,4,5]; 长度为5

/**
 * 6、函数参数：默认参数、剩余参数；没有传递的参数的值默认是undefined
 */
function fn(a = 10, b) {
    b = typeof b === 'undefined' ? 1 : b // 对b做一个预处理

    return a * b
}

fn(15, 2) // 15 * 2 = 30
fn(1) // 1 * 1 = 1
fn() // 10 * 1 = 10

// 剩余参数：将不确定数量的参数表示为数组
function fn(first, ...other) {
    return other.map(x => first *x)
}

var arr = fn(2,1,2,3)
console.log(arr) // [2,4,6]

/**
 * 7、箭头函数：
 *  更简洁;
 *  this的词法：ES6之前this的指向包括：构造函数中指向实例对象；严格模式下是未定义的；作为对象方法中调用是指向这个对象
 */
var arr = [1,2,3,4,5]
arr.map(item => item * item) // [1,4,9,16,25]

function Person() {
    this.age = 0

    // ES 3/5里，通过把this赋值给一个变量，可以修复这个问题 --> 其实核心原理是setTimeout是全局函数，内部的this固定是window
    var that = this
    that.age = 0

    // setTimeout(function() {
    //     console.log(this.age) // 打印结果是NaN 
    //     this.age ++
    // }, 1000)

    setTimeout(() => { // 箭头函数捕获上下文的this, 此时的age = 1
        this.age ++
    }, 1000)
}
var p = new Person() // { age: 0 } , age并没有在定时器的作用下变为1


/**
 * 8、预定义函数
 *  eval()  对字符串的JS代码进行执行操作
 *  isFinite() 判断传入的值是否是有限的数值
 *  isNaN() 判断一个值是否是NaN， not a number, 表示是用来判断一个值是否是非数字
 *  parseFloat() 解析字符串参数，返回一个浮点数
 *  parseInt() 解析字符串参数，返回整数
 *  decodeURI() 对encodeURI函数进行解码
 *  decodeURIComponent 对encodeURIComponent解码
 *  encodeURI() 用一个两个三个或四个转义序列对UTF-8 的字符进行编码
 *  encodeURIComponent() 编码
 */
eval('1+2') // 3

isFinite(10) // true
isFinite(Math.pow(2, 10000)) // 表示2的10000次方，已经是无限的数值了

isNaN(10) // false
isNaN('10') // false, 虽然是字符串类型，但是内部会隐式的转换一下
isNaN('xxx') // true，字符串类型，且不可转为数值类型

encodeURI('冲突') // "%E5%86%B2%E7%AA%81"
decodeURI("%E5%86%B2%E7%AA%81") // "冲突"


/**
 * 函数域是指函数声明时所在的地方，而不是调用的地方;
 * 函数一定要处于调用他们的域中，但是函数的声明可以被提升，出现在调用语句之后；
 * 函数提升只适用于函数声明，而不适用于函数表达式
 */

 var NumArray = function(nums) {
    const n = nums.length;
    this.sums = new Array(n + 1).fill(0);
    for (let i = 0; i < n; i++) {
        this.sums[i + 1] = this.sums[i] + nums[i];
    }
};

NumArray.prototype.sumRange = function(i, j) {
    return this.sums[j + 1] - this.sums[i];
};
