// 页面路径取决于外部数据  /about/:id
const AboutIdDetail = ({ id }) => {
    return <div>我是根据ID={id}动态生成动态路由的页面</div>
}

export default AboutIdDetail

// 获取动态路由参数, 参数必须是字符串类型
export async function getStaticPaths() {
    // 可以发送接口请求
    // const res = await fetch()
    const ids = [1,2,3,4,5]

    // 生成需要预渲染的路径
    const paths = ids.map(item => ({
        params: { id: item + '' }
    }))

    console.log(44444, paths)

    return {
        paths,
        fallback: false
    }
}

// params 指代的是URL上的参数
export async function getStaticProps({ params }) {
    console.log(params)

    return {
        props: {
            id: params.id
        }
    }
}