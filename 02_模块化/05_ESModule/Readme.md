#### ES Module

1、import / export 关键字导入、导出
2、与其他规范最大的区别是，ESModule 是由 JS 解释器实现的，CommonJS 和 AMD 是由宿主环境运行时实现的
3、export 导出的，import 时是个对象
4、export default 默认导出的内容，是整个模块，import 时就不能使用对象解构了
5、但是 import 导出的，其实不是解构，在修改别名的时候是会报错的（可测试）
6、使用 as 来对模块重命名
import { test as customTest } from 'moduleA'
