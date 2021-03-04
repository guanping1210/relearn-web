/**
 * 相交链表：找到两个链表相交的起始节点
 *  输入：a1 -> a2 -> c1 -> c2 -> c3
 *       b1 -> b2 -> b3 -> c1 -> c2 -> c3
 *  输出：c1和c3
 * 
 * 核心：要消除两个链表的个数差别，用不停的走，不停的从头开始，造成同步进行
 *      把两个临时指针的总长度，变为同样长度；这样就能够遇到相遇的点；如果长度一样，还没相遇，则不相交
 */
function getIntersectionNode(headA, headB) {
  let pa = headA
  let pb = headB

  while(pa !== pb) {
    if(pa === null) {
      pa = headB
    } else {
      pa = pa.next
    }

    if(pb === null) {
      pb = headA
    } else {
      pb = pb.next
    }
  }

  return n1
}