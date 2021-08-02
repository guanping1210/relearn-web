function promise1 () {
    return new Promise(function(resolve, reject) {
        resolve(10)
    })
}

function promise2() {
    return new Promise(function(resolve, reject) {
        resolve(20)
    })
}

function promise3() {
    return new Promise(function(resolve, reject) {
        reject('error')
    })
}

promise1().then(res => {
    // 应该打印10
    console.log(res)
})

promise2().then(res => {
    // 应该打印20
     console.log(res)
})

promise3().then(null, error => {
    // 应该打印error
    console.log(error)
})

promise3().catch(error => {
    // reject 可以通过catch进行捕获
    console.log('catch: ', error )
})

// 通过try...catch也可以捕获reject
try{
    promise3().then()
} catch (err) {
    console.log('try...catch: ', err)
}

const promise4 = new Promise((resolve, reject) => {
    reject()
})

const promise5 = promise4.then(null, function() {
    return 124
})

promise5.then(res => {
    console.log('promise5已完成')
}, res => {
    console.log('promise已拒绝')
})


// promise 和 x 指向同一对象，会TypeError
const promise6 = new Promise(resolve => {
    resolve(promise6)
})

// resolve 静态方法
const promise7 = Promise.resolve(123)
promise7.then(res => {
    console.log('已完成：', res)
})

// reject 静态方法
const promise8 = Promise.resolve(123)
promise8.then(null, res => {
    console.log('已拒绝：', res)
})

/**
 * Promise是一类规范，并不特指一个函数，而是指一类符合A+规范的函数
 * 1、promise 有三个状态，Pending, Resolved, Rejected
 * 2、状态之间的切换只能是从Pending到其他两种状态的切换，状态一旦更改，就不能再机型修改了
 * 3、promise构造函数接收两个参数，参数都是函数类型
 * 4、捕获错误的方式：.catch 或者 try...catch
 * 5、在改变状态的同时，可以给下一步的then传递参数
 * 6、必须有一个then方法，可以访问当前值和原因；then也是接收两个函数，如果不是，则会被忽略
 * 7、then方法返回的是一个新的promise实例
 * 8、不能用instanceof 判断是否是 promise的实例，因为这是一类规范，并不是统一的构造函数
 * 9、判断是不是promise，就判断是不是有then函数，根据特性来进行判断
 * 10、静态方法 resolve、reject、
 */