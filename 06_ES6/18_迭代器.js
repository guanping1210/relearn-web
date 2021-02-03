// @ts-nocheck
/**
 * 迭代器Iterator: 是一种接口，为各种不同的数据结构提供统一的访问机制。
 *                 任何数据结构只要部署了Iterator接口，就可以完成遍历操作。
 * 
 * Iterator接口主要提供for...of消费，也就是能够使用for...of遍历
 * 
 * 原生具备Iterator接口的数据：
 *  Array
 *  Arguments
 *  Set
 *  Map
 *  String
 *  TypedArray
 *  NodeList
 * 
 * Iterator原理：--> 适用于需要自定义遍历数据的场景
 *  1、创建一个对象指针，指向当前数据结构的起始位置
 *  2、第一次调用对象的next方法，指针自动指向当前数据结构的第一个成员
 *  3、接下来不断调用next方法，指针一直往后移动，直到指向最后一个成员
 *  4、每次调用next方法，返回一个包含value和done属性的对象
 * 
 */

//  对数组，遍历出来的是值
var arr = ['嘻嘻嘻', 'hhhhh', 'wubwhw']

for(let v of arr) {
    console.log(v)
}

// 构造iterator
var iterator = arr[Symbol.iterator]()

console.log(iterator.next()) // { value: '嘻嘻嘻', done: false }
console.log(iterator.next()) // { value: 'hhhhh', done: false }
console.log(iterator.next()) // { value: 'wubwhw', done: false }
console.log(iterator.next()) // { value: undefined, done: true }

// 自定义具备Iterator的数据 --> 需求：能够遍历obj,但是要求每次遍历结果返回的都是stats中的项目
var obj = {
    name: '终极一班',
    stats: [
        'xiaoming',
        'xiaohua',
        'dahua',
        'dawang'
    ],
    // 添加iterator,下面的for of 才不会报错
    [Symbol.iterator]() {
        let index = 0
        let that = this
        return {
            next: function() {
                if(index < that.stats.length) {
                    index ++
                    return {
                        value: that.stats[index],
                        done: false,
                    }
                }
                return {
                    value: undefined,
                    done: true,
                }
            }
        }
    }
}

for(let v of obj) {  // uncaught TypeError: obj is not iterator, 说明obj是不可被遍历的，因为内部并没有iterator属性
    console.log(v)
}
