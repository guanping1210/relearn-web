/**
 * 奇偶链表：给定一定链表，奇偶数混合在一起的。需要把奇数放一起，偶数放一起
 *  输入：1 -> 11 -> 3 -> 4 -> 5 -> null
 *  输出：1 -> 3 -> 5 -> 11 -> 4 -> null
 * 
 * 奇偶性：指的是节点编号的奇偶性，而不是节点的值的奇偶性
 * 链表的第一个节点下标视为奇数节点，第二个节点下标视为偶数节点
 * 
 * 原地算法，空间复杂度为O(1), 时间复杂度为O(n)
 */
function oddEvenList(head) {
    if(head === null) return null
    if(head.next === null) return head

    let odd = head, even = head.next, evenHead = head.next
    while(even !== null && even.next !== null) {
        odd.next = even.next
        odd = odd.next

        even = even.next
        even.next = even.next.next
    }

    odd.next = evenHead

    return head
}
