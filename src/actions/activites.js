import Taro from '@tarojs/taro'
import { DEVELOP } from '../lib/url'
import {
    set_activitesContent
} from '../constants/activites'


export const getActivitesContent = (id, activityId, merchantId) => {
    return async dispatch => {
        let url = DEVELOP
        let queryId;
        if(id) {
            url = url + 'activity/get'
            queryId = id
        } else if(activityId) {
            url = url + 'sponsorship/get'
            queryId = activityId
        } else {
            url = url + 'cfactivity/get'
            queryId = merchantId
        }
        let res = await Taro.request({
            url,
            data: {
                id: queryId
            }
        })
        let { data: { result, data } } = res
        if(~~result === 0) {
            return data
        } else {
            return false
        }
    }
}