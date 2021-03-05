/**
 * 检测字符串中，字符的个数是否相等，位置无所谓
 *  输入： 'anagram'  ‘naagmra’ | 'rat' 'car'
 *  输入：true                     false
 * 
 * 字符的个数相等，就返回true
 * 
 * 核心：利用map来存储每个字符出现的次数，对第一个数组存储次数，第二个字符串遍历一次，就抵消个数，看最后是不是得到的值为0
 */
function validAnagram(s1, s2) {
    const length1 = s1.length
    const length2 = s2.length

    if(length1 !== length2) {
        return false
    }

    const map = new Map()

    for(let i = 0; i < s1.length; i ++) {
        if(map.has(s1[i])) {
            map.set(s1[i], map.get(s1[i]) + 1)
        } else {
            map.set(s1[i], 1)
        }
    }

    for(let i = 0; i < s2.length; i ++) {
        if(map.has(s2[i])) {
            map.set(s2[i], map.get(s2[i]) - 1)
        }
    }

    for(let chart in map) {
        if(map.get(chart) !== 0) {
            return false
        }
    }

    return true
}