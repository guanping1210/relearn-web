/**
 * 乘积最大子序列：给定一个数组nums, 找出一个序列中乘积最大的连续子序列
 *  输入：[2, 3, -2, 4]     [-2, 0 , -1]
 *  输出：6                 0
 * 
 * 核心：乘积是有正负区别的；所以正数最大的，和负数最小的，都需要记录下来
 */
function maxProduct(nums) {
    const maxProductMemo = []
    const minProductMemo = []

    maxProductMemo[0] = nums[0]
    minProductMemo[0] = nums[0]

    let max = nums[0]

    for(let i = 1; i < nums.length; i ++) {
        maxProductMemo[i] = Math.max(nums[i], nums[i] * maxProductMemo[i - 1], nums[i] * minProductMemo[i - 1])
        minProductMemo[i] = Math.max(nums[i], nums[i] * maxProductMemo[i - 1], nums[i] * minProductMemo[i - 1])
        max = Math.max(max, maxProductMemo[i])
    }

    return max
}