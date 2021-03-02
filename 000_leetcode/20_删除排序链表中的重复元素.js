// @ts-nocheck
/**
 * 删除排序链表中的重复元素：
 *  输入：1 -> 1 -> 2 -> 3 -> 3
 *  输出：1 -> 2 -> 3
 * 
 * 核心：用一个指针，不断往后遍历，比较相邻的节点值，相同则把当前的指向下一个节点的next，这样就删除掉了中间那个重复节点
 */
function deleteDuplicates(head) {
    let p = head

    while(p && p.next !== null) {
        if(p.value === p.next.value) {
            p.next = p.next.next // 相邻值相等，指针移动两次
        } else {
            p = p.next // 相邻值不等，指针往下移动即可
        }
    }

    return head
}