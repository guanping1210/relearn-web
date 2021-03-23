// @ts-nocheck
/**
 * 运算符
 */
// 1、赋值运算符
x = y // 赋值
x += y // 加法赋值
x -= y // 减法赋值
x *= y // 乘法赋值
x /= y // 除法赋值
x %= y // 求余赋值
x ** = y // 求幂赋值（感觉有问题）
x <<= y // 左移位赋值
x >>= y // 右移位赋值
x >>>= y // 无符号右移位
x &= y // 按位与赋值
x ^= y // 按位异或赋值
x |= y // 按位或赋值

// 2、解构
var foo = ['one', 'two', 'three']

var [one, tow, three] = foo

// 3、比较运算符
3 == '3' // true，等于，类型会默认转换
2 != 3 // true，不等符号
3 === 3 // true，全等符号，类型也必须一致
3 !== '3' // true，不全等
3 > 2 // true，大于符号
3 >= 2 // true, 大于等于符号
3 < 2 // false，小于符号
3 <= 2 // false, 小于等于符号

// 4、算术运算符
1 + 2 // 3, 加号
2 - 1 // 1, 减号
2 / 1 // 2, 除号
2 * 1 // 2, 乘号
1 % 2 // 1, 求余数

var a = 1
console.log(a++) // 打印1： 先读取a = 1, 再执行 a = a + 1
console.log(a) // 打印2
console.log(++a) // 打印3：先执行a = a + 1, 再读取 a 的值
console.log(a) // 打印3

a--  // 分析与上一样
--a 

-a // 取反

2 ** 3 // 得到8，指数运算符
var a = 2
a **= 3 // 此时a = 8 = 2 * 2 * 2

// 4、位运算符：将操作数视为32位元的二进制串，由0和1组成的数
var a = 12, b = 20 // 其实被视为了十进制

a.toString(2) // 1100 --> 二进制
b.toString(2) // 10100 --> 二进制

a & b // 4, 按位与：每一个对应的位都为1则返回1，否则返回0 --> 结果是 1100 & 10100 => 00100 ->100
a | b // 28, 按位或: 每一个对应的位，只有一个为1则返回1，否则返回0 --> 结果是 11100, 转为十进制就是28
a ^ b // 24, 按位异或：每一个对应的位，两个不相同则返回1，否则返回0 --> 11000
~a // -1101, 按位非：反转被操作数的位 --> 最后得到的是-13， 没想通
a << 2 // 48, 左移：将a的二进制向左移动b位，右边移入0 --> 1100 表示往左移动2位，变成了110000
a >> 2 // 3， 右移：将a的二进制表示向右移动b位，丢弃被移出的所有位 --> 1100表示往右移动2位，变成了0011, 所以就是3
a >>> 3 // 1, 无符号右移：把a的二进制表示向右移动b位置，丢弃被移出的所有位，并把左边空出的位都填充0 --> 1100 向右移动3位，变成了0001，就变为了1

// 5、逻辑运算符 --> 能够转为false的值有：null, 0, NaN, 空字符串, undefined
expr1 && expr2 // 逻辑与，如果expr1能转为false, 返回expr1；否则返回expr2；用于布尔时，都为 true 才返回true

0 && 2 // 0
1 && 2 // 2
true && false // false
true && true // true

expr1 || expr2 // 逻辑或，任意一条件为true，均返回true

0 || 2 // 2
1 || 2 // 1
true || false // true
false || false // false

!expr1 // 逻辑非，操作数能够转为true, 取反，则返回false, 否则返回true

!0 // true
!4 // false

// 6、字符串运算符：+，表示把左右两个字符串拼接起来
'xxx' + 'yyy' // 'xxxyyy'
12 + '40' // '1240, 数字12会被默认转为字符串的12

+'40' // 40, 但是字符串前面单独一个加号，是表示把字符串的数字变为真正的数字类型
+'xxx' // NaN

// 7、 三元运算符: 条件 ? 值1 : 值2, 条件为真，取值1，否则取值2
12 > 18 ? '真的' : '假的' // 假的
30 > 18 ? '真的' : '假的' // 真的

// 8、delete 操作符，表示删除一个对象的属性或者一个数组中某一个键值
var obj = {
    name: 20,
    age: 40
}

delete obj.name
console.log(obj) // { age: 40 }, name属性已经被删除了

// 9、typeof 操作符，表示返回一个operand类型的字符串值 --> 对构造函数得出来得，都是function类型
typeof 1 // 'number'
typeof '1' // 'string'

typeof true // 'boolean'
typeof null // 'object'
typeof undefined // 'undefined'

typeof {} // 'object'
typeof (() => {}) // 'function'
typeof Symbol // 'function'

typeof typeof {} // 'string', 对第一个typeof的出来得值，再进行第二次typeof，得到的永远是string类型

// 10、void 运算符，表示一个运算没有返回值
void expression 

'<a href="javascript:void(0)">点击我</a>'

// 11、in 操作符：表示所指定的属性是否存在于指定的对象中，存在则返回true
var obj = {
    name: 10
}

name in obj // true
age in obj // false, 因为age属性并不在obj中

// 12、instanceof 操作符：判断一个对象是否是指定的类型，是的话就返回true --> 内部原理是原型链查找
2 instanceof Number // false

var a = new Number(2)
a instanceof Number // true

// 13、表达式：是一组代码的集合，返回一个值

// 14、new 关键字：用来创建一个自定义类型或者是预置类型的对象实例
new Object({ name: 10 }) // { name: 10 }
new Object([1,2,3,4,5]) // [1,2,3,4,5]

// 15、super 关键字：用来调用一个对象父类的函数，在用来调用一个类的父类的构造函数时非常有用；因为子类是没有this的
//  不显示调用super，其实系统会默认执行一下super
super(arguments) // 调用parent.constructor

class Parent {}
class Child extends Parent {} // 内部自动执行constructor() { super() }

class Child extends Parent {
    constructor() {
        // 内部不执行super，在new一个实例的时候就会报错 -- 未捕获的引用错误
    }
}

new Child() // Uncaught ReferenceError: Must call super constructor in derived class before accessing 'this' or returning from derived constructor