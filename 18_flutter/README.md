### flutter

- 可以用来编写跨平台、高性能移动应用的框架，基于 Dart 语言开发
- 一套代码能够运行于 IOS 和 Android 以及浏览器 web 端
- 提供了丰富的组件、接口等扩展

- https://book.flutterchina.club/chapter1/dart.html flutter 实战

#### Dart，是一种开发语言

- JIT 即时编译与 JS 速度持平，开启 AOT 模式编译，比 JS 快很多，所以编译速度快

  - JIT 即时编译，执行一句翻译一句，也就是动态编译
  - AOT 提前编译，在执行前全部被翻译为机器码，也就是静态编译

- 借鉴了 Java 和 Javascript 的优点

#### Dart 简介

- 1、变量声明

  - var ，声明的类型一旦确定，就不能再更改类型了
  - dynamic，声明的变量可以赋值任意对象，后期也可以改变赋值类型
  - Object, 声明的对象可以赋值任意对象，后期也可以改变赋值类型
  - final, 声明的变量只能设置一次
  - const, 声明的是常量，后续不会更改，是编译时常量

- 2、函数：Dart 是面向对象的语音

  - 函数声明, 如果没有显示的声明返回值类型，会默认当做 dynamic 处理

  ```
    bool isNoble(int atomicNumber) {
        return _nobleGases[atomicNumber] !== null
    }
  ```

  - 可以使用箭头函数这样的简洁语法
  - 函数可以作为变量

  ```
    var say = (str){ print(str) }
    say('hi word)
  ```

  - 函数可以作为参数传递

  ```
    void test(var callback) {
        callback()
    }

    test(() => print('xxxx'))
  ```

  - 函数的参数位置可选

  ```
    String say(String from, String msg, [String device]) {
        var result = '$from says $msg'
        if(device != null) {
            result = '$result with a $device'
        }
        return result
    }

    say('Bob', 'Howday') // Bob says Howday
    say('Bob', 'Howday', 'smoke') // Bob says howday with a smoke
  ```

  - 可选的命名参数，{ param1, param2 ... }

  ```
    void enableMes({ bool bold, bool hidden }) {}

    enableMes(bold: true, hidden: false)
  ```

- 3、异步支持，只能接收一个操作结果

  - Future, 类似于 Promise，用来处理异步操作
    - .then
    - .catchError
    - .await
  - async/await

- 4、Stream 接收异步时间数据，接收多个异步操作结果

#### flutter 优点

- 开发效率高：基于 JIT 的快速开发周期，基于 AOT 的发布包
- 高性能：能提供流畅、高保真的 UI 体验
- 快速内存分配，使用函数式流，依赖底层的内存分配器
- 类型安全，因为 Dart 是类型安全的语音，支持静态类型检测
- 社区完善

#### flutter 架构

- Flutter Framework， 纯 Dart 实现的 SDK,实现了一套基础库

  - Foundation\Animation\Painting\Gestures，合并为 Dart UI 层，是 flutter 引擎暴露的底层 UI 库，提供动画、手势和绘制功能
  - Rendering 层，是一个抽象的布局层，依赖于 dart ui 层。工作原理类似于 React 的 VDOM，构建一个 UI 树，计算变化部分，然后更新，最终将 UI 树绘制到屏幕上
  - Widgets 层，是 flutter 提供的一套基础组件库，还提供了 Material 和 Cupertino 两种视觉风格的组件库

- Flutter Engine, 纯 C++实现的 SDK，包括 Skia 引擎，Dart 运行时，文字排版引擎等。代码调用 dart ui 库时，最终会走到 Engine 层，实现真正的绘制逻辑

#### Widget 框架， 主要构建 UI 界面， 是 Flutter 应用程序用户界面的基本构建块, 是一个统一的对象模型

- widget 的工作，是实现一个 build 函数，用来构建自身。一个 widget 通常由其他较低级别的 widget 组成
- StatelessWidget 无状态的 widget
- StatefulWidget 有状态的 widget

- Text 可以创建一个带格式的文本
- Row、Column，具有弹性空间的布局类，可以在水平、垂直方向灵活布局
- Stack, 取代线性布局，允许子 widget 堆叠，可以用 positioned 来定位
- Container，可以创建矩形视觉元素，如 background、边框、阴影等，也有 margin，padding 等

- Material 组件， 以 MaterialApp 开始
  - 基础组件
    - Container
    - Row
    - Column
    - Image
    - Text
    - Icon
    - RaisedButton 凸起的矩形按钮
    - Scaffold 基本布局结构的集合
    - Appbar 工具栏
    - FlutterLogo
    - Placeholder
  - ... 还有其他 UI widget，具体可见官网

#### 主题颜色， 应用于 MaterialAPP 中的 Theme 属性

- ThemeData 创建应用主题
- Theme 创建局部主题， 通过 new ThemeData 创建一个新的实例，再传递给 Theme
- Theme.copyWith 扩展父主题

#### 显示图片

- Image.network(url) 显示网上的图片
