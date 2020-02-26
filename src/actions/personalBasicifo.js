import Taro from '@tarojs/taro'
import {
    DEVELOP
} from '../lib/url'

export const getUserInfo = id => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP + 'getUserInfo',
            data: {
                id
            }
        })
        const { data } = res
        return data
    }
}


export const getIdentityInfo = id => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP + 'getIdentityInfo'
        })
        const { data } = res
        return data
    }
}

export const getRecommend = schoolName => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP + 'getRecommend',
            data: {
                schoolName
            }
        })
        const { data: { data } } = res
        return data
    }
}

export const getActiveGoing = id => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP + 'getEvaluated',
            data: {
                id
            }
        })
        const { data: { data } } = res
        return data
    } 
}

export const getActiveEnd = id => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP + 'getEvaluated',
            data: {
                id
            }
        })
        const { data: { data } } = res
        return data
    } 
}