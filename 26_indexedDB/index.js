/**
 *  web indexedDB 数据库
 *  备选：
 *      cookie 4KB；
 *      localStorage 2.5M-10M, 不支持搜索；
 *      indexedDB 本地数据库，脚本创建和操作，允许大量数据存储，提供查找金额开和建立索引
 *  特点：
 *      键值对存储；
 *      异步；
 *      支持事务；
 *      同源限制；
 *      存储空间大；
 *      支持二进制存储（ArrayBuffer | Blob | 字符串）
 */

/**
 * 打开数据库 数据库名 + 版本, 返回IDBRequest对象
 *  error 事件，表示打开数据库失败
 *  success 事件，表示成功打开数据库
 *  upgradeneeded 事件，表示数据库升级事件
 */
const request = window.indexedDB.open('test', 1)
let db 

request.onerror = function() {
    console.log('打开报错')
}
request.onsuccess = function() {
    console.log('打开成功')
}
request.upgradeneeded = function() {
    console.log('升级')
}

// 新建对象仓库（新建表）-> 先判断是否油这张表，有的话就不用新建
request.onupgradeneeded = function(event) {
    db = event.target.result
    let objectStore 
    if(!db.objectStoreNames.concatins('person')) {
        objectStore = db.createObjectStore('person', { keyPath: 'id', autoIncrement: true })
    }

    // 新建字段
    objectStore.createIndex('name', 'name', { unique: false })
    objectStore.createIndex('email', 'email', { unique: true })

    // 写数据入库
    add(request)
}

// 新增数据, 通过事务向对象仓库中写入数据记录
function add(db) {    
    const request = db.transaction(['person'], 'readwrite')
                    .objectStore('person')
                    .add({
                        id: 1, 
                        name: '张三',
                        age: 24, 
                        email: 'angsan@example.com'
                    })
    request.onsuccess = () => {
        console.log('写入成功')
    }
    request.onerror = () => {
        console.log('写入失败')
    }
}

