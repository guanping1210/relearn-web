
export const encrypToObj = () => {

}

export const getCustomerKey = function() {

}

export const getPageKey = function() {

}

export const base64EncodeUnicode = function(param) {
    return param
}

export const checkUrlChange = function() {

}

// 获取设备信息
export const getDevericeInfo = function() {
    return {}
}

// 获取用户信息
 export const getUserInfo = function() {
     return {}
 }

// 设置日志对象类的通用属性 --> 通用信息，每条日志都会具有的信息
export function setCommonProperty() {
    const DEVICE_INFO = getDevericeInfo()
    const USER_INFO = getUserInfo()

    this.happenTime = new Date().getTime() // 日志发生时间
    this.webMonitorId = 'WEB_MONITOR_ID' // 区分应用的唯一标识(一个项目对应一个)
    this.simpleUrl = window.location.href.split('?')[0].replace('#', '') // 页面地址的URL
    this.customerKey = getCustomerKey() // 用于区分用户，所对应的唯一标识，清理本地数据后失效
    this.pageKey = getPageKey() // 用于区分页面，所对应唯一标识，每个页面对应一个新的值

    // 设备信息
    this.deviceName = DEVICE_INFO.deviceName;
    this.os = DEVICE_INFO.os + (DEVICE_INFO.osVersion ? " " + DEVICE_INFO.osVersion : "");
    this.browserName = DEVICE_INFO.browserName;
    this.browserVersion = DEVICE_INFO.browserVersion;

    // 用户自定义信息， 由开发者主动传入， 便于对线上进行准确定位
    this.userId = USER_INFO.userId;
    this.firstUserParam = USER_INFO.firstUserParam;
    this.secondUserParam = USER_INFO.secondUserParam;

    // 上传事件
    this.handleLogInfo = function(logType, logInfo) {
        
    }
}