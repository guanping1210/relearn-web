// 资料：https://www.jianshu.com/p/4efa7675834c
/**
 * Set 数据结构：数组结构，但是成员是唯一且有序的（用来去重）
 *  1、配合new使用
 *  2、add(value), 添加值
 *  3、has(value)  判断value是否是set中的成员
 *  4、delete(value) 删除set中的value值
 *  5、size 返回集合的元素个数
 */
var set = new Set()

set.add(1).add(2)

set.has(2) // true
set.has(10) // false

// 遍历
set.forEach(item => {
    console.log(item)
})

// 数组去重
var arr = [1,3,2,4,3,,5,6,2,3,1]

var a = [...new Set(arr)]
var b = Array.from(new Set(arr))

/**
 * weakSet:
 */

/**
 * map
 */

/**
 * weakMap
 */