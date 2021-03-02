// @ts-nocheck
/**
 * 反转链表2：反正指定位置，指定个数的链表
 *  输入：1 -> 2 -> 3 -> 4 -> 5, m = 2, n = 4, 表示反转从第二个节点开始，反转到第4个节点结束
 *  输出：1 -> 4 -> 3 -> 2 -> 5
 * 
 * ListNode {
 *  this.val = val
 *  this.next = null
 * }
 */
// 多用两个指针来记录m之前的链表和n之后的链表
function reverseBetween(head, m, n) {
   let prev = null, curr = head, next = head

   for(let i = 1; i <= m; i ++) {
       prev = curr
       curr = curr.next
   }

   let prev2 = prev
   let curr2 = curr

   for(let i = m; i <= n; i ++) {
       next = curr.next
       curr.next = prev
       prev = curr
       curr = next
   }

   if(prev2 != null) {
       prev2.next = prev
   } else {
       head = prev
   }

   curr2.next = curr

   return head
}

// 单纯的反转链表 --> 遍历链表，用一个中间值来记录，
// 把每一个节点原本指向下一个节点的next指针，反转过来指向它的前置节点
function reverseBetween(head) {
    let p1 = head, p2 = head.next, p3 = null // 需要知道三个节点的值，这样才知道当前值的上一个节点和下一个节点

    while(p2 !== null) {
        p3 = p2.next // 用来存储后续链表的 --> 不然会丢失后续的数据
        p2.next = p1 // 将相邻的进行反转
        p1 = p2 // p1往后移动
        p2 = p3 // p2往后移动
    }

    head.next = null
    head = p1

    return head
 }