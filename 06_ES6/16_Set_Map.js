// @ts-nocheck
// 资料：https://www.jianshu.com/p/4efa7675834c
/**
 * Set 数据结构：数组结构，但是成员是唯一且有序的（用来去重）
 *  1、配合new使用
 *  2、add(value), 添加值
 *  3、has(value)  判断value是否是set中的成员
 *  4、delete(value) 删除set中的value值
 *  5、size 返回集合的元素个数
 * 
 * Set和Map的主要应用场景是在于数据重组和数据存储
 * Set是一种叫做集合的数据结构，Map是一种叫做字典的数据结构
 * 
 * Set，类似于数组，但成员是唯一且无序的，没有重复的值；允许存储任何类型的唯一值，无论是原始值还是对象引用
 * Set 加入值，不会发生类型转换，所以 5 和 '5'，是两个不同的值
 */
var set = new Set()

set.add(1).add(2)

set.has(2) // true
set.has(10) // false

// 遍历 keys(返回所有键), values(返回所有值), entries(返回所有元素), forEach
// map、filter
set.forEach(item => {
    console.log(item) // 1, 2
})

set.keys() // SetIterator { 1,2,3 }
set.values() // SetIterator { 1,2,3 }
set.entries() // SetIterator { 1,2,3 }

// 数组去重 --> 转为数组
var arr = [1,3,2,4,3,,5,6,2,3,1]

var a = [...new Set(arr)]
var b = Array.from(new Set(arr))

/**
 * weakSet: 是个对象，允许将弱引用对象存储到一个集合中
 *  与Set的区别：
 *      1、WeakSet只能存储对象引用，不能存放值，而Set对象可以
 *      2、WeakSet 中存储的对象值都是弱引用，这个对象会被垃圾回收掉，所以WeakSet对象里有多少个成员，取决于垃圾回收机制
 *      3、WeakSet无法遍历
 */
let ws = new WeakSet()
let obj = {}, foo = {}

ws.add(window)
ws.add(obj)

ws.has(window) // true
ws.has(foo) // false

ws.delete(window) // true
ws.delete(window) // false

/**
 * Map 字典: 也是个对象，保存键值对，任何值(对象或者原始值)都可以作为一个键或一个值
 *  与Object的区别：
 *      1、Object的键只能是字符串或者Symbol，但是Map的键可以是任何值，包括函数、对象、基本类型
 *      2、Map中的键值是有序的，而对象中的键则是无序的
 *      3、Map的键值对个数可以通过size属性获取，但是Object的键值对个数只能手动计算
 *      4、Map可以直接进行迭代，而Object的迭代需要先获取键数组，再迭代
 *      5、Object有自己的原型
 *      6、Map在设计频繁增删键值对的场景下会有性能优势
 * 
 * 集合Set、WeakSet与字典Map、WeakMap的区别：
 *  共同点：集合、字典可以存储不重复的值
 *  不同点：集合是以[value, value]的形式存储元素，字典是以[key, value]的形式存储
 * 
 * 任何具有Iterator接口、且每个成员都是一个双元素的数组的数据结构，都可以当做Map构造函数的参数
 */
const map = new Map()

map.set(['a'], 555)
map.get(['a']) // undefined, 表面上看是同一个建，但是实际上两个的内存地址是不一样的，因此get方法无法读取该键值


/**
 * weakMap：也是个对象，是一组键值对的集合，其中建是弱引用对象，值可以是任意
 */

/**
 * 总结:
 * Set：
 *  成员唯一，无序且不重复
 *  [value, value]，键值与键名是一致的
 *  可以遍历，方法有add、delete、has
 * 
 * WeakSet:
 *  成员都是对象
 *  成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
 *  不能遍历，方法有add、delete、has
 * 
 * Map:
 *  本质上是键值对的集合，类似集合
 *  可以遍历，方法很多可以跟各种数据格式转换
 * 
 * WeakMap:
 *  只能接收对象作为键名，不能接收其他类型的值作为键名
 *  键名是弱引用，键值可以是任意的，键名指向的对象可以被垃圾回收，此时键名是无效的
 *  不能便来，方法有get、get、has、delete
 * 
 * js中的类型，是弱类型，可以相互转换的。
 * Map是强引用，WeakMap是弱引用，弱引用就不会屏蔽垃圾回收机制
 * 
 * 垃圾回收机制中有一个引用算法，就是一个对象有其他对象引用的话，就不会被回收
 */
var obj = { a: 1 }
var b = obj.a // obj.a被引用着，那么obj是不会被垃圾回收的（强引用是不会被回收的）

var obj = { name:'gp' }
var a = new WeakMap()

a.set(obj, 'hello world') // 当一个对象仅仅是被一个WeakMap作为键值引用着的话，还是会被回收的
console.log(a.get(obj)) // 'hello world'