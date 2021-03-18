// @ts-nocheck
/**
 * 数组、对象的索引
 */

// 1、创建长度不为0，但是没有任何元素的数组
var arr = new Array(length)
var arr = Array(length)

var arr = []
arr.length = length

// 2、数组的下标其实也可以是指定值
var a = [1,2,3]

a.test = 100 // 可以指定下标为test，追加在最后面

a // [1,2,3, test: 100]

