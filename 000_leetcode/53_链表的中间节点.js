import { setFlagsFromString } from "v8"

/**
 * 链表的中间节点：给一个带有头节点的非空单链表，返回链表的中间节点
 *              如果有两个中间节点，则返回第二个中间节点
 * 
 * 核心：快慢指针，慢指针每次走一步，快指针每次走两步，当快指针走到结尾的时候，慢指针就是中间节点
 */
function middleNode(head) {
  let slow = head, fast = head.next.next

  while(fast !== null && fast.next != null) {
    fast = fast.next.next
    slow = slow.next
  }

  return slow
}