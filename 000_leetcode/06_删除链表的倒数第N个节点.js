/**
 * 删除单方链表的倒数第N个节点：
 *  1 -> 2 -> 3 -> 4 -> 5, n = 2(表示删除节点4，因为是倒数第二个)
 * 
 * 
 * 思路：获取链表长度，然后删除倒数第N个 --> 需要遍历两次
 * 进阶：用两个指针往后移动 --> 遍历一次
 * 
 * 其实就是删除正数的第length - n + 1个节点，
 * 那么用双指针，一个从0开始，一个从正数的n开始，直到n到最后为null的时候，那么第一个指针指向的，就是需要删除的那个节点
 * 
 * 不想到达目标节点，真正想要的是上一个节点，绕过目标节点
 * 1、可以把n设置为n+1，那么n最后走到null
 * 2、n不走到null，直接走到最后
 */
function removeNthFromEnd(head, n) {
  let dummy = new ListNode()
  dummy.next = head

  let p1 = dummy
  let p2 = dummy

  for(let i = 0; i < n; i ++) {
    p2 = p2.next
  }

  while(p2.next !== null) {
    p1 = p1.next
    p2 = p2.next
  }

  p1.next = p1.next.next
  return dummy.next
}