// @ts-nocheck
/**
 * 模板方法模式：由两部分构成，第一部分时抽象父类，第二部分是具体的实现字类
 */
// 体育运动
function Sport() {}

Sport.ptototype = {
    constructor: Sport,

    // 模板，按照顺序执行
    init: function() {
        this.stretch()
        this.jog()
        this.deepBreath()
        this.start()

        let free = this.end()

        if(free !== false) {
            this.stretch()
        }
    },

    // 拉伸
    stretch() {
        console.log('拉伸')
    },
    jog() {
        console.log('慢跑')
    },
     deepBreath() {
         console.log('深呼吸')
     },
     start() {
         console.log('开始运动')
     },
     end() {
         console.log('运动结束')
     }
}

// 篮球
function Basketball() {

}

Basketball.prototype = new Sport()
Basketball.prototype.start = function() {
    console.log('先投三分球')
}
Basketball.prototype.end = function() {
    console.log('运动结束，先走一步')
    return false
}

const bb = new Basketball()
bb.init() // 会按照 stretch -> jog -> deepBreath -> start -> end 这样内部执行