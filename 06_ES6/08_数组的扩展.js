
let arrayLike = {
    0: 'a',
    1: 'b',
    2: 'c',
    length: 3
}

// ES5写法
var arr1 = [].slice.call(arrayLike)

// ES6写法：Array.from: 把类似数组的对象转变为真正的数组 --> 常见的DOM操作返回的NodeList集合；函数内部的arguments对象
var arr2 = Array.from(arrayLike)

console.log(arr1, arr2)

// Array.of
console.log(Array.of(1,2,3,4)) // [1,2,3,4]
function Arrayof() {
    return [].slice.call(arguments)
}

// copyWith
var arr = [1,2,3,4,5]

console.log(arr.copyWithin(0, 3)) // [4,5,3,4,5], 表示把3号位置知道数组结束的成员，复制到从0号位开始的位置
console.log(arr)

// find((value, index, arr) => {})
var arrr = [1,2,3,4,5]

console.log(arrr.find(m => m > 3)) // 4

// findIndex((value, index, arr) => {})
var arrrr = [5,4,3,2,1]

console.log(arrrr.find(m => m < 3)) // 2, 这个2表示下标,是3的下标

// fill(value, start, end)
console.log([1,2,3].fill(10)) // [10, 10, 10]
console.log([1,2,3].fill(10, 1, 2)) // [1, 10, 3]

// entries, keys, values
var ar2 = [10,20,30]

console.log(ar2.entries())
console.log(ar2.keys())
console.log(ar2.values())

// includes
console.log(ar2.includes(10)) // true
console.log(ar2.includes(50)) // false

// flat
console.log([1,[2], [[3]]].flat(2)) // [1,2,3]
console.log([1,[2], [[3]]].flat(Infinity)) // [1,2,3]


// flatMap
console.log([1, 2, 3].flatMap(n => n * n)) // [1,4,9]
console.log([1, [2], [[3]]].flatMap(n => n * n)) // [1,4,9], flatMap默认全部抹平

// sort



/**
 * 1、Array.from(): 把类似数组的对象转变为真正的数组
 * 2、Array.of()：将一组值，转换为数组
 * 3、copyWith(target, start, end): 将指定位置的成员复制到其他位置（会覆盖原有成员），然后返回当前数组
 * 4、find(): 找到第一个符合条件的数组成员
 * 5、findIndex(): 返回第一个符合条件的数组成员的位置
 * 6、fill(): 使用特定值，填充数组
 * 7、entries(): 遍历键值对
 * 8、keys(): 遍历键名
 * 9、values(): 遍历键值
 * 10、includes(): 判断数组是否包含给定得值
 * 11、flat(): 拉平数组
 * 12、flatMap(): 对原数组得每个成员执行一个函数
 * 13、sort(): 排序，默认按照ASCII码排序
 */