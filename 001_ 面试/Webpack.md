#### 资料

https://www.manster.me/?p=872
https://zhuanlan.zhihu.com/p/100974318
https://blog.csdn.net/qq_36702688/article/details/113815832

#### webpack 是干什么的

- webpack 是一个打包工具，因为浏览器不认识其他 css、图片等东西，所以就借助 webpack 将这些资源打包为 JS, 这样浏览器就能认识了
- 是基于 nodejs 平台运行的，模块化默认采用 commonjs

#### webpack 与其他构建工具 rollup、grunt、gulp、parcel 等的区别

- grunt 和 gulp 是基于任务和流的。类似 jquery，找到一个文件，就对其做一系列链式操作，更新流上的数据。整个链式操作构成一个任务，多个任务构成整个构建流程
- webpack 是基于入口的，会自动递归解析入口所加载的所有资源文件，然后用不同的 loader 来处理不同的文件，用 plugin 来扩展 webpack 功能

- 区别：
  - 构建思路：
    - grunt 和 gulp 需要将整个前端构建过程拆分为多个 task，并合理的调用所有 task 之间的调用关系
    - webpack 是需要找到入口，并清楚对于不同的资源应该使用什么样的 loader 对资源进行解析和加工
  - 知识背景
    - gulp 更像后端开发的思路, 对于整个流程需要很了解
    - webpack 更像前端开发的思路

#### 与 webpack 类似的打包工具还有哪些，为什么选择 webpack

- webpack
- rollup
- parcel

- 从应用场景上看
  - webpack 适用于大型复杂的前端站点构建
  - rollup 适用于基础库的打包，如 vue、react
  - parcel 适用于简单的实验性项目，能够满足低门槛的快速看到效果

#### webpack 基础

- entry 入口
- output 出口
- module loader 解析规则
- plugins 插件配置规则
- mode 开发模式

#### 常见 loader 有哪些，是解决什么问题的？ --> 根据有哪些资源的分类，罗列 loader

- 处理 js 的 loader

  - babel-loader 把 ES6 转为 ES5, 提高浏览器兼容性

- 处理 css 的 loader

  - css-loader 加载 css, 支持模块化、压缩和文件导入等特性
  - style-loader 把 css 代码注入到 JS 中，通过 DOM 操作去加载 css
  - sass-loader
  - less-loader

- 处理静态资源图片的 loader

  - file-loader 把文件输出到一个文件夹中，通过相对 URL 去引用输出的文件
  - url-loader 与 file-loader 类似，但是能够把小文件打包为 base64

- 处理 html 文件中的图片

- 其他 loader

  - eslint-loader 通过 eslint 检查 JS 代码

#### 常见的 plugin 有哪些，是解决什么问题的 --> 从功能上挨个列举

- 模板替换
- - html-webpack-plugin
  - clean-webpack-plugin

- 定义环境变量 --> 集成到 webpack 中了
- - webpack.DefinePlugin 编译时配置全局变量

- 压缩代码
- - UglifyJsPlugin 压缩和混淆代码
  - webpack.CommonChunkPlugin 提高打包效率，将第三方库和业务代码分开打包
  - webpack.ProvidePlugin 自动加载模块，代替 require 和 import

- 对 css 相关的插件扩展
- - extract-text-webpack-plugin 将 js 文件中引入的样式单独抽离为 css 文件
  - optimize-css-assets-plugin 不同组件中重复的 css 可以快速去重

- ... 还有很多插件

#### loader 和 plugin 有哪些不同

- loader 意为加载器，webpack 将一切文件视为模块，但是只能解析 js 文件，loader 就是让 webpack 拥有了加载和解析非 JS 文件的能力
- plugin 意为插件，可以扩展 webpack 的功能，例如模板替换、压缩、模块分离等功能，都是插件完成的

#### webpack 的构建流程是什么 --> 是一个串行的流程

- 初始化参数：从配置文件和 shell 语句中读取与合并参数，得到最终的参数
- 开始编译：用得到的最终参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
- 确定入口：根据配置中的 entru 找出所有的入口文件
- 编译模块：从入口文件触发，调用配置的 loader 规则对模块进行翻译，再找出该模块的依赖模块，递归编译所有模块
- 完成模块编译：经过递归编译之后，能够得到每个模块被翻译后的最终内容以及他们之间的依赖关系
- 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 chunk，再把每个 chunk 转换成一个单独的文件加入到输出列表 --> 这一步是修改内容的最后机会
- 输出完成：确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到系统中

#### 描述一下编写 loader 和 plugin 的思路

- loader 拿到源文件内容，通过返回值的方式将处理后的内容输出
- plugin 是借助 webpack 提供的相关生命周期的钩子进行一些操作

#### bundle、chunk、module 的区别

- bundle 是由 webpack 打包出来的文件
- chunk 是指 webpack 在进行模块依赖分析时，代码分割出来的代码块
- module 是开发中的单个模块

- 三者是同一个代码在不同阶段的不同名称

#### webpack 的热更新原理 --> 不用刷新浏览器，直接将模块的变更部分替换掉旧的模块

- webpack 的 watch 模式，能够监听到文件的变化，然后根据配置文件对变化的文件重新编译打包，打包后的结果通过简单的 JS 对象保存到内存中
- dev server 的中间件 dev middleware 调用 webpack 暴露的 API 对代码变化进行监控，并且告诉 webpack，将代码打包到内存中
- dev server 对配置文件夹中静态文件的监控，变化后会通知浏览器对引用进行 live reload（浏览器自动刷新）
- dev server 在浏览器端和服务端建立了一个 websocket 长连接，将 webpack 编译打包的各个阶段的信息告诉给浏览器，浏览器根据消息进行不同的操作
- dev server/client 端根据传递的信息决定是刷新浏览器还是热模块更新
- hotModuleReplacement.runtime 是 HMR 的核心，接收到新模块的 hash 值，向 webpack server 端发送 ajax 请求，服务端返回一个 json，包含了模块的跟新 hash 值，再通过 jsonp 和 hash 值发送请求，获取模块代码
- hotModulePlugin 对新旧模块代码进行对比，决定是否更新模块
- 当 HMR 失败后，回退到 live reload，也能通过浏览器刷新获取最新打包代码

#### webpack 性能优化 --> 提高性能和体验

- 压缩代码，删除多余代码 uglifyJsPlugin + paralleUglifyPlugin
- 利用 CDN 加速
- 删除无用代码 tree-shaking
- 提取公共代码 CommonsChunkPlugin

#### 如何提高 webpack 的构建速度

- 利用 CommonsChunkPlugin 提取公共库
- 利用 externals 配置获取常用库
- 利用 DllPlugin 和 DllReferencePlugin 预编译资源模块，利用 DllPlugin 对我们引用但是不会修改的 npm 包进行预编译，通过 DllReferencePlugin 加载预编译的模块
- 利用 Happypack 实现多线程加速编译
- 利用 tree-shaking 和 Scope hoisting 剔除多余代码
- OneOf, 匹配一个规则

#### webpack tree-shaking 的原理

- tree-shaking 只能在静态 modules 下工作，在 ES6 之前使用 CommonJS 规范引入模块，通过 require 动态引入模块，就无法确定在实际运行前不需要哪些模块
- ES6 之后，import()引入模块采用静态导入，可以采用一次导入所有的依赖包，再根据条件判断，获取不需要的包，然后执行删除操作

- 核心就是利用的 ES6 模块化的特性

  - 只能作为模块顶层的语句出现
  - import 的模块名只能是字符串常量
  - import binding 是 immutable 的，引入的模块不能再进行修改

- 实现原理：利用 import 是静态的，所以编译时就能正确判断加载了哪些模块；静态分析程序流，对于未引用的模块和变量，执行删除操作

#### webpack 核心 tapable

- webpack 中最核心的负责编译的 Compiler 和负责创建 bundles 的 Compilation 都是 tabable 的子类，而且实例内部的生命周期也是通过 tabable 库提供的钩子类实现的

- tapable 提供了多种不同的监听和触发事件的方式

```
class Compiler extends Tapable {
    constructor(context) {
        super()

        this.hooks = {
            run: ...，   // 基本上都是继承tapable的钩子
            emit: ...,
            compilation: ...,
        }
    }
}
```

- tapable 导出的钩子类，分两类：Sync 同步 和 Async 异步，同时按照事件回调的运行逻辑分一些

  - Sync 同步，只能通过 tap 方法注册事件回调
  - AsyncSeries 异步，只能通过 callAsync 或 promise 进行注册，按照顺序执行
  - AsyncParalle 异步，并行执行所有的事件回调

  - Basic 基础事件类型，不关心内部的运算逻辑
  - Bail 保险事件类型，当一个事件回调在运行时返回的值不为 undefined 时，停止后面事件回调的指定
  - Waterfall 瀑布事件类型，当前执行的返回值不为 undefined，那么就把下一个事件回调的第一个参数替换为这个值
  - Loop 循环事件类型，

- tapable 注册事件回调有三个方法：tap、tapAsync、tapPromise
- tapable 触发注册事件的三个方法：call、callAsync、promise

#### 编写自定义 loader

- 定义 schema.json，对 loader 的配置做处理要求
- 定义一个函数，接收 content 源码，以及其他 map、meta 信息
- 做 schema 校验以及对源码进行处理，通过 return 返回处理后的代码，或者 callback 返回(callback = this.async())
- 通过 module.exports 暴露出去

#### 编写自定义 plugin

- 定义一个 class 类
- 定义一个 apply 方法，接受 compiler 作为参数
- 指定一个绑定到 compiler 上的事件钩子
- 处理 webpack 内部实例 compilation 的特定数据
- 功能完成后调用 webpack 提供的回调
- 通过 module.export 暴露出去

```
class MyPlugin {
    constructor() {}

    apply(compiler) {
        compiler.hooks.xxx.tap(pluginName, (compilation) => {
            compilation.hooks.xxx.tapAsync(pluginName, async(cb) => {
                ...
                cb()
            })
        })
    }
}

module.exports = MyPlugin
```

#### compiler 和 compilation

- compiler，对象代表了完整的 webpack 环境配置，这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options、loader 和 plugin
- - 在 webpack 中应用一个插件时，插件将接受到 compiler 对象的引用

- compilation，对象代表了一次资源版本构建，当运行 webpack 开发环境中间件时，每检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源
  - 一个 compilation 对象包含了模块资源、编译生成资源、变化的文件，以及被跟踪依赖的状态信息

#### webpack 模拟

- webpack 是个函数，接受 config 作为参数，通过 Compiler 对 config 进行处理，执行 run 方法
- run 方法，就算得到入口文件信息以及相关的依赖，将依赖生成关系图
- 根据关系图得到最后的输出资源
