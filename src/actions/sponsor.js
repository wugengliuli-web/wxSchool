import Taro from '@tarojs/taro'
import { DEVELOP } from '../lib/url'
import {
    set_campusActivitiesMain,
    set_merchantSponsorshipMain,
    set_dreamCrowdFinancingMain
} from '../constants/sponsor'


export const getCampusActivities = () => {
    return async dispatch => {
        let res = await Taro.request({
            url: DEVELOP + 'activity/list',
            data: {
                page: 1,
                size: 3
            }
        })
        let { data: { result, data } } = res
        if(result === 0) {
            data = data.splice(0, 3)
            dispatch({
                type: set_campusActivitiesMain,
                data
            })
        }
    }
}

export const getMerchantSponsorship = () => {
    return async dispatch => {
        let res = await Taro.request({
            url: DEVELOP + 'sponsorship/list',
            data: {
                page: 1,
                size: 3
            }
        })
        let { data: { result, data } } = res
        if(result === 0) {
            data = data.splice(0, 3)
            dispatch({
                type: set_merchantSponsorshipMain,
                data
            })
        }
    }
}

export const getDreamCrowdFinancing = () => {
    return async dispatch => {
        let res = await Taro.request({
            url: DEVELOP + 'cfactivity/list',
            data: {
                page: 1,
                size: 3
            }
        })
        let { data: { result, data } } = res
        if(result === 0) {
            data = data.splice(0, 3)
            dispatch({
                type: set_dreamCrowdFinancingMain,
                data
            })
        }
    }
}