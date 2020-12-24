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
  * 设置一个阀值，同时执行N个promise, 其中任任意一个promise完成后，替补上另一个promise
  * 简单来说，也就是需求池上，始终有N个promise在同时执行
  */
const asyncPool = () => {
  
}
