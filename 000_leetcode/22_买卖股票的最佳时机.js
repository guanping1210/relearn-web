/**
 * 买卖股票的最佳时机：数组代表的是每天股票的价格
 *  输入：[7,1,5,3,6,4]   [7,6,4,3,1]
 *  输出：5                0
 * 
 * 意思是：第i个元素表示第i天的价格，最多只完成一笔交易；然后不能在买入股票之前卖出股票
 * 
 * 流程：   7 1 5 3 6 4
 * 最低点： 7 1 1 1 1 1
 * 最大利润:0 0 4 2 5 3
 * 
 * 前i天的最大收益 = max(前i-1天的最大收益， 第i天的价格 - 前 i-1天中的最低价格)
 * 
 * 核心：就是比较当前数据的前面数据的最低点，与右边的最高点
 * 
 * 最大利润：找到当前数据前面的最低点，两个相减，表示最低点买入，最高点卖出，得到的利润
 */
function maxProfit(prices) {
    if(prices.length === 0) return 0

    let minPrice = prices[0], maxProfit = 0

    for(let i = 1; i < prices.length; i ++) {
        minPrice = Math.min(minPrice, prices[i])
        maxProfit = Math.max(maxProfit, prices[i] - minPrice)
    }

    return maxProfit
}