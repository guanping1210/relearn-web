// @ts-nocheck
/**
 * 1、数字：JavaScript中的数字都是双精度浮点类型，数字精度是53位，在正负2^-1023和正负2^1024之间
 *          整数数值仅在正负2^53-1的范围内可以表示明确
 * 
 *  现在支持BigInt类型，能够表示极大的数字；但是不能与Number类型直接进行运算，也不能用Math对象去操作BigInt类型
 */
+Infinity // 正无穷
-Infinity // 负无穷
NaN // 非数字


// 2、十进制数字：可以以0开头，但是下一个数字小于8的话，会被当成八进制处理
1234

0888 // 888 当做十进制处理
0777 // 非严格模式下会被当做八进制处理（用十进制表示就是511）

// 3、二进制数字：以0为开头，后面接一个大写或小写的拉丁文字母B；后面接的数字必须是0或者1，不能接大于等于2的数字
0b101010 // 42
0B101010 // 42

// 4、八进制数字：以0开头，后面接0-7范围内的数字(ES5严格模式下禁止使用八进制语法，通过小o前缀来支持全部)
0755 // 493
0644 // 420 ==> 6 * Math.pow(8, 2) + 4 * Math.pow(8, 1) + 4 * Math.pow(8, 0)

0o10 // ES6的八进制写法，0后面要天机按一个小o

// 5、十六进制：以0x或者0X开头，后面接的数字范围在0-9A-F之间
0xFFF // 4095 --> 一个F表示15, 15 * Math.pow(16,2) + 15 * Math.pow(16,1) + 15 * Math.pow(16,0) = 4095
0xA // 10

// 6、指数形式
1E3 // 表示1 * Math.pow(10, 3) = 1000
2e6 // 表示2 * Math.pow(10, 6) = 2000000
0.1e2 // 表示 0.1 * Math.pow(10, 2) = 10

// 7、数字对象Number：内置Number对象有一些数字的常量属性
Number.MAX_VALUE // 1.7976931348623157e+308 可表示的最大值
Number.MIN_VALUE // 5e-324 可表示的最小值
Number.POSITIVE_INFINITY // Infinity 正无穷
Number.NEGATIVE_INFINITY // -Infinity 负无穷
Number.NaN // NaN 非数字

Number.parseFloat()
Number.parseInt()
Number.isFinite()
Number.isInteger() 
Number.isNaN()
Number.isSafeInterger()

Number.toFixed() // 返回执行小数位数的表示形式

// 8、数学对象Math：内置常用属性和方法
abs() // 绝对值
sin(), cos(), tan() // 三角函数, 参数是弧度
asin(), acos(), atan(), atan2() // 反三角函数
sinh(), cosh(), tanh() // 双曲三角函数
asinh(), acosh(), atanh() // 反双曲三角函数

pow(), exp(), expm1(), log10(), log1p(), log2() // 指数与对数函数
floor(), ceil() // 返回小于等于参数的最大整数；返回大于等于参数的最小整数
min(), max() // 返回一个以逗号间隔的数字参数列表中的较小或较大值(分别地)

random() // 返回0和1之间的随机数

round(), fround(), trunc() // 	四舍五入和截断函数

sqrt(), cbrt(), hypot() // 平方根，立方根，所有参数平方和的平方根 两个参数平方和的平方根

sign() // 数字的符号, 说明数字是否为正、负、零。

clz32() // 在32位2进制表示中，开头的0的数量
imul() // 返回传入的两个参数相乘结果的类C的32位表现形式


// 9、日期对象 Date：内置了方法来处理日期和时间（Date对象的范围是相对距离UTC 1970年1月1日的前后 100000000 天）
// get和set，可以用来获取时分秒、年月日
new Date() // Thu Mar 18 2021 10:25:26 GMT+0800 (中国标准时间)

new Date().getFullYear() // 2021 年
new Date().getMonth() // 2, 因为是从0开始的，所以2 其实表达的是 2 + 1 = 3月份
new Date().getDate() // 18 号
