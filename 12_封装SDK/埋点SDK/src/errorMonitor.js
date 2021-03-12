/**
 * 错误监控：
 *  分类：js编译错误、js运行错误、加载静态资源异常、接口请求异常
 * 
 * 监控流程：
 *  监控错误 -> 搜集错误 -> 存储错误 -> 分析错误 -> 错误报警 -> 定位错误 -> 解决错误
 */
// 设置日志对象类的通用属性 
function setCommonProperty() {
    this.happenTime = new Date().getTime() // 日志发生时间
    this.webMonitorId = 'WEB_MONITOR_ID' // 区分应用的唯一标识(一个项目对应一个)
    this.simpleUrl = window.location.href.split('?')[0].replace('#', '') // 页面地址的URL

}

// 封装错误对象，用来保存页面中产生的JS错误
function JavaScriptErrorInfo(uploadType, errorMsg, errorStack) {
    setCommonProperty.apply(this)
    this.uploadType = uploadType
    this.errorMsg = errorMsg
    this.errorStack = errorStack
    this.browserInfo = 'BRPWSER_INFO'
}

/**
 * 重写window.error，监控JS错误;
 * 重写console.error方法(因为应用首次给浏览器注入js代码的错误window.error检测不到，所以用这个来检测)；
 * 重写window.onunhandledrejection方法，用来捕获Promose的错误
 */
// 页面JS错误监控
function recordJavaScriptError() {
    // 重写console.error，可以捕获更全面的报错信息
    let oldError = console.error
    let jsMonitorStarted = false

    console.error = function() {
        // 自己定义的新方法，arguments的长度为2时，才是error的上报时机
        // if(arguments.length < 2) return 
        let errorMsg = arguments[0] && arguments[0].message
        let url = 'WEB_LOCATION'
        let lineNumber = 0, colNumber = 0
        let errorObj = arguments[0] && arguments[0].stack
        if(!errorObj) {
            errorObj = arguments[0]
        }

        // 如果onerror重写成功，就无需上报了
        !jsMonitorStarted && siftAndMakeUpMessage(errorMsg, url, lineNumber, colNumber, errorObj)

        return oldError.apply(console, arguments)
    }

    // 重写onerror进行jsError 的监听
    window.onerror = function()
}