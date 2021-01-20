// @ts-nocheck
/**
 * 1、fromCodePoint: 从unicode码点返回对应字符串，不能试别大于0xFFFF的字符
 */
console.log(String.fromCodePoint(0x20BB7))

/**
 * 2、raw: 返回一个连斜杠都被转义的字符串
 */
console.log(String.raw`Hi\n${2+3}!`) //  Hi\n5!
console.log(String.raw`Hi\u000A!`) // 实际返回 "Hi\\u000A!"，显示的是转义后的结果 "Hi\u000A!"
console.log(String.raw`Hi\\n`) // // 返回 "Hi\\\\n", 显示的Hi\\n

/**
 * 3、codePointAt: 正确处理 4 个字节储存的字符，返回一个字符的码点
 */
console.log('123'.codePointAt(0))
console.log('123'.codePointAt(1))
console.log('123'.codePointAt(2))

/**
 * 4、normalize: 用来将字符的不同表示方法统一为同样的形式
 */

 /**
  * 5、includes(): 返回布尔值，表示是否找到了参数字符串
  *    startsWith(): 返回布尔值，表示参数字符串是否在元字符串的头部
  *    endsWith(): 返回布尔值，表示参数字符串是否在原字符串的尾部
  */
let ss = 'hello world'

console.log(ss.includes('o w')) // true
console.log(ss.includes('ow')) // false

console.log(ss.startsWith('he')) // true
console.log(ss.startsWith('ld')) // false

console.log(ss.endsWith('he')) // false
console.log(ss.endsWith('ld')) // true

/**
 * 6、repeat(): 返回一个新字符串，表示将源字符串重复N次
 *    参数为小数，会向下取整
 */
console.log(ss.repeat(3)) // 'hello worldhello worldhello world'
console.log(ss.repeat(1.4)) // hello world

/**
 * 7、padStart(): 头部补全字符串, 默认使用空格填补
 *    padEnd(): 尾部补全字符串, 默认使用空格填补
 */
console.log('x'.padStart(4, 'ab')) // abax
console.log('x'.padStart(5, 'ab')) // ababx
console.log('x'.padStart(5)) // '    x'

console.log('x'.padEnd(4, 'ab')) // xaba
console.log('x'.padEnd(5, 'ab')) // xabab

/**
 * 7、trimStart() | trimLeft(): 消除头部空格
 *    trimEnd() | trimRight(): 消除尾部空格
 */
const sss = '  mimi nini n '

console.log(sss.trimStart()) // 'mimi nini n '
console.log(sss.trimEnd()) // '  mimi nini n'

/**
 * 8、matchAll: 返回一个正则表达式在当前字符串的所有匹配
 */

/**
 * 9、replaceAll(): 替换所有
 */
console.log('aabbc'.replace('b', '-')) // aa-bc
// 该方法ES2021支持
console.log('aabbc'.replaceAll('b', '-')) // aa--c


