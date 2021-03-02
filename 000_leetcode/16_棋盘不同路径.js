/**
 * 棋盘走法：只能向下或者向右走一步
 * 
 * 核心：当前走法 = 上一次向下的走法 + 上一次向右的走法
 * 
 * 每个格子的路径数 = 上一次向下的路径数 + 上一次向右的路径数
 * 
 * 用两个已知的走法，推测出下一个未知的走法
 */
function encodeUrl(m, n) {
    const memo = new Array(m).fill(Array[n].fill(0))

    // 第一行第一列初始化为1
    for(let row = 0; row < m; row ++) {
        memo[row][0] = 1
    }
    for(let col = 0; col < n; col ++) {
        memo[0][col] = 1
    }


    for(let row = 1; row < m; row ++ ) {
        for(let col = 1; col < n; col ++) {
            memo[row][col] = memo[row - 1][col] + memo[row][col - 1]
        }
    }

    return memo[m - 1][n - 1]
}

/**
 * 一维和二维，是有区别的
 */