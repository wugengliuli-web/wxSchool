import Taro from '@tarojs/taro'
import {
    set_going,
    set_end
} from '../constants/myCooperation'
import {
    DEVELOP
} from '../lib/url'

export const setGoing = id => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP + 'getGoing',
            data: {
                id
            }
        })
        const { data: { data } } = res
        dispatch({
            type: set_going,
            data
        })
    }
}

export const setEnd = id => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP + 'getGoing',
            data: {
                id
            }
        })
        const { data: { data } } = res
        console.log(data)
        dispatch({
            type: set_end,
            data
        })
    }
}