import Taro from '@tarojs/taro'
import { DEVELOP } from '../lib/url'


export const submitAddTeam = info => {
    return async dispatch => {
        try {
            let res = await Taro.request({
                url: DEVELOP + 'addTeam',
                method: 'POST',
                data: {
                    info
                }
            })
            let { data: { result, name = 'error' } } = res
            return {
                result,
                name
            }
        } catch(err) {
            return {
                result,
                name
            }
        }
    }
}