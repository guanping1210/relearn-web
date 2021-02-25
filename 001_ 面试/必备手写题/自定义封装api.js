/**
 * 基于axios封装api请求，实现如下功能：
 *  1、使用单例模式，减少消耗
 *  2、支持各种请求方式，以及根据请求方式的不同对参数进行不同的规范处理
 *  3、处理401逻辑，处理用户中心的跳转问题
 *  4、由于用户中心是独立的，用jsonp获取用户中心返回的用户信息
 */