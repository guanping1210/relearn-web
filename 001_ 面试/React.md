https://www.php.cn/js-tutorial-457313.html
https://zhuanlan.zhihu.com/p/57544233

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
- Flux, 是一种强制单向数据流的架构模式， action -> dispatcher -> store -> view -> action

#### 什么是 React Fiber

- Fiber 是 React16 中新的协调引擎或重新实现核心算法的一种数据结构，主要的目标是支持虚拟 DOM 的增量渲染
- Fiber 的目标是提高其在动画、布局、等方面的使用性，并未不同类型的更新分配优先级，提高交互性能
- Fiber 能够将渲染工作分成块，并将其分散到多个帧中

- Fiber 是个对象，主要由以下组成：
  - 自身的信息：tag（组件类型）、key、elementType、index...
  - 相关节点信息：return(父节点)、sibling(兄弟节点)
  - 指向自己的第一个子节点：child
  - 新的 props: pendingProps
  - 上一次渲染完的 props: memoizedProps
  - 上一次渲染时的 state: memoizedState
  - fiber 对应的组件产生的 update 放在这个队列：updateQueue
  - 副作用信息：effectTag -> 这儿指的是对组件执行的操作，更新、删除、修改、移动 --> 用二进制，能够同时用一个数据，表达多种操作
  - 记录下一个副作用: nextEffect
  - 子树中的第一个 side effect: firstEffect
  - 子树中的最后一个 side effect: lastEffect

#### 渲染流程 --> 源码书籍资料 https://react.jokcy.me/book

https://blog.csdn.net/dennis_jiang/article/details/106928259

1、babel 内部将 jsx 转为 VDOM，通过调用 createElement --> 这时候形成的 VDOM 对象结构，能够通过.toString 打印出来，而且，这时候还没走到 ReactDOM.render 阶段
2、真正的执行到了 ReactDOM.render 阶段，才会把 VDOM 转为 fiber 结构，再把 fiber 结构转为真正的 DOM 节树，挂载到真实节点上
3、到 ReactDOM.render 函数的时候，会解析 VDOM，把 VDOM 转为 fiber 结构 --> 形成 fiber 结构
4、根据 fiberRoot 是否存在，来判定是第一次渲染，还是更新。这时候我们先走第一次渲染，也就是创建 fiberRoot 节点 --> 调用的是 createContainer 函数
5、不管是 setState 还是 ReactDOM.render，都会造成 React 更新，都会生产一个 update 的对象，并且赋值给 fiber.updateQueue
6、然后调用 scheduleWork，进入调度之后走的流程都差不多了，与之前的调用没关系了（但是 ReactDOM.render，第一次基本上是走的调度的新增、新增、新增...流程，一直都是新增节点流程）
7、进入调度之后，第一次渲染就不说了，全是新增。然后后续就开始说更新流程了
8、在当前节点的 fiber 对象上创建了 update 对象之后，就进入调度过程了（enqueueUpdate(fiber, update); scheduleWord(fiber, expirationTime)）

以下全部就是调度过程了：开始于 scheduleWork 函数
9、先提前给一些全局变量赋值，方便保存
10、调度内部对 fiber 树（是个链表嘛），进行遍历, 遍历每个 fiber 节点
11、对每个 fiber 节点进行一些操作：创建子节点，字节点返回成为 next，没有 next 返回，就表示向下的节点遍历完了。
12、节点遍历完之后，执行 completeUnitWork(内部的 beginWork 处理 effect tag)，处理一些 effect tag 操作，从下往上处理，一直处理到 root 节点或有 sibling 节点的位置开始，然后从 sibling 节点又开始执行 performWork 函数

- - 备注：render 阶段：
- - - workLoop 逻辑很简单，就是判定是否需要继续调用 performUnitOfWork
      beginWork
      reconcileChildren 函数内部，才是对 fiber 节点，进行真正的调和，也就是操作节点的增删查改（）

13、等返回到 root 节点的时候，表示整棵树都遍历完了。那么这时候执行 commit 操作了。
14、commit 阶段：就是遍历 effect list，然后执行 side effects，将数据的更新体现到 UI 上

形成的链表：app = A(=a+b) + B + C
app.child -> A.child -> a.child  
然后 A.subling 指向 B，B 又是一个通过 child 连接起来的链表了

#### 渲染流程的整体概述：每次 setState 之后 fiber 树都会从 root 开始进入与第一次渲染不相同的流程

babel -> 将 jsx 转为 VDOM
ReactDOM.render -> 接收 VDOM 和 root dom, 然后
创建 fiberRoot 节点，进入调和阶段（疑问：fiberRoot 节点，是先全部创建为 fiber 树之后，再进入调和阶段，还是创建一个 root 之后就开始调和了，然后其他的 fiber 节点，是调和过程创建的吗）
调和阶段分为两个阶段 render 阶段和 commit 阶段（针对单个 fiber 节点概述）
render 阶段：
--> render 阶段就是深度优先遍历 fiber 节点，直到遍历到叶子节点为止，从上往下的过程中会搭建子节点、收集记录 effectTag、记录 props 和 state 相关的更新，有声明周期函数的执行狗子函数
--> 递归到没有 child 节点的时候，就从下往上开始返回（返回到最近的 sibling 或者 rootfiber）
--> 递归返回阶段，从下往上走的时候，对 fiber 进行 diff 操作，对有操作的 fiber，标记 effect tag，同时把 props 的更新记录标记到 updateQueue 中

render 阶段结束后，进入 commit 阶段：
--> 就是去遍历每个 fiber 节点上的 effect list
--> 执行 effect list 标记的所有更新；有相关生命周期的就执行相关生命周期
--> 将更新完的 workFinished tree 赋值给 current tree

- 全局入口 legacyRenderSubtreeIntoContainer 函数，内部会走两个逻辑，一个是新建 rootfiber 逻辑，一个是更新 rootfiber 逻辑 --> 走到最后，都是走的 updateContainer 函数
- updateContainer 函数，就属于 reconciler 调和 阶段了
- 在 updateContainer 内部，创建一个 update 对象，把 update 对象添加到 fiber.updateQueue 属性上
- 执行 scheduleUpdateOnFiber 函数，进入真正的 work loop 阶段

#### 调和的资料 https://blog.csdn.net/hupian1989/article/details/102617165

#### Hooks 会取代 render props 和高阶组件吗

- 不会。Hooks 只是更简洁的写法和用法而已。两种模式都有各人的用处
- 复杂的应用还是简易使用 render props

#### 如何避免组件的重新渲染

- PureComponent 对 props 进行浅比较
- React.memo 对 props 进行浅比较, 检测到 props 没变化，就不更新，通常用于 A 组件内有 BC 子组件，A 重新渲染了，但是 BC 依赖的 props 没变化，就不重新渲染
- 一般配合 useCallback、useMemo 使用

- 举例：当 button 被点击时，没有使用 useCallback, useMemo, React.memo 时候， 由于父组件的 count 状态会更新，所以导致父组件重新渲染，此时子组件也会重新渲染
- 如果只使用了 useCallback，useMemo，虽然函数和值被缓存下来了，但是子组件没有包裹 React.memo，当父组件更新时，虽然函数函数和缓存值没有更新，但是子组件也会重新渲染
- 所以，当父组件渲染，子组件为了避免不必要的渲染，也就是当子组件依赖的 props 没发生变化时，就不需要重新渲染，这时候用 React.memo 包裹起来，就能够达到这样的效果

```
const A = () => {
  const [count, setCount] = useState(0)

  const click = useCallback(() => { // 如果不用useCallback，那么
    console.log('111')
  }, [])

  return <div>
    <button onClick={() => setCount(count++)}>点击我</button>
    <B click={click}>
    <C>
  </div>
}

const B = ({ click }) => {
  return <></>
}
export default React.memo(B) // 使用了memo包裹，B只有在依赖的click 变化时，才会发生变化
```

#### 调用 setState 时，React render 是如何工作的

- 走的是 update 流程

#### Redux

- Redux 是数据管理工具
- 遵循单一数据来源、状态只读、使用纯函数进行修改的三个原则

- Redux 组件

  - Action 用来描述发生了什么事情的对象
  - Reducer 确定状态将如何变化，纯函数
  - Store 整个程序的状态树
  - View 显示 Store 提供的数据
  - action -> reducer -> store -> view -> action

- 定义 action, 包含 type 和数据，type 表示执行的操作类型， 通常只是一个对象{ type, data }
- 在 Redux 中，action 被 Action Creators 所创造

```
  function add(data) {
    return { type, data }
  }
```

- Reducer，是纯函数，接收先前的状态和 action，然后返回一个新的状态
- Store，就是一个普通的全局对象，保存这程序的状态，并提供一些方法来访问状态、调度操作和注册监听器。

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

#### React Hooks 详解

##### useState --> 支持函数组件使用 state 状态

- 语法 const [state, setState] = useState(初始值)
  - 传入一个初始值参数，返回一个数组，第一个原生是 state 变量名，第二个是修改 state 值的方法
- 与类中的 setState 的异同点：

  - 相同：都是异步的
  - 不同：类中的 setState 是合并的，函数组件中的 setState 是替换

##### useEffect --> 函数组件中执行副作用的地方，例如网络请求、修改 UI、事件函数绑定 等, 执行与 DOM 无关的副作用操作

- 语法：useEffect(() => { ... }, [依赖]), 接受两个参数
  - 第一个是函数，是第一次渲染以及后续更新时要执行的副作用
    - 这个函数可以有返回值，返回值也必须是个函数，会在组件被销毁时执行
  - 第二个参数是个数组，用来优化 useEffect 的，只有当数组中的依赖有变化时，才会执行这个 useEffect

##### useContext --> 获取上下文值

- 语法：const value = useContext(myContext)
  - 接受上下文对象（从 React.createContext 返回的值），并返回该上下文的当前上下文值
  - 当前上下文的值由树中调用组件上方 value 最近的 props 确定， myContext.Provider

```
  const ThemeContext = createContext(null)

  const Text = () => {
    return <ThemeContext.Provider value="hello">
      <Example />  // Example内部能够通过useContext API获取到传入的context值
    </ThemeContext>
  }

  const Example = () => {
    const context = useContext(ThemeContext)

    return context // hello
  }
```

##### useReducer --> 模拟 redux，是组件内部的复杂 state 的替代方案

- 语法：const [state, dispatch] = useReducer(reducer, initialState, init)

  - reducer，是纯函数，接受 state 和 action，返回新的 state
  - initialState，初始化状态
  - init, 延迟优化，可以将初始化状态设置为 init(initialState)

- 与 useState 的区别：
  - useState 适用于简单的状态，而 useReducer 适用于复杂的状态
  - useState 更新数据是异步的，而 useReducer 获取的 dispatch 方法更新数据是同步的

```
  <div onClick={
    setCount(count + 1)
    setCount(count + 1)
  }>点击一次，count只往上+1</div>

  <div onClick={
    dispatch({ type: '加1' })
    dispatch({ type: '加1' })
  }>点击一次，count会往上+2</div>
```

#### useReducer 如何支持同步 --> 对 useReducer 功能增强即可

```
  // 封装一个wrapperDispath高阶函数
  const isPromise = (obj) => {
    if (!obj) return false;

    return;
    (typeof obj === "function" || typeof obj === "object") &&
      typeof obj.then === "function";
  };

  const wrapperDispatch = (dispatch) => {
    return function (action) {
      if (isPromise(action.payload)) {
        return action.payload.then((res) => {
          dispatch({ ...action, payload: res });
        });
      }

      return dispatch(action);
    };
  };

  export default wrapperDispatch;

  // 外部dispatch被包裹增强
  const [state, dispatch] = useReducer(reducer, initial)
  const wrpDispath = wrapperDispatch(dispatch)

  wrpDispatch({ type: 'action', payload: fetch(xxx) })
```

##### useCallback --> 缓存函数，根据依赖项的变化，产生新的缓存函数

- 语法：const cb = useCallback(() => { ... }, [依赖])
  - 返回值是一个缓存函数，传递内联回调和一些列依赖项
  - 这个回调函数能够根据一些依赖项目的变化而发生变化
  - 可以防止不必要的渲染

##### useMemo --> 缓存值，根据依赖项的变化，从而生成新的缓存之

- 语法：const value = useMemo(() => { ... }, [依赖])

  - 返回一个缓存值，useMemo 只会在依赖项发生变更时，重新计算得出的 mermoized 值
  - 有助于避免每个渲染上进行昂贵的计算，优化子组件的渲染（例如 A 有子组件 B、C，当 A 的 props 变化时，会导致 BC 一起变化，使用 useMemo 优化，可以只让 B 重新渲染，C 不渲染）

- useMemo 在渲染过程中传递的函数会运行，不要做那些在渲染时通常不会做的事情，例如副作用等

##### useRef --> 获取组件实例或 DOM 节点

- 语法：const ref = useRef()
  - useRef 返回一个可变的 ref 对象，其中 current 属性被初始化为传递的参数，返回的对象将存留在整个组件的生命周期中
  - 可以保留任何值

##### useLayoutEffect --> 执行与布局相关的副作用, 是在所有 DOM 更新完成后触发的

- 语法：useLayoutEffect(() => { ... })

##### 编写自定义 hooks

- 不要从常规 JavaScript 函数中调用 hooks
- 不要在循环、条件或嵌套中调用 hooks
- 必须在组件的顶层调用 hooks
- 自定义 hooks 必须用 use 开头，这是一种约定

#### Error boundary 错误边界 --> 能够子组件树的 JS 异常，记录错误并返回一个回退的 UI

- 错误边界：只能捕获在组件树种比当前组件低的组件错误, 配合 getDerivedStateFromError 和 componentDidCatch 使用
  - getDerivedStateFromError, 在后代组件抛出错误后被调用，将抛出的错误作为参数，并返回一个新的值以更新 state，在渲染阶段调用，不允许出现副作用
  - componentDidCatch, 在后代组件抛出错误时调用，会在渲染提交阶段被调用，允许执行副作用
- 捕获范围：

  - 渲染期间
  - 生命周期内
  - 整个组件树构造函数内

- 不能捕获到的错误：

  - 事件函数内的错误，因为不发生在渲染阶段，这种错误采用 try...catch 捕获
  - 异步代码，例如 setTimeout 或 requestAnimationFrame 回调函数
  - 服务端渲染，压根儿不支持 Error Boundary
  - Error Boundary 自身抛出的错误，而不是子组件的错误，捕获不到

- 存在的地方：应用的最顶层或者子组件的外面，保护应用不崩溃

```
class ErrorBoundary extends React.Component {
  constructor() {
    super(props)

    this.state = { hasError: false }
  }

  static getDerivdStaeFromError(error) {
    return { hasError: true }
  }

  componentDidCatch(error, indo) {

  }

  render() {
    if(this.state.hashError) {
      return <div>自定义替换页面</div>
    }

    return this.props.children
  }
}
```

#### react portal

- 帮助我们在 JSX 中跟普通组件一样直接使用自定义组件，而且自定义组件层级不在父组件内，而是独立显示与 app 同级的组件
- 语法：ReactDOM.createPortal(组件内容，组件挂载的真实 DOM 节点)

```
<div id="app-root"></div>
<div id="dialog"></div>
```

#### react Fragement --> 批量返回节点（以前是必须用一个根节点包裹起来）

```
  <React.Fragment>
    <p>111</p>
    <p>222</p>
  </React.Fragment>

  <>
    <p>111</p>
    <p>222</p>
  </>
```

#### react 内部比较 state, props 是否一致，用的 Object.is(a, b)比较 --> 引用数据类型比较的是内存地址，基本数据类型比较的值

#### react lazy 和 suspense

- lazy 能够帮助我们实现代码分割的功能
- suspense，用来捕获还没加载好的组件，并暂停渲染，显示相应的 callback 组件; 与 error boundary 类似，只不过 boundary 是捕获错误，显示相应的 callback 组件

- 注意：
  - SSR 不支持 lazy 特性
  - Lazy 必须搭配 Suspence 使用，否则会报错

```
  const A = Reac.lazy(() => import('./A.js'))

  <Suspence fallback={<div>hello world</div>}>
    <A />
    <B />
    <C />
  </Suspence>
```

#### react lazy 懒加载组件

#### react Fiber 的渲染过程

- 渲染过程主要分两个阶段：render 阶段和 commit 阶段
  - render 阶段：主要是对比出哪些 DOM 节点需要更新
  - commit 阶段: 将 render 阶段收集到的信息更新到真实节点中

#### react 如何调度一个任务 https://zhuanlan.zhihu.com/p/347522106

- 时间切片：将多个粒度小的任务放入一个个时间切片中执行的一种方法，可以用 requestIdleCallback 模拟
- React 是内部自己实现了一套 requestIdleCallback 的过程，拿到浏览器空闲时间，做相应的操作，用的时 messageChannel
- requestIdleCallback(callback, { timeout: 时间 })，指定空闲时间执行 callback 函数，如果时间超过了 timeout 设定的时间，那么强制执行

- 调度过程：
  - 初始化
    - 出现新的更新时，会根据当前时间和过期时间，推算出优先级和过期时间，然后新建一个任务，把任务放入任务队列
  - ## 运行任务

#### hooks 源码解读 --> https://react.jokcy.me/book/api/react.html

- hooks 产生的背景：从类组件去拥抱函数编程

  - 类组件状态难以抽离和复用，能实现的方式是 HOC 和 render props，但是会修改组件结构，造成嵌套地狱
  - 类组件有生命周期，而逻辑代码分散在声明周期函数中，而且和生命周期是强相关的，所以也就是导致了不容易分离
  - class 内部的 this、生命周期和数据流的学习成本大

- hooks 产生就是为了解决以上问题的：
  - 组件逻辑复用，无需更改组件逻辑
  - 逻辑容易抽离和复用
  - 方便学习，就是函数
  -

#### render props --> 是一种在 react 组件直接使用一个值为函数的 props 共享代码的简单技术

```
  <Component render={data => (<div>{data}</div>)}>
```

#### useState 和 this.state 的原理区别

- useState -- 内部通过 useReducer 来实现的 --> 重点查看 useReducer 源码

  - 接收一个唯一参数，也就是初始值 state
  - 可以在组件中多次使用 sate hook
  - state 也是 immutble 的，，通过数组第二个参数 set 一个新值之后，原理的值会形参一个新的引用在下次渲染时
  - 内部是个闭包机制，每次总能获取当前的值

- this.state

  - 普遍是个对象格式
  - 更新 state 时合并
  - state 是 immutable 的，setState 后一定会生成一个全新的 state 引用，通过 this.state 引用，导致每次执行后拿到的都是最新的 state 引用

- 源码原理：
  - useState 是挂载在当前组件上的，然后按照使用 useState 的顺序，生成了一个数组存储，将每个更新函数与下标对应
  -

#### 对 hooks 的理解 --> hooks 是一些函数，这些函数可以让你在函数组件中钩入 react state 以及生命周期等特性的函数（hook 是一个特殊函数，可以让你钩入 react 的特性）

- 使用了 JS 的闭包机制

- 函数组件原本是不支持 state 和生命周期的，但是现在用 hook, 可以钩入了，就可以支持了
- useState: 就是允许你在函数组件中添加 state 的 hooks
- useEffect: 就是允许你在函数组件中处理非 UI 任务的 hooks,调用 useEffect, 就是告诉 react 在完成对 DOM 的更改后运行你的副作用函数

- 以前在的一个函数组件，如果要使用 state，那么必须改为 class 组件

- 只能在最顶层使用 hook，不能在循环、条件或嵌套函数中调用 hooks
- 只在 react 函数中调用 hooks，不能在普通的 javascript 函数中调用 hooks

#### effect 副作用 --> 简单来说，就是和 UI 没什么直接关系的，肉眼看不见变化的东西

- API 请求，肉眼看不见。等请求拿回数据，把数据给 UI 时，才能看见
- 状态更新，肉眼看不见。更新到 UI 上时，才能看见
- useEffect，是在每次更新 DOM 后执行，卸载 effect 也是每次重新渲染就卸载，而不是卸载组件时才卸载

#### react 怎么知道组件内部，哪个 state 对应哪个 useState --> 按照 hook 的调用顺序

- 只有 hooks 的调用顺序保持一致，react 就能将内部 state 和对应的 hooks 进行关联
- 如果将一个 hook 写在条件判断中，那么这个 hook 和 state 的顺序就对应不上

#### 自定义 hook --> 将组件逻辑提取到可服用的函数中

```
  function useCount(init) {
    const [count, setCount] = useState(init)

    const addOne = useCallback(() => {
      setCount(pre => pre + 1)
    }, [])

    return [count, addOne]  // 外层直接调用addOne，不需要参数，就可以实现+1 的逻辑
  }
```

#### 精读资料 https://juejin.cn/post/6844903854174109703#heading-2
