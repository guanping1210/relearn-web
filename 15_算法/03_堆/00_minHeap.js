/**
 * 小顶堆：左右子元素都小于父元素
 *  追加数据，虽然是追加到最后，但是相当于整个结构，都会进行变动；
 *  删除堆顶，其实是删除heap[0], 也就是把heap[0] 赋予别的值，然后再进行变动
 * 
 * 反正核心就是要构造为：左右子元素小于父元素
 */
class MinHeap {
    constructor() {
        this.heap = []
    }

    // 交换节点位置
    swap(i, j) {
        const temp = this.heap[i]
        this.heap[i] = this.heap[j]
        this.heap[j] = temp

        console.log('交换', this.heap)
    }

    // 获得父节点
    getParentIndex(index) {
        return Math.floor((index - 1) / 2)
    }

    // 获得左子节点
    getLeftNodeIndex(index) {
        return this.heap[2 * index + 1]
    }

    // 获得右子节点
    getRightNodeIndex(index) {
        return this.heap[2 * index + 2]
    }

    // 上移 --> 因为元素是追加到数组末尾，所以是上移
    shiftUp(index) {
        if(index === 0) return 
        const parentIndex = this.getParentIndex(index)
        console.log('parent', this.heap, index, parentIndex, this.heap[parentIndex], this.heap[index])
        if(this.heap[parentIndex] > this.heap[index]) {
            this.swap(parentIndex, index)
            this.shiftDown(parentIndex)
        }
    }

    // 下移 --> 因为删除堆顶，是删除第一个元素，所以是从第一个数据开始往下改造
    shiftDown(index) {
        const leftIndex = this.getLeftNodeIndex(index)
        const rightIndex = this.getRightNodeIndex(index)

        if(this.heap[leftIndex] < this.heap[index]) {
            this.swap(leftIndex, index)
            this.shiftDown(leftIndex)
        }

        if(this.heap[rightIndex] > this.heap[index]) {
            this.swap(rightIndex, index)
            this.shiftDown(rightIndex)
        }
    }

    // 插入
    insert(val) {
        this.heap.push(val)
        this.shiftUp(this.heap.length - 1)
    }
    // 删除堆顶
    pop() {
        // 将数组最后一个元素，并复制为堆顶
        this.heap[0] = this.heap.pop()

        // 对堆顶重新排序
        this.shiftDown(0)
    }

    // 获取堆顶
    peek() {
        return this.heap[0]
    }

    // 获取堆大小
    size() {
        return this.heap.length
    }

    getHeap() {
        return this.heap
    }
}

/**
 * 小顶堆：左右子节点比父节点大
 * 
 * heap = [1,2,4,5,6]
 * 
 *      1
 *    2   4
 *  5  6  
 * 
 * 最后给heap追加一个 3 , 因为 3 本来应该追加为 4 的子节点的，但是 3 比 4小，不能构成小顶堆
 * 所以需要转移，把3往上移动 --> 移动的方法就是: 比较3 和 3父节点的值，小于父节点那么需要交换
 */
var heap = new MinHeap()

heap.insert(1)
heap.insert(2)
heap.insert(4)
heap.insert(5)
heap.insert(6)

heap.insert(3) // 值为3和4, 需要交换位置
