/**
 * 加油站 --> 给一个加油站环， 表示出加油数和到达下一个站所需油量， 找出一个能跑一圈儿的站点
 * 
 * 核心：以一个不通的站点为新一次的起点,
 */
function canCompleteCircuit(gas = [], cost = []) { // gas表示当前邮箱油量，cost表示去到下一个站需要花费的油量
    let totalGas = 0, totalCost = 0, currentGas = 0, start = 0

    for(let i = 0; i < gas.length; i ++) {
        totalGas += gas[i]
        totalCost += cost[i]
    }

    if(totalGas < totalCost) { // 无论如何都走不通
        return -1
    }

    for(let i = 0; i < gas.length; i ++) {
        currentGas = currentGas - cost[i] + gas[i]

        if(currentGas < 0) {
            currentGas = 0
            start = i + 1
        }
    }

    return start
}