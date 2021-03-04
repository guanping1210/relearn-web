/**
 * 乘积最大子序列：给定一个数组nums, 找出一个序列中乘积最大的连续子序列
 *  输入：[2, 3, -2, 4]     [-2, 0 , -1]
 *  输出：6                 0
 */
function maxProduct(nums) {
    const maxProductMemo = []
    const minProductMemo = []

    maxProductMemo[0] = nums[0]
    minProductMemo[0] = nums[0]

    let max = nums[0]

    for(let i = 1; i < nums.length; i ++) {

    }
}