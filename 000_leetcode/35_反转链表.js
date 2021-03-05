/**
 * 反转链表：
 *  输入：1 -> 2 -> 3 -> 4 -> 5 -> null
 *  输出：5 -> 4 -> 3 -> 2 -> 1 -> null
 * 
 * 暴力解法：用个数组啥的来存储，然后反转就OK了 --> 肯定不是想要这种
 * 
 * 核心思路：设置三个指针，一个表示curr,一个表示prev,一个表示next；
 *          然后后把curr.next设置为prev, 完成反转；
 *          然后next, curr, prev都往前走一步, 实现移动
 */
function reverseList(head) {
    let prev = null, curr = head, next = head

    while(curr !== null) {
        next = next.next
        curr.next = prev
        prev = curr
        curr = next

        // js特性一行代码实现交换
        // [curr.next, prev, curr] = [prev, curr, curr,next]
    }

    return prev
}