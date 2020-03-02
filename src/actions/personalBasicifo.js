import Taro from '@tarojs/taro'
import {
    DEVELOP
} from '../lib/url'
import { publishState } from '../lib/type'
export const getUserInfo = id => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP + 'user/get',
            data: {
                uid: id
            }
        })
        const { data: { result, data } } = res
        if(~~result === 1) {
            return data
        } else {
            return false
        }
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

export const getActiveGoing = (id, userType) => {
    return async dispatch => {
        if(userType !== '未认证') {
            if(userType === '学生认证') {
                let publish = []
                let done = []
                //如果是学生 去请求众筹和活动列表
                let res = Taro.request({
                    url: DEVELOP + 'activity/list',
                    data: {
                        uid: id,
                        page: 1,
                        size: 100
                    }
                })
                let { data: { result, data } } = res
                if(~~result === 0) {
                    data.forEach(item => {
                        if(item.state === publishState.DONE) done.push(item)
                        else publish.push(item)
                    })
                }
                res = Taro.request({
                    url: DEVELOP + 'crowdfunding/list',
                    data: {
                        uid: id,
                        page: 1,
                        size: 100
                    }
                })
                let { data: { result: result2, data: data2 } } = res
                if(~~result2 === 0) {
                    data2.forEach(item => {
                        if(item.state === publishState.DONE) done.push(item)
                        else publish.push(item)
                    })
                }
                return [publish, done]
            } else {
                //如果是商户
                let publish = []
                let done = []
                let res = Taro.request({
                    url: DEVELOP + 'sponsorship/list',
                    data: {
                        uid: id,
                        page: 1,
                        size: 100
                    }
                })
                let { data: { result, data } } = res
                if(~~result === 0) {
                    data.forEach(item => {
                        if(item.state === publishState.DONE) done.push(item)
                        else publish.push(item)
                    })
                }
                return [publish, done]
            }
        } else {
            return '未认证'
        }
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