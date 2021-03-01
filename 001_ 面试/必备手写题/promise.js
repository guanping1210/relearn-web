/**
 * Promise: 
 *  1、三个状态
 *  2、接收一个函数，函数的参数为resolve和reject，内部指定
 *  3、支持异步，就是用个数组把回调函数收集起来，在该使用的地方使用
 *  3、有then函数
 */
class Promise {
  constructor(handler) {


    handler(resolve, reject)
  }

  // promise内部指定
  resolve() {

  }

  // promise内部指定
  reject(){

  }

  then() {
    return new Promise.resolve()
  }
}