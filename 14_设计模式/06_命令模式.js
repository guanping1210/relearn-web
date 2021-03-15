/**
 * 命令模式：用松耦合的方式来设计程序，是的请求发送者和接收者能够消除彼此间的耦合关系
 */
// 自增命令 --> 包括执行、撤销、重做、获取当前值等操作
class IncremenetCommand {
    constructor() {
        this.val = 0 // 当前值
        this.stack = [] // 命令栈
        this.stackPosition = -1 // 栈指针位置
    }

    // 执行
    execute() {
        this.clearRedo()
        function command() {
            this.val += 2
        }

        // 执行并缓存起来
        command()

        this.stack.push(command)
        this.stackPosition ++
        this.getValue()
    }

    canUndo() {
        return this.stackPosition >= 0
    }

    canRedo() {
        return this.stackPosition < this.stack.length - 1
    }

    // 撤销
    undo() {
        if(!this.canUndo) {
            return
        }

        this.stackPosition --

        function command() {
            this.val -= 2
        }

        // 命令的撤销，不需要缓存
        command()

        this.getValue()
    }

    // 重做
    redo() {
        if(!this.canRedo) {
            return
        }

        this.stack[++ this.stackPosition]()

        this.getValue()
    }

    // 执行时，已经撤销的部分不能再重做
    clearRedo() {
        this.stack = this.stack.slice(0, this.stackPosition + 1)
    }

    getValue() {
        console.log(this.val)
        return this.val
    }
}