// @ts-nocheck
/**
 * JavaScript的设计就是基于对象的，所以在JS中，一切皆对象
 * 对象：就是一系列属性的集合，一个属性包含一个名和一个值
 */

/**
 * 1、枚举属性
 *  for...in  遍历对象及原型链中所有可枚举属性
 *  Object.keys(o) 返回对象o自身，不包括原型上的可枚举属性
 *  Object.getOwnPropertyNames(o) 返回对象o自身，不包括原型上的所有属性
 */

/**
 * 2、创建对象
 *  字面量创建
 *  构造函数创建
 *  Object.create方法
 */
// 字面量
var o = { name: 20 }

// 构造函数
function Car(make, model, year) {
    this.make = make
    this.model = model
    this.year = year
}

var car = new Car('china', 'tt', 1993)

// Object.create() 方法创建
var Animal = {
    type: 'xx'
}

var animal1 = Object.create(Animal)

/**
 * 2、继承
 */