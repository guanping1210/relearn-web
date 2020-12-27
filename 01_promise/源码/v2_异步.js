/**
 *  在v1版本的基础上，加上异步任务的实现
 *  思路：用状态值把回调函数记录下来，等到更新状态时再执行回调函数
 */
class CustomPromise {
    constructor(handler) {
        this.status = 'Pending'
        this.value = undefined
        this.reason = undefined

        // v2
        // 用两个状态值来收集回调函数
        this.onFulfilledCB = []
        this.onRejectedCB = []

        // 注意捕获错误，万一handler不是个函数，会报错
        // 虽然规范是要求传递一个函数，但是控制不住用户啊
        try{
            handler(resolve, reject)
        }catch(err) {
            console.log(err)
        }
    }

    /**
     * resolve的作用：
     *  1、把Pending状态改变为Fulfilled
     *  2、把参数值记录下来
     */
    resolve(val) {
        if(this.status === 'Pending') {
            this.status = 'Fulfilled'
            this.value = val

            // v2: 修改状态时才执行之前收集的回调函数
            this.onFulfilledCB.forEach(v => v())
        }
    }
    /**
     * reject的作用：
     *  1、把Pending状态改变为Rejected
     *  2、把错误原因记录下来
     */
    reject(val) {
        if(this.status === 'Pending') {
            this.status = 'Rejected'
            this.reason = val
        
            // v2: 修改状态时才执行之前收集的回调函数
            this.onFulfilledCB.forEach(v => v())
        }
    }

    /**
     * then函数：
     *  1、至少能调用一次
     *  2、接收两个参数，一个参数表示Fulfilled状态下的处理函数，一个参数表示Rejected状态下的处理函数
     *  3、改变状态时接收的值和原因会分包作为两个函数的参数
     */
    then(onFulfilled, onRejected) {
        // Pending状态收集回调函数
        if(this.status === 'Pending') {
            this.onFulfilledCB.push(onFulfilled)
            this.onRejectedCB.push(onRejected)
            return 
        }

        if(this.status === 'Fulfilled') {
            onFulfilled(this.value)
        }

        if(this.status === 'Rejected') {
            onRejected(this.reason)
        }
    }
}


/**
 * 加入异步功能之后
 * 亲测：console.log 会执行，5s后打印10
 * 但是: 这一版还没实现 then 的链式调用 + 值的透传功能
 * 所以：v3版本会实现then的链式调用，以及值得透传功能
 * 
 */
const p1 = new CustomPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(10)
    }, 5000)
})
p1.then(res => {
    console.log('成功的结果：', res)
})