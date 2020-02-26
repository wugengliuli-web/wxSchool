import Taro from '@tarojs/taro'
import { SET_SRC, SET_NICKNAME } from '../constants/personalCenter'
export const getSrc = () => {
    return async dispatch => {
        let res = await Taro.request({
            url: 'DEVELOP' + 'imgsrc'
        })
        let { data } = res
        dispatch({
            type: SET_SRC,
            data
        })
    }
}
export const getNickname = () => {
    return {
        type: SET_NICKNAME
    }
}