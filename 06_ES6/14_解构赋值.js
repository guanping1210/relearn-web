/**
 * 对象、数组都可以解构赋值
 */
// 数组解构：按照下标对应
let [a, b, c] = [1, 2, 3]
a // 1
b // 2
c // 3

// 对象解构：按照属性名对应
// 可以赋值默认值，以及别名
let { name, age: ageName } = { name: 'heelo', age: 20 }


/**
 * 扩展运算符: ...
 *  1、能够将伪数组变为真的数组，主要用于DOM集合
 *  2、Array.from(), 也能将伪数组转变为真正的数组
 */

var arrayLike = {
  "0": 'zhangsan',
  "1": 'lisi',
  "2": 'wangwu',
  "length": 3
}

Array.from(arrayLike)
