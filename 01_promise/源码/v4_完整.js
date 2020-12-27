/**
 *  总结一下：
 *  在之前的三个版本中，逐渐实现了Promise的部分功能：
 *    1、基础框架
 *    2、异步功能 --> setTimeout模拟(实质是异步宏任务) | queueMicrotask()
 *    3、链式调用 --> then内部返回一个新的promise实例(核心：需要将当前then和下一个then关联起来)
 *          - 当前then的参数不是函数，那么直接执行下一个then的参数函数
 *          - 当前then的参数是函数，那么先执行该函数，再把得到的结果作为下一个then的处理函数的参数传递进去
 *    4、值的透传 --> 核心就是上面那一句的描述：把值作为下一次处理函数的参数
 *    5、错误捕获，不管是什么地方发生错误，都会让状态变为rejected状态
 *    6、内部then的默认状态是Fulfilled
 * 
 * 缺乏的功能：
 *  1、静态方法：
 *      resolve, 
 *      reject, 
 *      all: 接收一个数组，等数组中的每一项都执行成功，状态才会变为Fulfilled
 *      race: 接收一个数组，只要数组中有任意一项执行成功，那么状态就会变为Fulfilled
 *      catch: 捕获错误的
 *      finall: 不管结果和状态如何，都会走到这个函数
 *      try: 模拟 try ... catch 就可以了
 * 
 * 资料：
 *  queueMicrotask: https://developer.mozilla.org/zh-CN/docs/Web/API/HTML_DOM_API/Microtask_guide
 * 
 *  */
class CustomPromise {
    constructor(handler) {
        this.status = 'Pending'
        this.value = undefined
        this.reason = undefined
        this.onFulfilledCB = []
        this.onRejectedCB = []

        // 注意这两个方法要写在constructor内部
        // 写在外部的话，是不能通过函数名调用的
        const triggerResolve = (val) => {
            if(this.status === 'Pending') {
                this.status = 'Fulfilled'
                this.value = val
                this.onFulfilledCB.forEach(v => v())
            }
        }

        const triggerReject = val => {
            if(this.status === 'Pending') {
                this.status = 'Rejected'
                this.reason = val
                this.onFulfilledCB.forEach(v => v())
            }
        }

        try{
            handler(triggerResolve, triggerReject)
        }catch(err) {
            console.log(err, handler)
        }

    }

    /**
     * then内部返回一个新的promise实例，就可以实现链式调用了
     *  1、需要处理当前then与下一个then之间的关系
     *  2、需要添加错误的处理机制
     * 
     * @param {*} onFulfilled 
     * @param {*} onRejected 
     */
    then(onFulfilled, onRejected) {
        const nextThen = new CustomPromise((onNextFulfilled, nextOnRejected) => {
            /**
             * 集中处理一下当前onFulfilled与nextOnFulfilled之间的关系
             * 核心: 也就是将上一个promise的结果与下一个promise串联起来
             *  --> 如果当前then的onFulfilled不是函数，那么忽略，直接调用下一个then的onNextFulfilled函数
             *      (符合非函数会被忽略的规范)
             *  --> 如果当前then的onFulfilled是个函数，那么执行onFulfilled，获得结果
             *      如果结果是个promise，那么将下一个then的onNextFulfilled传递给结果的then函数
             *      如果结果不是个promise, 那么将结果当成onNextFulfilled的参数执行
             *  --> 如果抛出错误，
             * @param {*} val 
             */
            function onFinalFulfilled(val) {
                try{
                    if(typeof onFulfilled != 'function') {
                        onNextFulfilled(val)
                    } else {
                        const res = onFulfilled(val)
                        // 判断返回的res是否是个promise
                        if(res && res.then && typeof res.then === 'function') {
                            res.then(onNextFulfilled)
                        } else {
                            onNextFulfilled(res)
                        }
                    }
                } catch(err) {
                    nextOnRejected(err)
                }
            }

            /**
             * 处理一下当前onRejected与onNextRejected之间的关系
             * 处理逻辑：
             *  1、如果当前then状态是rejected, 且onRejected是个函数，那么直接执行
             *  2、规范上说下一个then的默认状态是Fulfilled，所以需要调用onNextFulfilled函数
             *  3、同时状态需要变为Fulfilled
             */
            function onFinalRejected(reason) {
                if(typeof onRejected === 'function') {
                    const result = onRejected(reason)
                    onNextFulfilled(result)
                }
            }

            // 如果状态是Pending, 那么需要先把nextOnFulfilled, nextOnRejected记录下来
            if(this.status === 'Pending') {
                
            }

            // Fulfilled状态，执行onFinalFulfilled
            if(this.status === 'Fulfilled') {
                onFinalFulfilled(this.value)
            }

            // Rejected状态，执行onFinalRejected
            if(this.status === 'Rejected') {
                onFinalRejected(this.reason)
            }
        })

        return nextThen
    }

    // 其余的静态方法的实现
    static resolve(val) {
        return new CustomPromise(resolve => resolve(val))
    }
    static reject(val) {
        return new CustomPromise(null, reject => reject(val))
    }
    /**
     * all: 多个异步并发执行，有一个失败则失败
     * 1、接收的是个数组, 每一项都是promise实例
     * 2、等数组中的每一项都执行成功，才更新状态
     * 3、数组是并发执行的，也就是同时执行
     * 4、每一项的执行结果需要按照传递的顺序保存下来，传递给下一个then
     */
    static all(list = []) {
        return new CustomPromise((resolve, reject) => {
            let count = 0
            const values = []
            for(const [i, customPromiseInstance] of list.entries()) {
                customPromiseInstance
                .then(res => {
                    values[i] = res
                    count ++

                    if(count === list.length) {
                        resolve(values)
                    }
                }, err => {
                    reject(err)
                })
            }
        })
    }
    /**
     * race: 多个处理请求并发执行，谁先完成用谁的
     * 碰到第一个then就返回了（通过promise实例demo得出来的结论）
     * 缺点：无法中断
     */
    static race(list) {
        return new CustomPromise((resolve, reject) => {
            // 并发执行用for循环来实现
            for(const [i, customPromiseInstance] of list.entries()) {
               if(customPromiseInstance && typeof customPromiseInstance.then === 'function') {
                   customPromiseInstance.then(resolve, reject)
               } else {
                   resolve(val)
               }
            }
        })
    }
    /**
     * try
     */
    static try(callback) {
        try{
            return CustomEvent.resolve(callback)
        } catch (err) {
            return CustomPromise.reject(err)
        }
    }

    /**
     * catch
     */
    static catch(errCallback) {
        return this.then(null, errCallback)
    }

     /**
      * final: 不管前面结果如何，最终都会走到这个函数
      */
    static finally(callback) {
        return this.then(res => {
            return CustomPromise.resolve(callback()).then(() => res)
        },res => {
            return CustomPromise.resolve(callback()).then(() => res)
        })
    }
}

/**
 * 加入异步功能之后
 * 亲测：console.log 会执行，5s后打印10
 * 但是: 这一版还没实现 then 的链式调用 + 值的透传功能
 * 所以：v3版本会实现then的链式调用，以及值得透传功能
 * 但是还是有一些小缺陷，比如其他的catch、all等方法，会在v4版本补足
 * 
 */
const p1 = new CustomPromise(function(resolve, reject) {
    resolve(100)
})
p1.then(res => {
    console.log('成功的结果：', res)
    return 200
})
.then(res => {
    console.log('第二次then的结果: ', res)
    return 300
})
.then(res => {
    console.log('第三次then的结果: ', res)
})

p1.then(res => {
    throw Error(200)
})
.then(null, res => {
    console.log('抛出错误', res)
    return 300
})
.then(res => {
    console.log('错误之后修正状态：', res)
})