// @ts-nocheck

/**
 * 面向过程编程POP：
 *  分析出解决问题的步骤，用函数将这些步骤一步一步实现，使用时一个一个的依次调用就行。
 * 
 * 举例：把大象装进冰箱，解法是：
 *  1、打开冰箱门
 *  2、把大象装进去
 *  3、关上冰箱门
 * 
 * 优点：性能比OOP高
 * 缺点：不易维护，不易扩展
 */

/**
 * 面向对象编程OOP：
 *  把事务分解为一个个对象，然后由对象之间分工与合作
 * 
 * 举例：把大象装进冰箱，解法是：
 *  1、找到对象，也就是
 *     大象：进去
 *     冰箱：打开、关闭
 *  2、使用大象和冰箱的功能
 * 
 * 特性：
 *  1、封装性
 *  2、继承性
 *  3、多态性
 * 
 * 优点：易维护、易扩展
 * 缺点：性能比POP低
 */

/**
 * 面向对象：
 *  1、抽象对象共有的属性和行为，封装为一个类，也就是模版
 *  2、对类进行实例化，获取类的对象
 * 
 * 对象：JS中万物皆对象，由属性和方法组成，特指某一个，通过类实例化出来的一个具体的对象
 *  属性：事物的特征
 *  方法：事物的行为
 * 
 * 类class: 抽象了对象的公共部分，泛指某一大类
 */

// 1、创建类，使用关键字class
class Star {
  // 构造函数，用于传递参数，返回实例对象，添加的是共有属性
  constructor(uname) {
    this.uname = uname
  }

  // 类中添加共有方法
  money () {
    console.log('有钱')
  }
}

// 2、利用类创建对象 new ，生成对象实例时会自动调用constructor方法
const xz = new Star('xiaozhan')
console.log(xz.uname)

// 3、继承  -->  用extends能够继承父类的属性和方法
class SingStar extends Star {
  constructor(props) {
    // super关键字，能够让子类访问父类中的构造函数，就相当于把props传递给了父类
    // 可以调用父类的构造函数，也可以调用父类的普通函数
    // 必须写在this之前
    super(props)

    this.props = props
  }

  // super.xxx() , 调用父类的函数
}

const singer = new SingStar('dengziqi')
console.log(singer.money)
