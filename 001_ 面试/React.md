https://www.php.cn/js-tutorial-457313.html

#### 什么是虚拟 DOM

- 虚拟 DOM 是真实 DOM 在内存中的表示，用对象来表示的。UI 用以对象的形式保存在内存中，并与实际 DOM 同步。
- 这是一个发生在渲染函数被调用和元素在屏幕上显示之间的步骤，整个过程称为调和

#### 类组件和函数组件之间的区别是什么？

- 类组件可以使用其他特性，例如状态 state 和生命周期钩子
- 在 React16.8 以前，函数组件只接收 prop 渲染到页面，也就是无状态组件。在 React16.8 以后，新增了 Hooks，让函数组件也能使用 state 等特性了，耶可以模拟生命周期

- 函数组件有 this, 有生命周期，有状态 state; 而函数组件在没有 hooks 的时候，都没有
- 函数组件的 this 需要显示的绑定，因为 class 的方法默认不会绑定 this, 如果忘记绑定 this，那么 this 就是 undefined
  - 箭头函数绑定
  - bind 绑定

```
  click() {}

  // bind绑定
  this.click = this.click.bind(this)
  <div onClick={this.click}></div>

  // bind绑定
  <div onClick={() => this.click()}></div>
```

#### React refs 是干嘛用的

- Refs 提供了一种访问在 render 方法中创建的 DOM 节点或者 React 元素的方法
  - React.createRef()， 通过函数创建 refs
  - 字符串类型的 ref, 通过 this.refs.xxx 来访问，但是会导致问题，内部的 this 查找起来速度慢
  - 回调函数类型的 ref, 直接通过 this.xxx 访问
  - hooks 出现之后，提供了 useRef 来访问
  - 转发 refs, 也就是 Forwarding refs， 将 ref 通过组件传递给其他子节点的技术， 多用于高阶组件

```
    this.refxx = React.createRefs()
    <div ref={this.refxx}></div>

    <div ref="xxx"></div>

    <div ref={input => this.input = input}></div>

    const ref = useRef()
    <div ref="ref"></div>

    const Comp = React.forwardRef((props, ref) => {
        return <input ref={ref}/>
    })

    const inpputRef = React.createRef()
    <Comp ref={inpputRef}>
```

#### React 中如何处理事件

- React 为了解决跨浏览器的兼容性问题，不同的浏览器可能绑定、解绑事件的方法不一致，就统一出了一套事件机制
- 利用冒泡来做事件代理，将所有的事件都代理到 document 层，也就是事件并不是绑定到真实 DOM 上的

- SyntheticEvent 实例会被传递给用户自定义的事件处理函数，这个是 React 跨浏览器原生事件的包装器，拥有原生的相关接口，例如 stopPropagation 和 preventDefault

#### state 和 props 区别是啥

- state 和 props 都是普通的 JS 对象
- state 是组件自己管理的数据，控制自己的状态，是可变的；props 是外部传入的数据参数，是不可变的。
- 有 state 的叫有状态组件，没有 state 的叫无状态组件；

#### 如何创建 refs

- React.createRef()
- ref={回调函数}
- useRef()

#### 什么是高阶组件 HOC --> 重点写代码理解一下

- 高阶组件 HOC，就是一个普通函数，这个函数接收一个组件作为参数，并返回一个新的组件

- Redux 的 connect
- 代码重用、逻辑抽象，例如应用中根据用户的角色不同，有不同的操作。那么可以将获取用户信息抽取为一个高阶组件

#### 在构造函数调用 super 并将 props 作为参数传入的作用是啥？

- 在调用 super() 方法之前，子类构造函数无法使用 this 应用，ES6 字类也是如此。
- 将 props 传递给 super()调用的主要原因是子构造函数中能够通过 this.props 来获取传入的 props
- 字类在继承父类时，如果不执行 super，那么子类的 this 是无法使用的

- ES6 的限制，ES6 中类的继承必须先调用 super()方, 因为子类没有自己的 this，而是继承父类的 this 对象，然后对其加供，而 super 就代表了父类的构造函数

#### 什么是受控组件

- 简单来说，就是组件内部有自己的 state 状态，状态改变的时候会触发更新，这样的组件就叫受控组件
- 原生 HTML 中的 input、textarea、select 也是有自己的状态的，根据用户输入进行更新

#### 什么是 JSX

- JSX, 也是一种语法糖，用来表示 HTML 在 JS 中的一种写法，但是由于 JSX 不被浏览器试别，必须用 babel 来转义为 JS，才能被试别

#### 为什么不能直接更新 state 呢

- 首先，直接更新 state，是不会重新渲染组件的；要修改 state 必须使用 setState 来修改；

  - 因为直接修改 state，react 是不知道的，所以也就不会触发更新；
  - 因为 React 中有个原则：有变化，就一定要返回一个新对象；没变化，原对象不做变化直接返回

- 其次是设计上的问题，设计上把 state 数据搞为了 immutable 格式，就是为了方便管控，提高性能优化， 这样对比的时候不一样，就知道数据变了
  - shouldComponentUpdate，阻止不必要的更新，是在 sCU 里面判定新的 state 与旧的 state 是否一致，不一致才更新
  - 如果直接修改 state，对象的值变了，但还是同一个对象，sCU 就会返回 false, 但是这时候数据变了，页面没更新，就有问题
  - 默认的 sCU 是对比新旧 state 和 props 不一致，才更新

#### React 生命周期有哪些阶段

- 初始化阶段
  - constructor，准备初始化数据和状态和默认属性
- 挂载阶段
  - componentWillMount 渲染之前执行
  - render
  - componentDidMount 第一次渲染后执行，一般做数据请求，DOM 操作等
- 更新阶段
  - shouldComponentUpdate 控制组件是否需要更新
  - componentWillUpdate 在 sCU 返回 true 确定要更新组件之前执行
  - componentDidUpdate 更新
- 卸载阶段
  - componentWillUnmount 卸载
- 处理错误的阶段
  - componentDidCatch

#### React 生命周期

- constructor 初始化数据和 state
- componentWillMount 渲染之前执行
- componentDidMount 第一次渲染之后执行
- componentWillReceiveProps 新的 props 更新时会触发，而第一次 render 不会被触发
- shouldComponentUpdate 确定是否需要更新组件
- componentWillUpdate 用于修改更新 DOM 以响应 props 或 state 更改
- componentUnmount 用于取消网络请求、卸载组件

#### 使用 React Hooks 好处是啥

- 允许在函数中使用 state 和其他 React 特性
- 可以抽离组件逻辑，方便独立的测试和重用

#### React 中的 useState()是什么

- useState 是 React 内置的一个 Hook，返回一个数组，第一项是状态名称，第二项是修改状态的函数名
- 由于以前函数组件是没有 state，所以 React 提供了 useState，使得函数中也可以有 state 状态

#### React 中的 StrictMode(严格模式)是什么

- StrictNode 是一种辅助组件，可以帮助我们更好的写 React 组件，使用<StrictMode />包装组件，能够帮助我们完成以下检测
  - 验证内部组件是否遵循某些做法，如果没有，会在控制台出给警告
  - 验证是否使用了已经废弃的方法，如果有，也会给出警告
  - 试别潜在风险，预防一些副作用

#### 为什么类方法需要绑定到类实例

- JS 中，this 值会根据当前上下文的变化而发生变化
- 在 React 类组件方法中，希望通过 this 引用组件的当前实例，就有必要把这些方法绑定到实例上，通常在构造函数中完成

#### 什么是 prop drilling, 如何避免

- 嵌套层级较深，props 从顶层一直往底层传递，就叫做 prop drilling
- 跨层级通信可以避免这种情况，使用 React Context, 通过 Provider 和 Consumer 完成通信；或使用 useContext Hook,使用上下文数据

#### 如何理解 Flux 与 MVC

- 传统的 MVC，在分离数据、UI 和逻辑方面做的很好，但是会导致两个问题：数据流不清晰、缺乏数据的完整性
- Flux,

#### 什么是 React Fiber

- Fiber 是 React16 中新的协调引擎或重新实现核心算法的一种数据结构，主要的目标是支持虚拟 DOM 的增量渲染
- Fiber 的目标是提高其在动画、布局、等方面的使用性，并未不同类型的更新分配优先级，提高交互性能
- Fiber 能够将渲染工作分成块，并将其分散到多个帧中

#### Hooks 会取代 render props 和高阶组件吗

- 不会。Hooks 只是更简洁的写法和用法而已。两种模式都有各人的用处
- 复杂的应用还是简易使用 render props

#### 如何避免组件的重新渲染

- PureComponent 对 props 进行浅比较
- React.memo 对 props 进行浅比较

#### 调用 setState 时，React render 是如何工作的

- 走的是 update 流程

#### React.createElement

#### class、extends、super

```
  class Person {
    constructor() {
      this.name = 10
    }
  }

  class Student extends Person {
    getName() {
      console.log(this.name)
    }
  }

  var p = new Student()
  p.name // 10
  p.getName() // 10, 子类没有书写constructor，会默认添加一个。但是如果写了constructor函数，必须调用super() 获取this
```
