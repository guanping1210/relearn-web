#### echarts

#### 性能优化

- 面临的问题

  - 占内存导致 GC 开销大 --> 内部的 zrender 的 requestAnimationFrame 不断的刷新
  - js 频繁调用 api 开销大
  - 绘制 canvas 卡顿
  - transform 动画不流畅
  - 首次加载时间过慢
  - window.resize 时候重新加载、卡顿
  - 数据量过大时，dataZoom 缩放数据会明显的卡顿

- 解决
  - 关闭动画
  - 选择 dataZoom 区域缩放，设置 start 和 end，只显示部分图表
  - webp 服务器配置，开启 gzip 压缩
  - 使用 appendData,分片加载数据和增量渲染
  - 数据过大，采样处理，因为一般是看数据趋势（等距采样）

#### 数据可视化

数据采集 -> 数据清洗 -> 数据存储 -> 数据读取 -> 数据展示 -> 数据分析 -> 数据报表

#### 封装 echarts 组件 --> 封装基础的 theme、render、公用的 option -> 核心就是：初始化图片封装一下，然后针对每个图片再封装一套，以达到调用图片组件传入数据就行了

- registerTheme 注册主题
- echarts.init(options) 初始化 echart 图表
- commonOption: title.style grid legend tooltip toolbox xAxis yAxis

#### 实际问题：

- 数字类型的 x 轴要符合用户的特定需求：本来是 echarts 内部有个 x 轴的取值方式的，type = 'category'的，但是用户要实际的取值，所以要设置 type='value'才生效；
  - 同时，用户要设置 x 轴数值间距;同时要设置最小间距 minInterval，和切割的数字 splitNumber
- xAxis 设置为 min='dataMin', 与 dataZoom 会冲突，必须设置 scale=true，才能解决冲突
