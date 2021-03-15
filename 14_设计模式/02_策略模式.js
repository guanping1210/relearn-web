/**
 * 设计通过成绩等级来计算学生的最终得分，每个成绩等级有对应的加权值
 */
// 加权映射关系
var levelMap = {
  s: 10,
  A: 8,
  B: 6,
  C: 4
}

// 组策略
var scoreLevel = {
  basicScore: 80,
  s: function() {
    return this.basicScore + levelMap['S']
  },

  A: function() {
    return this.basicScore + levelMap['A']
  },

  B: function() {
    return this.basicScore + levelMap['B']
  },

  C: function() {
    return this.basicScore + levelMap['C']
  }
}

// 调用
function getScore(level) {
  return scoreLevel[level] ? scoreLevel[level]() : 0
}

console.log(
  getScore('S'),
  getScore('A'),
  getScore('B'),
  getScore('C'),
  getScore('D')
)

/**
 * 组合业务规则方面，比较经典的就是表单的验证方法
 */
let errorMsgs = {
  default: '输入数据格式不正确',
  minLength: "输入数据长度不足",
  isNumber: '请输入数字',
  required: '内容不为空'
}

// 规则集合
var rules = {
  minLength: function(value, length, errorMsg) {
    if(value.length < length) {
      return errorMsg || errorMsgs['minLength']
    }
  },
  isNumber: function(value, errorMsg) {
    if(!/\d+/g.test(value)) {
      return errorMsg || errorMsgs['required']
    }
  }
}