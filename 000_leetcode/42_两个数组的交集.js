/**
 * 两个数组的交集：给定两个数组，计算他们的交集
 *  input: [1,2,2,1] [2,2] | [4,9,5] [9,4,9,8,4]
 *  output: [2]              [9,4]
 * 
 * 其实就是看短的数组中的哪些数字在厂的数组中有出现，有在两个数组中都出现的，就是交集
 */
function intersection(nums1, nums2) {
    const output = new Set()

    const sortArr =  nums1.length > nums2.length ? nums2 : nums1
    const longArr = sortArr === nums1 ? nums2 : nums1

    for(let i = 0; i < sortArr.length; i ++) {
        if(longArr.includes(sortArr[i]) && !output.has(sortArr[i])) {
            output.add(sortArr[i])
        }
    }

    // for(let num of nums1) {
    //     if(nums2.includes(num)) { // includes也是内部循环，复杂度是O(n); set map -> hash,复杂度是O(1)
    //         output.add(num)
    //     }
    // }

    return Array.from(output)
}

// 最优解法 --> set 内部就是存储唯一数据的，不会重复
function intersection(nums1, nums2) {
    const result = new Set()
    const set = new Set(nums2)

    for(let num of nums1) {
        if(set.has(num)) {
            result.add(num)
        }
    }

    return Array.from(result)
}