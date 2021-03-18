var calculate = function(s) {
    const ops = [1], n = s.length
    let sign = 1, ret = 0, i = 0

    while(i < n) {
        if(s[i] === ' ') { // 空格
            i ++
        } else if(s[i] === '+') {
            sign = ops[ops.length - 1]
            i ++
        } else if(s[i] === '-') {
            sign = -ops[ops.length - 1]
            i ++
        } else if(s[i] === '(') {
            ops.push(sign)
            i ++
        } else if(s[i] === ')') {
            ops.pop()
            i ++
        } else {
            let num = 0

            // 判断到s[i], 是非数字就走人
            while(i < n && !(isNaN(Number(s[i]))) && s[i] !== ' ') {
                debugger
                num = num * 10 + s[i].charCodeAt() - '0'.charCodeAt()
                i ++
            }

            ret += sign * num
        }
    }

    return ret
};

calculate('1 +(9 - 1)')

/**
 * 
 * @param {*} head 
 * @param {*} k 
 * 先将链表闭合成环,是从倒数为K的位置开始数K
 * 找到相应的位置断开这个环，确定新的链表头和链表尾
 * 找对应关系：链表长度为n，K是个非负数， 起始位置为n-k
 */
var rotateRight = function(head, k) {

    let p = head, cycle = head
    let header = head
    let i = 0
    // 先将链表闭合为环
    while(p.next !== null) {
        p = p.next
        i ++
    }

    // 闭合为环
    p.next = cycle

    // 找到新的起始位置，如何k<i, 那么新节点位置是i - k; 如何k>i, 那么就是K%i，取模出来的结果
    let j = 0
    let newStart = k < i ? i - k : (i - k % i)

    // 找到新的节点位置, 然后需要断开
    while(j < newStart) {
        header = header.next
        j ++
    }
    let q = header.next, pp = q
    header.next = null

    while(q.next !== null) {
        q = q.next
    }
    q.next = null

    return pp
};

/**
 * 删除所有含有重复数字的节点，只保留原始链表中没有重复出现的数字
 * 
 * 注意：链表已经排序了
 * @param {*} head 
 */
var deleteDuplicates = function(head) {
    let dummy = new ListNode()
    let set = new Set()
    dummy.next = head
    let p = dummy, fast = dummy.next

    while(p.next !== null && p.next.next !== null) {
        if(p.next.val === p.next.next.val) {
            set.add(p.next.val)
        }

        if(set.has(p.next.val)) {
            p.next = p.next.next
        } else {
            p = p.next
        }
    }

    if(p.next && set.has(p.next.val)) {
        p.next = null
    }

    return dummy.next
};

/**
 * 
 * @param {*} head 
 * @param {*} x 
 * 
 * 思路：感觉可以用两个指针来解决，一个指针用来走，一个指针用来交换位置
 */
 var partition = function(head, x) {
    let small = new ListNode(), larger = new ListNode()
    small.next = head, larger.next = head
    let smallp = small, largerp = larger

    let p = head

    while(p !== null) {
        if(p.val >= x) {
            largerp.next = p
            largerp = largerp.next
        } else {
            smallp.next = p
            smallp = smallp.next
        }

        p = p.next
    }

    largerp.next = null
    smallp.next = larger.next

    return small.next
};

// 原链表上操作
var partition = function(head, x) {
    let dummy = new ListNode()
    dummy.next = head

    let p = dummy, cur = dummy.next

    while(cur !== null && cur.next !== null) {
        if(cur.val < x) {
            cur = cur.next
        } else {
            let q = cur // 记录大的开始
            let count = q

            while(cur.val > x) {
                cur = cur.next
            }

            while(count.val > x && count.next.val <= x) {
                count = count.next
            }

            console.log(q, count, cur)

            let qq = cur // 记录大变小的
            // qq.val = cur.next.val
            // qq.next = cur.next.next

            // cur.next = q

            // cur = qq
        }
    }

    
    return dummy.next
}

// 设计hash表 --> 目前是二维数组，看能否用一维数组来实现
var MyHashMap = function() {
    this.hash = []
};

/**
 * value will always be non-negative. 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
MyHashMap.prototype.put = function(key, value) {
    const index = this.hash.findIndex(item => item[0] === key)
    if(index === -1) {
        this.hash.push([key, value])
    } else {
        this.hash.splice(index, 1, [key, value])
    }
};

/**
 * Returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key 
 * @param {number} key
 * @return {number}
 */
MyHashMap.prototype.get = function(key) {
    const index = this.hash.findIndex(item => item[0] === key) 

    return index === -1 ? -1 : this.hash[index][1]
};

/**
 * Removes the mapping of the specified value key if this map contains a mapping for the key 
 * @param {number} key
 * @return {void}
 */
MyHashMap.prototype.remove = function(key) {
    const index = this.hash.findIndex(item => item[0] === key)

    if(index !== -1) {
        this.hash.splice(index, 1)
        return this.hash
    }

    return -1
};

var hash = new MyHashMap()
hash.put(1,1)
console.log(hash)


// 返回链表入环的第一个节点
// 
var detectCycle = function(head) {
    if(head === null) {
        return null
    }
    let slow = head, fast = head

    while(fast !== null) {
        slow = slow.next

        if(fast.next !== null) {
            fast = fast.next.next
        } else {
            return null
        }

        if(fast === slow) {
            let ptr = head
            while(ptr !== slow) {
                ptr = ptr.next
                slow = slow.next
            }

            return ptr
        }
    }

    return null
}

/**
 * @param {string} S
 * @return {string}
 */
 var removeOuterParentheses = function(S) {
    let count = 0, ans = '';
    for (let i = 0; i < S.length; i++) {
        if(S[i] === '(' && count++ > 0) ans += '('
        if(S[i] === ')' && count-- > 1) ans += ')';
    }
    return ans;
};

function buildArray(target, n) {
    const stack = []

    for(let i = 1, j = 0; i <= n && j < target.length; i ++) {
        if(i === target[j]) {
            stack.push('push')
            j ++
        } else {
            stack.push('push')
            stack.push('pop')
        }
    }

    return stack
}

/**
 * ../ 表示移动到当前文件夹的父文件夹
 * ./ 表示停留在当前文件夹
 * x/ 表示移动到名为x的子文件夹
 * @param {*} logs 
 */
var minOperations = function(logs) {
    const stack = []

    for(let i = 0; i < logs; i ++) {
        if(logs[i] !== './' && logs[i] !== '../') {
            stack.push(logs[i])
        } else if (logs[i] === '../') {
            stack.pop()
        }
    }

    return stack.length
};

/**
 * 维护一个辅助栈，辅助栈的下标与原始栈下标一一对应，但是辅助栈中每个下标存放的是原始栈作为栈顶时的最小值
 */
var MinStack = function() {
    this.stack = []
    this.minStack = []
};
MinStack.prototype.push = function(x) {
    this.stack.push(x)

    if(this.minStack.length === 0) {
        this.minStack.push(x)
    } else {
        this.minStack.push(Math.min(x, this.getMin()))
    }
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
    this.stack.pop()
    this.minStack.pop()
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    return this.stack[this.stack.length - 1]
};

/**
 * @return {number}
 */
MinStack.prototype.getMin = function() {
    return this.minStack[this.minStack.length - 1]
};

var reverseBetween = function(head, left, right) {
    // 因为头节点有可能发生变化，使用虚拟头节点可以避免复杂的分类讨论
    const dummyNode = new ListNode(-1);
    dummyNode.next = head;

    let pre = dummyNode;
    // 第 1 步：从虚拟头节点走 left - 1 步，来到 left 节点的前一个节点
    // 建议写在 for 循环里，语义清晰
    for (let i = 0; i < left - 1; i++) {
        pre = pre.next;
    }

    // 第 2 步：从 pre 再走 right - left + 1 步，来到 right 节点
    let rightNode = pre;
    for (let i = 0; i < right - left + 1; i++) {
        rightNode = rightNode.next;
    }

    // 第 3 步：切断出一个子链表（截取链表）
    let leftNode = pre.next;
    let curr = rightNode.next;

    // 注意：切断链接
    pre.next = null;
    rightNode.next = null;

    // 第 4 步：同第 206 题，反转链表的子区间
    reverseLinkedList(leftNode);

    // 第 5 步：接回到原来的链表中
    pre.next = rightNode;
    leftNode.next = curr;
    return dummyNode.next;
};

const reverseLinkedList = (head) => {
    let pre = null;
    let cur = head;

    while (cur) {
        const next = cur.next;
        cur.next = pre;
        pre = cur;
        cur = next;
    }
}

/**
 * 反转指定位置的链表 reverseBetween
 * 
 * head = [1,2,3,4,5] left = 2, right = 4
 * 最后结果：[1,4,3,2,5]
 */
function reverseBetween(head, left, right) {
    let dummy = new ListNode()
    dummy.next = head

    let pre = dummy

    for(let i = 0; i < left - 1; i ++) {
        pre = pre.next
    }
    // 经过第一个for循环之后，pre是left位置的前一个节点 --> pre.val = 1

    let rightNode = pre
    for(let i = 0; i < right - left + 1; i ++) {
        rightNode = rightNode.next
    }

    // 经过第二个for循环之后，rightNode表示的是right位置的节点 --> rightNode.val = 4

    // 得到中间需要反转的部分 [2,3,4]
    let leftNode = pre.next
    let curr = rightNode.next // curr.val = 5

    // 需要切断左右两头 --> 可能这时候得到的就是[2,3,4] 部分，两头都为空了
    pre.next = null
    rightNode.next = null

    // 对leftNode进行反转
    function reverse(head) {
        let p = null, curr = head

        while(curr !== null) {
            const next = curr.next
            curr.next = p
            p = curr
            curr = next
        }
    }

    reverse(leftNode)

    // 将切断的部分重新连接起来 --> 这儿为什么是连接rightNode呢
    leftNode.next = curr
    pre.next = rightNode

    return dummy.next
}



