/**
 * 合并两个有序链表：
 *  p1: 1 -> 2 -> 4 -> 7
 *  p2: 1 -> 3 -> 4 -> 5
 * 
 * 合并结果
 *  1 -> 1 -> 2 -> 3 -> 4 -> 4 -> 5 -> 7
 */
function mergeTwoList(l1, l2) {
  let curr = new ListNode()

  let dummy = curr // 用一个中间值来访问到头部信息

  while(l1 !== null && l2!== null) {
    if(l1.val < l2.val) {
      curr.next = l1
      l1 = l1.next
    } else {
      curr.next = l2
      l2 = l2.next
    }

    curr = curr.next // 往后走
  }

  if(l1 !== null) {
    curr.next = l1
  }

  if(l2 !== null) {
    curr.next = l2
  }

  return dummy.next
}