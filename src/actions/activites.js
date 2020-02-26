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
        dispatch({
            type: set_activitesContent,
            data
        })
    }
}