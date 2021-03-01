#### 介绍下原型链 https://juejin.cn/post/6844904070579240974

- 原型：就是一个具有特殊作用的普通对象，用来共享属性和方法的对象; 是父级的属性共享给子级，所以原型内部的下划线 proto 是指向父级的属性的

  - 原型上又有一个 constructor 属性，这个属性指向构造函数
  - 也有一个 proto 属性，指向上一层的原型

- 构造函数：也是一个具有特殊作用的函数，能够通过 new 来创建实例的函数;
- 隐式 proto: 每个对象都有这个属性，这个属性也指向原型
- 原型链：就是通过**proto**链接起来的一条链路
- 实例：构造函数通过 new 构造出来的对象，没有 prototype 属性，有隐式 proto 属性

- 原型、构造函数、**proto**之间的关系

  - 构造函数.prototype === 原型
  - 实例.\_\_proto\_\_ === 原型
  - 原型.constructor = 构造函数

- 循环

  - 构造函数.prototype --> 原型 --> 原型.constructor --> 构造函数 --> new 出来的实例 --> 实例.proto --> 原型
  - 原型链的顶端是 null, 往下都是 Object 对象，只要是对象或者函数类型都会有 proto 属性

- 原型链的作用
  - 实现继承，把每个对象关联起来
  - 属性查找，沿着原型链往上查找
  - 实例类型判断：判断这个实例是否属于某类对象

#### new --> 是一个语法糖，配合构造函数创建实例对象，内部实现了几个步骤

- 创建一个空对象 obj，分配内存空间
- 从参数列表中获取构造函数，将 obj 的 proto 属性指向构造函数的 prototype --> 设置对象的原型链
- 通过 apply 执行构造函数，并将当前 this 的指向改为 obj
- 返回构造函数的执行结果，或者当前的 obj 对象

```
function objFactory() {
    var obj = {}
    var Constructor = [].shift.call(arguments) // 把类数组对象转为数组对象， 其实就是获取的第一个参数，第一个参数就是所谓的构造函数

    obj.__proto__ = Constructor.prototype  // 设置对象的原型链

    var ret = Constructor.apply(obj, arguments) // 把构造函数的this指向obj，并执行构造函数

    return typeof ret === 'object' ? ret : obj
}

function fnf() {
    this.x = 123
}

let a = objFactory(fnf) // 内部的Constructor === fnf，也就是构造函数
console.log(a.x)
```

#### typeof 和 instanceof 的区别

- JS 数据类型

  - 基本类型：null undefined number string boolean Bigint Symbol
  - 引用类型：object

- typeof 返回的类型：'number'、'string'、 'boolean'、 'null'、 'function'、 'undefined'、 'symbol'、 'object'
- instanceof 用于判断该对象是否是目标的实例，是根据原型链逐层向上查找的

```
// 实现一个instanceof --> 查找原型链
function myInstanceof(ins, obj) {
    let p = ins.__proto__

    while(p) {
        if(p === obj.prototype) {
            return true
        }

        p = p.__proto__
    }

    return false
}
```

#### JS 数据类型在内存上有什么区别

- 基本类型：存储在栈内存中，因为大小是固定的，在栈内可以快速查找
- 引用类型：存储在堆内存中，因为大小是不固定的，所以存储在堆内存中，然后栈内存中只存放指向堆内存的内存地址，大小也是固定的

- 函数传参：其实不管是基本类型还是引用类型，都是按照值引用的，只不过如果参数是引用类型，传递的是指向堆内存的那个地址，所以会受到影响

```
function test(a) {
    a.name = 10
}

var obj = { age: 20 }

test(obj) // 其实都是按值传递的，只不过引用类型传递的是指向堆内存的地址而已，所以会影响到外面的对象

console.log(obj) // { age: 20, name: 10 }
```

#### 作用域 和 作用域链

- 作用域：就是变量和函数的可访问范围，控制着变量和函数的可访问性和生命周期
- JS 中是词法作用域，意思就是变量和函数的作用域是由编码位置来决定的，而不是由执行位置来决定的。可以通过 apply bind 等函数进行修改
- ES6 之前，JS 中只有函数作用域和全局作用域

- JS 在执行的时候是有个执行栈的，在函数执行的时候会创建执行环境，也就是执行上下文，在执行上下文中有个大对象，保存执行环境定义的变量和函数
- 在使用变量的时候，就会访问这个大对象，这个对象会随着函数的调用而创建，函数执行结束出栈而销毁，这些大对象组成的一个链，就是作用域链

- 闭包：指的是一个函数有权利访问另一个函数的作用域，能够拿到另一个函数的变量那些，这种情况，就是闭包

#### Object.defineProperty --> 给对象设置属性和属性值，并能够控制属性的修改和读写权限

- 数据属性

  - value 属性值，默认是 undefined
  - enumerable 表示能否通过 fonr-in 遍历到该属性
  - writable 表示能否修改属性的值
  - configuarable 表示能否通过是 delete 删除属性从而从新定义属性

- 访问器属性
  - configuarable 表示能否通过是 delete 删除属性从而从新定义属性
  - enumerable 表示能否通过 fonr-in 遍历到该属性
  - get 读取属性时调用的函数，默认值为 undefined
  - set 写入属性时调用的函数，默认值为 undefined

```
var a = {}
Object.defineProperty(a, 'name', {
    value: 20,
    writable: false,
    get: function() {
        return 999
    }
})

a.name
```

#### toString 和 valueOf 的区别 --> 主要用于类型的隐式转换

- 每个数据类型的构造函数，都有 toString 和 valueOf 方法
- 不同的数据类型，进行运算操作时，是需要先转换类型的，会先调用 valueOf 方法，看返回的结果是不是基本数据类型，如果返回的不是原始类型，就会调用 toString 方法

```
                    valueOf                                                        toString
1                   1                                                                 '1'
true                true                                                              'true'
{}                  {}                                                          '[object object]'
'10'                 '10'                                                              '10'
function(){}       function(){}                                                     'function(){}'
Number            function Number() { [native code] }                           'function Number() { [native code] }'

```

#### 异步的解决方案

- 回调函数: 嵌套调用
- Generator： 异步任务容器，不断调用 next 执行，返回{ value, done }
- promise: 语法糖，通过 then 来控制调用顺序
- async/await： 语法糖，本质上是对 generator+promise 的封装
- co：把 Generator 和 Promise 封装，达到自动执行

#### 介绍一下 Generator

- generator 函数是一个封装的异步任务，核心是可以控制函数的顺序，通过关键字 yield 来标识暂停的位置
- generator 函数返回一个迭代器对象，并不会立即执行函数里面的方法，对象中有 next 函数
- 每一步调用 next 函数，可以带一个参数，该参数被当作上一个 yield 表达式的返回值

```
let go = function* (x) {
    console.log('one', x)
    let a = yield x * 2
    console.log('two', a)
    let b = yield x + 1
    sum = a + b
    return sum
}
let g = go(10)
let val = g.next()
while (!val.done) {
    val = g.next(val.value)
    console.log(val)
}
console.log(val)
```

#### 介绍一下浏览器的事件循环 --> 

- JS 是单线程的，也就是说同一时刻，最多只有一个代码段在执行，那么对于异步任务，浏览器是如何处理的？

  - 主线程： 也就是 JS 引擎执行的线程，只有一个，页面渲染、函数处理都在主线程上执行
  - 工作线程：其实就是定时器线程、网络请求线程这些，是有独立的线程来执行的，就与主线程分开了

- JS 在执行的时候，是有一个执行栈的，所有的代码都在执行栈里面运行。
- 在执行过程中，如果遇到异步操作，浏览器会把这些操作放入另外的线程去执行，等执行完毕后，将回调函数放入到任务队列中。
- 主线程执行完栈中的所有代码后，就检查任务队列是否有任务需要执行。如果有，就把该任务放到执行栈中执行。

- 任务队列 --> 如果任务队列中有多个任务，那么该先执行谁？所以用两个任务队列来区分了一下

  - Macortask 任务
    - setTimeout
    - setInterval
    - I/O
    - 用户交互操作，UI 渲染
  - Microtask 任务
    - Promise
    - process.nextTick
    - Object.observe

- 一次事件循环，只执行处于宏任务队首的任务，执行完成后，立即执行微任务队列的所有任务

#### 模块化方案

#### 垃圾回收机制 V8 --> 因为对象需要占用内存，而内存资源是有限的

- 垃圾对象：对象没有被引用，或几个对象形成循环引用，但是根访问不到他们，这种就是可回收垃圾
- 垃圾回收的机制：标记清除和引用计数

- 标记清除：代码运行时，内存中的所有变量都会加上标记，然后去掉环境中的变量和被环境中的变量引用的标记

  - 例如函数中声明一个变量，做了一个标记，然后函数执行完毕，退出执行栈，这个变量的标记就变成已使用完

- 引用计数：记录每个变量被引用的次数，引用一次就+1，如果变量引用释放了，就-1，变为 0 的时候就会被清理

- V8
  - 分代回收，对象分威两组，新生代，老生代
  - 增量回收
  - 空闲时间回收

#### map 和 weekMap 的区别

- map 的 key 可以是任意类型，内部有两个数组分别存放 key 和 value,用下标保证一一对应
- weekMap 的 key 必须是对象

#### Array 常用方法 --> 最好能够模拟实现一遍

#### 循环有几种方式，是否支持中断和异步 async/await

- for 可中断、可异步
- for of 可中断，可异步
- for in 可中断，可异步
- forEach 不可中断，不可异步
- map 不可中断、不可异步，支持异步的处理方法：map 返回 promise 数组，配合 Promise.all 一起处理
- reduce 不可中断，不可异步，支持异步的处理方法：返回值返回 promise 对象

#### 了解函数式编程吗 --> 是一种编程范式，与面向对象，面向过程一样，是一种编程的方法论(需要手写实现 curry 和 compose)

- 主要思想是：把运算过程携程一系列的函数调用
- 特点

  - 函数没有副作用，相同的输入能够得到相同的输出
  - 不能之间或间接改变与自己无关的变量

- 函数运算
  - 合成 compose：一个值要经过多个函数，才能编程另外一个值，将多个函数合并为一个函数的过程，就是函数的合成
  - 柯里化 curry: 把接受多个参数的函数变换成接受一个单一参数的函数
    - 参数复用
    - 业务解耦，调用时机灵活
    - 延迟执行，部分求值

```
// 函数的合成
// before
var name = 'xiaoli'
name = a(name){}
name = b(name){}
name = c(name){}

// 函数合成之后
var fn = compose(a, b, c) // a、b、c都是函数
fn(name)

// 柯里化 curry  fn(1)(2)(3)(4), 执行结果得到1+2+3+4
function curry(fn, ...args) {
    let length = fn.length
}
```

#### 斐波拉契数列 0 1 1 2 3 5 8 ...， 也就是后一个数是前两个数之和

- 递归：函数内部循环调用自身，由于执行栈中会一直保持相关变量，占用内存，容易爆栈
- 尾递归：函数的最后一步调用自身，进入下一个环境就不需要上一个函数的环境了，内存空间变 O(1),释放外层调用栈，节省内存开销

```

```

#### JS 中的作用域和上下文不是同一个概念：作用域是确定函数调用时可访问变量的范围，上下文总是关键字 this 的值，而 this 的值，是函数运行时决定的，this 表示的是一个可访问对象 --> https://www.cnblogs.com/wangfupeng1988/p/3977924.html

#### JS 中 this --> 其实就是个对象，

#### JS 中的上下文 --> 上下文是
