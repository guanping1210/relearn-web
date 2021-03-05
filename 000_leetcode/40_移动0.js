/**
 * 移动0：给一个数组nums, 实现将所有0移动到数组的末尾，同事保持非0元素的相对顺序
 *  输入：[0,1,0,3,12]
 *  输出：[1,3,12,0,0]
 * 
 * 原数组上操作
 * 
 * 核心：把所有非0的数字摞到数组开头；最后末尾的数字直接变为0
 */
//  相邻的两个比较，然后交换位置 -->  冒泡（但是操作交换支持好像O(n^2)）
function moveZeroes(nums) {
    for(let i = 0; i < nums.length; i ++) {
        for(let j = i + 1; j < nums.length; j ++) {
            if(nums[i] === 0) {
                let temp = nums[j]
                nums[j] = nums[i]
                nums[i] = temp
            }
        }
    }

    return nums
}

// 优化1 --> 把0，然后相邻的0，整个一块儿与非0的数据交换
// 优化2 --> 记录下有几个非0，然后把前面0的，给复制为非0的数据，最后直接把最后的数据改为0 --> 用i,j来表示复制的位置
function moveZeroes(nums) {
    let j = 0

    for(let i = 0; i < nums.length; i ++) {
        if(nums[i] === 0) {
            nums[j] = nums[i]
            j ++
        }
    }

    for(let i = j; i < nums.length; i ++) {
        nums[i] = 0
    }

    return nums
}
