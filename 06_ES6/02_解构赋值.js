// @ts-nocheck
/**
 * 1、数组的解构赋值:
 *  可以直接从数组中提取值，按照对应的位置，给变量赋值;解构不成功，变量的值就等于undefined；
 *  数组的解构是有顺序的
 */
let [a, b, c] = [1, 2, 3]
console.log(a, b , c) // 打印1，2，3

let [x, y, z] = new Set(['a', 'b', 'c'])
console.log(x, y, z) // 打印a,b,c

function * fibs() {
    let a = 0
    let b = 1
    while(true) {
        yield a; // 为什么这个分号不加，就是[1,1]呢
        [a, b] = [b, a + b]
    }
}

let [first, second, third, fpurth, fifth, sixth] = fibs()
console.log(first, second, third, fpurth, fifth, sixth)

/**
 * 解构允许指定默认值
 */
function f() {
    console.log('aaa')
    return 20
}
let [m = f()] = []
let [n = f()] = [1]

console.log(m) // 打印的20,因为m取不到值，只能执行f()
console.log(n) // 打印的1,因为n能够取到值，不会执行f()


/**
 * 2、对象的解构赋值：解构变量必须于属性同名，才能取值；取值是无顺序的；也能默认赋值
 *  注意下面的bar是匹配模式，xxxx才是真的变量名；
 */
let { foo, bar: xxxx, baz } = { foo: 'aaa', bar: 'bbb'}

console.log(foo, xxxx, baz) // aaa, bbb, undefined

/**
 * 3、字符串解构赋值, 类似数组的对象都有个length属性
 */
let [h, e, l, o] = 'helo'
console.log(h,e,l,o) // h, e, l o

let { length } = 'hello'
console.log(length) // 5

/**
 * 4、数值和布尔值的解构赋值: 会先转为对象
 */
let { toString: s } = 123
console.log(s === Number.prototype.toString) // true

let { toString: v } = true
console.log(v === Boolean.prototype.toString) // true

/**
 * 5、函数参数的解构赋值
 */
function add([x, y]) {
    return x + y
}

console.log(add([1,2])) // 3

/**
 * 6、关于圆括号 -- 不能使用的情况：变量声明语句、函数参数、赋值语句
 */
let [(h)] = [1]; // 报错
function fff([(z)]) { // 报错
    return z
};
let ([a]) = [5]; // 报错

/**
 * 7、关于圆括号 -- 能使用的情况：赋值语句的非模式部分
 */
[(b)] = [3]; // 正确
({ p: (d) } = {}); // 正确
[(parseInt.prop)] = [3]; // 正确

/**
 * 核心：只要某种数据解构具有Iterator接口，都可以采用数组形式的解构赋值
 * 
 * 解构用途：
 *  交换变量的值：[x, y] = [y, x];
 *  从函数返回多个值;
 *  函数参数的定义；
 *  提取json数据；
 *  函数参数的默认值；
 *  遍历map结构；
 *  输入模块的指定方法
 */
