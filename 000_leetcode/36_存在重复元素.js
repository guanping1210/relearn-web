/**
 * 存在重复元素：给定一个数组，判断是否存在重复元素; 时间复杂度为O(n)
 */
function containsDuplicate(nums) {
    const set = new Set()

    for(let i = 0; i <nums.length; i ++) {
        if(set.has(nums[i])) {
            return true
        }

        set.add(nums[i])
    }

    return false
}
