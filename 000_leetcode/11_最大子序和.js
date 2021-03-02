/**
 * 最大子序和：动态规划经典题目
 *  输入：[-2, 1, -3, 4, -1, 2, -5, 4]
 *  输出： 6
 *  过程：[4, -1, 2, 1], 是子序，和为6，是最大的
 * 
 * 思路：对于每个点，决策是否往两边走，左边走还是右边走
 * 
 * 核心：当前数与前一个数相加，小于当前数，那么新开一个数组；如果大于，那么保留结果，继续往后走
 */
function maxSubArray(nums) {
    let memo = []
    memo[0] = nums[0]
    let max = nums[0]


    for(let i = 1; i < nums.length; i ++) {
        memo[i] = Math.max(nums[i] + memo[i - 1], nums[i]) // 每个值与前面累加起来的最大值，都记录下来
        max = Math.max(max, memo[i])
    }

    return max
}