var calculate = function(s) {
    const ops = [1], n = s.length
    let sign = 1, ret = 0, i = 0

    while(i < n) {
        if(s[i] === ' ') { // 空格
            i ++
        } else if(s[i] === '+') {
            sign = ops[ops.length - 1]
            i ++
        } else if(s[i] === '-') {
            sign = -ops[ops.length - 1]
            i ++
        } else if(s[i] === '(') {
            ops.push(sign)
            i ++
        } else if(s[i] === ')') {
            ops.pop()
            i ++
        } else {
            let num = 0

            // 判断到s[i], 是非数字就走人
            while(i < n && !(isNaN(Number(s[i]))) && s[i] !== ' ') {
                debugger
                num = num * 10 + s[i].charCodeAt() - '0'.charCodeAt()
                i ++
            }

            ret += sign * num
        }
    }

    return ret
};

calculate('1 +(9 - 1)')

var getKthFromEnd = function(head, k) {
    
};