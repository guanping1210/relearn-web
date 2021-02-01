/**
 * defineProperty 方法：定义对象中新属性或者修改原有的属性
 *      Object.defineProperty(obj. prop, descriptor)
 */

var star = {
    sing: 100
}

//  ES5添加属性
star.sing = 100

// es6添加属性
Object.defineProperty(star, 'dance', {
    value: 1000,
    
})

// es6修改sing属性
Object.defineProperty(star, 'sing', {
    value: 30000
})
