import Taro from '@tarojs/taro'
import { DEVELOP } from '../lib/url'
import {
    set_activitesContent
} from '../constants/activites'


export const getActivitesContent = id => {
    return async dispatch => {
        let res = await Taro.request({
            url: DEVELOP + 'activitesContnet',
            data: {
                id
            }
        })
        let { data: { data } } = res
        data.startTime = data.startTime.substring(0, data.startTime.length - 3)
        data.endTime = data.endTime.substring(0, data.endTime.length - 3)
        dispatch({
            type: set_activitesContent,
            data
        })
    }
}