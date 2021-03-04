/**
 * 环形链表：判断是否有环
 *  输入：head = [3, 2, 0 , -4] pos = 1
 *  输出：true
 * 表示链表中有一个环，pos为-1，表示没有环，为1，表示环的下标，表示起尾部连接到第二个节点的
 * 
 * 核心思路：设置快慢指针，环链表，快慢指针肯定是能相遇的，快指针每次走两步，满指针每次走一步
 *           如何是一个环，那么快慢指针是肯定要相遇的；如果没相遇或者最后为null，那么说明是个单链表
 */
function hasCycle(head) {
    if(head === null) return false


    let fast = head, slow = head

    while(fast.next !== null && fast.next.next !== null) {
        fast = fast.next.next 
        slow = slow.next
    
        if(fast === slow) {
            return true
        }
    }

    return false
}