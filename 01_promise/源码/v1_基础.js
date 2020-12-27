/**
 *  回想Promise的基本用法：
 *  1、通过new Promise来构造实例
 *  2、有三个状态，默认为Pending状态
 *  3、构造Promise实例时，接收一个参数，这个参数为函数
 *  4、接收的函数，默认接收两个方法，能够用来改变状态
 *  5、状态只能从Pending像其他状态改变，并且只能改变一次
 *  5、至少能够对then调用一次
 */
class CustomPromise {
    constructor(handler) {
        this.status = 'Pending'
        this.value = undefined
        this.reason = undefined

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
        }
    }

    /**
     * then函数：
     *  1、至少能调用一次
     *  2、接收两个参数，一个参数表示Fulfilled状态下的处理函数，一个参数表示Rejected状态下的处理函数
     *  3、改变状态时接收的值和原因会分包作为两个函数的参数
     */
    then(onFulfilled, onRejected) {
        if(this.status === 'Pending') {
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
 * 按照基础用法来测试
 *  1、p是正常的，状态是Fulfilled
 *  2、能正常打印10
 */
const p = new CustomPromise((resolve, reject) => {
    resolve(10)
})
p.then(res => {
    console.log('成功的结果：', res)
})

/**
 * 缺点：异步方法，不会打印结果
 * 亲测：console.log 不会执行
 * 所以 v2 版本会新增异步任务的实现
 */
const p1 = new CustomPromise((resolve, reject) => {
    setTimeout(() => {
        resolve(10)
    }, 0)
})
p1.then(res => {
    console.log('成功的结果：', res)
})