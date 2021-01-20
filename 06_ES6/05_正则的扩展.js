/**
 * 1、RegExp 构造函数: new RegExp(表达式，修饰符)
 */
var regex1 = new RegExp('xyz', 'i')
var regex2 = /xyz/i
var regex3 = new RegExp(/xyz/i)

/**
 * 2、字符串的正则方法：match()、replace()、search()、split()
 */
console.log('abc'.match('ab'))
console.log('abc'.replace('ab', '_')) // _c
console.log('abc'.search('b')) //  1, 返回的index
console.log('abc'.split(',')) // [ '', 'c' ]

/**
 * 3、修饰符：
 *    . : 表示除了换行符以外的任意单个字符
 *    \u: 字符表示法
 *    {n}: 量词
 *    /u: 预定义模式
 *    \S: 空白字符串
 *    /i: 
 */