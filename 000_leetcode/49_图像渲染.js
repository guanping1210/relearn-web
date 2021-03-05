/**
 * 图像渲染：给一个整数表示该图像的像素值大小，数值在0-65535 之间。这个整数用二维数组来表示
 *  输入：image= [[1,1,1], [1,1,0], [1,0,1]], sr = 1, sc = 1, newColor = 2, 表示把第一行第一列的值改为newColor的值
 *  输出：[[2,2,2], [2,2,0], [2,0,1]]
 * 
 * (sr, sc) => (行、列)，表示坐标，然后把坐标周围的数值变为newColor 的值，但是中间相邻的都更改；不相邻就不更改
 *  
 */
function floodFill(image, sr, sc, newColor) {
    if(image[sr][sc] === newColor) {
        return image
    }

    const oldColor = image[sr][sc]

    function dfs(sr, sc) {
        if(sr < 0 || sr >= image.length || sc < 0 || sc >= image[0].length || image[sr][sc] !== oldColor) {
            return 
        }

        dfs(sr - 1, sc)
        dfs(sr + 1, sc)
        dfs(sr, sc - 1)
        dfs(sr, sc + 1)
    }

    dfs(1, 1)

    return image
}