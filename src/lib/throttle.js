
/**
 * 节流函数
 * @param {*} fn 
 * @param {*} wait 
 */
export default function(fn, wait = 300) {
    let timer = null
    return function() {
        if(!timer) {
            let args = [...arguments]
            timer = setTimeout(() => {
                fn.call(null, ...args)
                timer = null
            }, wait)
        }
    }
}