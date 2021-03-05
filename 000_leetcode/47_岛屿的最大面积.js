/**
 * 岛屿的最大面积：给包含0和1的非空二维数组，岛屿由1组成，相邻的1，也算一块儿；其实也就是找一片儿为1 的最多个数
 */
function maxAreaOfIsland(grid) {
    let result = 0
    function dfs(row, col) {
        if(row < 0 || row >= grid.length || col < 0 || col >= grid[0].length || grid[row][col] === 0) {
            return 0
        }

        grid[row][col] = 0

        let count = 1
        count += dfs(row - 1, col)
        count += dfs(row + 1, col)
        count += dfs(row, col + 1)
        count += dfs(row, col - 1)

        return count
    }

    for(let row = 0; row < grid.length; row ++) {
        for(let col = 0; col < grid[0].length; col ++) {
            if(grid[row][col] === 1) {
                result = Math.max(dfs(row, col), result)
            }
        }
    }

    return result
}
