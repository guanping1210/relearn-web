class CustomPromise {
  constructor(handler) {
    this.status = 'Pending';
    this.value = undefined
    this.fulfilledFn = []
    this.rejectedFn = []

    try {
      handler(triggerResolve, triggerReject)
    } catch(err) {
      console.log(err)
    }
  }

  triggerResolve(val) {
    setTimeout(() => {
      if(this.status !== 'Pending') return 
      this.status = 'Fulfilled'
      this.value = val
      this.fulfilledFn.forEach(v => v(this.value))
      this.fulfilledFn = []
    },0)
  }

  triggerReject(val) {
    if(this.status === 'Pending') {
      setTimeout(() => {
        this.rejectedFn.forEach(v => v())
      })
      this.status = 'Rejected'
    }
  }

  then(onFulfilled, onRejected) {
    const then2 = new CustomPromise((onNextFulfilled, onNextRejected) => {
      // 核心：链式调用的处理过程
      // 将上一个promise的结果与下一个then的promise串联起来
      function onFinalFulfilled(val) {
        if(typeof onFulfilled !== 'function') {
          onNextFulfilled(val)
        } else {
          const res = onFulfilled(val)
          // 判断返回的是否是个promise
          if(res && res.then && typeof res.then === 'function') {
            res.then(onNextFulfilled)
          } else {
            onNextFulfilled(res)
          }
        }
      }

      switch(this.status) {
        case 'Pending': {
          this.fulfilledFn.push(onFinalFulfilled)
          break
        }
      }
    })

    return then2
  }

  static catch(onRejected) {
    return this.then(null, onRejected)
  }

  static all(list) {
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

  static resolve(val) {
    return new CustomPromise(resolve => resolve(val))
  }

  static reject(val) {
    return new CustomPromise(function(resolve, reject) {
      reject()
    })
  }
}

const createPromise = function(time) {
  return new CustomPromise(function(resolve, reject) {
    return setTimeout(resolve, time)
  })
}

const instance = createPromise(1000)

instance.then(function() {
  console.log('hello world')
})

