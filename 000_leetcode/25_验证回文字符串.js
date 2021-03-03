// @ts-nocheck
/**
 * 验证回文字符串：表示翻转后字符是一样的， abcdcba  abccba
 * 
 * 1、字符串翻转 split().reverse().join()
 * 2、指针：判断字符串是奇数还是偶数，确定左右指针的起始位置，然后指针开始往两边走
 */
function isPalindrome(str) {
    const reverse = str.split().reverse().join()

    return reverse === str
}

function isPalindrome2(str) {
    let l = null, r = null

    const length = str.length
    l = length % 2 === 0 ? str[length / 2] : str[parseInt(length / 2 + 1)]
    r = length % 2 === 0 ? str[length / 2 - 1] : str[parseInt(length / 2 - 1)]

    while(r >= 0) {

        if(str[l] === str[r])  {
            return false
        }

        l ++
        r --
    }

    return true
}

isPalindrome2('abc')