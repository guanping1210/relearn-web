// @ts-nocheck
/**
 * 循环：把一个动作重复很多次，不同的循环机制提供了不同的方法去确定循环的开始和结束
 */

// 1、for 语句：直到指定的循环条件为false，才能退出
for(let i = 0; i < 10; i ++) {
    console.log(i)
}

// 2、do...while语句: 当while的条件达到false时，退出循环 --> do循环至少会执行一次
let i = 0
do {
    i ++
    console.log('执行', i)
} while(i < 10)

// 3、while语句：当条件为false时，才退出循环
let i = 0
while(i < 10) {
    i ++
    console.log('执行', i)
}

// 4、label语句: 用label标识循环，用break或continue来指出是否该停止或继续循环
label:
    statement

var num = 0
outPoint: // 说明可以退出到整个outPoint声明的地方，然后继续往下执行
    for(let i = 0; i < 10; i ++) {
        for(let j = 0; j < 10; j ++) {
            if(i === 5 && j === 5) {
                // break; // 上面不加outPoint，只会跳出j的循环，i的循环还是会继续
                break outPoint
            }
            num ++
        }
    }

console.log(num) // 只添加break，打印出95
console.log(num) // 添加了break outPoint，打印的55， 说明是 i、j 的循环，两层循环都被终止了

// 5、break语句：终止循环语句 --> 不带label，只是退出当前所在的那一层循环；带上label，就会退出到整体label的后面
break

break label

// 6、continue语句: 继续执行，跳过代码块的剩余部分并进入下一个循环，不带label，只是退出这一层；带上label，会应用到label整体
continue [label]

// 7、for...in语句: 用来遍历一个对象的可枚举属性; 可以遍历Object，得到的是键名；遍历数组，得到的是下标或自定义下标值
var obj = {
    name: 'gp',
    age: 20,
    sex: 'girl'
}

for(const key in obj) {
    console.log(key) // name, age, sex
}

var arr = [1,2,3]
arr['test'] = 10

for(const key in arr) {
    console.log(key) // 0,1,2,test
}


// 8、for...of语句: 主要获取到的是值，而不是键名 --> 多用于数组，因为数组不关心下标
for(const value of obj) {
    console.log(value) // gp, 20, girl
}

for(const value of arr) {
    console.log(value) // 1,2,3  注意：10打印不出来，自定义下标没打印出来
}