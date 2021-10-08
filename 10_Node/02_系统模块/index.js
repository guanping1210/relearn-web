/**
 *  fs: 文件操作系统, 回调函数都是错误先行函数;内存操作，一般会耗时
 * 
 *      fs.readFile('文件路径/文件名', [, '文件格式'], callback)
 * 
 *      fs.writeFile('文件路径/文件名', 数据, callback)
 *          没有该文件时会自动创建该文件;
 *          写入的数据会覆盖掉原文件的数据;
 * 
 *  path: 路径操作
 *      path.join(路径，路径 ...)  路径自动拼接
 *      path.__dirname 获取绝对路径
 * 
 *  nodemon 监听文件变化, 类似于热更新
 * 
 *  nrm 三方管理工具
 *      nrm ls 查看第三方模块的地址
 *      nrm use xxx 切换第三方模块的下载地址
 * 
 *  gulp: 基于node平台开发的前端构建工具
 *      gulp.src() 获取任务要处理的文件
 *      gulp.dest() 输出文件
 *      gulp.task() 构建gulp任务
 *      gulp.watch() 监听文件变化
 *  
 */
const fs = require('fs')
const path = require('path')

fs.readFile('./file-test.js', 'utf-8', (err, result) => {
    if(!err) {
        console.log(result)

    } else {
        console.log(err)
    }
})

fs.writeFile('./file-test.js', "console.log('hello')", (err, result) => {
    if(!err) {
        console.log(result)

    } else {
        console.log(err)
    }
})