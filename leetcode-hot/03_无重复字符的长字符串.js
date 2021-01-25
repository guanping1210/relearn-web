/**
 * 给定一个字符串，请你找出其中不含有重复字符的 最长子串 的长度。
 * 输入: s = "abcabcbb"
 * 输出: 3 
 * 解释: 因为无重复字符的最长子串是 "abc"，所以其长度为 3。
 * 
 * 输入: s = "bbbbb"
 * 输出: 1
 * 解释: 因为无重复字符的最长子串是 "b"，所以其长度为 1
 * 
 * 输入: s = "pwwkew"
 * 输出: 3
 * 解释: 因为无重复字符的最长子串是 "wke"，所以其长度为 3。
 * 请注意，你的答案必须是 子串 的长度，"pwke" 是一个子序列，不是子串
 * 
 * 思路：
 *  创建一个set;
 *  两个指针，第一个指向字符串的开头，另一个随着for循环遍历字符串i;
 *  
 */
var lengthOfLongestSubstring = function(s) {
  const set = new Set()
  let i = 0, j = 0, maxLength = 0

  if(s.length === 0) return 0

  for(let i = 0; i < s.length; i ++) {
    const curr = s[i]

    if(!set.has(curr)) {
      set.add(curr)
      maxLength = Math.max(maxLength, set.size)
    } else {
      while(set.has(curr)) {
        set.delete(s[j])
        j ++
      }

      set.add(curr)
    }
  }

  return maxLength
};