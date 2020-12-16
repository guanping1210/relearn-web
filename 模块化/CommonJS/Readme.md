#### commomjs
##### 用于服务器编程，模块文件一般已经存于本地硬盘，所以加载快，不需要考虑异步加载

1、用于 node 服务端，所以加载速度快，是同步的
2、模块多次加载，但是只记录第一次运行导出的结果，后续加载，直接读取缓存结果
3、模块加载顺序，按照代码中出现的顺序加载
4、module.exports 导出模块； require 加载模块
5、导出模块默认是导出个对象 {}
6、如果一个模块的对外接口是一个单一值，不能使用exports输出，只能用module.exports输出

#### module对象

1、module.id 模块标示符，或者模块ID
2、module.filename 模块文件名，带有绝对路径
3、module.loaded 布尔值，标示模块是否已经完成加载
4、module.parent  返回一个对象，表示调用该模块的模块(可以用来判断是否为脚本入口)
5、module.children 返回一个数组，表示该模块要用到的其他模块
6、module.exports 表示模块对外输出的值

#### require命令

1、读入并执行一个Javascript文件，然后返回该模块的exports对象，如果没有发现指定模块，会报错
2、加载文件的后缀名默认为.js
 2.1 以'/'开头，表示加载的绝对路径的模块文件
 2.2 以'./'开头，表示加载的相对路径的模块文件
 2.3 其他开头，则加载的默认提供的核心模块，会在位于mode_modules的模块

3、目录加载规则
4、模块缓存

#### NODE_PATH 环境变量

1、node执行脚本时，会先查看环境变量NODE_PATH
2、可以添加环境变量到.bashrc
  export NODE_PATH = '/user/local/lib/node'

#### 模块的循环加载

1、A加载B，B加载A，那么B将加载A的不完全版本


#### 加载机制

1、输入的是输出的值的拷贝
2、require内部处理流程
  * 检查Module._cache是否缓存之中有指定模块
  * 如果缓存中没有，创建一个新的Module实例
  * 将实例保存到缓存中
  * 使用module.load() 加载指定的模块文件，读取文件后，使用module.compile()执行文件代码
  * 如果加载/解析过程报错，就从缓存删除该模块
  * 返回该模块的module.exports
