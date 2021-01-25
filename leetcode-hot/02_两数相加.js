/**
 * 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。
 * 请你将两个数相加，并以相同形式返回一个表示和的链表。
 * 你可以假设除了数字 0 之外，这两个数都不会以 0 开头
 * 
 * 输入：l1 = [2,4,3], l2 = [5,6,4]
 * 输出：[7,0,8]
 * 解释：342 + 465 = 807.
 * 
 * 输入：l1 = [0], l2 = [0]
 * 输出：[0]
 * 
 * 输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
 * 输出：[8,9,9,9,0,0,0,1]
 * 
 * 核心：设置一个变量来表示处理进位的问题
 * 
 */

var addTwoNumbers = function(l1, l2) {
  let dummy = new ListNpde()
  let curr = dummy
  let carry = 0

  while(l1 !== null || l2 !== null) {
    let sum = 0
    if(l1 !== null) {
      sum += l1.val
      l1 = l1.next
    }

    if(l2 !== null) {
      sum += l2.val
      l2 = l2.next
    }

    sum += carry

    curr.next = new ListNode(sum % 10)
    carry = Math.floor(sum / 10)
    curr = curr.next
  }

  if(carry > 0) {
    curr.next = new ListNode(carry)
  }

  return dummy.next
};