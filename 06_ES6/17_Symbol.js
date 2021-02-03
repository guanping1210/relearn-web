/**
 * Symbol：ES6新增的数据类型，表示独一无二的值，是一种类似于字符串的数据类型
 *  不能与其他类型进行运算；
 *  
 * 
 * JS数据类型：string、number、Boolean、null、undefined、object、symbol
 */

// Symbol创建
// 每次都会创建一个新的symbol
let s = Symbol() // 内部实现了唯一性

let s2 = Symbol('hello')

let s3 = Symbol('hello')

console.log(s2 === s3) // false

// Symbol.for 创建，根据给定的key值，从注册表中找到对应的symbol
// 并不会每次都创建一个新的symbol, 会先检查key能否找到，找不到再注册一个新的
let s4 = Symbol.for('world')
let s5 = Symbol.for('world')

console.log(s4 === s5) // true

// 运用：向对象中添加方法
let methods = {
    up: Symbol(),
    down: Symbol()
}

let game = {
    up: 10,
    down: 100
}

// 不知道game内部是否已经有up和down，用symbol会安全，不会冲突
game[methods.up] = function() {
    console.log('上升')
}
game[methods.down] = function() {
    console.log('下降')
}


// 访问
game.up // 10
game.down // 100
game[methods.up] // 方法 上升
game[methods.down] // 方法 下降

// Symbol内置方法
// Symbol.hashInstance 检测试别的对象是否为构造函数的实例
class Person {
    static [Symbol.hasInstance](param) {
        console.log(param, '控制类型检测')

        return false
    }
}