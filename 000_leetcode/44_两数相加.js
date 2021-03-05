// @ts-nocheck
/**
 * 两数相加：
 *  input: 7 -> 2 -> 4 -> 3  5 -> 6 -> 4
 *  output: 7 -> 8 -> 0 -> 7 => 7243 + 564 = 7807
 * 
 * 核心就是：用链表来体现数据，然后从链表尾部往头部开始相加，要考虑进位问题
 * 
 * 思路：先把链表反转了，在执行相加，然后把相加的结果再反转，得到了结果
 * 
 * 进阶：不能修改链表 --> 栈的思路
 *  定义两个栈，分别存储两个链表的值；然后从栈中取数据出来相加；再计算进位
 */
function twoLinkAdd(l1, l2) {
    const stack1 = [], stack2 = []

    while(l1 !== null) {
        stack1.push(l1.val)
        l1 = l1.next
    }

    while(l2 !== null) {
        stack2.push(l2.val)
        l2 = l2.next
    }

    let carry = 0, curr = null

    while(stack1.length !== 0 || stack2.length !== 0) {
        let sum = 0
        if(stack1.length !== 0) {
            sum += stack1.pop()
        }
        if(stack2.length !== 0) {
            sum += stack2.pop()
        }

        sum += carry

        const node = newListNode(sum % 10)
        carry = Math.floor(sum / 10)

        node.next = curr
        curr = node
    }

    if(carry !== 0) {
        const node = newListNode(carry)
        node.next = curr
        curr = node
    }

    return curr
}