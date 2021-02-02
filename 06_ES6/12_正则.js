/**
 * 正则：用于匹配字符串中字符组合的模式，在JS中，正则也是对象
 * 
 * test: 用来检测字符串是否符合正则表达式要求的地方
 * 
 * 元字符：有特殊意义的字符
 *  边界符号：
 *    ^ :  以什么开头
 *    $ :  以什么结尾
 * 
 *  字符类：
 *    []:  表示有一系列字符可供选择，只要匹配其中一个就可以了
 *    - ：表示范围，左边范围到右边范围
 *    [^]: 表示取反
 * 
 *  量词符：
 *    * ：重复0次或者N次
 *    + : 重复必须1次以上
 *    ? : 重复0次或者1次，表示有或者没有
 *    {n}: 重复n次
 *    {n,}: 重复n次以上
 *    {n, m}: 重复 n 到 m 之间的这么多次
 * 
 *  小括号：表示优先级
 * 
 *  预定义类：
 *    \d ： 表示0-9的数字，相当于[0-9]
 *    \D : 表示取反0-9，相当于[^0-9]
 *    \w : 匹配任意字母、数字和下划线，相当于[a-zA-Z0-9_]
 *    \W : 表示对\w取反，相当于[^a-zA-Z0-9_]
 *    \s : 表示空格(换行符、制表符、空格符),相当于[\t\r\n\v\f]
 *    \S : 表示匹配非空格的字符，相当于[^\t\r\n\v\f]
 * 
 *  replace: 正则替换
 * 
 *  表达式参数：
 *    g : 表示全局匹配
 *    i ：忽略大小写
 *    gi: 全局忽略大小写匹配
 */

//  1、RegExp对象创建
var reg = new RegExp(/\s$/) // 以空格结尾

// test测试
reg.test(' 123 ') // true
reg.test(' 123') // false

// 2、字面量创建
var reg2 = /\s$/

// test测试
reg2.test(' 123 ') // true
reg2.test(' 123') // false

// 3、边界符
var reg3 = /\abc/ // 有abc就行
var reg4 = /^abc/ // 必须以abc开头
var reg5 = /abc$/ // 必须以abc结尾
var reg6 = /^abc$/ // 精确匹配，要求必须是abc字符串，因为abc开头，abc结尾

// 4、[], 包含在其中的，有一项满足就行
var reg7 = /[abc]/ // 任意有a, b, c, ab, bc, abc的都符合条件
var reg8 = /^[abc]$/ // 三选一， 只有a 、b 、c这三个字符才符合条件，因为必须a开头，c结尾

// 5、- 表示范围
var reg9 = /[a-z]/ // 表示a-z之间的范围就行
var reg10 = /^[a-z]$/ // 表示a-z之间的任意一个字符都可以，只能有一个字符
var reg11 = /^[a-zA-Z]$/ // 表示a-z,A-Z之间的任意一个字符都可以，只能有一个字符

// 6、[^]，表示取反的意思，意思就是不能包含
var reg12 = /[^345]/ // 表示不能有3或者4或者5，才符合条件

// 7、量词
var reg13 = /^a*/ // 意思是让a出现N次
reg13.test('a')  // true 
reg13.test('aaa') // true
reg13.test('aaaaaaaa') // true

var reg14 = /a+/ // 表示a必须出现一次以上
reg14.test('b') // false
reg14.test('abca') // true

var reg15 = /a?/ // 表示a不存在或者存在
reg15.test('b') // true
reg15.test('abca') // true

var reg16 = /a{4}/ // a 出现4次
reg16.test('aaa') // false
reg16.test('aaaa') // true

var reg17 = /a{5,}/ // a 出现5次以上
var reg18 = /a{2,5}/ // a 最少出现2次，最多出现5次

// 案例：邮箱
var email = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
email.test('1558540766@qq.com') // true

// 案例：手机号
var phone = /^1[0-9]{10}$/
phone.test('15882442246')

// 正则替换：replace(正则，目标值), 返回新的字符串
var str = 'andy和maary'
str.replace(/aar/, 'baby')