/**
 * 三数之和：[-1,0,1,2,4], 找出和为3的集合，且不可重复[[-1,0,4], [0,1,2]]
 * 
 * 思路：与两数之和毫无关系
 *  1、给数组排序
 *  2、遍历数组，从0遍历到length - 2)
 *  3、如果当前数字等于前一个数字，则跳过（防止重复）
 *  4、如果数字不同，设置start = i + 1, end = length - 1
 * 
 * 核心是：模拟双向指针，然后找到与目标值比较的大于小于，能够得到指针移动的方向
 * 
 * 注意：需要三个地方去重复：第一个数与前一个数
 *                       start 与 start - 1
 *                       end 与 end + 1
 */
function threeSum(arr, target) {
  const sortArr = arr.sort((a, b) => a - b)
  const length = sortArr.length
  const result = []

  for(let i = 0; i < length - 2; i ++) {
    let start = i + 1, end = length - 1
    let res = target - sortArr[i]

    if(i !==0 && nums[i] === nums[i - 1]) {
      continue
    }

    while(start < end) {
      let subSum = sortArr[start] + sortArr[end]
      if(subSum === res) {
        result.push([sortArr[i], sortArr[start], sortArr[end]])
        start ++
        end --

        while(start < end && sortArr[start] === sortArr[start - 1]) {
          start ++
        }

        while(start < end && sortArr[end] === sortArr[end + 1]) {
          end --
        }
      }

      if(subSum < res) {
        start ++
      }

      if(subSum > res) {
        end --
      }
    }
  }
}
