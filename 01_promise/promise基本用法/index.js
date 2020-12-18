/**
 * 通过 new 实例化
 * 通过resolve, reject来改变Pending状态
 * 
 */
new Promise((resolve, reject) => {
  resolve()
})

/**
 * Promise实例可以多次调用实例
 * 如果是有异步任务，那么会按照注册顺序依次执行
 */
let p = new Promise((resolve, reject) => {
  // resolve()

  // 5秒后才打印两个then的语句
  setTimeout(() => {
    resolve()
  }, 5000)
})

p.then(res => { console.log('第一次调用')})
p.then(res => { console.log('第二次调用')})

/**
 * Promise链式调用
 */
let pp = new Promise((resolve, reject) => {
  resolve(20)
})
pp.then(res => {
  // 打印20
  console.log('then 1: ', res)
})
.then(res => {
  // 打印undefined
  console.log('then 2: ', res)
})

/**
 * Promise链式调用的then的状态取决于上一次的状态
 * then返回的状态，默认是fulfilled，因为返回的是一个新的Promise实例
 */
let ppp = new Promise((resolve, reject) => {
  reject()
})

ppp
// 由于ppp实例的状态是rejected，所以会打印reject
.then(res => {
  console.log('我是resolve', res)
}, res => {
  console.log('我是reject', res)
})
// 上一个then走到了reject状态，但是没有其他错误
// 所以下一个then的状态还是fulfilled
// 所以会打印 fulfilled
.then(res => {
  console.log('我是第二个then的fulfilled')
}, res => {
  console.log('我是第二个then的rejected')
})

/**
 * Promise值的穿透性
 * then接收的是非函数，会被忽略
 */
let pppp = Promise.resolve(100)

pppp
.then(null, 1)
.then('hello', undefined)
.then(res => {
  // 打印100， 上面的起他类型值都被忽略了
  console.log("res: ", res)
})