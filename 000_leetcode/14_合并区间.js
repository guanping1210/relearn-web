/**
 * 合并区间：
 *  输入：[[1,3], [2,6], [8, 10], [15, 18]]
 *  输出： [[1,6], [8, 10], [15, 18]]
 * 
 * 理解：因为3大于2，小于6，所以在2-6区间内，所以可以合并为1-6
 * 
 * 核心：将上一个区间的最后一个数据与下一个区间的起始位置比较（要先对区间排个序）
 */
function merge(nums) {
    const result = []
    result[0] = nums[0]
    const length = nums.length

    nums.sort((a,b) => a[0] - b[0])

    for(let i = 1; i < length; i ++) {
        let arr = nums[i]
        let last = result[result.length - 1]

        if(last[last.length - 1] > arr[0]) {
            result[result.length - 1] = [last[0], Math.max(last[1], arr[1])]
        } else {
            result.push(arr)
        }
    }

    return result
}

merge([[1,3], [2,6], [8, 10], [15, 18]])