// @ts-nocheck
/**
 * 1、基础：JS是借鉴了Java的大部分语法：
 *  1、区分大小写，使用unicode字符集
 *  2、JS语句，用分号(;)进行分割 --> 但是后面的项目中，好像都不写分号了（因为语句末尾会自动插入分号）
 *  3、javascript源码，是从左到右被扫描并转换成一系列由token、控制字符、行终止符、注释和空白字符组成的输入元素
 * 
 * 2、注释
 * 
 * 3、声明，有三种方式：
 *  1、var 声明一个变量，可赋予一个初始值（是在全局对象里新建一个属性）
 *  2、let 声明一个块作用域的局部变量，可选初始化一个值; 同一个块不能重复声明
 *      let声明的重复性检查发生在词法分析阶段，也就是在代码开始执行之前检查
 *      var 定义的全局变量，存储在[[Scopes]][1]:Global下，也就是全局对象；
 *      let 定义的全局变量，存储在[[Scopes]][0]:Script这个变量对象的属性中
 * 
 *  3、const 声明一个块作用于的只读变量，必须赋值；同一个块不能重复声明 --> 不变的意思是指内存块所存储的地址不能变，但是如果是引用类型，那么值是可以变的
 *      
 * 
 * 4、变量，有一定的命名规则：
 *  1、区分大小写
 *  2、必须以字母、下划线_或者美元符号$开头,后续的字符也可以是数字
 * 
 * 5、变量的作用域：
 *  1、函数之外声明的变量，叫全局变量，因为文档中的任何其他代码都可以访问
 *  2、函数内部声明的变量，叫局部变量，因为只能在当前函数的内部访问
 *  3、ES6之后，出现了块作用域 --> 出现的原因其实是变量提升，会导致变量混乱
 * 
 * 6、变量提升： https://www.cnblogs.com/forcheng/p/13033976.html
 *  1、变量被提升到函数或语句的最前面，提升后返回undefined值
 *  2、也就是可以先使用变量再声明变量而不会引发异常
 *  3、ES6中，let/const也会被提升到代码块顶部但是不会赋予初始值，在变量声明之前引用这个变量，就会抛出引用错误()
 *  
 * 7、函数提升：函数声明会提升到顶部，但是表达式不会提升
 * 
 * 8、数据结构和类型
 *  基本数据类型：Boolean、null、undefined、Number、String、Symbol、BigInt
 *  引用数据类型：Object(万物皆对象)
 * 
 * 错误类型：
 *  1、引用错误，ReferenceError，通常出现在访问一个未声明的变量
 * 
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Grammar_and_types
 * 
 */


// 单行注释

/* 嵌套注释 */

/**
 * 多行注释
 */

/**
 * 3、声明变量
 *  var 定义的全局变量，存储在[[Scopes]][1]:Global下，也就是全局对象
 *  let 定义的全局变量，存储在[[Scopes]][0]:Script这个变量对象的属性中
 */
var a // undefined
var b = 10 // 10

let c // undefined
let d = 20 // 20

const f = 30 // 30, 不可更改

console.log(this.b) // var 声明的b变量，能够通过去全局对象来访问
console.log(this.d) // let 声明的d变量，全局对象上就找不到

// 5、变量作用域名 --> 语句块中声明的变量将成为语句块所在函数或全局作用域的局部变量
if(true) {
    var x = 5
    let y = 5
}
console.log(x) // 5
console.log(y) // ReferenceError: y没有被声明

// 6、变量提升
console.log(zz === undefined) // true, 在声明之前就可以使用变量了，而不会报错
var zz = 100 // 等价于：var zz; console.log(zz === undefined); zz = 100


/**
 * 9、数据类型的转换：javascript是一种动态类型语音，也就是在声明时不必指定数据类型，而数据类型会在代码执行时根据需要自动转换
 *  1、+ 号，会把数字转为字符串，但是其他运算符，不会把数组变为字符串
 *  2、parseInt()、parseFloat()，会把数字的字符串转为对应的数字,证书或浮点数
 */
var answer = 42 // number类型
answer = 'hello' // 此时变为了string类型

'37' + 7 // '377'
'37' - 7 // 30

parseInt(' 37 ') // 37

