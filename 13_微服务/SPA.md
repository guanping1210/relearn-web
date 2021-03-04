#### single-spa --> https://www.cnblogs.com/synY/p/13958963.html

1、怎么通过 single-spa 读取子应用的 js
2、single-spa 怎么访问子应用的生命周期函数，对于生命周期的调度时机怎么控制的
3、主应用怎么传 props 给子应用的生命周期函数
4、主应用怎么控制路由
5、qiankun 与 single-spa 是什么关系

#### registerApplication --> 注册应用

```
singleSpa.registerApplication({
    name: 'singleDemo',
    app: async() => {
        return ...
    },
    activeWhen: () => location.pathname.startsWith('xxx'), // 配置前端模块
})
```

- 规范参数，然后检查注册的子应用是否有重名
- 注册信息合格的话，把单个的注册对象 registration 和一个对象合并，推入到 apps 数组里面，对子应用信息进行缓存
- apps 内部的对象，有个 status 属性，以及 loadApp 属性，存储的是注册选项的加载函数，决定了用什么样的方式去加载子应用
- 最后执行一个 reroute 方法

#### reroute --> 负责改变 app.status，执行在子应用中注册的生命周期函数

```
function reroute(pendingPromise = [], eventArguments) {
    getAppChanges() // 结构获取变量

    //  isStarted方法判断是否执行start方法
    if(isStarted()) {
        return performAppChanges()
    } else { // registerApplication会走到这个分支
        return loadApps()
    }
}

function getAppChanges() {
    apps.forEach(app => {
        // 内部根据当前的location.href匹配路径，匹配成功的话，说明应该激活这个应用
        // shouldBeActive内部调用的自定义的activeWhen函数激活路由
        const appShouldActive = app.status !== xxx && shouldBeActive(app)

        switch(app.status) { // 前面执行registerApplication的时候会把app.status设置为NOT_LOADED，匹配成功的话，会把上面匹配的app推入appsLoad数组，说明这个子应用即将被加载
            case LOAD_ERROR:
                ...
                break;
            case NOT_LOADED: ; //
            case LOADING_SOURCE_CODE: // 需要激活的app，推入数组
            ......
        }
    })
}
```

#### loadApps --> 注册微任务，注册到 promise.then 后，说明并不会马上执行

```
function loadApps() {
    return Promise.resolve().then(() => {
        // appsToload 通过activeWhen规则分析当前用户所在url，得到需要加载的子应用的数组
        const loadPromises = appsToLoad.map(xxx) //

        return ....
    })
}
```

#### pushState 和 replaceState 方法会被重写

#### single-spa 加载子应用是 app: async() => { return ... }, 自定义加载子应用的代码

```
    {
        name: 'appName'
        app: () => System.import('appName')

        app: async() => {
            await runScrip('xxxx/static/js/chunk-vendor.js'),
            await runScrip('xxxx/static/js/app.js')
            return window['appName']
        }
    }

    async function runScript(url) {
        const script = document.createElement('script')
        script.src = url
        script.onload = resolve
        script.onerror = reject

        const firstScript = document.getElementsByTagName('script')[0]
        firstScript.parentNode.insertBefore(script, firstScript)
    }
```
