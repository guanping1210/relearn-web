// @ts-nocheck
/**
 * JS相关的冷门知识：
 *  1、this的指向
 *  2、块级作用域
 *  3、函数 length 的取值
 *  4、函数参数重名问题
 *  5、JS中的类型错误
 *  6、new Function
 *  7、不用var声明的变量，不会提升
 *  8、哪种for循环最快
 */

//  1、this --> 普通函数：指向调用者 + 箭头函数：永远指向定义时的上下文 + 定时器：永远指向全局window/global
var obj = {
    sex: 'girl',
    getSex: function() {
        console.log(this.sex)
    },
    getOther: () => {
        console.log(this.sex)
    }
}

// 普通函数，this指向的是调用者，getSex是obj调用的，所以指向了obj
obj.getSex() // 'girl' --> obj.sex
obj.getSex.call({ sex: 'boy' }) // 'boy' --> this经过call改变了

// 箭头函数，this指向的是函数定义时所在的上下文, 也就是obj定义时的作用域，是全局作用域
obj.getOther() // undefined --> window.sex
obj.getOther.call({ sex: 'boy' }) // undefined --> window.sex --> 箭头函数的this，只取决于定义时的作用域，与调用者无关


// 2、块级作用域 (https://juejin.cn/post/6844903955814694919)
// {} 会产生块级作用域，但是由于浏览器的差异性，会有不同的兼容方式
{
    a = 10
    function a() {}
}
console.log(a) //  10

{
    function b() {}
    b = 20
}
console.log(b) // function b(){}

// 3、函数属性 length 的取值 --> 取的是第一个实参之前的形参个数
function fn(a, b) {}
fn.length // 2 --> a + b

function fn2(a = 1, b) {}
fn2.length // 0 --> a 是第一个实参，前面没有形参，所以结果是0

function fn3(a, b = 1) {}
fn3.length // 1 --> b是第一个实参，前面有一个形参a, 所以结果是1

// 4、函数参数重名问题
function f(a, a) {
    console.log(a + a)
}

f(1, 2) // 打印出 4， 因为相当于刚开始给a赋值1，得出1+1等于2结果，但是被第二个a赋值2给覆盖了； 严格模式下是不允许重命名的

// 5、JS 中的类型错误

// 6、new Function --> 类似于eval， 可以执行字符串类型的代码，还可以传递参数
var con = new Function('console.log(123)')
con() //  打印123

var con2 = new Function('x', "console.log(x)")
con2(200) // 打印200， 接收的参数

//  7、不使用var定义的变量，不会有提升
console.log(a)  // a is not defined
a = 100

c = 10
{
    function c() {}
}
console.log(c)


c = 10 
{
    console.log('1_', c)
    c = 20
}
console.log('2_', c)


c = 10 
{
    console.log('1_', c)
    function c() {}
}
console.log('2_', c)


function c() {}
{
    console.log('1_', c)
    c = 30
}
console.log('2_', c)


{
    c = 10
    console.log('1_', c, window.c)
    function c() {}
    console.log('3_', c, window.c)
}
console.log('2_', c)

{
    c = 10
    console.log('1_', c, window.c)
    // function c() {}
    c = 40
    console.log('3_', c, window.c)
}
console.log('2_', c)


{
    function c() {}
    console.log('1_', c, window.c)
    c = 30
}
console.log('2_', c)


{
    function c() {}

    console.log('1_', c, window.c)
    c = 30

    console.log('3_', c, window.c)
}
console.log('2_', c)

/**
 * 8、 最快的循环
 *      for 倒叙比for正序要快，因为只需要计算一次arr.length，而for正序每次都要计算;
 *      forEach是Array的原型方法，需要花更多的时间进行迭代；
 */
var million = 1000000
var arr = Array(million)

console.time('start')
for(let i = arr.length; i > 0; i --) {} // 大概1.5s

for(let i = 0; i < arr.length; i ++) {} // 大概1.77s

arr.forEach(v => v) // 大概1.829s

for(const v of arr) {} // 大概16s
console.timeEnd('start')