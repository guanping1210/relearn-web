// 传统的异步: 采用回调函数的方式在异步结束后执行函数
function dynameicFunc (callback) {
    setTimeout(() => {
        // 延迟1s，执行回调函数
        callback()
    }, 1000)
}

function cb () {
    console.log('异步结束后打印')
}

dynameicFunc(cb)

// promise实现异步
function dynameicFuncAsync() {
    return new Promise(function(resolve) {
        setTimeout(() => {
            console.log('1s后显示')
            resolve()
        }, 1000)
    })
}

dynameicFuncAsync().then(res => {
    cb()
})

// promise 封装 原生ajax请求
// 注意readyState：0,1,2,3,4 的含义
// 注意status的状态码所表示的含义
function ajaxAsync(url) {
    return new Promise(function(resolve, reject) {
        const client = new XMLHttpRequest()
        client.open('GET', url)
        client.onreadystatechange = function() {
            if(this.readyState !== 4) {
                return 
            }

            if(this.status === 200) {
                resolve(this.response)
            } else {
                reject(new Error(this.statusText))
            }
        }

        client.send()
    })
}