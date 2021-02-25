// @ts-nocheck
import { useEffect } from "react"

/**
 * useClickOutSide: 捕捉全局的点击事件, 判断点击的是不是在指定区域之外，在之外的话，就不执行操作
 *      一般用于全局下拉框啊啥的，下拉框内部可以点击，但是点击之后下拉框不会消失，只有点击下拉框之外的地方，才能使得下拉框关闭
 */
const useClickOutSide = (ref, clickOutSideAction) => {
    function handleClickOutside(event) {
        if(ref.current && !ref.current.contains(event.target)) {
            clickOutSideAction(event.target)
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside)

        return () => {
			document.removeEventListener('mousedown', handleClickOutside)
		}
    }, [])
}

// 使用方法
useClickOutSide(wrapperRef, target => {
    // 排除指定class的元素: 排除包含 ant-select为class名的元素
    if(target.className && !target.className.includes('ant-select')) {
        setVisible(false)
    }
})