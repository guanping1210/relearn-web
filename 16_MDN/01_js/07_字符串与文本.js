// @ts-nocheck
/**
 * 字符串与文本
 */

// 1、字符串：JavaScript中用String类型来表示文本型的数据, 每个元素占据一个位置，字符下标从0开始
'foo'
"foo"

// 2、字符串对象 String
let foo = new String('foo')
foo // [String: 'foo']

let foo = 'foo'

foo.length // length属性可以表示字符个数
foo[0] // f, 表示取得第一个字符

foo[0] = 'xx' // 修改无效，因为字符串是不变的

foo // 'foo', 上面修改为 xx，是无效的

// 3、String对象提供的方法
charAt(index) // 返回index 位置的字符
charCodeAt(index) // 返回index位置的字符的ASCII编码数字
codePointAt(index) // 返回index位置的字符编码

indexOf(s) // 返回s字符所在的第一次出现的下标位置
lastIndexOf(s) // 返回s字符所在的最后一次出现的下标位置

startsWith(s) // 是否以s开头，是返回true，不是则返回false
endsWith(s) // 同上，只不过是判断以s结尾
includes(s) // 判断是否包含s

concat() // 拼接字符串
split(s) // 按照s的符号分割字符串，返回一个数组
slice(start, end) // 返回end - start 个字符，从start开始，包含start, 不包含end 

substring(start, end) // 返回end-start个字符，从start开始
substr(start, count) // 从start开始，返回count个字符

match(s), replace(s, x), search() // 正则匹配

'aabbcc'.match('ab') // ['ab', index: 1, input:'aabbcc']
'aabbcc'.replace('ab', 'x') // axbcc
'aabbcc'.search('ab') //  1, 返回的是第一次出现的下标

toLowerCase() // 小写
toUpperCase() // 大写

repeat() // 将字符串内容重复指定次数后返回
'abc'.repeat(3) // 'abcabcabc'

trim() // 去掉字符串开头和结尾的空白字符

// 4、多行模板字符串：允许内嵌string字面值，用 `` 来表示
var s = 'hello'
`
    111
    222
    333
    ${s} // 这儿就是hello
`

// 5、原生支持国际化：Intl
new Intl.DateTimeFormat()
new Intl.NumberFormat()
