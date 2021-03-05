/**
 * 斐波拉契数列： 1, 1, 2, 3, 5... ， 从1开始，第N个数等于前两个数之和
 *    f(n) = f(n-1) + f(n-2)
 * 核心：主要是考优化 --> 把中间重复用到的数值缓存起来
 */
// 基础版本
function fib(n) {
    if(n <= 1) {
        return 1
    }

    return fib(n - 1) + fib(n - 2)
}

// recursion 递归 + memoization 记忆化 = 动态规划DP
function fib(n) {
    if(n <= 1) {
        return n
    }

    const cache = []
    cache[0] = 0
    cache[1] = 1

    for(let i = 2; i <= n; i ++) {
        cache[i] = cache[i - 1] + cache[i - 2]
    }

    return cache[n]
}

// dp -> 从上到下缓存 topdown , 类似于递归
function fib(n) {
    if(n <= 1) {
        return n
    }

    const cache = []
    cache[0] = 0
    cache[1] = 1

    function memoize(number) {
        if(cache[number] !== undefined) {
            return cache[number]
        }

        cache[number] = memoize(number - 1) + memoize(number - 2)
        return cache[number]
    }

    const result = memoize(n)

    return result
}

// dp -> 从下到上缓存
