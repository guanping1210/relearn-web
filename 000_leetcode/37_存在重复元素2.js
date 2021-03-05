/**
 * 存在重复元素2： 给定一个整数数组和一个整数K，判断数组中是否存在两个不同的索引i和j,
 *                是的nums[i] = nums[j], 并且i和j的差的绝对值最大为 k; 意思是 i 之后的K 个元素内，需要找到重复的
 *  输入：[1,2,3,1] k=3
 *  输出：true
 */
function containsNearByDuplicate(nums, k) {
    const map = new Map()

    for(let i = 0; i < nums.length; i ++) {
        if(map.has(nums[i]) && (i - map.get(nums[i]) <= k)) {
            return true
        } else {
            map.set(nums[i], i)
        }
    }

    return false
}