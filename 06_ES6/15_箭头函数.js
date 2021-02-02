/**
 * 箭头函数：用来简化函数定义语法的
 * 
 * this: 箭头函数内部没有自己的this，所引用的this来源于函数定义时的上下文
 */
const fn = () => {}

// 因为sum是o的属性，但是由于sum是箭头函数，所以this指向的是定义时所在的上下文
// o 是在全局作用域下定义的，说明o的上下文是全局上下文，因此，sum内部的this是指向o的上下文
var o = {
  sum: () => {
    return this
  }
}

o.sum() // 返回的是window，说明this是指向全局window的

/**
 * 传统函数：内部有自己的this, 所以this指向调用者
 * 箭头函数：内部不绑定this，一般指向的是外层的this，也就是函数定义位置的上下文this
 */
var obj = {
  xx: 'mary',
  sub: function() {
    return this.xxx
  }
}

obj.sub() // ‘mary’, 说明sub内部的this是指向obj的，因为sub是个普通函数，obj调用的sub，所以指向obj
obj.sub.call({ xxx: 10000 }) // 10000， 这时候是{ xxx: 10000 } 来调用sub函数的，所以此时sub内部的this是指向10000的


