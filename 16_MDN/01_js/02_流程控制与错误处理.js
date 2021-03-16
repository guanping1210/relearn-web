// @ts-nocheck
/**
 * 分号，用来分割语句的
 * 
 * 语句与表达式：任何表达式都可以看作是一条语句
 *  
 */
// 1、语句块，用{}包裹起来的
{
    var a = 10;
    let b = 20;

    console.log(a, b)
}

// 2、条件判断语句
if(true) {
    // ...
} else {
    // ...
}

// 3、会被计算为false 的值
false
undefined
null
0
NaN
''

// 4、原始的true/false，与Boolean对象构造出来的实例时有区别的
var b = new Boolean(false)
if(b) {} // 结果被判断为真
if(b === true) {} // 结果被判断为假

// 5、switch语句：允许一个程序求一个表达式的值并且去匹配表达式的值得到一个case标签
switch(expression) {
    case 'a': {
        // ...
    }
    case 'b': {
        // ...
    }
    default: {
        // ...
    }
}

// 6、异常处理语句：用throw可以抛出一个异常，用try ... catch来捕获
try{
    try{ throw '121212'}catch(err) {} // 不会被外面捕获到

    throw '异常'
} catch(err) {
    console.log(err)
} finally {
    console.log('不管怎么样，我都会执行')
}

// 7、Error对象