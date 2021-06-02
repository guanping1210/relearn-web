/**
 * 依赖倒置原则：上层不依赖下层的实现
 * 目标：面向抽象进行coding，而不是面向实现进行coding。本质就是降低需求和具体实现的耦合
 */

// 需求：
// sprint1: 实现分享功能
class Store {
  constructor() {
    this.share = new Share()
    this.rate = new Rate()
  }
}

class Share {
  shareTo(platform) {
    // 分享到不同的平台
  }
}

class Rate {
  star(stars) {
    // 打分
  }
}

const store = new Store()