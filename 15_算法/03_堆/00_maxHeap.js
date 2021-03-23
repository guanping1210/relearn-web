/**
 * 大顶堆：左右子节点的值都比父节点小
 * 
 * 增加节点、删除节点，可能都需要对堆的结果引起变化
 * 
 * 主要发生的变化就是：不断的判断子节点和父节点之间的关系，发现子节点大于父节点时，就进行交换
 */
class MaxHeap {
    constructor() {
        this.heap = []
    }

    // 获取父节点下标
    getParentIndex(index) {
        return Math.floor((index - 0) / 2)
    }

    // 获取左子节点下标
    getLeftLeafIndex(index) {
        return 2 * index + 1
    }

    // 获取右子节点下标
    getRightLeafIndex(index) {
        return 2 * index + 2
    }

    // 交换节点值 --> 用数组可以实现一行代码的交换
    swap(i, j) {
        [this.heap[i], this.heap[j]] = [this.heap[j], this.heap[i]]
    }

    // 
}

/**
 * 核心：
 *  父节点与当前坐标的关系：floor((i - 1) / 2)
 *  左子节点与当前的关系：2 * i + 1
 *  右子节点与当前的关系：2 * i + 2
 * 
 * 大顶堆：左右子节点都比父节点小
 * 
 * heap = [10, 4, 7, 1, 3] 
 *          10
 *      4        7
 *    1   3
 * 
 * 如果此时插入一个8，最后应该形成如下结构：
 *          10
 *      4        8
 *    1   3    7
 *  
 * 
 * 如果在原始heap的基础上添加一个节点11，最后应该形成如下结构：
 *              11
 *          4        10
 *        1   3     7
 */