/**
 * 一个数组A,找个每个元素：右边第一个比我小的下标位置，没有则用-1表示
 *  input: [5, 2]
 *  output: [1, -1]
 */
// 双重暴力解决 O(n^2)
function findRightSmall(nums) {
    const stack = []

    for(let i = 0; i < nums.length; i ++) {
        let j = i +1
        while(j < nums.length) {
            if(nums[j] < nums[i]) {
                stack.push(j)
                break
            }
            j ++
        }

        if(stack[i] === undefined) {
            stack.push(-1)
        }

    }

    return stack
}

findRightSmall([1,2,3,4,0,6])

/**
 * 优化：时间复杂度为O(n^2), 空间复杂度为O(n), 考虑将时间复杂度优化为O(n)
 * 
 * 思考：需要把内层循环想办法去掉，用别的方式来代替 --> 把从左到右遍历两次设想为，从右往左遍历，这样得到的就是当前数与左边的数比较谁第一个大
 */
function findRightSmall2(nums) {
    
}