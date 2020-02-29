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
            let req = await Taro.request({
                url: DEVELOP + type + '/recommend',
                data: {
                    type: data.type,
                    location: data.address,
                    page: 1,
                    size: 6
                }
            })
            let { data: { result: re, data: Recommend } } = req
            if(~~re === 0) {
                return [data, Recommend]
            } else {
                return [data, []]
            }
        } else {
            return false
        }
    }
}