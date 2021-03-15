// @ts-nocheck
/**
 * 静态资源监控：js文件、css文件
 * 思路：
 *  1、performance.getEntries()方法，能够获取到所有加载成功的资源列表；在onload事件中遍历出所有的资源集合，再对比
 *  2、添加一个listener来捕获前端异常
 *  
 */
function recordResourceError() {
    window.addEventListener('error', function(e) {
        let typeName = e.target.localName
        let sourceUrl = ''

        if(typeName === 'link') {
            sourceUrl = e.target.href
        } else if(typeName === 'script') {
            sourceUrl = e.target.src
        }

        let sourceLoadInfo = new ResourceLoadInfo('RESOURCE_LOAD', sourceUrl, typeName, '0')
        sourceLoadInfo.handleLogINfo('RESOURCE_LOAD', sourceLoadInfo)
    }, true)
}