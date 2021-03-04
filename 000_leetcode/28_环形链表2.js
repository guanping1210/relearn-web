/**
 * 环形链表2：给一个链表，返回链表开始进入环的第一个节点，如果链表无循环，则返回null; pos表示入环节点的下标，没有环则返回-1
 * 
 * 1、证明有环
 * 2、相遇之后，把快指针放回到头部，一步一步的走，然后慢指针也是一步一步的走 （佛洛依德算法）
 * 
 * 慢指针步数 * 2 = 快指针步数
 */
function solution(head) {
    let fast = head, slow = head, isCycle = false

    while(fast.next !== null && fast.next.next !== null) {
        slow = slow.next
        fast = fast.next.next

        if(slow === fast) {
            isCycle = true
            break
        }
    }

    if(!isCycle) {
        return null
    }

    fast = head
    while(slow !== fast) {
        slow = slow.next
        fast = fast.next
    }

    return fast
}