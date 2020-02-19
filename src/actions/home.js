import Taro from '@tarojs/taro'
import { DEVELOP } from '../lib/url'
import { set_banner } from '../constants/home'
export const getBanner = () => {
    return async dispatch => {
        let res = await Taro.request({
            url: DEVELOP + 'bannerUrl'
        })
        let { data: { data } } = res
        dispatch({
            type: set_banner,
            data
        })
    }
}