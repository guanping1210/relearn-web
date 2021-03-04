/**
 * 寻找旋转排序中的最小值:
 *  输入：[0,1,2,4,5,6,7]
 *  输出：[4,5,6,7,0,1,2]
 *  表达的意思是：
 * 
 * 采用二分搜索
 */
function findMin(nums) {
  if(nums.length === 1) {
    return nums[0]
  }

  let left = 0, right = nums.length - 1

  if(nums[right] > nums[0]) {
    return nums[0]
  }

  while(left < right) {
    let mid = Math.floor(left + (right - left) / 2)

    if(nums[mid] > nums[mid + 1]) {
      return nums[mid+1]
    }

    if(nums[mid-1] > nums[mid]) {
      return nums[mid]
    }

    if(nums[mid] > nums[left]) {
      left = mid + 1
    } else {
      right = mid + 1
    }
  }
}