/**
 * 给你一个字符串 s，找到 s 中最长的回文子串。(从前往后读与从后往前读是一致的)
 * 
 * 输入：s = "babad"
 * 输出："bab"
 * 解释："aba" 同样是符合题意的答案。
 * 
 * 输入：s = "cbbd"
 * 输出："bb"
 * 
 * 输入：s = "a"
 * 输出："a"
 * 
 * 输入：s = "ac"
 * 输出："a"
 * 
 * 核心：
 *  从中心往两边扩散，就是以当前字符，往左右两边开始读取，看是否是回文字符串
 */
var longestPalindrome = function(s) {
  if(s.length < 2) return s
  let start = 0, maxLength = 0;

  for(let i = 0; i < s.length; i ++) {
    
  }

};