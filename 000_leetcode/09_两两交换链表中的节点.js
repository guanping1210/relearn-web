// @ts-nocheck
/**
 * 两两交换相邻的节点：
 *  给定：1 -> 2 -> 3 -> 4
 *  结果：2 -> 1 -> 4 -> 3
 * 
 * 思路：
 *  1、将相邻节点设置为n1, n2
 *  2、将n1, n2的指向交换
 */
function  exchangeLink(head) {
    let dummy = new ListNode()
    dummy.next = head

    let curr = dummy

    while(curr.next !== null && curr.next.next !== null) {
        let p1 = curr.next
        let p2 = curr.next.next

        curr.next = p2 // 本来curr.next是指向p1的，现在指向了p2，表示把p2位置提前了

        p1.next = p2.next // 本来p1.next是指向p2的，但是现在由于把p2提前了一个位置，那么p2.next就要被记住
        p2.next = p1 // p2.next指向p1， 表示把p1放置到p2之后了

        curr = p1 // 又从下一对儿相邻的，开始操作
    }

    return dummy.next
}