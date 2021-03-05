/**
 * 验证回文字符串2：给一个字符串，最多删除一个字符，判断其是不是回文字符串
 */
function validPalindrome(s) {
    function isPalindrome(left, right) {
        while(left < right) {
            if(s[left] !== s[right]) {
                return false
            }

            left ++
            right ++
        }
    }

    let left = 0, right = s.length - 1

    while(left < right) {
        if(s[left] !== s[right]) {
            const result = isPalindrome(left + 1, right) || isPalindrome(left, right - 1)
            return result
        } else {
            left ++
            right --
        }
    }

    return true
}