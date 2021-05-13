/**
 * 给小程序注册page页面的，内部自带一些信息和属性
 * 
 * 相当于一个中间件，用来管理模版、css、js、事件等信息
 */
let eventTypeMaps = []
class Page {
  constructor(opt, event) {
    this.id = opt.id
    this.data  = opt.data
    this.template = opt.template
    this.methods = opt.methods
    this.event = event 
    this.reg = this.reg.bind(this)
    this.eventTypeMaps = []
    this.mth = []

    this.reg()
  }

  reg() {
    this.mth = Object.keys(this.methods).map(item => {
      this.eventTypeMaps.push(this.methods[item])

      return { [item]: `trick(${this.eventTypeMaps.length - 1}, ${this.id})`};
    })

    Object.keys(this.data).map(item => {
      this.event.on(`${this.id}-${item}`, value => {
        workerMessage({
          type: 'changeDom',
          opt: { id: this.id, data: Object.assign({}, this.data, value, ...arguments)}
        })
      })
    })
  }

  setState(data) {
    Object.keys(data).map(item => {
      this.event.emit(`${this.id}-${item}`, data)
    })
  }
}