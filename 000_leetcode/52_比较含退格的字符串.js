/**
 * 比较含退格的字符串：#表示退格
 *  input: ab#c   ad#c  |  ab##   c#d#
 *  ouput: true            true
 * 
 * 因为ab#c，变为了ac, ad#c, 变为了ac，说明退格之后的字符串是相同的
 * 
 * 核心：从后往前遍历，遇到回退符则执行操作，然后判断当前字符是否相等，然后操作原字符串
 */
function backspaceCompare(S, T) {
  let i = S.length - 1, j = T.length - 1
  let backspaceS = 0, backspaceT = 0

  while(i >= 0 || j >= 0) {
    while(i >= 0) {
      if(S[i] === '#') {
        backspaceS ++
        i --
      } else if(backspaceS > 0) {
        backspaceS --
        i --
      } else {
        break
      }
    }

    while(j >= 0) {
      if(T[j] === '#') {
        backspaceT ++
        j --
      } else if(backspaceT > 0) {
        backspaceT --
        j --
      } else {
        break
      }
    }
    if(S[i] !== T[j]) {
      return false
    }

    i --
    j --
  }

  return true
}