/**
 * server worker全局变量
 *  self: 当前worker作用域
 *  caches: 表示缓存
 *  skipWaiting: 表示强制当前处在waiting状态的脚本进入activate状态
 *  clients: 表示service worker接管的页面
 */
var cacheStorageKey = 'minimal-pwa-1'

var cacheList = [
  '/',
  "index.html",
  "main.css",
  "e.png"
]

self.addEventListener('install', e => {
    e.waitUntil(
      caches.open(cacheStorageKey)
      .then(cache => cache.addAll(cacheList))
      .then(() => self.skipWaiting())
    )
  })