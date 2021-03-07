function outer() {
  var person = 'yuanxing'

  function inner2() {
    console.log('name: ', person)
  }

  return inner2
}

var inner = outer()

function execution() {
  var name = 'xiaowa'
  inner()

  console.log('person: ', person)
}

ececution() // 打印的是yuanxing，说明是找的函数的定义栈

// 执行栈
// ｜ inner2   ｜
// ｜ outer    ｜
// ｜ inner    ｜
// ｜ exection ｜
// ｜ window   ｜
// ----

/**
 * JS是基于词法作用域的，也就是静态分析的，根据书写的位置确定的，而不是执行的时候确定的
 */

 // 作用域
 function a() {
   return function b() {
     var myname = 'b'
     console.log(myname) // b
   }
 }

 function c() {
   var myname = 'c'
   b()
   console.log(myname) // c
 }

//  作用域链
var pname = 'xiaowa'

function outerp() {
  var pname = 'guanp'

  function c() {
    console.log('pname: ', pname)
  }

  c() // 这种其实也叫闭包，因为访问了c函数外面的pname
}

outerp()

// this
// test 1
function show() {
  console.log(this)
}

var person = {
  show: show
}

person.show()  // 指向person

// test 2
var obj = {
  show: function() {
    console.log(this)
  }
}

(0, obj.show)() // window --> why

// test 3
var obj = {
  sub: {
    show: function() {
      console.log(this)
    }
  }
}
obj.sub.show() // 指向的sub对象

// test 4
var obj = {
  show: function() {
    console.log(this)
  }
}
var newObj = new (obj.show.bind(obj))() // newObj
newObj()

//  this绑定有个优先级：new、call、apply、bind，new的优先级最高

// test 5
var obj = {
  show: function() {
    console.log(this)
  }
}

var ele = document.getElementById('root')

ele.addEventListener('click', obj.show)
ele.addEventListener('click', obj.show.bind(obj))
ele.addEventListener('click', function() {
  obj.show()
})

