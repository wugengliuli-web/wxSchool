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
            url: DEVELOP + 'homeSearchPlaceHolder'
        })
        let { data } = res
        dispatch({
            type: set_searchPlaceholder,
            data
        })
    }
} 

//请求内容
export const getContent = (pageIndex, place) => {
    return async dispatch => {
        let res = await Taro.request({
            url: DEVELOP + 'getContent',
            data: {
                pageIndex,
                place
            }
        })
        let { data: { data } } = res
        dispatch({
            type: set_content,
            data,
            pageIndex
        })
    }
}

//清除内容
export const clearContent = () => {
    return {
        type: clear_content
    }
}