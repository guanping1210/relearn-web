let App = null
let _event = null

importScripts('./midd;e.js')
importScripts('./event.js')

// 用live-server 启动模拟服务，可以测试worker
// test message
onmessage = function(e) {
  console.log('接收信息，', e)
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