/**
 * 发布订阅模式（观察者模式）：定义了对象间得一种一对多的依赖关系，当一个对象的状态发生变化时，所有依赖于它的对象都将得到通知
 * 
 */
// 观察者
class Observer {
    constructor() {
        this.subscribes = {}
    }

    // 订阅
    subscribe(type, fn) {
        if(!this.subscribes[type]) {
            this.subscribes[type] = []
        } 

        // 收集订阅者的处理
        typeof fn === 'function' && this.subscribes[type].push(fn)
    }

    // 发布
    publish() {
        const type = [].shift.call(arguments)
        const fns = this.subscribes[type]

        // 不存在的订阅类型
        if(!fns || fns.length === 0) {
            return 
        }

        // 挨个儿处理调用
        fns.forEach(fn => {
            fn.apply(this, arguments)
        })
    }

    // 删除订阅
    remove(type, fn) {
        // 删除全部
        if(typeof type === 'undefined') {
            this.subscribes = {}
            return 
        }

        let fns = this.subscribes[type]

        // 不存在的订阅类型
        if(!fns || fns.length === 0) {
            return 
        }

        // fn未指定的话，删除type下的所有fn
        if(typeof fn === 'undefined') {
            fns.length = 0
            return 
        }

        // 删除指定fn
        const index = fns.findIndex(item => item === fn)
        fns.splice(index, 1)
    }
}
