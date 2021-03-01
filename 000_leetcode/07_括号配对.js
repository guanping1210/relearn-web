/**
 * 括号配对：就是有 [] {} () ，一定是配对出现的
 * 思路就是：
 *  模拟栈的过程，碰到有[ { ( ，就栈，然后碰到 ] } )就出栈，最后如果栈为空，那么就是配对好的
 */
function isValid(str) {
  const stack = []
  const map = {
    '{': '}',
    '(': ')',
    '[': ']'
  }

  for(let i = 0; i < str.length; i ++) {
    if(map[str[i]]) {
      stack.push(map[str[i]])
    } else {
      const p = stack.pop()
      if(p !== str[i]) {
        return false 
      }
    }
  }

  if(stack.length) {
    return false
  }

  return true
}