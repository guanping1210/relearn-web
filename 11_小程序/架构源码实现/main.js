// ㊗主入口文件
// 渲染层
const worker = require('./worker')
const MEvent = new Event('main')

const trackEvent = (type, opt) => {
  switch(type) {
    case 'addDom':
      MEvent.emit('addDom', opt)
      break
    case 'changeDom':
      MEvent.emit('changeDom', opt)
      break
    case 'endInit':
      MEvent.emit('endInit', opt)
      break
  }

  // 上面的逻辑直接用这一句代替不就行了
  MEvent.emit(type, opt)
}

// test
MEvent.on('addDom', dom => {
  const app = document.querySelector('#app')
  let parser = new DOMParser()
  let doc = parser.parseFromString(dom, 'text/xml')
  let node = doc.getElementsByTagName('div')[0]

  app.appendChild(node)
})

worker.postMessage('我是主worker')

worker.onmessage = function(e) {
  TrackEvent(e.data.type, e.data.opt)
}