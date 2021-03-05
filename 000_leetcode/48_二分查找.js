/**
 * 二分查找：
 *  input: [-1, 0,3,5,9,12] target = 9
 *  output: 4
 * 
 * 找target number，返回其下标，没有则返回-1
 */
// 二分查找，一般是有排序的；然后用两个指针来移动；left = 0; right = length - 1; mid = Math.floor(left + (right - left) / 2)
function binarySearch(nums, target) {
    let left = 0, right = nums.length - 1, mid = 0

    while(left <= right) {
        mid = Math.floor(left + (right - left) / 2)

        if(nums[mid] === target) {
            return mid
        } else if(target < nums[mid]) { // 舍弃右半边
            right = mid - 1
        } else { // 舍弃左半边
            left = mid + 1
        }
    }

    return -1
}