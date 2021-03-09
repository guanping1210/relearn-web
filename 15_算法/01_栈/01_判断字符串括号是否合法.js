// @ts-nocheck
const { static } = require("express")

/**
 * 字符串(), 合法的才能配对
 *  input: ()           )()
 *  ouput: true         false
 * 
 * 核心：用一个栈来模拟，碰到左括号就入栈一个右括号，碰到右括号就出栈，最后栈为空，说明则匹配
 */
function isValid(s) {
    // 边界条件：字符串为空，字符串为奇数个
    if(s.length === 0 || s.length % 2 !== 0) {
        return false
    }

    const stack = []

    for(let chart of s) {
        if(chart === '(') {
            stack.push(')')
        } else if(chart === ')') {
            if(stack.length === 0) {
                return false
            }
            stack.pop()
        }
    }

    return stack.length === 0
}

isValid('()')
isValid(')()()(')

/**
 * 优化：利用栈来存储的时间复杂度和空间复杂度是O(n)，空间复杂度也是O(n),因为最差情况下会整个字符串都入栈
 * 
 * 思考：入栈的元素都是一样的，可否用个常规变量来计算 --> 可以的，没必要使用栈
 * 
 * 优化后的时间复杂度是O(n), 但是空间复杂度从O(n)变为了O(1)
 */
function isValidOptimization(s) {
    if(s.length === 0 || s.length % 2 !== 0) {
        return false
    }
    let count = 0

    for(let chart of s) {
        if(chart === '(') {
            s ++
        } else if(chart === ')') {
            if(chart === 0) {
                return false
            }

            count --
        }
    }

    return count === 0
}
isValidOptimization('()')
isValidOptimization('()(())')

/**
 * 扩展：如果把()匹配变为(),{},[]，那么如何适应变化呢
 * 
 * 核心：用个对象匹配规则，还是用个栈来操作
 */
function isValidMore(s) {
    const map = new Map()
    const rule = {
        '{': '}',
        '[': ']',
        '(': ')',
    }

    for(let chart of s) {
        const validChart = rule[chart];
    
        if(validChart) {
            map.set(validChart, map.get(validChart) ? map.get(validChart) + 1 : 1)
        } else {
            // 这儿的chart有问题
            if(map.get(chart) <= 0) {
                return false
            }

            map.set(chart, map.get(chart) - 1)
        }
    }

    for(let number of map.values()) { // 主要map存储的，用let of 遍历，是遍历出的[key, value]
        if(number !== 0) {
            return false
        }
    }

    return true
}

isValidMore('{}()[]')
isValidMore('{([])}')
isValidMore('{([])}}')