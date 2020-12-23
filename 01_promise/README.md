#### Promise 规范

1、有三个状态，Pending, Fulfilled, Rejected，默认为 Pending
2、Promise 是个构造函数，用 new 来构造实例，接收一个参数

- 该参数为函数，函数默认有两个参数,resolve, reject
- resolve，reject 是 Promise 内部提供的用来改变状态的函数
- resolve 能够将 Pending 状态变为 Fulfilled 状态
- reject 能够将 Pending 状态变为 Rejected 状态
- resolve，reject 函数都能够接收参数，接收的参数下一个 then 的时候能够获取到
  3、Promise 有 then 函数
- then 函数可以多次调用
- then 函数可以链式调用
- then 函数接收两个参数，onFulfilled, onRejected
- 如果上一个 promise 实例的状态是 Fulfilled，那么会执行 onFulfilled 函数,
- 如果状态是 Rejected, 那么会执行 onRejected 函数
- then 函数接收的参数如果是非函数，是会被忽略的
- Promise.resolve(5).then().then(res => console.log(res)) // 打印 5，中间的那个 then 被忽略来，而 5 被透传下来来

4、Promise 的 then 的状态，永远取决为上一个 then；具体执行 onFulfilled 或 onRejected 函数，取决于上一次的 Promise 实例状态

5、正常的 then 链式调用，如果不是特意抛出错误，那么状态都会是 Fulfilled（原因是实现链式调用，其实是返回一个 Promise 的实例，然后默认状态是 Fulfilled 状态）

#### 作业

1、实现 promise 链式调用，当上一个 promise 完成之后，才执行下一个 promise

2、实现 promise 的阀值设定的链式调用
