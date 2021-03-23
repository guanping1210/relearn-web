// @ts-nocheck
/**
 * 带键的集合：由key值标记的数据容器
 * 
 * Map和Set对象承载的数据元素可以按照插入时的顺序被迭代遍历
 */

// 1、Map对象
new Map() // 创建一个map实例

map.set(key, value) // 添加元素，没有key则新建，key已经存在就更新
map.get(key) // 获取key键的value值
map.delete(key) // 删除key键，以及存储的value值
map.has(key) // 判断key是否在map中存在

map.size // 获取map的数据个数
map.clear() // 清空map内部存储的数据

/**
 * 2、Object和Map的比较
 *  Object的键必须是string类型;Map的键可以是任意类型
 *  Object的尺寸必须手动计算；Map通过size可以直接获取到尺寸；
 *  Object的遍历是无序的； Map的遍历遵循元素的插入顺序
 *  Object有原型，所以映射中有一些缺省的键，可以用Object.create来规避
 */
 var anObj = { 100: 'a', 2: 'b', 7: 'c' }
 Object.keys(anObj) // [2,7,100], 与书写的键名顺序不一致，所以object的遍历是无序的

 var map = new Map()
 map.set(100, 'a')
 map.set(2, 'b')
 map.set(7, 'c')

//  用for in 遍历不出来，用for of和forEach是可以的
for(let key of map) {
    console.log(key) // 遍历打印出来的是[key, value]数组, [100, 'a'],[2,'b'],[7, 'c'], 说明map的遍历是按照插入顺序来遍历的
}


/**
 * 3、WeakMap对象：键必须是对象类型；而且是不可枚举的
 *    键弱引用：意思是当键所指的对象没有被其他地方引用时，就会被GC回收掉
 */
var wp = new WeakMap()

var obj1 = {}
var obj2 = {}

wp.set(obj1, 10)
wp.set(obj2, 100)

wp.get(obj1) // 10
wp.get(obj2) // 20

/**
 * 4、集合Set对象：是一组值的集合，但是这些值是不重复的；可以按照添加顺序来遍历
 */
var set = new Set()
set.add(10)
set.add(20) // [10,20]

set.add(10)
set.add(20) // 还是只有[10,20]

set.has(20) // true, 判断20是否在set结构中

for(let key of set) {
    console.log(key) // 打印 10, 20
}

Array.from(set) // 转为真正的数组，因为之前的set是不可以用map forEach等方法的
var arr = [...set] // 转为数组

var set2 = new Set([1,2,3,4, 4]) // 数组转为set结构，同时还可以去重

/**
 * 5、WeakSet 对象：是一组对象的几个，其中的对象不重复且不可枚举
 *    内部的对象，也是弱引用，会被GC回收的；值必须是对象
 */
var ws = new WeakSet()
var obj1 = {}
var obj2 = {}

ws.add(obj1)
ws.add(obj1)
ws.add(obj2) // 内部还是只有一个obj1, 一个obj2

ws.has(obj1) // true


