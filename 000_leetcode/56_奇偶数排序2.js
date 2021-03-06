/**
 * 奇偶数排序2: 数组A 中一半奇数，一半偶数，(交叉排序)
 *             对数组排序，当A[i]为奇数时，i也为奇数；A[i]为偶数时，i也为偶数
 * 
 * 核心：准备两个指针，分别代表奇数下标和偶数下标，从同一方向开始遍历，
 *      然后彭需要数据交换的时候，交换，再移动指针
 */
  function sortArrayBuParityII(nums) {
    let i = 0; j = 1

    while(i < nums.length) {
      if(nums[i] % 2 === 1) {
        while(nums[j] % 2 === 1 && j < nums.length) {
          j += 2
        }

        [nums[i], nums[j]] = [nums[j], nums[i]]
      }

      i += 2
    }
    
    return nums
  }