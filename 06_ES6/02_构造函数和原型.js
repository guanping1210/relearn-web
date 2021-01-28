// @ts-nocheck
/**
 * 创建对象的方式：
 *  1、对象字面量
 *  2、new Object()
 *  3、自定义构造函数: 是一种比较特殊的函数，用来初始化对象的，
 *                  也就是为对象成员变量赋初始值。提取公共方法和属性，
 *  4、class 
 * 
 * new的过程：
 *  1、在内存中创建一个新的空对象
 *  2、让this指向这个空对象
 *  3、执行构造函数里面的代码，给这个新对象添加属性和方法
 *  4、返回这个新对象（所以构造函数内部不需要return）
 * 
 * 实例成员：构造函数内部通过this添加的成员，
 *         只能通过实例化的对象来访问，不能通过构造函数访问
 * 
 * 静态成员：构造函数内部通过static定义的成员，
 *         只能通过构造函数访问，不能通过实例化的对象来访问。
 * 
 * 构造函数虽然好用，但是存在浪费内存的问题
 * 
 */
// 通过this添加的叫实例成员
function Star(uname) {
  this.uname = uname

  // 多次new的话，会创建多个内存块来存放同一个sing函数
  this.sing = function() {
    console.log('唱歌')
  }
}

// 静态成员
Star.sex = 'girl'

let ldh = new Star('刘德海')
ldh.sing()


/**
 * 构造函数原型prototype: 
 *  每个构造函数都有一个prototype属性，指向另一个对象。这个对象内部包含的属性和方法，是所有实例共享的。
 * 
 *  
 */
Star.prototype.dance = function() {
  console.log('跳舞')
}

let xxx = new Star('xxx')
let yyy = new Star('yyy')

// 说明xxx和yyy的dance都指向同一块内存
console.log(xxx.dance === yyy.dance) // true

/**
 *  对象原型__proto__: 
 *    对象身上系统自己添加一个__proto__属性, 指向构造函数的prototype对象
 *  
 */

//  为什么xxx自己没有定义dance方法，但是却有dance方法呢？
//  因为能够通过__proto__去查找到构造函数的原型对象
//  说明实例上的__proto__属性是与Star.prototype相等的
console.log(xxx.__proto__ === Star.prototype) // true

/**
 * constructor属性：
 *  对象原型__proto__和构造函数prototype原型对象内部都有一个constructor属性，
 *  这个属性指向构造函数本身。
 */
console.log(Star.prototype.constructor)
console.log(xxx.__proto__.constructor)
console.log(xxx.__proto__.constructor === Star.prototype.constructor)  // true

// 很多情况下，我们需要手动的利用constructor这个属性只会原来的构造函数
// constructor手动更改的情况,指回原来的构造函数
Star.prototype = {
  constructor: Star,
  sing() {},
  dance() {}
}

/**
 * 构造函数、实例、原型对象三者之间的关系：
 *  
 */

/**
 * 原型链：每个原型对象都有__proto__属性，能够形成一条链路，也就是所谓的原型链。
 */
console.log(
  Star.prototype.__proto__ === Object.prototype
)

console.log(
  Object.prototype.__proto__ === null
)