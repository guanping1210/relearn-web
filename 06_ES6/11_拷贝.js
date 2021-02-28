// @ts-nocheck
/**
 * 浅拷贝：只拷贝第一层，更深层次对象级别的只拷贝引用，但是第一层还是新开辟的内存空间
 * 深拷贝：每一层的数据，都新开辟一个内存空间保存下来
 */
var obj = {
    id: 1,
    name: 'zhudy',
    msg: {
        age: 20
    }
}
var o = {}

// 只拷贝了第一层，多层还是会受到影响
for(let k in obj) {
    o[k] = obj[k]
}

// 浅拷贝
Object.assign(oo, obj)

// 浅拷贝
o = { ...obj }

// 深拷贝: 需要考虑的复杂数据类型有数组、对象，因为这两种类型的初始值是不一致的
function deepClone(newObj, oldObj) {
    // 核心就是判断属性类型
    for(let k in oldObj) {
        const item = oldObj[k]

        if(item instanceof Array) { // 数组也是对象，所以写在前面，会更精确
            newObj[k] = []
            deepClone(newObj[k], item)
        } else if (item instanceof Object) {
            newObj[k] = {}
            deepClone(newObj[k], item)

        } else {
            newObj[k] = item
        }
    }
}

deepClone(o, obj)

// 浅拷贝：只拷贝第一层的数据，基本数据直接赋值，引用数据也是直接赋值，拷贝的内存地址
function qianClone(obj) {
    const newObj = {}

    for(let key in obj) {
        newObje[key] = obj[key]
    }

    return newObj
}

