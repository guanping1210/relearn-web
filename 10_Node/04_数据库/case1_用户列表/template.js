const template = require('art-template')
const path = require('path')
// 给模板引入第三方插件, xxx表示第三方库，这样可以在模板中直接使用xxx
// template.defaults.imports.xxx = xxx

// 设置模板的根目录
template.defaults.root = path.join(__dirname, 'views')

// 设置模板默认后缀
template.defaults.extname = '.art'

// const views = path.join(__dirname, 'views', 'index.art')

// const html = template('index.art', {
//     name: '张三',
//     age: 30,
//     hobbits: ['唱歌', '跳舞']
// })

const html = template(path.join('extend.art'), {
    msg: '模板继承'
})
console.log(html)

/**
 * 标准语法： {{}}
 * 原始语法：<%=数据 %>
 */