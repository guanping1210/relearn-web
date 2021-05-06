// @ts-nocheck
/**
 * https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Regular_Expressions
 * 正则表达式是用于匹配字符串中字符组合的模式
 */
var re = /ab+c/

"\\" // 表示的是 \，后面接的是特殊字符
"^" //  表示以^后面的内容为开始
"$" // 匹配输入的结束
"*" // 表示匹配0次货多次 {0, }
"+" // 表示至少出现一次 {1, }
"?" // 表示出现0次或者1次，{0, 1}
"." // 表示默认匹配除换行符之外的任何单个字符   (/./).test('a') true
"(x)" // 匹配x并记住匹配项
"(?:x)" // 匹配x，但是不记住匹配项