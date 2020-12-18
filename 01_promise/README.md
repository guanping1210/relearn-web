#### Promise规范
1、有三个状态，Pending, Fulfilled, Rejected，默认为Pending
2、Promise是个构造函数，用new 来构造实例，接收一个参数
  * 该参数为函数，函数默认有两个参数,resolve, reject
  * resolve，reject是Promise内部提供的用来改变状态的函数
  * resolve能够将Pending状态变为Fulfilled状态
  * reject能够将Pending状态变为Rejected状态
  * resolve，reject函数都能够接收参数，接收的参数下一个then的时候能够获取到
3、Promise有then函数
  * then函数可以多次调用
  * then函数可以链式调用
  * then函数接收两个参数，onFulfilled, onRejected
  * 如果上一个promise实例的状态是Fulfilled，那么会执行onFulfilled 函数,
  * 如果状态是Rejected, 那么会执行onRejected函数 
  * then函数接收的参数如果是非函数，是会被忽略的
  * Promise.resolve(5).then().then(res => console.log(res))  // 打印5，中间的那个then被忽略来，而5被透传下来来

4、Promise的then的状态，永远取决为上一个then；具体执行onFulfilled或onRejected函数，取决于上一次的Promise实例状态

5、正常的then链式调用，如果不是特意抛出错误，那么状态都会是Fulfilled（原因是实现链式调用，其实是返回一个Promise的实例，然后默认状态是Fulfilled状态）


#### 作业
1、实现promise链式调用，当上一个promise完成之后，才执行下一个promise

2、实现promise的阀值设定的链式调用