### Next.js

<!--
    1、pages 存放页面的目录，以下每个文件就是一个页面，文件名就是路由 -> 路由是动态生成的
        pages/about.js  -> /about
        pages/about/index.js -> /about
        pages/posts/[id].js  -> posts/1, posts/2

    2、预渲染：next.js会预先为每个页面生成html文件，而不是由客户端javascript来完成，可以带来更好的性能和SEO效果
        static 静态生成： html在构建时生成，并在每次页面请求时重用 -> 适用于页面只需要构建一次的
        server 服务端渲染：在每次页面请求时重新生成html

    3、页面获取外部数据：
        静态生成：页面构建时调用
            页面内容取决于外部数据：getStaticProps
            页面路径取决于外部数据：getStaticPaths, getStaticProps

        服务端渲染：每次页面请求时都会调用
            获取数据：getServerSideProps

    4、CSS 样式:
        公用样式固定引入方式：
            新建pages/_app.js, 在这个文件内部通过 import 引入样式 -> 样式作用于所有页面和组件

        第三方组件样式：
            可以直接在任何地方引入，通过import

        自定义组件级样式：
            命名为: 组件名.module.css

        支持less/sass:
            安装了 sass 就可以了

    5、图片组件：
        next/image, 是对 img 元素的扩展，自带图片优化功能

    6、静态文件服务：支持图片等存放到根目录下的 public 目录中，并对外提供访问
        public/th.jpg -> /th.jpg访问，但是引入到页面中，好像必须设置宽高属性，否则会报错
        如果不是静态服务访问，放在其他的images下面，就不需要必须设置宽高属性

    7、快速刷新：
        只导出React组件：只更新该文件的代码，重新渲染组件，包括组件中可编辑的任何内容；
        导出的非React组件：将重新运行该文件以及引用了该文件的其他文件

    问题：
        1、getStaticPaths需要把所有ID预演的页面情况罗列出来 -> 感觉不太合适 （数据很多，ID很多的情况呢？）
        2、全局的数据怎么处理？（如何存储，如何获取，如何使用）
 -->
