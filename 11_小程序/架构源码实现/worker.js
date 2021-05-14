// 逻辑层
// 视图层和逻辑层相互通信，自己实现一套发布订阅
let App = null
let _event = null

importScripts('./midd;e.js')
importScripts('./event.js')

// 用live-server 启动模拟服务，可以测试worker
// test message
onmessage = function(data) {
  console.log('接收信息，', data)
  postMessage(data)
}

// 监听事件
// onmessage = function(e) {
//   _event = new Event('page')
//   App = begin()

//   if(e.data.isInit) {
//     workerMessage({
//       type: 'endInt',
//       opt: Object.keys(App).map(item => {
//         const { id, data, methods, template, mth, eventTypeMaps } = item
//         return {
//           id,
//           data: Object.assign({}, data, ...mth),
//           mytemplate: template
//         }
//       })
//     })
//   }
// }

function workerMessage(data) {
  // 发送数据事件
  postMessage(data)
}