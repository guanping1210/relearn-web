/**
 * JS模块化：
 *  文件作用域
 *  通信规则：
 *      加载 require
 *      导出
 * 
 * commonjs模块规范：
 *  模块作用域；
 *  通信规则：
 *      加载 require --> 执行被加载模块中的代码、得到被加载模块中的exports导出的对象
 *      导出 exports / module.exports
 * 
 *  exports和module.exports的区别：
 *      其实exports = module.exports，两者是差不多相等的，但是最终内部是返回的module.exports; 
 *      exports = xxx，重新赋值后，导致exports已经不再指向以前的内存块了
 */