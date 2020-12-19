const p1 = new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, 1000)
})

const p2 = new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, 2000)
})

const p3 = new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, 3000)
})

const p4 = new Promise(resolve => {
  setTimeout(() => {
    resolve()
  }, 4000)
})

/**
 * 实现promise链式调用，当上一个promise完成之后，才执行下一个promise
 * 1、async await
 * 2、reduce
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
  * 实现promise的批次链式调用
  * 设置一个阀值，同时执行N个promise, 其中任任意一个promise完成后，替补上另一个promise
  * 简单来说，也就是需求池上，始终有N个promise在同时执行
  */
 const chainThreshold = (n = 2) => {
  // 把阈值填满
  let res = [list.shift(), list.shift()]

  
 }

