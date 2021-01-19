### DOM：操作 HTML 的 API

1、捕获：从外到内去查找到触发的对象
2、目标任务：找到当前点击的对象
3、冒泡：找到触发对象后，从内到外去执行

#### 浏览器事件模型：捕获 -> 注册 -> 冒泡

    注册事件：addEventListener(事件类型，回调函数，是否在捕获阶段注册)
    移除事件：removeEventListener(事件类型，回调函数，是否在捕获阶段移除)

    事件代理：核心就是通过冒泡来实现的

    target: 当前触发的元素，也就是当前点击的元素，是会变化的
    currentTarget: 绑定事件的元素,在整个事件流中是不变的

    阻止捕获：stopPropagation()

    阻止冒泡：stopPropagation()、stopImmediatePropagation()、cancelBubble()、

    阻止默认事件：preventDefault

#### ajax --> XMLHttpRequest https://www.cnblogs.com/liu-fei-fei/p/5618782.html

    过程：
        1、new 一个XMLHttpRequest实例
        2、建立连接 open (第三个参数表示是否异步)
        3、发送请求send
        4、根据状态判断处理数据 status， 在onreadystatechange中处理
    状态：status(状态码)          readyState(状态值，表示ajax经历的状态)
          1xx                     0: 初始化，XHR对象还未初始化完成
          2xx                     1: 载入，开始发送请求
          3xx                     2: 载入完成，也就是请求发送完成
          4xx                     3：解析，读取服务器的响应
          5xx                     4：完成，读取服务器响应结束

#### BOM: 操作浏览器的 API

    window: 代表整个浏览器窗口
    Navigator: 获取浏览器当前的信息
    Location: 获取浏览器当前的地址信息
    History：代表浏览器的历史信息
        browserHistory: 使用的是html5的history API，浏览器提供的接口修改历史记录
        hashHistory: 通过修改地址后面的hash来改变浏览器的历史记录

    Screen: 代表用户的屏幕信息
