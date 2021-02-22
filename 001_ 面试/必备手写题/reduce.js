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

// js 源码实现