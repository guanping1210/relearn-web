/**
 * 按照手写promise源码
 * 要点：1、具有构造函数功能，有三个固定的状态
 *      2、构造函数接收两个参数，可以改变状态，可以向下一个then传值
 *      3、具有then方法，多个then依次调用
 *      4、then返回的是一个新的promise实例
 * 难点：将上一个then接收的参数和值，与下一个then串联起来
 */

 class CustomPromise {
  constructor(handler) {
    this.status = 'Pending' // 状态只能通过handler的参数来改变

    // 要执行一下handler参数
  }
 }

//  调用方式: 说明构造函数接收的是一个函数，该函数带有两个参数，可以更新状态
const p = new CustomPromise(function(resolve, reject) {

})