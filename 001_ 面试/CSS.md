https://juejin.cn/post/6844904077806190605

#### BFC 块级格式化上下文 --> 构建一个独立的区域，可包含区域内的所有元素，包括浮动元素，形成与外界互不打扰的一个空间

- 解决的问题
  - 清除浮动 --> 浮动元素脱离文档流，会导致父级高度塌陷
    - clear
    - 构建 BFC: overflow: auto
  - 外边距折叠 --> 垂直方向的外边距会发生折叠

#### absolute 相对哪个元素定位的 --> 相对距离最近的非 static 定位的， 能够避免触发回流

#### DPR --> 物理像素/css 逻辑像素

- 像素： 图像现实的基本单位
- 物理像素：设备的物理像素，每个设备的物理像素都是厂家固定好的
- css 像素：编码使用的
- DPR：由于高清屏的需求，屏幕大小不变，像素点越多越清晰，导致设备上每英寸的像素点 PPI 越来越多 window.devicePixelRatio 获取设备的 DPR

#### 1px 问题

- 高清屏中 DPR 可能是 2 或者 3， 那么原先 1px 的像素在高清屏下就会占 2 个或者 3 个物理像素，导致看着粗
- 解决：
  - 使用伪类： border 1px scale(0.5)
  - 设置 meta initial-scale 根据 DPR 设置初始值
  - 伪类 + transform: scaleY(0.5)

#### link 和@import 的区别

- 从属关系：link 是 html 提供的，可以加载 css，还可以定义 RSS，rel 连接属性等；@import 是 css 提供的语法规则，用于导入样式表
- 加载顺序区别：link 文件是同时加载；@import 引入的文件将在页面加载完毕后被加载
- 兼容性问题：@import 可能有兼容问题

#### display:none 和 visibility:hidden 的区别

- display: none, 在文档布局中不分配空间，值会导致回流和重绘，代价比较大
- visibility: hidden, 保留渲染树中的节点和占用空间，只会导致重绘

#### rem em vh vw 的区别 --> 布局单位

- rem 相对于根节点的字体大小的一个单位， 例如 375 宽的设计稿，设定字体大小为 375//10=37.5, 那么设计稿下 60px 的宽对应的 rem=60/37.5
- em 与 rem 类似，但是是相对于父级元素的字体大小
- vh 1vh 等于视口宽度 1%
- vw 1vw 等于视口宽度 1%
- vmin 选取 vw 和 vh 中最小的那个
- vmax 选取 vw 和 vh 中最大的那个

#### 英文换行

- word-break: break-all 对字符起作用，解决字符串过长的问题
- word-wrap: break-word 对英文起作用，以单词作为一句

#### flex 常见属性

- 容器上的属性

  - flex-direction 主轴方向
  - flex-wrap 换行的方式
  - flex-flow 上面两个的简写
  - justify-content 主轴的对齐方式
  - align-items 交叉轴的对齐方式
  - align-content 多根主轴的对齐方式

- 元素上的属性
  - order 排序值，数字越小越靠前
  - flex-grow 项目的方法比例
  - flex-shrink 项目的缩小比例
  - flex-basis 分配多余空间之前，项目占据的主轴空间
  - flex 以上三个的简称
