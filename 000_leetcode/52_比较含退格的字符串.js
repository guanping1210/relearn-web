/**
 * 比较含退格的字符串：#表示退格
 *  input: ab#c   ad#c  |  ab##   c#d#
 *  ouput: true            true
 * 
 * 因为ab#c，变为了ac, ad#c, 变为了ac，说明退格之后的字符串是相同的
 * 
 * 核心：从后往前搞事儿，然后操作原字符串
 */
function backspaceCompare(S, T) {

}