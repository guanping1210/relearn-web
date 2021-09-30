var app = require('app')
var BrowserWindow = require("browser-window")

var mainWindow = null

app.on('window-all-closed', function() {
    if(process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('ready', function() {
    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({width: 800, height: 600});
  
    // 加载应用的 index.html
    mainWindow.loadURL('file://' + __dirname + '/index.html');
  
    // 打开开发工具
    mainWindow.openDevTools();
  
    // 当 window 被关闭，这个事件会被发出
    mainWindow.on('closed', function() {
      // 取消引用 window 对象，如果你的应用支持多窗口的话，
      // 通常会把多个 window 对象存放在一个数组里面，
      // 但这次不是。
      mainWindow = null;
    });
  });