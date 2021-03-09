/**
 * 给一个正整数数组和K，要求依次取出K个数，输出其中数组的一个子序列,
 * 需要满足条件：长度为K，字典序最小。
 * 字典序的意思是：(属实没弄懂字典序的意思)
 * 
 *  input: nums = [3,5,2,6], K = 2
 *  ouput: [2,6]
 * 
 * 思路：滑窗思想 --> 设定长度为K的滑窗，从左往右滑动，满足条件入栈，不满足条件出栈
 * 
 * 单调栈：从小到大的栈，但是碰到比栈顶小的数据，就会清空栈，然后从新构建单调栈
 */
function findSmallSeq(nums, k) {
    let stack = [nums[0]]

    for(let i = 1; i < nums.length; i ++) {
        if(nums[i] < stack[stack.length - 1]) {
            stack = []
        } else if(nums[i] > stack[stack.length - 1]) {
            stack.push(nums[i])
        }
    }
}