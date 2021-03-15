/**
 * 组合模式：用小的子对象来构建更大的对象，而这些小的子对象也是由更小的孙对象构成的
 * 
 * 注意：不是父子关系，而是一种HAS-A聚合的关系，将请求委托给它所包含的所有叶对象
 */
// 例如：扫描文件夹中的文件
// 构造文件夹对象
function Folder(name) {
    this.name = name
    this.parent = null
    this.files = []
}

Folder.prototype = {
    constructor: Folder,
    add: function(file) {
        file.parent = this
        this.files.push(file)

        return this
    },

    scan: function() {
        // 委托给叶对象处理
        for(let i = 0; i < this.files.length; i ++) {
            this.files[i].scan()
        }
    },

    remove: function(file) {
        if(typeof file === 'undefined') {
            this.files = []
            return 
        }

        for(let i = 0; i < this.files.length; i ++) {
            if(this.files[i] === file) {
                this.files.splice(i, 1)
            }
        }
    }
}

// 构造文件 叶子对象
function FileN(name) {
    this.name = name
    this.parent = null
}
FileN.prototype = {
    constructor: FileN,
    add: function() {
        console.log('文件里面不能添加文件')
    },
    scan: function() {
        let name = [this.name]
        let parent = this.parent

        while(parent) {
            name.unshift(parent.name)
            parent = parent.parent
        }

        console.log(name.join('/'))
    }
}

let web = new Folder('web')
let fe = new Folder('前端')
let css = new Folder('css')
let js = new Folder('js')
let rd = new Folder('后端')

// 添加层级关系
web.add(fe).add(js)

// 添加文件
let file1 = new FileN('HTML权威指南.pdf')
let file2 = new FileN('Web安全.pdf')
let file3 = new FileN('Javascript权威指南.pdf')

fe.add(file1).add(file2).add(file3)

// web/前端/HTML权威指南.pdf
// web/前端/Web安全.pdf
// web/前端/Javascript权威指南.pdf

web.scan() // 会打印出构造的文件夹结构
