// @ts-nocheck
/**
 * defineProperty 方法：定义对象中新属性或者修改原有的属性
 *      Object.defineProperty(obj. prop, descriptor)
 */

var star = {
    // sing: 100
}

//  ES5添加属性
// star.sing = 100

// es6添加属性
Object.defineProperty(star, 'dance', {
    value: 1000,
    writable: false, // 是否允许目标属性的修改， 默认是true
    enumerable: true, // 目标属性是否可以被枚举，默认是false, 默认不允许被遍历，也就是Object.keys这些是遍历不到的
    configurable: true, // 目标属性是否可以被删除，默认是false
})

star.dance = 10 // 修改失败，dance属性的值还是1000

// es6修改sing属性
Object.defineProperty(star, 'sing', {
    value: 30000
})

console.log(star)
