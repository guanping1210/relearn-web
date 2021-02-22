#### Redux 是什么

- redux 是比较热门的一个数据管理库，可以用来管理整个应用程序的状态管理
- 好处：易于测试

#### redux 的三大原则

- 单个事实来源：整个应用程序只有一个状态树，更方便追踪数据状态的变化
- 状态只读：更改状态的唯一方法是触发一个动作，一个动作就是一个普通的 JS 对象，用来描述变化
- 使用纯函数修改:

#### 数据流向和中间件

- 数据流向：action -> dispatch -> store -> UI -> action， redux 本身是同步的，但是为了满足更多的需求，用中间件来增强 redux 的功能，使得支持异步
- 中间件：自定义拦截 action -> reducer 的过程，变为了 action -> middlewares -> reducer, 可以改变数据流,实现其他功能
- 常见中间件：
  - redux-logger: 日志输出
  - redux-thunk: 处理异步操作
  - redux-promise：处理异步操作，actionCreator 的返回值是 promise

#### redux 缺点

- 当一个非容器组件需要数据时，必须从父组件传递过来，而不能像 flux 直接从 store 中获取 --> 后续提供了 hooks，可以随意获取数据了
- 当一个组件更新相关数据时，涉及到这个数据的组件，都会重新 render,影响效率

#### store 是什么？

- store 是一个全局对象，用来保存 state 状态的，还提供了一些方法来访问、修改状态

#### redux 相似的产品

- mobx

https://zhuanlan.zhihu.com/p/50247513

#### redux 源码解读 --> compose.js

- compose , 从右到左的函数式编程, 函数组合
  - 对于数组内的所有函数，从右到左，将前一个函数作为后一个函数的入口参数依次返回
  - compose(fn1, fn2, fn3) --> fn1(fn2(fn3()))

```
    function compose(...funcs) {
        return funcs.reduce((a, b) => (...args) => a(b(...args)))
    }
```

#### redux 源码解读 --> bindActionCreator.js

- 将 actionCreator 的对象转化为具有相同键值的对象，每个 actionCreator 都会被 dispatch 所调用, 可以在不直接接触 dispatch 的前提下进行 state 的更改操作
- actionCreator, 是 action 构造器，接收一个 value 值，返回一个对象值{ type, value }

-

```
    function bindActionCreator(actionCreator, dispatch) {
        return (...args) => dispatch(actionCreator(...args))
    }

    function bindActionCreators(actionCreators, dispatch) {

    }
```

#### redux 源码解读 --> createStore.js

- createStore 是唯一能够生成 store 的函数，是最核心的 API， 主要提供了一些辅助的东西
  - 入口参数：
    - reducer 更新 state 的纯函数 ,
    - preloadState 初始化 state,
    - enhancer 多个中间件生成的一个 compose 函数，用来增强 store 的
  - 内部变量：
    - currentReducer 保存当前 reducer
    - currentState 保存应用的全局 state 状态
    - currentListeners 保存注册函数
    - nextListeners 注册函数的快照，避免直接修改 currentListeners
    - isDispatching 用于标志是否正在被触发一个 action
  - 输出：
    - dispatch 触发 action，调用 reducer 更新 state,
    - subscribe 注册 listener
    - getState 获取 state
    - replaceReducer 替换 reducer，更改 state 更新的逻辑
