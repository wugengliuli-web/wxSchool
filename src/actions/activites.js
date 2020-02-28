import Taro from '@tarojs/taro'
import { DEVELOP } from '../lib/url'

export const getActivitesContent = (id, type) => {
    return async dispatch => {
        let res = await Taro.request({
            url: DEVELOP + type + '/get',
            data: {
                id: id
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