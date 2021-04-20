// ㊗主入口文件
const worker = require('./worker')

worker.postMessage('我是主worker')