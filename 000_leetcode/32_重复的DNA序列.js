/**
 * 重复的DNA序列：DNS由A、C、G和T组成
 * 
 * 编写一个函数查找目标子串，目标子串长度为10，且在DNA字符串s中除阿信次数超过一次
 */
function findRepeatedDnaSequences(s) {
  const map = new Map()
  const result = []

  let i = 0
  while(i + 10 < s.length) {
    const dna = s.substring(i, i + 10)

    if(map.has(dna)) {
      if(map.get(dna) === 1) {
        result.push(dna)
      }
      map.set(dna, map.get(dna) ++)
    } else {
      map.set(dna, 1)
    }
  }

  return result
}