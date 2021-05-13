/**
 * 1、配置react的流程
 * 
 *  安装依赖react相关的依赖：
 *      react react-dom react-router react-router-dom  redux 
 * 
 *      react和react-router的版本对应：
 *          react-router    react
 *          3.x.x           15.x.x
 *          4.x.x           16.x.x
 *          5.x.x           16.x.x
 *      
 *      react-router和react-router-dom的区别：
 *          前者实现了路由的核心功能，
 *          后者是基于react-router做了二次封装，加入了在浏览器运行环境下的一些功能。例如Link组件会渲染一个a标签，
 *          安装了后者，就不需要显示的安装前者了。
 *          
 * 
 *  安装babel解析器：因为react是VDOM，需要转为js才能被浏览器识别
 *      
 *      babel6:   https://babel.docschina.org/docs/en/6.26.3/ 
 *          babel-preset-es2015 兼容JS新特性，把新特性转为浏览器能识别的特性
 *          babel-preset-es2016 新特性兼容到es2016
 *          babel-preset-es2017 新特性兼容到es2017
 *          babel-preset-latest 新特性兼容到最新出来的特性版本    
 *          babel-preset-env    由开发者自主决定加载哪些插件和polyfill, 可以通过targets指定兼容的浏览器版本
 * 
 *          {
 *              presets: [
 *                  [env, { 
 *                      targets: { browsers: ['last 2 versions'], // 指定浏览器兼容版本
 *                      modules: false, // 指定模块化方式
 *                      useBuiltIns: 'usage', // 将polyfill应用到babel-preset-env中  false 不对polyfill操作；entry 自动兼容所有的polyfill; usage 根据配置的浏览器兼容
 *                      debug: false, // console.log输出插件等信息
 *                   }
 *                  }]
 *              ]
 *          }
 * 
 *          babel-polyfill         模拟完整的es2015+环境
 *          
 *          babel-preset-stage-x   兼容的新特性在ES提案的第几阶段，stage-0 第0阶段提案, stage-1 正式提案阶段, stage-2 草案阶段, stage-3 候选提案阶段
 *          { presets: ['stage-0'] }
 * 
 *          transform-react-jsx  识别jsx文件和语法，因为webpack也不认识jsx语法，需要转为js才能认识
 *          
 * 
 *      babel7:
 * 
 *      babel7相比较babel6做了以下升级：
 *          移除了 babel-preset-es2015 babel-preset-es2016 babel-preset-es2017 babel-preset-latest
 *          删除了 @babel/polyfill
 *          弃用了 @babel/preset-stage-0 @babel/preset-stage-1 @babel/preset-stage-2 @babel/preset-stage-3
 *          部分包重命名了 
 *          
 * 
 *  安装模板解析依赖：
 *      html-webpack-plugin clean-webpack-plugin
 *  
 */