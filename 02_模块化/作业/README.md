#### 搞清楚 module.exports exports 的导出引用原理

module是个对象，对象上有一些信息，其中有个exports属性，这个属性就挂载了要导出的内容；
exports内部，其实也是引用的module.exports

#### ESModule 规范通过这些方式导入导出代码，具体使用哪种导出方式能这样导入

import { V1, V2 } from './test' --> export --> 导出的是对象，不是解构语法，只是与解构语法很像而已
import \* as V3 from './test' --> export default --> 导出的是整个模块，不是对象
import V4 from './test --> export default
