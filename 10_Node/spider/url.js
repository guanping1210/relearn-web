const url = require('url')
const axios = require('axios')

// 解析url
const httpUrl = 'http://www.baidu.com'
const obj = url.parse(httpUrl)
console.log(obj)

// 爬取电影, 要加header，假装自己是浏览器，否则会报错
/**
 * 1、分析源码，找规律；观察自己要爬取的数据的规律
 * 2、获取源码内容
 * 3、确定要查找的目标的正则表达式
 * 4、根据正则表达式，匹配源码内容，得到输出结果
 * 
 * axios获取网页源码，需要读取res.data ,直接用res是不行的
 */
let ttUrl = 'https://www.woyaogexing.com/touxiang/'
axios.get(ttUrl, {
  headers: { 'X-Requested-With': 'XMLHttpRequest'}
}).then(res => {
  console.log(res.data)
  let reg = /<img class="lazy" src="(.*?).jpeg">/igs
  // // 解析html内容
  let resource = reg.exec(res.data)
  console.log('99999', resource)
})



