// @ts-nocheck
/**
 * 改变this指向：call apply bind --> this始终指向调用者
 *  call(xxx, ...args) 执行函数，返回函数执行的结果
 *  apply(xxx, [...args]) 执行函数，返回函数执行的结果
 *  bind(xxx) 不会执行函数，而是返回一个函数
 */
// call 用法
function getName() {
    return this.name
}

const person = { name: 'gp' }

getName.call(person) // 表示是person调用的getName，打印结果是gp

/**
 * 核心原理：给传递进去的对象，加一个属性，指向当前函数；然后执行这个对象.xxx，表示执行了这个方法 
 */
Function.prototype.myCall = function() {
 const [ctx, ...args] = arguments // ctx表示this修改指向的对象值
 ctx.fn = this // 给ctx新增一个属性，指向this，而这个this，就是指向当前这个函数
 const res = ctx.fn(...args) // 执行这个函数，函数可能有返回值
 
 delete ctx.fn // 删除新增的fn属性值
 return res
}

function myCall(fn, ...params) {
    const [obj, ...args] = params

    obj.fn = fn
    const res = obj.fn(...args)

    delete obj.fn
    return res
}

// apply 用法
getName.apply(person)

/**
 * 核心原理：传递进去的对象，添加一个属性指向当前函数，然后执行这个属性
 */
Function.prototype.myApply = function() {
    const [ctx, args] = arguments

    ctx.fn = this
    const res = ctx.fn(...args)

    delete ctx.fn
    return res
}

function myApply(fn, obj, args) {
    obj.fn = fn
    const res = obj.fn(...args)

    delete obj.fn
    return res
}

// bind: 不会执行, 可以传递多个参数，返回的函数调用也是可以传递参数的; 返回的函数也是可以作为构造函数的
const fn = getName.bind(person)
fn() // 'gp'

/**
 * 核心原理：通过一个中间函数来实现继承， 由于返回函数还能作为构造函数，需要特殊处理原型  --> 还是有一些没想通
 */
Function.prototype.myBind = function() {
    const [ctx, ...args] = arguments
    const self = this // 这里的this指向声明的函数，声明的函数是Function的实例

    const fnOP = function(){}
    const fn = function() {
        self.apply(this instanceof fn ? this : ctx, args.concat(arguments)) // this instanceof fn，能够判断是不是使用了new，作为构造函数使用了。如果作为构造函数使用了，那么这个this是指向实例的
    }

    // 把self的原型赋值给fnOP, 后面fn的原型赋值给new fnOP, 这样就和原型断开了
    // 后面修改fn 的原型也不会影响到self, 即当前声明函数的原型
    fnOP.prototype = self.prototype
    fn.prototype = new fnOP()

    return fn
}