/**
 * 岛屿数量：
 *  给一个由1(陆地)和0(海水)组成的二维网络，计算岛屿的数量。
 *  一个岛屿被水包围，并且是通过水平方向或垂直方向上相邻的陆地
 *  连接而成的，可以设想为网格的四个遍被水包围
 * 
 *  输入: 11110     11000
 *        11010     11000
 *        11000     00100
 *        00000     00011
 *  输出：1         3
 * 
 * 核心：碰到1，就把1周围的数字开始遍历，遍历到非1的，就变为0；如果遍历到0了，就退出
 * 
 * bfs: 广度优先遍历
 * dfs: 深度优先遍历
 */
function numIslands(grid) {
    let count = 0

    function dfs(row, col) {
        if(row < 0 || row >= grid.length || col <0 || col >= grid[0].length || grid[row][col] === '0') {
            return 
        }

        grid[row][col] = 0
        dfs(row, col - 1)
        dfs(row, col + 1)
    }

    for(let row = 0; row < grid.length; row ++) {
        for(let col = 0; col < grid.length; col ++) {
            if(grid[row][col] === '1') {
                count ++
                dfs(row, col)
            }
        }
    }
}