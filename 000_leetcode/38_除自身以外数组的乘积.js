/**
 * 除自身以外数组的乘积：给一个数组，返回output，output中的每一项是除自身以外各元素的乘积
 */
// 好像限定了不能用除法
function productExceptSelf(nums) {
    const output = []
    const max = nums.reduce((a,b) => a*b)

    for(let i = 0; i < nums.length; i ++) {
        output.push(max / nums[i])
    }

    return output
}

// 动态规划
function productExceptSelf(nums) {
    const dp = []
    let product = 1

    // 计算当前数左边的乘积
    for(let i = 0; i < nums.length; i ++) {
        dp[i] = dp[i] * product
        product = product * nums[i]
    }

    product = 1
    // 计算当前数右边的乘积
    for(let i = nums.length - 1; i >= 0; i --) {
        dp[i] = dp[i] * product
        product = product * nums[i]
    }

    return dp
}