/**
 * 大鱼吃小鱼：给定数组Size, Dir, Siz[i]表示第i条鱼的大小，Dir[i]表示鱼的方向，（0表示向左游，1表示向右游）
 *  1、所有鱼都同时开始游动，每次按照鱼的方向，游动一个单位距离
 *  2、当方向相对时，大鱼会吃掉小鱼
 *  3、鱼的大小都不一样
 *  
 *  input：Size=[4,2,5,3,1] Dir=[1,1,0,0,0]
 *  output: 3
 * 
 * 规律：只有当两条鱼相对而游的时候，较小的鱼会被吃掉
 */
function fishEatFish(fish, dir) {
    if(fish.length <= 1) {
        return fish.length
    }

    const left = 0, right = 1 // 0 表示向左游，1表示向右游
    const stack = [] // 用数组来模拟栈

    for(let i = 0; i < fish.length; i ++) {
        // 当前鱼的情况
        const curFishDir = dir[i], curFishSize = fish[i]
        let hasEat = false // 设定当前的鱼是否被栈中的鱼吃掉

        const stackLen = stack.length

        // 如果栈中还有鱼，并且栈中鱼向右，当前的鱼向左，那么就会有相遇的可能性
        while(stackLen !== 0 && dir[stack[stackLen - 1]] === right && curFishDir === left) {
            // 如果栈顶的鱼比较大，就会把新来的鱼吃掉
            if(fish[stackLen - 1] > curFishSize) {
                hasEat = true
                break
            }

            // 如果栈顶的鱼比较小，那么就会把栈中的鱼吃掉
            stack.pop()
        }

        // 如果新来的鱼，没有被吃掉，那么压入栈中
        if(!hasEat) {
            stack.push(i)
        }
    }

    return stack.length
}