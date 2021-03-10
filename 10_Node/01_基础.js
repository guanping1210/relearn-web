// @ts-nocheck
/**
 * Node：对前端来说，主要是用于搭建服务器，开发服务端，连接数据库和前端UI界面, 可以理解为是一个软件，这个软件可以运行js代码
 *      nodejs不是语言，不是库，也不是框架，而是一个Javascript的运行时环境；也可以说是一个平台，
 *      也就是说，类似于浏览器，Nodejs可以解析和执行Javascripts代码。
 *      
 *      以前JS只能在浏览器中执行，但是现在在Nodejs环境下，也能运行
 * 
 * 浏览器中的JS：JS、BOM、DOM
 * 
 * Nodejs中的JS：没有DOM和BOM，只有JS，因为服务端不操作页面。
 *              但是提供了服务器级别的操作API，例如文件读写、网络通信、http服务器、等
 * 
 * Nodejs特性:
 *  1、事件驱动
 *  2、非阻塞型I/O操作
 * 
 * npm：是基于NodeJS开发的一个包管理系统
 * 
 */
console.log(1111)


/**
 * process：node提供得关于进程的控制模块
 *  pid: 进程ID
 *  env: 系统环境的相关变量
 *    NODE_ENV  环境，（开发环境或生产环境）
 */
 
 console.log(process.argv) // argv是个数组，代表的是命令行接收的参数。第一个位置是node的完整路径，第二个位置是当前文件的路径，其他参数是从第三个位置开始的
 console.log(process.pid) // 获取进程ID


//  process.kill(process.pid, 'SIGTERM') // 杀掉进程
//  process.exit(0) // 结束进程，可接受参数，不同的退出码有不同的意义
 

//  console.log可以接收参数
console.log('我的猫%s已经%d岁了', 'mary', 19) // 我的猫mary已经19岁了

// 统计x调用了几次 --> 值：次数
var x = 10
console.count(x) // 10: 1
console.count(x) // 10: 2

// 清空控制台
console.clear()

// 打印堆栈踪迹
console.trace()

function fn() {
    console.trace()
}

fn()

// 计算耗时: 计算中间程序运行所花的时间
function fn() {}

console.time('fn()')
    fn()
console.timeEnd('fn()')
