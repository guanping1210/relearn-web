/**
 * 导出的x的值为5， 在1秒后变为100
 * 但是下方2秒后打印x, 值仍为5，说明结果被缓存了，记录的是第一次加载的数据
 * 
 */
const { x, addX, a, b } = require('./index');

console.log(x);
console.log(a);
console.log(addX(5));

setTimeout(() => {
    console.log(x)
    console.log(b)
}, 2000);
