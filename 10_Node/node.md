#### node是什么 --> 是一个基于V8引擎的JS代码运行环境，可以理解为是一个软件，这个软件能够运行代码
- 浏览器软件，是JS代码的运行环境
- Node软件，也是JS代码的运行环境 --> node能够运行JS代码，是因为内部包含了Chrome V8引擎

#### node组成 --> ECMAScript, Node模块API
- Javascript组成：ECMAScript, DOM, BOM

#### nodejs模块化开发
- 规定一个Javascript文件就是一个模块，模块内部定义的变量和函数在默认情况下外部不能访问
- 模块内部可以使用exports对象进行成员导出，使用require导入其他模块

#### 系统模块 --> Node运行环境提供的API
- 文件模块fs --> 读取文件、写入文件、操作文件夹