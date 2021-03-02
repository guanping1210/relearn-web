/**
 * 股票买卖的最大时机2: 可以多次买入和卖出,但是下一次买入必须在上一次卖出之后
 *  输入：[7,1,5,3,6,4]
 *  输出：7
 * 
 * 表示第二天买入为1元，第三天卖出为5元，得到利润5-1=4，
 * 然后第四天买入为3元，第五天卖出为6元，得到利润6-3=3，
 * 一共的利润为4+3
 * 
 * 找趋势，向上则在低端买入，向下时则在高点卖出
 */
function maxProfit(prices) {
    if(prices.length === 0) return 0

    const secondEn = prices.length - 1
    let maxProfit = 0, valley = prices[0], peak = prices[0] // 记录最大利润，趋势底端值，和趋势顶端值

    for(let i = 1; i < secondEn; i ++) {
        while(prices[i] >= prices[i + 1] && i < secondEn) { // 表示当前价格大于未来价格，表示降低, 然后i不断更新，获取到的就是最低价格
            i ++
        }
        valley = prices[i]
        while(prices[i] < prices[i + 1] && i <= secondEn) { // 表示当前价格小于未来价格，表示涨幅，然后i不管更新，获取到的就是最高价格
            i ++
        }
        peak = prices[i]

        maxProfit = (peak - valley) + maxProfit
    }

    return maxProfit
}