/**
 * 矩阵置0：把0所在的下标位置的行、列，都置为0
 * 
 * matrix 是个二位数组
 * 
 * 思路1：
 *  先遍历数组，记录下0所在的下标；然后再对原数组进行置0操作
 * 思路2：
 *  在原数组上操作置0，但是就需要区别，哪些是原本就存在的0，哪些是后来我们加的0
 */

// 思路2：使用第一行和第一列来标记0的情况, 但是有问题是，不能排除第一行、第一列自身的0（用一个额外的值来存储）
function setZeroes(matrix) {
    let firstRowZero = false, firstColZero = false

    for(let row = 0; row < matrix.length; row ++) {
        for(let col = 0; col < matrix[0].length; col ++) {
            if(matrix[row][col] === 0) {
                if(row === 0) {
                    firstRowZero = true // 第一行有0，用标识标记起来
                } else if(col === 0) {
                    firstColZero = true // 第一列有0，用标识标记起来
                } else if(col !== 0 && row !== 0) { // 非第一行和第一列有0， 把0标记到第一行和第一列
                    matrix[row][0] = 0
                    matrix[0][col] = 0
                }
            }
        }
    }

    // 利用第一行和第一列标记的0，来置行、列为0
    for(let row = 1; row < matrix.length; row ++) {
        for(let col = 1; col < matrix[0].length; col ++) {
            if(matrix[0][col] === 0 || matrix[row][0] === 0) {
                matrix[row][col] = 0
            }
        }
    }
    console.log(firstRowZero, firstColZero)
    // 利用特殊标识，处理第一行和第一列原本有0的情况
    if(firstRowZero) {
        for(let i = 0; i < matrix.length; i ++) {
            matrix[0][i] = 0
        }
    }

    if(firstColZero) {
        for(let i = 0; i < matrix[0].length; i ++) {
            matrix[i][0] = 0
        }
    }

    return matrix
}

// 思路1
function setZeroes(matrix) {
    const zeroes = []

    // 记录下0的下标
    for(let row = 0; row < matrix.length; row ++) {
        for(let col = 0; col < matrix[row].length; col ++) {
            if(matrix[row][col] === 0) {
                zeroes.push([row, col])
            }
        }
    }

    // 标记的下标置0
    for(let i = 0; i < zeroes.length; i ++) {
        const [row, col] = zeroes[i]

        for(let j = 0; j < matrix.length; j ++) {
            matrix[j][col] = 0
        }

        for(let k = 0; k < matrix[0].length; k ++) {
            matrix[row][k] = 0
        }

    }

    return matrix
}