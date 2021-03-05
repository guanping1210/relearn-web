/**
 * 旋转字符串：给两个字符串AB，A挨个儿旋转后，得到B，说明相等
 *  输入：abcde   cdeab
 *  输出：true
 * 
 * 意思是abcde, 第一次旋转变为bcdea, 就是不断的把第一个字符旋转到末尾去，得到新的字符串
 * 
 * 思路：把字符串变为2倍字符串，就是abcde => abcdeabcde, 也就是包含了旋转的所有结果，然后用includes判断是否包含B，包含则为true
 */
function rotateString(a, b) {
    if(a.length !== b.length) {
        return false
    }

    const str = a + a

    return str.includes(b)
}