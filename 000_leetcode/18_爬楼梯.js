/**
 * 爬楼梯：每次爬1梯或者2梯，一共N梯
 * 
 * i - 1: 表示爬一步
 * i - 2: 表示爬2步
 */
function climbStairs(n) {
    const memo = []

    memo[0] = 0
    memo[1] = 1
    memo[2] = 2
    memo[3] = 3

    for(let i = 4; i <= n; i ++) {
        memo[i] = memo[i - 1] + memo[i - 2]
    }

    return memo[n]
}