/**
 * 1、isFinite(): 检测数值是否为有限的
 *    isNaN(): 检测一个值是否为NaN
 */
console.log(Number.isFinite(4)) // true
console.log(Number.isFinite(Infinity)) // false

console.log(Number.isNaN(9)) // false
console.log(Number.isNaN('9')) // false
console.log(Number.isNaN(NaN)) // true

/**
 * 2、parseInt(): 浮点数取整，去掉小数点
 *    parseFloat(): 浮点数不变
 */
console.log(Number.parseInt('90.3')) // 90.4
console.log(Number.parseFloat('90.3')) // 90.3

/**
 * 3、isInteger(): 判断一个数值是否为整数
 *    Javascript能够准确表示的整数范围在-2^53到2^53之间，不含两个端点，查过这个范围，无法精确表示这个值
 */
console.log(Number.isInteger(25)) // true
console.log(Number.isInteger(25.7)) // false

// 判断错误：因为JS采用IEEE754标准，数值存储为64位双精度格式，精度最多达到53个二进制位
// 该数据的小数的精度达到了小数点后16个十进制位，转为二进制位超过了53个二进制位，导致后面的2被丢弃了
console.log(Number.isInteger(3.0000000000000002)) // true

/**
 * 3、指数运算
 */
console.log(2 ** 2) // 4, 2进行2次运算
console.log(2 ** 3) // 8，2进行3次运算

/**
 * 4、BigInt: 表示整数，没有位数的限制，任何位数的整数都可以精确表示，后缀加n表示是BigInt类型
 */
console.log(1n + 2n) // 3n
console.log(42n === 42) // false
console.log(typeof 42n) // bigInt