// @ts-nocheck
/**
 * js源码实现array的各种模拟实现  // https://blog.csdn.net/weixin_44492275/article/details/112199248
 * 
 * map
 * forEach
 * flat
 * flatMap
 * every
 * some
 * concat
 * 
 */
var arr = [1,2,3,4,5]
// map
var arr_map = arr.map((item, index, array) => {
    console.log(item, index, array)
    return item
})
/**
 * js 模拟 map 核心：
 *  1、接收一个回调函数
 *  2、回调函数有三个参数值
 *  3、最后返回一个新数组
 */
Array.prototype.myMap = function(fn) {
    var newArr = []
    for(var i = 0; i < this.length; i ++) {
        newArr[i] = fn(this[i], i, this)
    }

    return newArr
}

// forEach
arr.forEach((item, index, array) => {
    console.log(item, index, array)
})

/**
 * js 模拟 forEach 核心：
 *  1、接收一个回调函数
 *  2、回调函数有三个参数值，代表当前项、下标、原数组
 */
Array.prototype.myForEach = function(fn) {
    for(var i = 0; i < this.length; i ++) {
        fn(this[i], i, this)
    }
}

// reduce --> 看有个单独的reduce文件

// split

// concat

// flat --> 拍平数组，能够指定排平多少层级
var arrb = [1, [2, [3, [4]]]]
arrb.flat() // 多维度降低一个维度
arrb.flat(Infinity) // 多维全部排平

/**
 * js 模拟 flat 核心：先实现无限拍平，然后中间加条件判断，就能够实现指定维度拍平
 *  1、接收一个参数，表示拍平的维度
 *  2、内部需要一个新数组记录结果值，然后就是设定一个递归函数来表示操作
 *  3、这个递归函数就是对数组的每一项做判断，如果是数组
 *  3、返回一个新数组
 */
Array.prototype.myFlat = function(depth) {
    var newArr = []
    var depthArg = depth || 1 // 默认是排平一层
    var depthNum = 0 // 记录进行了第几次拍平

    flatMap = (arr) => {
        arr.map((cur, index, array) => {
            if(Array.isArray(cur)) {
                if(depthNum < depthArg) { // 数组且展开层级还未到指定值，则递归执行flatMap
                    depthNum ++
                    flatMap(cur)
                } else { // 数组但是已经达到指定深度了，直接推入
                    newArr.push(cur)
                }
            } else {  // 非数组，直接往结果数组中怼就行了
                newArr.push(cur)
            }
        })
    }

    flatMap(this)

    return newArr
}

// flatMap --> 将flat与map结合起来，对于map出来的结果，会自动拍平一层
[1,2,3,4].map(x => [x * 2]) // [[2],[4],[6],[8]]

[1,2,3,4].flatMap(x => [x * 2]) // [2,4,6,8]

// every
var arr_every = arr.every((item, index, array) => {
    // 每一项都符合条件才返回true
    return item > 0
})

/**
 * 模拟 every 核心：
 *  1、接收一个回调函数，带有三个参数
 *  2、条件判断每一项目都为true，最后结果才为true
 */
Array.prototype.myEvery = function(fn) {
    var trueArr = []

    for(var i = 0; i <this.length; i ++) {
        if(fn(this[i], i, this)) {
            trueArr.push(true)
        }
    }

    return trueArr.length === this.length
}

// some
var arr_every = arr.every((item, index, array) => {
    // 有一项都符合条件都返回true
    return item > 0
})

/**
 * 模拟 some 核心：
 *  1、接收一个回调函数，带有三个参数
 *  2、条件判断每一项目都为true，最后结果才为true
 */
Array.prototype.mySome = function(fn) {
    for(var i = 0; i <this.length; i ++) {
        if(fn(this[i], i, this)) {
            return true
        }
    }

    return false
}

// concat --> 拼接数组
var b = [1, [2]].concat([3,[4]])

/**
 * js 模拟 concat 核心：
 *  1、接收任意个参数，参数类型不限定，
 *  2、返回一个新的数组
 */
Array.prototype.myConcat = function(...args) {
    var newArr = this

    for(var i = 0; i < args.length; i ++) {
        if(Array.isArray(args[i])) {
            for(var j = 0; j < args[i].length; j ++) {
                newArr.push(args[i][j])
            }
        }
        newArr.push(args[i])
    }

    return newArr
}

[1, [2]].myConcat([3,[4]], 3,4, 5)

// splice --> 删除指定位置的指定个数的数据，然后在指定位置添加数据；返回的是删除的数据 --> 原数组上操作
var aa = [10, 20, 30, 40, 50]
aa.splice(1, 2, 100) // 删除下标为1开始的两个数据，也就是删除20，30，然后添加100为下标为1的数据

/**
 * splice 原理分析：splice(x, n, ...args)
 *  1、至少接受一个参数，表示从下标为x的地方开始操作
 *  2、n 如果省略，那么下标为X往后的数据都会被删除；n 如果有具体的值，那么从下标为X的地方往后数n个数据进行删除
 *  3、args 如果省略，那么表示不需要在下标为x的地方添加数据；如果有值，那么把args代表的值，添加到
 *  4、修改的是原数组，原数组会变化；然后返回一个新数组，新数组表示被截取掉的数组
 *  5、如果x, n是非数值类型，那么原数组不会发生变化
 */
Array.prototype.mySplice = function(x, n, ...args) {
    if(typeof x !== 'number') {
        return this
    }

    if(n && typeof n !== 'number') {
        return this
    }
}