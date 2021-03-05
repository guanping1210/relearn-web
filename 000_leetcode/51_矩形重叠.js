/**
 * 矩形重叠：矩形以[x1, y1, x2, y2]的形式表示坐标，[x1, y1]表示左下角坐标，[x2, y2]表示右上角坐标
 *          如果相交的面积为整，则重叠。明确只在角或边接触的两个矩形不构成重叠
 * 
 *  input: [0,0,2,2] [1,1,3,3]  |  [0,0,1,1] [1,0,2,1]
 *  output: true                   false
 * 
 * 核心就是：能够重叠，说明坐标有一定的重合关系，
 *          不重叠的情况，固定一个矩形，另一个矩形在四周的坐标，都找不到重合。
 *          1、rect1 右 < rect2 左
 *          2、rect1 左 > rect2 右
 *          3、rect1 下 < rect2 上
 *          4、rect1 上 > rect2 下
 * 
 * 重在画图分析：坐标之间的关系
 */
function isRectangleOrvrlap(rec1, rec2) {
    if(rec1[2] <= rec2[0] || rec1[0] >= rec2[2] || rec1[1] >= rec2[3] || rec1[3] <= rec2[1]) {
        return false
    }

    return true
}