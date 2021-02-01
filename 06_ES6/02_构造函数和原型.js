// @ts-nocheck
/**
 * 类与对象的区别：类(也就是构造函数)就是对象的模板，对象就是“类”的实例
 * 
 * 创建对象的方式：JS中一切都是对象
 *  1、对象字面量
 *  2、new Object()
 *  3、自定义构造函数: 是一种比较特殊的函数，用来初始化对象的，
 *                  也就是为对象成员变量赋初始值。提取公共方法和属性，
 *  4、class 
 * 
 * 构造函数一定要配合 new 关键字产生实例对象：因为new的时候会自动执行构造函数
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
// 通过 this 添加的叫实例成员， 那么只能通过实例来访问
function Star(uname) {
  this.uname = uname

  // 多次new的话，会创建多个内存块来存放同一个sing函数
  this.sing = function() {
    console.log(this.uname + '唱歌')
  }
}

// 静态成员
Star.sex = 'girl'

var ldh = new Star('刘德华')
var wsl = new Star('汪苏泷')

ldh.sing()
wsl.sing()

console.log(ldh.sing === wsl.sing) // false，说明两个实例的sing函数，不是来自同一个内存

/**
 * 构造函数的原型prototype: 
 *  每个构造函数都有一个prototype属性，指向另一个对，这个对象就叫做原型对象。
 *  原型对象内部包含的属性和方法，是所有实例共享的。  
 */
Star.prototype.dance = function() {
  console.log('跳舞')
}

let xxx = new Star('xxx')
let yyy = new Star('yyy')

// 说明xxx和yyy的dance都指向同一块内存，能够较少内存开销
console.log(xxx.dance === yyy.dance) // true

/**
 *  实例对象原型__proto__: 
 *    每个对象身上，系统自己有添加一个__proto__属性, 这个属性指向构造函数的prototype对象，
 *    也就是说__proto__，也是指向原型对象的
 * 
 *  所以：构造函数的prototype是指向原型对象的，实例对象的__proto__属性也是指向原型对象的
 *  结论：构造函数.prototype === 实例.__proto__
 *  
 */

//  为什么xxx自己没有定义dance方法，但是却有dance方法呢？
//  因为能够通过__proto__去查找到构造函数的原型对象
//  说明实例上的__proto__属性是与Star.prototype相等的
console.log(xxx.__proto__ === Star.prototype) // true

/**
 * 原型对象上系统默认自带一个constructor属性。
 * 
 * constructor属性：
 *  对象原型__proto__和构造函数prototype原型对象内部都有一个constructor属性，
 *  这个属性指向构造函数本身。
 */

console.log(Star.prototype.constructor === Star) // 说明原型对象上的constructor属性是指向构造函数自身的
console.log(xxx.__proto__.constructor === Star.prototype.constructor)  // true

// 很多情况下，我们需要手动的利用constructor这个属性指回原来的构造函数
// 原因是：给Star.prototype赋予新的值，会导致prototype指向一块新的内存地址了，不再是指向构造函数的内存地址
// constructor手动更改的情况,指回原来的构造函数
Star.prototype = {
  constructor: Star, // 修正构造函数指向
  sing() {},
  dance() {}
}

/**
 * 构造函数、实例、原型对象三者之间的关系：
 *  构造函数.prototype === 原型对象
 *  实例.__proto__ === 原型对象
 *  原型对象.constructor === 构造函数
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

/**
 * 原型内部的this指向问题：
 *  1、构造函数中的this指向的是对象实例；
 */
ldh.sing() // Star原型对象上的sing，现在是ldh调用的，所以this就指向ldh

/**
 * ES6之前的继承：
 *  构造函数+原型对象： 组合继承
 */
function fn() {
  console.log('我要喝手磨咖啡')
  console.log(this)
}

// call()调用函数
fn.call()

// call改变this指向,此时fn函数的this就指向来 o 这个对象
var o = {
  name: 'ldh'
}
fn.call(o)

// 父类
function Father(uname) {
  this.uname = uname
}

/**
 * 1、构造函数继承：核心就是把子类的this通过call给关联到父类上
 */
function Son(uname) {
  Father.call(this, uname)
  this.uname = uname
}

/**
 * 2、原型继承：子类的原型prototype=父类的实例
 * 如果直接把子类.prototype=父类.prototype，会直接影响到父类的原型，因为内存都指向同一块
 */
Father.prototype.money = function() {
  console.log('赚钱')
}

Son.prototype = new Father() // 因为实例化出来的对象是新开辟的内存，但是相当于赋予了新的内存，不再是以前的内存
Son.prototype.constructor = Son // 需要修正构造函数的指向

/**
 * 3、ES中类的继承：class extends, 本质上还是函数
 *    类的本质就是一个函数，可以认为类就是构造函数的另外一种写法
 */

/**
 * ES5通过构造函数+原型实现面向对象编程的特点：
 *  1、构造函数都有prototype属性
 *  2、实例对象都有__proto__属性
 *  3、原型对象上都有constructor属性
 */