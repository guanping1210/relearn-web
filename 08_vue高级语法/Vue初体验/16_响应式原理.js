/**
 * 核心API：Object.defineProperty
 */
// 模版
<div>
  <div>{{ a }}</div>
  <div>{{ info.name }}</div>
</div>

// 数据定义
data() {
  return {
    a: 1,
    info: {
      name: 'xaioming'
    }
  }
}

// 通过Object.defineProperty将属性转换为getter/setter
const dep1 = new dep()
Object.defineProperty(this.$data, 'a', {
  get() {
    dep1.depend() // 手机依赖
    return value
  },
  set(newValue) {
    if(newValue === value) return
    value = newValue
    dep1.notify() // 通知依赖
  }
})