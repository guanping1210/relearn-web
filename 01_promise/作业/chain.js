const p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve(10)
  }, 10000)
})

const p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve(20)
  }, 2000)
})

const p3 = new Promise(resolve => {
  setTimeout(() => {
    resolve(30)
  }, 3000)
})

const p4 = new Promise(resolve => {
  setTimeout(() => {
    resolve(40)
  }, 4000)
})

/**
 * 实现promise链式调用，当上一个promise完成之后，才执行下一个promise
 * 思路：等待上一个promise完成之后，再执行下一个
 * 1、async await：等到上一个结果，才执行下一个
 * 2、reduce：把下一个作为上一个primise的then函数的参数传递进去
 * 
 */
const chain1 = async(list = []) => {
  for(let p of list) {
    await p()
  }
}

const chain2 = (list = []) => {
  list.reduce((c,p) => {
    c.then(p)
  }, Promise.resolve())
}

const list = [p1,p2,p3,p4]
chain1(list)
chain2(list)

 /**
  * 实现promise的并发-阈值功能
  * 设置一个阀值，同时并发执行N个promise, 其中任任意一个promise完成后，替补上另一个promise
  * 简单来说，也就是需求池上，始终有N个promise在同时执行
  * 
  * 场景设想：排队买票，一共三个窗口可以同时进入三个人，任一窗口买完票之后，排队的队列再弹出一个人
  *          始终保持三个窗口都在运行
  * https://blog.csdn.net/weixin_40005545/article/details/111350426
  */
const asyncPool = (promiseList, limit) => {
  let i = 0
  // 存储所有的Promise实例的结果
  const result = []
  // 用于存储正在执行的Promise的实例
  const executing = []

  const enqueue = function() {
    if(i >= promiseList.length) {
      return Promise.resolve()
    }
    // 拿到当前实例
    const item = promiseList[i++]
    // 当前promise执行完毕，从executing数组中删除
    const p = item.then(() => executing.splice(executing.indexOf(exec)))
  }

  return enqueue().then(() => Promise.all(promiseList))
}
