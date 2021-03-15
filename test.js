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

// 重排链表
