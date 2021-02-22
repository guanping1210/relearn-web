// @ts-nocheck
/**
 * https://www.jianshu.com/p/e375ba1cfc47
 * 
 * reduce(callback, initial)
 *  callback有四个参数：prev与cur的类型不一定一致
 *      prev: 第一项或上一次叠加的结果值
 *      cur: 当前参与叠加的项
 *      index: 当前值的索引
 *      arr: 数组本身
 *  initial: 如果没有这个值，会默认取数据的第一项作为初始值
 *
 */
// 基础用法
var arr = [1,2,3,4]
var sum = arr.reduce((prev, cur, index, arr) => {
    return prev + cur
}, 0)

console.log(sum) // 1+2+3+4 = 10

var result = [
    { score: 80 },
    { score: 90 },
    { score: 88 },
]
var score = result.reduce((prev, cur, index, arr) => {
    return cur.score + prev
}, 0)

// 数组降维
var arrr = [1, [2,3], [4,5, [6]]]

const newArr = function(arr) {
    return arr.reduce((pre, cur) => {
        return pre.concat(Array.isArray(cur) ? newArr(cur) : cur)
    })
}

console.log(newArr(arrr)) // [1,2,3,4,5,6]

/**
 * js 源码实现 reduce  https://blog.csdn.net/Beijiyang999/article/details/80186242
 * 核心：
 *  1、接收两个参数，第一个是回调函数，第二个是初始值
 *  2、回调函数共有四个参数，分别表示上一个值、当前值，当前下标，整个数组
 *  3、如果没有初始值，那么默认取数组中的第一项为初始值
 *  4、上一个值，记录的是上一次操作过后的值
 * 实现步骤：
 *  1、不断的对数组的前两项取出，对其执行目标函数，计算得到的返回值
 *  2、把上述返回值填回数组首部，作为新的array[0]
 *  3、持续执行这个过长，直到数组中每一项都访问了一次
 *  4、返回最终结果
 */
Array.prototype.myReduce = function(callback, init) {
    let initialArr = this
    let arr = initialArr.concat()

    if(init) {
        arr.unshift(init)
    }

    let index, newValue

    while(arr.length > 1) {
        index = initialArr.length - arr.length - 1
        newValue = fn.call(null, arr[0], arr[1], index, initialArr)
    
        arr.splice(0, 2, newValue)
    }

    return newValue
}




// https://blog.csdn.net/weixin_44492275/article/details/112199248