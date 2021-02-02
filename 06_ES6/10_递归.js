/**
 * 递归函数: 函数内部自己调用自己，这个函数就是递归函数；
 *          必须明确中止条件，否则任意栈溢出，因为每次调用自己都会开辟一块新内存，无限开辟新内存，就会导致栈溢出
 */
var num = 0

function fn() {
    console.log(num)
    num ++
    if(num === 10) { // 明确中止条件
        return 
    }

    fn()
}

fn()

// 阶乘 1 * 2 * 3 * ... n
function jiec(n) {
    if(n === 1) {
        return n
    }

    return n * jiec(n - 1)
}
jiec(10)

// 斐波拉契数列 1, 1, 2, 3, 5, 8 ... n, 就是后一个数是前两个数之和
// 递归：肯定可以优化的, 递归调用超过100, 就栈溢出了
function fib(n) {
    if(n === 1 || n === 2) {
        return 1
    }
    
    return fib(n-1) + fib(n-2)
}

fib(4)

// 斐波拉契优化：用一个变量来存储已经计算过的值
// 尾递归优化
function fib2(n, sum1 = 1, sum2 = 1) {
    if(n === 1 || n === 2) {
        return sum2
    }

    return fib2(n-1, sum2, sum1 + sum2)
}

fib2(100)

// 变量数组保存（动态规划）
function fib3(n) {
    var arr = [1,1,2]

    for(let i = 3; i < n; i ++) {
        arr[i] = arr[i - 1] + arr[i - 2]
    }

    return arr[n - 1]
}

fib3(100)
