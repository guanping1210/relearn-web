https://zhuanlan.zhihu.com/p/136254808
https://zhuanlan.zhihu.com/p/350033675

#### typescript --> 强类型语言, 是 javascript 的一个超集，是一种面向对象的编程语言，支持 ES6 语法，如类、接口、继承、泛型等，但是不能直接运行，需要编译为纯 JS 来运行

- 支持静态输入，也就是开发时就能够检测编写脚本的错误
- 适用于大型开发项目
- 更好的协作
- 更强的生产力
- 但是学习成本高

#### typescript 和 javascript 的区别

- ts 文件后缀名为.ts，js 后缀名为.js
- ts 支持 ES6，部分浏览器的 js 不支持 ES6
- ts 支持强类型和静态类型，而 js 不支持这两类
- ts 在编译时就报错了，而 js 在运行时才报错
- ts 支持面向对象，如接口、继承、类等，而 js 是一种脚本语言

#### typescript 有哪些基础类型

- number
- string
- boolean
- Symbol
- Array
- Tuple 元组
- enum 枚举
- object
- never
- void
- never
- null
- undefined
- any

#### ts 接口的特性

- 定义对象、数组、函数、类等
- 接口可以相互继承
- 接口可以继承类

#### 装饰器是什么 --> 是一种特殊类型的声明，本质上是一个方法被附加在类、方法、属性、属性上，使用@expression 这种方式

```
function log(params: any) { // 这个params传递的就是HttpClient类

}

// 表示log函数，接收的参数类型params就是被修饰的类HttpClient
@log
class HttpClient {

}
```

#### 什么是 Mixins --> 一种通过重用组件构建类的方法，不能通过类的直接继承来实现，而是将基类作为接口来实现 --> 因为 extends 只能继承一个类，而 mixins 可以继承多个

```
    // 定义两个类，A和B，也叫做mixins
    class A {
        name: 'gp'
    }

    class B {
        age: 10
    }

    // 使用mixins
    class C implements A, B {
        constructor() {}

        name:
    }

    applyMixins(C, [A, B])
```

#### 类的重载实现 implements --> 用来实现 mixins, 类似于对象的合并

```

```

##### 泛型 T --> 定义时不知道类型，具体使用是才知道，用 T 来表示泛型

```
    // 设置foo的类型为泛型
    type foo<T> = T  ==>  function foo(T) { return T }

    // 限定foo的类型T，必须是字符串类型
    type foo(T extends string) = T  ==> function foo(T: string) { return T}

    // 默认值
    type foo(T extends string: 'hello world') = T
```

#### 条件判断 extends

```
    T extends U ? X : Y

    type isNumber(T) = T extends number ? 'is number' : 'not number'
```

#### 数组 Array --> 每个数据的类型都是一致的

#### 元组 tuple --> 每个数据的类型可以不一致

```
    type tuple<T, S extends any> = { [P in keyof T]: S[P] }
```

#### 联合类型 | --> 用管道符来表示 A|B，表示类型是 A 或者 B

```
    type nameType = string | number
    var name:nameType = 10
```

- 遍历联合类型, 用 in 关键字

  ```
    type key = "vue" | "react"

    type MappedType = { [k in key]: string } // { vue: string, react: string }
  ```

- 动态推导联合类型 keyof

  ```
    interface Student {
        name: string,
        age: number
    }

    type studentKey = keyof Student // 'name' | 'age'
  ```

- 把联合类型的每一项映射为某个函数的返回值

  ```
    typeof MapFunc<T> = T extends any ? () => T : never

    type unionTypes = 'vue' | 'react' | 'angular'

    typeof MapFuncResult = MapFunc<unionTypes> // () => 'vue' | () => 'react' | () => 'angular'
  ```

#### 全局作用域 --> 用 declare 定义的类型，可以在全局使用(在没有导入的前提下，任意文件任意位置，都可以获取并使用)

```
    declare type name = string
    declare insterface Foo {
        name: string,
        age: number
    }
```

#### 模块作用于 --> 使用 export 导出的，必须 import 引入了文件模块才能使用

#### 泛型作用域 && 函数作用域 --> 不会相互影响

```
    type A<T> = T
    type B<T> = T
```

#### 接口 interfance --> 可用 extends 继承

```
    interface Person {
        height: number,
        weight: number
    }
    interface Student extends Person {
        name: string,
        age: number
    }
```

#### 不可预先定义类型 unknown --> 表示不知道是什么类型(常用于类型强制转换) --> 避免使用 any 导致的错误

```
    const num: number = 10
    (num as unknown as string).split('') // 将number类型转为string，才能调用split方法，否则静态检查不通过
```

#### 缺省类型 void

```
    function foo() { } // 返回类型为void
```

#### 键值获取 keyof --> 获取一个类型所有键值，返回一个联合类型

```
    type Person = {
        name: string,
        age: number
    }

    type PersonKey = typeof Person // 'name' | 'age'
```

#### 实例类型获取 typeof --> 获取一个对象/实例的类型,只能作用于一个具体的对象上

```
    type Person = {
        name: string,
        age: number
    }
    const me: Person = { name: 'gp', age: 24 }

    type P = typeof me // { name: string, age: number | undefined }
```

#### 遍历属性 in --> 对枚举类型进行遍历

```
    type TypeToNumber<T> = {
        { key in keyof T }: number
    }
```

#### 泛型条件 - 三目运算符: T extends U ? X : Y

#### 泛型推断 infer --> { t: infer Test } 可以看成一个包含 t 属性的类型定义，这个 t 属性的 value 类型，通过 infer 进行推断后赋值给 test 类型

```
    type Foo<T> = T extends { t: infer Test } ? Test : string // 推断

    type One = Foo<number> // string，因为number不是一个包含t的对象类型
    type Two = Foo<{ t: boolean }> // boolean, 泛型参数匹配上了，使用了infer对应的type
    type Three = Foo<{ a: number, t: () => void }> // () => void, 适配上了
```

#### 泛型工具 Partical<T> --> 将泛型中全部属性变为可选的

```
    type Partical<T> = {
        [key in keyof T]?: T[key]
    }

    type Anumal = {
        name: string,
        age: number
    }

    type PartOfAnimal = Partical<Animal> // name和age属性，全部变为了可选属性
```

#### 泛型工具 Record<K, T> --> 将 K 中所有属性值转化为 T 类型，通常用来声明一个普通 object 对象

```
    type Record<K extends keyof any, T> = {
        [key in K]: T
    }
```
