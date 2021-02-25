// @ts-nocheck
/**
 * useMutation: 模拟ajax的get\post\delete请求，封装一下，减少每次都需要async await的写法
 */
const useMutation = () => {
    const mutate = useCallback(async(path, params, method) => {
        const res = await api[method](path, params)
        return res
    }, [])

    const getApi = useCallback(async(path, params) => {
        const res = await mutate(path, params, 'get')
        return res
    }, [mutate])

    const postApi = useCallback(async(path, params) => {
        const res = await mutate(path, params, 'post')
        return res
    }, [mutate])

    const putApi = useCallback(async(path, params) => {
        const res = await mutate(path, params, 'put')
        return res
    }, [mutate])

    const deleteApi = useCallback(async(path, params) => {
        const res = await mutate(path, params, 'delete')
        return res
    }, [mutate])

    return { getApi, postApi, putApi, deleteApi }
}

export default useMutation

// 使用useMutation
import { getApi } from './useMutation'

const res = await getApi(path, params)
console.log(res)