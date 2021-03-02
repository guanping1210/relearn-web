/**
 * 字母异位词分组：收集错位词，并分组
 *  输入：['eat', 'tea', 'tan', 'ate', 'nat', 'bat']
 *  输出：[['ate', 'eat', 'tea'], ['nat', 'tan'], ['bat']]
 * 
 * 意思是收集字符串集中所有的错位词：例如abc bca cba互为错位词，也就是两个字符串重字母出现的次数是一样的，只是位置不同
 * 
 * 思路1： 字母排序，时间复杂度为nlogn
 * 思路2：
 *  1、检测是否空数组
 *  2、建立字母列表，能够标记每个字母出现的次数
 *  3、遍历字符串，将字母出现的频率对应上去
 *  4、遍历数组，按照相同字母出现的频率进行分组归类hashMap
 *  5、遍历map，返回结果
 * 
 * 核心：每个字符串用ascii码来辨别，每个单次对应的ascii
 */
function vector(arr) {
    if(arr.length === 0) return []

    const map = new Map()

    for(let str of arr) {
        const ascList = new Array(26).fill(0) // 字母列表，a - z

        for(let j = 0; j < str.length; j ++) {
            const ascIndex = str.chartCode(j) - 97
            ascList[ascIndex] ++
        }

        const key = ascList.join('')

        if(map.has(key)) {
            map.set(key, [...map.get(key), str])
        } else {
            map.set(key, [str])
        }
    }

    const result = []

    for(let arr of map) {
        result.push(arr)
    }

    return arr
}