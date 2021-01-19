### 前端模块化(根据出现时间和需求排序) https://www.cnblogs.com/CandyManPing/p/13923285.html

#### 需要模块化的原因

    1、模块是独立的，可维护性好，降低耦合度
    2、减少全局变量污染
    3、提高了代码的可复用性
    4、方便管理依赖关系

### 1、commonjs --> node，同步加载

    使用方式：
        导出：module.exports = xxx | exports.xxx = value
        导入：require(xxx)
    特点：
        以文件为单位；
        同步加载模块；
        多次加载是读取的缓存文件；
        加载顺序与出现顺序一致；
        导出的是值的拷贝；

### 2、AMD --> 浏览器，异步加载，基于 requirejs

    使用方式：
        导出: define([xxx, bbb], callback)
        导入：require(xxx, callback)
    特点：
        异步加载；
        显示的列出依赖关系；
        模块提前被加载好；

### 3、CMD --> 浏览器，异步加载，基于 seajs

    使用方式：
        导出：define(xxx)
        导入：seajs.use(xxx, callback)
    特点：
        异步加载；
        按需加载；
        模块延迟执行；

### 4、UMD --> 兼容 node 和浏览器

### 5、ES Module --> 浏览器，异步加载，基于 ES6

    使用方式：
        导出：export default | export xxx
        导入：import

    特点：
        编译时加载；
        输出的是值引用，而非值拷贝;
        import 只能写在最顶层；
