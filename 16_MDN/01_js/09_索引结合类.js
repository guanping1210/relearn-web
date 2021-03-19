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

// 2、数组常用方法
arr.length // 获取数组长度

concat() // 拼接数组
join(xx) // 将数组按照xx的分隔符连接为字符串

// 原数组会直接变化的方法
push() // 末尾添加一个元素，返回数组的新的长度
pop() // 从数组移出最后一个元素，返回移出的元素
shift() // 从数组移出第一个元素， shift单词的意思就是转移
unshift() // 在数组开头添加一个元素，unshift单词的意思就是不转移

slice(start, end) // 提取数组片段, 包含start, 不包含end，返回一个新数组 --> 不会改动原数组
splice(index, count, replace) // 在原数组上改动数组，在index位置后截取count个元素，然后把replace追加到index位置

reverse() // 调到数组元素，是在元素组上改动
sort() // 数组排序，改动原数组

indexOf(xx) // 返回xx元素的下标，不存在则返回-1
lastIndexOf(xx) // 反向搜索下标

// 以下方法都是接收一个回调函数，回调函数内部有三个参数，分别是item, index, array
forEach() // 遍历，不需要返回值
map() // 遍历，需要返回值，返回的是个数组
filter() // 筛选符合条件的
every() // 数组中的每项都满足条件，就返回true
some() // 数组中有一项满足条件，就返回true

// * 很重要的方法
reduce(callback, initialValue) // 使用callback方法，把数组列表计算成一个单一的值，数组元素两两递归

// 3、类数组对象：
document.getElementsByTagName() // 返回的NodeList
arguments // 参数列表

Array.prototype.xxx.call(mmm, fn) // 把mmm类数组，转为可使用数组的xxx方法
[].splice.call(mmmm) // 