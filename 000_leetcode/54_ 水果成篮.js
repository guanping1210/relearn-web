/**
 * 水果成篮：在一排树中，第i颗树产生tree[i]型的水果
 *  你可以从你选择的任何树开始，重复以下步骤：
 *  1、把这棵树上的水果放进你的篮子，如果做不到，就停下来
 *  2、移动到当前树右侧的下一棵树，如果右边没有树，就停下来
 * 
 * 请注意，在选择一棵树后，你没有任何选择，必须执行步骤1，然后执行步骤2，然后退回步骤1，然后执行步骤2
 * 
 * 你有两个篮子，每个篮子可以携带任何数量的水果，但你希望每个篮子只携带一种类型的水果
 * 
 *  问最多能装多少数量的水果
 * 
 * 核心思路：滑动窗口问题
 */
function totalFriut(tree) {
  let max = 1, j = 0
  const map = new Map()

  for(let i = 1; i < tree.length; i ++) {
    map.set(tree[i], i)

    if(map.size > 2) {
      let minIndex = tree.length - 1

      for(const [friut, index] of map) {
        if(index < minIndex) {
          minIndex = index
        }
      }

      map.delete(tree[minIndex])
      j = minIndex + 1
    }

    max = Math.max(max, i - j + 1)
  }

  return max
}