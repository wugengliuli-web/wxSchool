
/**
 * 节流函数
 * @param {*} fn 
 * @param {*} wait 
 */
export const throttle = function(fn, wait = 300) {
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

/**
 * 防抖函数
 */

 export const shake = function(fn, wait = 500) {
     let timer = null
     return function() {
         let args = [...arguments]
         console.log('sh',args)
         if(!timer) {
             let that = this
             timer = setTimeout(function() {
                fn.apply(that, ...args)
                timer = null
             }, wait)
         }
         console.log(timer)
     }
 }