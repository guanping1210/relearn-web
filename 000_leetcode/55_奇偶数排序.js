/**
 * 奇偶数排序问题：给一个数组，然后要所有偶数元素之和跟着所有奇数元素
 * 
 * 思路：用两个指针从两边开始，往中间移动，然后碰到奇数往右边放，偶数往左边放
 */
function sortArrayByParity(nums) {
  let left = 0, right = nums.length - 1

  while(left < right) {
    if(nums[left] % 2 === 1 && nums[right] % 2 === 0) {
      [nums[left], nums[right]] = [nums[right], nums[left]]
    } 

    if(nums[left] % 2 === 0) {
      i ++
    }

    if(nums[right] % 2 === 1) {
      j --
    }
  }

  return nums
}