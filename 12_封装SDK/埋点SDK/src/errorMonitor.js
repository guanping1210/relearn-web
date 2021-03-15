// @ts-nocheck
/**
 * 错误监控：
 *  分类：js编译错误、js运行错误、加载静态资源异常、接口请求异常
 * 
 * 监控流程：
 *  监控错误 -> 搜集错误 -> 存储错误 -> 分析错误 -> 错误报警 -> 定位错误 -> 解决错误
 */
import { setCommonProperty } from './utils'

// 封装错误对象，用来保存页面中产生的JS错误
function JavaScriptErrorInfo(uploadType, errorMsg, errorStack) {
    setCommonProperty.apply(this)
    this.uploadType = uploadType
    this.errorMsg = errorMsg
    this.errorStack = errorStack
    this.browserInfo = 'BRPWSER_INFO'
    // 上报错误的方法
    this.handleLogInfo = function(errorType, errorInfo) {
        console.log(errorType, errorInfo)
    }
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
    window.onerror = function(errorMsg, url, lineNumber, colNumber, errorObj) {
        jsMonitorStarted = true
        let errorStack = errorObj ? errorObj.stack :null
        siftAndMakeUpMessage(errorMsg, url, lineNumber, colNumber, errorStack)
    }

    function siftAndMakeUpMessage(origin_errorMsg, origin_url, origin_lineNUmber, origin_colNumber, origin_errorObj) {
        let errorMsg = origin_errorMsg || ''
        let errorObj = origin_errorObj || ''
        let errorType = ''

        if(errorMsg) {
            let errorStack = JSON.stringify(errorObj)
            errorType = errorStack.split(': ')[0].replace('"', "") 
        }

        let javaScriptErrorInfo = new JavaScriptErrorInfo('JS_ERROR', errorType + ': ' + errorMsg, errorObj)

        // 上报错误
        javaScriptErrorInfo.handleLogInfo('JS_ERROR', javaScriptErrorInfo)
    }
}

/**
 * 添加一个定时器，进行数据的上传
 * 2秒进行一次URL变化的检测；
 * 10秒进行一次数据的检查并上传
 */
let timeCount = 0
setInterval(function() {    
    checkUrlChange() // 检测url是否变化
    if(timeCount >= 25) {
        // 错误信息啥的都保存到本地storage的
        const logInfo = localStorage('JS_ERROR') + localStorage('HTTP_LOG') + localStorage('CUSTOMER_PV')
            + localStorage('LOAD_PAGE') + localStorage('RESOURCE_LOAD')

        if(logoInfo) { // 上报
            utils.ajax('POST', 'HTTP_UPLOAD_LOG_INFO', { logInfo }, function(res) {}, function(){})
        }

        timeCount = 0
    }

    timeCount ++
}, 200)

// 自定义上报数据
function ajax() {
    // ...
}
