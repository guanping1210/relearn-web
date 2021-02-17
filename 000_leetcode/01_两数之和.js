/**
 * 寻找两数之和
 * 
 * 给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出 和为目标值 的那 两个 整数，并返回它们的数组下标。
 * 你可以假设每种输入只会对应一个答案。但是，数组中同一个元素不能使用两遍。你可以按任意顺序返回答案。
 * 
 * 输入：nums = [2,7,11,15], target = 9
 * 输出：[0,1]
 * 解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 
 * 
 * 输入：nums = [3,2,4], target = 6
 * 输出：[1,2]
 * 
 * 思路：
 *  创建一个map, for循环遍历数组，用target减去nums[i],计算剩下的那个数
 *  用map来存储，用nums[i]作为key值，然后i作为value
 */
const twoSum = (nums, target) => {
  const map = new Map()

  for(let i = 0; i < nums.length; i ++) {
    const sub = target - nums[i]


    if(map.hash(sub)) {
      return [map.get(sub), i]
    } else {
      map.set(nums[i], i)
    }
  }
}
