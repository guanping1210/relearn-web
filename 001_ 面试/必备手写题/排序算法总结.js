/**
 * 排序方法特性和JS 代码实现
 * 资料：https://zhuanlan.zhihu.com/p/42586566
 */

/**
 * 1、冒泡排序：
 *  概念：最简单的排序算法。重复的走访要排序的数列，一次比较相邻的两个元素。
 *  过程：比较相邻的元素，满足条件之后就交换；针对所有元素执行上面的步骤，直到没有元素可比较了
 * 
 *  时间复杂度为 O(N*N), 因为N个数据，两层循环，总共要执行N*N次
 *  空间复杂度为 O(N)
 * 
 *  稳定性：很稳定，但是只适合小数据的排序，算法复杂度较高，不适合大数据量的排序
 * 
 *  可以优化的点：设置一个标识符，标识后续是否还需要遍历，最优情况下可以达到O(N)的时间复杂度
 * 
 *  动画：https://pic4.zhimg.com/v2-33a947c71ad62b254cab62e5364d2813_b.webp
 * 
 *  以下demo是用冒泡排序实现数组从小到大的排列
 */

// O(N^2)
function bubbleSort(arr) {
    for(let i = arr.length - 1; i > 0; i --) {
        for(let j = 0; j < i; j ++) {
            if(arr[j] > arr[j+1]) {
                [arr[j], arr[j + 1]] = [arr[j+1], arr[j]]
            }
        }
    }
}

// 优化
function bubbleSort2(arr) {
    let swap = false
    for(let i = arr.length - 1; i > 0; i --) {
        for(let j = 0; j < i; j ++) {
            if(arr[j] > arr[j +1]) {
                [arr[j], arr[j + 1]] = arr[arr[j + 1], arr[j]]
                swap = true
            }
        }

        if(swap === false) { // 当swap为false，说明该数组已经是有序的了，后续就不需要再比较了
            break
        }
    }
}

/**
 * 2、选择排序：是一种比较简单直观的排序算法，也是一种交换排序算法，和冒泡排序相似，是冒泡排序的一种改进
 *  过程：在未排序序列中找到最小（大）元素，存放到排序序列的起始位置；
 *       从剩余元素中继续寻找最小（大）元素，放到已排序序列的末尾；
 *       重复第二步，知道所有元素排序完毕。
 *      
 *      以第I个数据作为基准，往后寻找到比第I个数据小的数据，然后交换I 和 J位置的数据
 * 
 *  时间复杂度：O(N^2)
 *  空间复杂度: O(N)
 * 
 *  稳定性：数组的选择排序是不稳定的，链表的选择排序是稳定的
 * 
 *  动画：https://pic1.zhimg.com/v2-1c7e20f306ddc02eb4e3a50fa7817ff4_b.webp
 */
function selectionSort(arr) {
    let minIndex = 0

    for(let i = 0; i < arr.length - 1; i ++) {
        minIndex = i

        for(let j = i + 1; j < arr.length - 1; j ++) {
            if(arr[minIndex] > arr[j]) {
                minIndex = j
            }
        }

        if(minIndex !== i) {
            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]]

        }
    }
}


/**
 * 3、插入排序: 通过构建有序序列，对于未排序数据，在已排序序列中从后往前扫描，找到响应位置并插入
 *  过程：把待排序的数组分为已排序和未排序两部分，初始的时候把第一个元素认为是已经排好的；
 *        从第二个元素开始，在已排好序的子数组中寻找到该元素合适的位置并插入到该位置；
 *        重复上述过程
 * 
 *  时间复杂度 O(N^2), 时候小数据量排序
 * 
 *  主要是已经排序好的那部分，其实是能够节省部分时间的。
 *  我理解的是，在未排序中取一个数据和已排序的序列做相邻对比，满足条件就交换
 * 
 * 动画：https://pic3.zhimg.com/v2-91b76e8e4dab9b0cad9a017d7dd431e2_b.webp
 */
function insertSort(arr) {
    for(let i = 1; i < arr.length - 1; i ++) {
        let position = i
        let temp = arr[i]

        while(position > 0 && arr[position - 1] > arr[i]) {
            arr[position] = arr[position - 1]
            position --
        }

        arr[position] = temp
    }
}

/**
 * 4、归并排序：采用分治法，进行排序
 *  递归法过程：申请空间，使其为两个序列之和，用来存放合并后的序列；
 *             设定两个指针，最初位置为两个已排序序列的起始位置；
 *             比较两个指针指向的元素，选择较小的元素存放到合并空间，并移动指针到下一个位置；
 *             重复上述步骤
 *  迭代法过程：将序列每相邻的两个数字进行归并操作，形成ceil(n/2)个序列，排序后每个序列包含一或两个元素；
 *              继续归并，形成ceil(n/4)个序列，每个序列包含三或四个元素；
 *              重复上述步骤
 * 
 *  时间复杂度：O(N*logN), 适用于数据量大情况，但是不适合特别大数据量使用
 * 
 *  稳定性：很稳定
 * 
 * 动画：https://pic3.zhimg.com/v2-cdda3f11c6efbc01577f5c29a9066772_b.webp
 */
// 辅助方法：合并两个有序数组
function merge(left, right) {
    const n = left.length
    const m = right.length
    let backs = [], i = 0, j = 0
    while(i < n && j <m) {
        if(left[i] < right[j]) {
            backs.push(left[i])
            i ++
        } else {
            backs.push(right[j])
            j ++
        }
    }

    while(i < n) {
        backs.push(left[i])
        i ++
    }

    while(j < m) {
        backs.push(right[j])
        j ++
    }

    return backs
}

// 归并过程
function mergeSort(arr) {
    if(arr.length <= 1) return arr
    let mid = Math.floor(arr.length / 2)
    let left = arr.slice(0, mid)
    let right = arr.slice(mid)
    
    return merge(mergeSort(left), mergeSort(right))
}

/**
 * 5、快速排序：比较著名的排序算法，适用于大数据量，性能也高
 *  过程：从数列中挑一个元素作为基准；
 *        比较数列，比基准小的数据放左边，比基准大的数据放右边，分区结束后，基准处于数列的中间位置；
 *        在分区的地方，继续比较
 * 
 *  时间复杂度：
 * 
 *  稳定性：不稳定，因为无法保证相等的数据按顺序被扫描和按顺序存放
 * 
 *  优化的点: 可以用双指针i,j的方式去寻找，找到 j < i, 那么交换位置，然后i ++,
 * 
 *  动画：https://pic1.zhimg.com/v2-c411339b79f92499dcb7b5f304c826f4_b.webp
 */
// 以中间位置的元素作为基准点,用两个空数组来存放左右两边的对比结果
function quickSort(arr) {
    if(arr.length <= 1) return arr

    let mid = Math.floor(arr.length / 2)
    let point = arr.splice(mid, 1)[0]
    let left = [], right = []

    for(let i = 0; i < arr.length; i ++) {
        if(arr[i] < point) {
            left.push(arr[i])
        } else {
            right.push(arr[i])
        }
    }

    return quickSort(left).concat([point], quickSort(right))
}

/**
 * 6、堆排序：利用大顶堆、小顶堆的特点，每次都取堆顶的数据，然后将剩下的堆调整为最大（小）堆，再取数
 *  过程：给一个无序数组，如果建立堆？
 *       堆顶删除后，如何调整数组成为新堆？（删除后的调整，是把最后一个元素放到堆顶，自上而下比较 ；新增是把元素放到最后，自下而上比较）
 *  堆是一种完全二叉树，所以可以得到部分的位置规律： --> 完全二叉树的特点就是每个节点都有两个子节点
 *      parent(i) = floor(i - 1) / 2
 *      left(i) = 2*i + 1
 *      right(i) = 2*(i + 1)
 * 
 *  大顶堆：根节点最大，节点值都小于等于父节点   小顶堆：根节点最小，节点值都大于等于父节点
 * 
 *  稳定性：不稳定，适合大数据量排序；对于解决诸如'前n大的数'一类的问题，几乎是首选算法
 * 
 *  动画：https://pic3.zhimg.com/v2-c66a7e83189427b6a5a5c378f73c17ca_b.webp
 */
const swap = function (arr, i, j) {
    let temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
function buildHeap(arr) {
    let len = arr.length

    for(let i = Math.floor(len/2) - 1; i >= 0; i --) {
        maxHeapify(arr, len, i)
    }
}
function maxHeapify(arr, heapSize, i) {
    let l = i * 2 + 1, r = i * (i + 1)
    let largest = i

    if(l < heapSize && arr[l] > arr[i]) {
        largest = l
    }

    if(r < heapSize && arr[r] > arr[i]) {
        largest = r
    }

    if(largest !== i) {
        swap(arr, heapSize, largest)
        maxHeapify(arr, heapSize, largest)
    }
}

function heapSort(arr) {
    buildHeap(arr)
    arr.heapSize = arr.length
    for(let i = arr.length - 1; i >= 0; i --) {
        swap(arr, 0, i)
        arr.heapSize --
        maxHeapify(arr, arr.heapSize, 0)
    }

    return arr
}

/**
 * 7、希尔排序：插入排序的改进版，在数据基本有序的情况下，可以达到O(N)的复杂度，效率很高
 *  过程：先将待排序的数据分割为若干个子序列，然后进行插入排序；
 *        按一定的间隔对数列进行分组，然后在每一个分组中做插入排序；
 *        随后逐次缩小间隔，在每一个分组中做插入排序...
 *        直到间隔等于1，做一次插入排序后结束。
 * 
 *  稳定性：不稳定，但是排序很快，但是也没有快排更快
 * 
 *  动画：https://pic3.zhimg.com/v2-f14e4169ff39bad42c3dd6c385ad9c72_b.webp
 */
function shellSort(arr) {
    for(let gap = Math.floor(arr.length / 2); gap > 0; gap = Math.floor(gap/2)) {
        for(let i = gap; i < arr.length; i ++) {
            let j = i, temp = arr[i]

            while(j > 0) {
                if(temp >= arr[j - gap]) {
                    break
                }
                arr[j] = arr[j - gap]
                j = j - gap
            }

            arr[i] = temp
        }
    }

    return arr
}


/**
 * 8、桶排序：基于计数排序的优化，将数组分到有限数量的桶里，然后对每个桶分别排序，最后将各桶中的数据有序的合并起来
 *  过程：找出待排序数组中的最大值max，最小值min;
 *        使用动态数组作为桶，里面存放的数据，桶的数量为 (max-min) / arr.length - 1;
 *        遍历数组arr，计算每个元素arr[i]放的桶；
 *        每个桶各自排序；
 *        遍历桶数组，把排序好的元素合并为排序好的数组输出；
 * 
 *  时间复杂度：
 *  
 *  稳定性：
 * 
 *  动画：https://pic4.zhimg.com/v2-3c7ddb59df2d21b287e42a7b908409cb_b.webp
 */

function bucketSort(arr) {
    if(arr.length <= 1) return arr

    let i = 0
    let minValue = arr[0], maxValue = arr[0]

    // 找最大值、最小值
    for(i = 1; i < arr.length; i ++) {
        if(arr[i] < minValue) {
            minValue = arr[i]
        } else if(arr[i] > maxValue) {
            maxValue = arr[i]
        }
    }

    // 桶的初始化
    var defaultBucketSize = 5 // 设置桶的默认数量
}
