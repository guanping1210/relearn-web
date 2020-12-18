import { resolve } from "url"

/**
 * Pormise.all 批次执行
 */
let p1 = new Promise(resolve => {
  setTimeout(() => {
    console.log(1111)
    resolve(100)
  }, 10000)
})

let p2 = new Promise(resolve => {
  setTimeout(() => {
    console.log(2222)
    resolve(10000)
  }, 5000)
})

Promise.all([p1, p2], res => {
  console.log('121212', res)
})