const add = () => {
    return 1 + 2
}

const add2 = () => {
    return 10 + 20
}

// 导出的两种方式，其实exports只是module.exports的另一种写法而已
exports.add4 = add

module.exports.add = add2

// 这种写法就不行，因为会改写module.exports的指向，不再指向原本的module对象
// module.exports = {
//     add: add
// }