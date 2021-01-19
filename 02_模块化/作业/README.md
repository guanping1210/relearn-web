#### 搞清楚 module.exports exports 的导出引用原理

#### ESModule 规范通过这些方式导入导出代码，具体使用哪种导出方式能这样导入

import { V1, V2 } from './test' --> module.exports | export
import \* as V3 from './test' --> export default
import V4 from './test --> export default
