/**
 * 防抖debounce: 防止手抖，也就是防止点击多次
 *      核心：从当前操作的时候开始计时，如果计时中间重新操作，那么重新计时，等到计时到了，才执行一次函数
 * 
 * 节流throttle: 节流，是说点击多次太浪费了，在指定时间内只执行一次
 *      核心：从当前操作开始计时，如果计时中重新操作，直接忽略，等到计时到了，执行一次函数，然后开始下一次计时
 */
function debounce(fn, delay, immediate) { // immediate表示是否立即执行
    var timer = null

    return function() {
        let context = this
        let args = arguments


        if(timer !== null) {
            clearTimeout(timer)
        }

        if(immediate) {
            var callNow = !timer
            timer = setTimeout(() => {
                timer = null
            }, delay)

            if(callNow) {
                fn.apply(context, args)
            }
        } else {
            timer = setTimeout(function() {
                fn.apply(context, args)
            }, delay)
        }   
     }
}

function throttle(fn, delay) {

}


