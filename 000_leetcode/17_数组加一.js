/**
 * 数组加1：
 *  输入：[1,2,3]
 *  输出：[1,2,4]
 * 
 * 最后一位表示个位数，加1，但是需要注意进位问题
 */
// 用新的数组来存储
function plusOne(nums) {
    const result = Array(nums.length)
    let isPlus = true

    for(let i = nums.length - 1; i >=0; i --) {
        if(i === 0 && isPlus) {
            result[i] = 0
            result.unshift(1)
        } else if(isPlus) {
            const isNight = nums[i] === 9
            result[i] = isNight ? 0 : nums[i] + 1
            isPlus = nums[i] === 9
        } else {
            result[i] = nums[i]

        }
    }

    return result
}

plusOne([1,2,3])
plusOne([9,9,9])
plusOne([1,9,8,9])