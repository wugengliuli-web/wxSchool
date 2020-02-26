import {
    set_hasRelease,
    set_notRelease
} from '../constants/myRelease'

import Taro from '@tarojs/taro'

import {
    DEVELOP
} from '../lib/url'

export const getHasRelease = id => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP + 'getEvaluated',
            data: {
                id
            }
        })
        const { data: { data } } = res
        dispatch({
            type: set_hasRelease,
            data
        })
    }
}

export const getNotRelease = id => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP + 'getEvaluated',
            data: {
                id
            }
        })
        const { data: { data } } = res
        dispatch({
            type: set_notRelease,
            data
        })
    }
}