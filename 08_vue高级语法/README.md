### Vue

#### Vue 实例可接收的 option

    el
    data
    methods
    计算属性
    监听
    生命周期

#### 值插入模板

    {{ xxx  }}
    v-html="xxx"
    v-pre="xxx"
    v-text="xxx"
    v-once

#### 遍历

    v-for="(item, index) in dataList"

#### 动态绑定

    v-bind:xxx="yyy" --> yyy=object，string，array

#### 监听: 监听到 xxx 变化的时候，会自动触发后面的函数执行

    watch: {
        xxx: function() {
            return this.xxx
        }
    }

#### 计算属性：根据属性而变化的变化

    <!-- 检测到yyy变化，会自动触发xxx的执行，效率更好，会自动缓存，重复操作只执行一次 -->
    computed: {
        xxx: function() {
            return this.yyy
        }
    }

#### 事件绑定

    v-on:xxx="yyy" --> xxx表示事件名，例如click，mouserover这些，yyy表示函数名

#### 生命周期

    beforeCreate() {}   创建实例之前
    create() {}         创建实例成功（数据请求）
    beforeMount() {}    渲染DOM之前
    mount(){}           渲染DOM完成
    beforeUpdate() {}   重新渲染之前
    update() {}         重新渲染之后
    beforeDestory() {}  销毁之前
    destoryed() {}      销毁完成

####
