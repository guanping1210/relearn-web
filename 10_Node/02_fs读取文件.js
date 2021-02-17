/**
 * fs：提供了读取文件的API操作
 * 
 * fs.readFile(文件路径，回调函数) 读取文件
 * fs.writeFile(文件路径，文件内容，回调函数)  写文件
 */
const fs = require('fs')

// 读取文件
fs.readFile('./data/read.md', (err, data) => {
    if(err) {
        return console.error(err)
    }

    // data，其实文件中存储的其实都是二进制数据0 1，所以看不懂
    // 转为能认识的字符，需要转义一下
    console.log(data.toString())
})

// 写文件
fs.writeFile('./data/test.md', 'nice to meet u', function(err) {
    if(err) {
        return console.error(err)
    }

    console.log('文件写入成功')
})


/**
 * 文件系统分同步和异步操作：
 *                异步：              同步：
 *  读取文件：    readFile            readFileSync
 *  打开文件：    open
 *  获取文件信息：stat
 *      
 */