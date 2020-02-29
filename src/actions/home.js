import Taro from '@tarojs/taro'
import { DEVELOP } from '../lib/url'
import { 
    set_banner, 
    set_searchPlaceholder,
    set_content,
    clear_content
} from '../constants/home'
//请求banner
export const getBanner = () => {
    return async dispatch => {
        let res = await Taro.request({
            url: DEVELOP + 'bannerUrl'
        })
        let { data: { data } } = res
        dispatch({
            type: set_banner,
            data
        })
    }
}

//请求默认字符
export const getSearchPlaceHolder = () => {
    return async dispatch => {
        let res = await Taro.request({
            url: DEVELOP + 'hotsearch'
        })
        let { data: { data, result } } = res
        if(~~result === 0) {
            data = data[Math.floor(Math.random()) * 10000 % data.length]
            dispatch({
                type: set_searchPlaceholder,
                data: data
            })
        }
    }
} 

//请求内容
export const getContent = (pageIndex, place) => {
    return async dispatch => {
        let res = await Taro.request({
            url: DEVELOP + 'activity/list',
            data: {
                page: pageIndex,
                size: 6,
                location: place.join('-')
            }
        })
        let { data: { result, data } } = res
        if(~~result === 0) {
            dispatch({
                type: set_content,
                pageIndex,
                data
            })
            return true
        } else {
            return false
        }
    }
}

//清除内容
export const clearContent = () => {
    return {
        type: clear_content
    }
}