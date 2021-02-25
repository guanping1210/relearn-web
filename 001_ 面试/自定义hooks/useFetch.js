// @ts-nocheck
/**
 * usefetch: 主要解决页面加载第一次默认请求部分数据
 *  旧的写法是每个页面都用useEffect来实现第一次数据的加载，代码量稍多
 *  const [count, setCount] = useState(0)
 *  useEffect(() => { 
 *    fetch(url).then(res => setCount(res))
 *  }, [])
 * 
 * 使用useFetch: 
 *  const [count, fetchCount] = useFetch(0)  // 经过ajax处理的数据在useFetch内部处理的
 */

const { useEffect } = require("react")

const useFetch = (defaultPath, defaultPath, { params = null } = {}) => {
    const [path, setPath] = useState(defaultPath) // 记录path，path也可以变化
    const [data, setData] = useState(defaultValue) // 记录数据
    const [forceRefreshCount, setForceRefreshCount] = useState(0) // 中间状态，用来更新请求

    const refetch = useCallback(path => {
        if(path) {
            setPath()
        }
        setForceRefreshCount(pre => pre + 1)
    }, [])

    useEffect(() => {
        const fetchData = async({ path, params }) => {
            const res = await api.get(path, params)
            setData(res)
        }

        if(path) {
            fetchData({ path, params })
        }
    }, [path, params, forceRefreshCount])

    return [data, refetch]
}

export default useFetch


// 使用useFetch
const [count, updateCount] = useFetch('请求url', '接口默认返回值', '请求参数')
