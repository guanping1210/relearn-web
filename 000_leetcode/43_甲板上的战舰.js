/**
 * 甲板上的战舰：给一个二维甲板，计算有多少的战舰，战舰用x表示, 空位用 . 表示
 *              战舰只能水平或垂直放置
 *  input: x..x       ...x
 *         ...x       xxxx
 *         ...x       ...x
 *  output: 2         0
 */
function countBattleships(board) {
    let result = 0

    function dfs(row, col) {
        if(row >= board.length || col >= board[0].length || row < 0 || col < 0 || board[row][col] !== 'x') {
            return
        }

        board[row][col] = '.'

        // 检查四周，深度优先遍历
        dfs(row - 1, col)
        dfs(row + 1, col)
        dfs(row, col + 1)
        dfs(row, col - 1)
    }

    for(let row = 0; row < board.length; row ++) {
        for(let col = 0; col < board[0].length; col ++) {
            if(board[row][col] === 'x') {
                result ++
                dfs(row, col)
            }
        }
    }

    return result
}

// 进阶 --> 不修改原数组
function countBattleships(board) {
    let result = 0

    function dfs(row, col) {
        if(row >= board.length || col >= board[0].length || row < 0 || col < 0 || board[row][col] !== 'x') {
            return
        }

        board[row][col] = '.'

        // 检查四周，深度优先遍历
        dfs(row - 1, col)
        dfs(row + 1, col)
        dfs(row, col + 1)
        dfs(row, col - 1)
    }

    for(let row = 0; row < board.length; row ++) {
        for(let col = 0; col < board[0].length; col ++) {
            if(board[row][col] === 'x') {
                if(row > 0 && board[row - 1][col] === 'x'){ // 判断上面x
                    continue
                }
                if(col > 0 && board[row][col - 1] === 'x'){ // 判断下面x
                    continue
                }

                result ++
            }
        }
    }

    return result
}