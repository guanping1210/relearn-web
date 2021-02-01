/**
 * 1、数组：forEach, map,filter, some, every
 */
var arr = [1,2,3]

// 当前元素，元素下标，数组本身
// 使用return 并不能中止循环
arr.forEach((value, index, array) => {

})

// 创建筛选后的新数组, 返回的是个新数组、
arr.filter((value, index, array) => {

})

// 返回的是个布尔值，找到符合条件的，直接退出循环
// 效率比forEach高，因为forEach遇到return 不能中止循环
// 遇到return true ,就中止循环了
arr.some((value, index, array) => {

})

// 返回的是个布尔值，需要每一项都符合条件，才为true
arr.every((value, index, array) => {

})

