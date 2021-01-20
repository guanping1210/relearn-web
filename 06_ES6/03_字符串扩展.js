/**
 * 1、字符的Unicode表示法：允许用\uxxxx表示一个字符，xxxx表示字符的unicode码点
 *    如果再\u后面加上超过0xFFFF的竖直，JS就会理解未\u20BB+7,该字符不正常(将码点放入大括号，能够正常解读该字符)
 */
console.log('\u0061') // a
console.log("\uD842\uDFB7") // �
console.log("\u20BB7") // ₻7

console.log('\u{1F680}') //
console.log('\u{1F680}' === '\uD83D\uDE80') // true


/**
 * 2、字符串的遍历器接口：ES6为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历
 */
for(let codePoint of 'foo') {
    console.log(codePoint)
}

/**
 * 2、JSON.stringify: 将对象变为字符串
 */
const obj = { name: 20 }

console.log(typeof JSON.stringify(obj))
console.log(JSON.stringify(obj))

/**
 * 3、模板字符串：实现字符的拼接(嵌入变量、换行和空字符，都能完整的保留; 还能嵌套)
 *      ${xxxx}: xxxx 表示变量名，可以放入任何对象，函数、表达式，对象属性
 *      xxx表示对象的时候，会默认调用对象的toString方法
 *      
 */
const str = `hello, 

    ${obj}
`

console.log(str)
console.log(obj.toString())


/**
 * 4、模板编译：模板使用<% ... %>放置JS代码，使用<%= ... %>输出JS表达式
 *    如何编译：将字符串变为可执行的JS表达式字符串； 将template封装到一个函数里返回就行
 */
const data = [1,2,3,4,5]
const template = `
    <ul>
        <% for(let i = 0; i < data.length; i ++) { %>
            <li> <%=data[i] %> </li>
        <% } %>
    </ul>
`
console.log(template)

// 1、变为JS表达式字符串
let evalExpr = /<%=(.+?)%>/g;
let expr = /<%([\s\S]+?)%>/g;

let templateStr = template
  .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
  .replace(expr, '`); \n $1 \n  echo(`');

  templateStr = 'echo(`' + template + '`);';
console.log(templateStr)

// 2、封装到函数中
function compile(template){
    const evalExpr = /<%=(.+?)%>/g;
    const expr = /<%([\s\S]+?)%>/g;
  
    template = template
      .replace(evalExpr, '`); \n  echo( $1 ); \n  echo(`')
      .replace(expr, '`); \n $1 \n  echo(`');
  
    template = 'echo(`' + template + '`);';
  
    let script =
    `(function parse(data){
      let output = "";
  
      function echo(html){
        output += html;
      }
  
      ${ template }
  
      return output;
    })`;
  
    return script;
}

let parse = eval(compile(template));
div.innerHTML = parse({ supplies: [ "broom", "mop", "cleaner" ] });

/**
 * 5、标签模板
 */
alert`hello` // 等同于 alert('hello') === alert(['hello']), 数组会自动拼接为字符串
alert`hello sss` // 等同于alert(['hello', 'sss'])，弹出hello,sss