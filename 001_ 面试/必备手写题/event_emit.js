/**
 * 发布订阅模式
 */
class EventEmitter {
  constructor(props) {
    this.props = props
    this.map = new Map()
  }

  // 事件订阅
  on(type, fn) {
    if(this.map.has(type)) {
      this.map.set(type, [...this.map.get(type), fn])
    } else {
      this.map.set(type, [fn])
    }
  }

  // 事件发布 --> 
  emit(type) {
    const fns = this.map.get(type)

    fns.forEach(item => item())
  }

  // 事件移除
  off(type, fn) {
    if(this.map.has(type)) {
      const filter = this.map.get(type).filter(item => item === fn)
      // this.map.delete(type)
    }
  }
}

var ins = new EventEmitter()

var click1 = () => { console.log(1)}
var click2 = () => { console.log(2) }
ins.on('click', click1)
ins.on('click', click2)

