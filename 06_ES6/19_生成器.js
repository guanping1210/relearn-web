// @ts-nocheck
/**
 * 生成器：就是一个特殊的函数，主要是用来解决异步的过程，能够控制执行的步骤。
 *         异步编程、纯回调函数...
 * 
 * yield: 函数代码的分隔符
 */

 function *gen(arg) {
     let one = yield 111
     console.log('one', one)
     
     let two = yield 222
     console.log('two', two)

      let three = yield 333
     console.log('three', three)
 }

// 能够控制yield的执行步骤，next方法能够接受实参
// 接受的参数将作为上一个yield的返回结果
// next接受的参数，作为上一次的结果返回
 let iterator = gen('AAA')
 iterator.next('BBB') 
 iterator.next('CCC') 
 iterator.next('DDD') 

 // 案例：1s后输出111, 2s后输出222, 3s后输出333
 function one() {
     setTimeout(() => {
         console.log('1s后')
         iter.next()
     }, 1000)
 }
 function two() {
    setTimeout(() => {
        console.log('2s后')
        iter.next()
    }, 1000)
}
function three() {
    setTimeout(() => {
        console.log('3s后')
        iter.next()
    }, 1000)
}

function *step() {
    yield one()
    yield two()
    yield three()
}

let iter = step()
iter.next()

// 案例二：获取用户数据、订单数据、商品数据，数据之间有先后顺序
// 适用场景：解决异步回调，控制多个有数据关联关系的接口的调用顺序
function getUser() {
    setTimeout(() => {
        let data = {
            name: 'zhangsan',
            id: 1
        }
        // 调用next方法，并传递参数
        iterat.next(data)
    }, 1000)
}

function getOrder(args) {
    console.log('order参数', args)
    setTimeout(() => {
        let data = `${args.id} 订单数据`
        iterat.next(data)
    }, 1000)
}

function getGoods(order, args) {
    console.log('goods参数',order, args)
    setTimeout(() => {
        let data = '商品数据'
        iterat.next(data)
    }, 1000)
}

function *userCase() {
    let user = yield getUser()
    console.log(user)
    let order = yield getOrder(user)
    console.log(order)
    let goods = yield getGoods(order, user)
    console.log(goods)
}

let iterat = userCase()
iterat.next()
