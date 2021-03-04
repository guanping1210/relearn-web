/**
 * 打家劫舍：
 *  一排房屋，相邻的房屋有报警系统。
 *  如果一晚上相邻的房屋被盗，系统会自动报警。
 *  
 *  给定一个代表每个房屋存放进入的数组，计算在不触动报警装置的情况下，能够偷到最高金额
 * 
 *  输入：[1,2,3,1]
 *  输出：4 , 因为1+3=4
 * 
 * 核心思路：其实就是寻找，基数下标之和或者偶数下标之和，得到的最大结果
 */
function rob(nums) {
  if(nums.length === 0) {
    return 0
  }
  if(nums.length === 1) {
    return nums[0]
  }

  const dp = []
  dp[0] = nums[0]
  dp[1] = Math.max(nums[0], nums[1])

  for(let i = 2; i < nums.length; i ++) {
    dp[i] = Math.max(num[i] + dp[i - 2], dp[i - 1])
  }

  return dp[nums.length - 1]
}

// 优化：数组存储变为变量存储
function rob(nums) {
  if(nums.length === 0) {
    return 0
  }
  if(nums.length === 1) {
    return nums[0]
  }

  let prev2 = nums[0]
  let prev1 = Math.max(nums[0], nums[1])

  for(let i = 2; i < nums.length; i ++) {
    const temp = Math.max(num[i] + prev2, prev1)
    prev2 = prev1
    prev1 = temp
  }

  return prev1
}