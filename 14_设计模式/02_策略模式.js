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