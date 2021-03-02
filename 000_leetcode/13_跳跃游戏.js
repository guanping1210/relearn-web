/**
 * 跳跃游戏:
 *  输入：[2,3,1,1,4]
 *  输出: true
 * 因为按照步骤[2,1,1], 能够刚好跳出这个数组，也就是加起来的值，刚好能够等于数组长度； 同时也能够前后连贯起来
 * 
 * 每一项的值表示最多可以调多少步。核心就是跳跃的步骤加起来是大于数组长度的
 * 
 * dp解决法：
 */
// DP -> topdowm
function digui(nums) {
    const length = nums.length
    const memo = new Array(length).fill(0)

    memo[length - 1] = 1

    function jump(position) {
        if(memo[position] === 1 ) {
            return true
        } else if(memo[position] === -1) {
            return false
        }

        const maxJump = Math.min(position + nums[position], length - 1)

        for(let i = position; i < maxJump; i ++) {
            const jumpResult = jump(i)

            if(jumpResult === true) {
                memo[position] = 1
                return true
            }
        }

        memo[position] = -1
        return false
    }

    return jump(0)
}

// DP -> bottomup --> 从后往前遍历
function bottomUp(nums) {
    const length = nums.length
    const memo = new Array(length).fill(0)

    memo[length - 1] = 1

    for(let i = length - 2; i >=0; i --) {
        const maxJump = Math.min(i + nums[i], length - 1)

        for(let j = i + 1; j < maxJump; j ++) {
            if(memo[])
        }
    }
} 

// 贪心算法：从后往前遍历：数字+index > length, 就表示可以跳出去
function maxJump(nums) {
    let maxJump = nums.length - 1

    for(let i = nums.length - 2; i >= 0; i --) {
        if(i + nums[i] >= maxJump) {
            maxJump = i
        }
    }

    return maxJump === 0
}
