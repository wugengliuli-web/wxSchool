import Taro from '@tarojs/taro'
import { set_userInfo } from '../constants/login'
import { DEVELOP } from '../lib/url'
export const setUserInfo = ({ avatar, nickName, signature }) => {
    return async function(dispatch) {
        const { data } = await Taro.getStorage({
            key: 'token'
        })
        const res = await Taro.request({
            url: DEVELOP + 'user/setting',
            header: {
                Authorization: data
            },
            data: {
                avatar,
                nickname: nickName,
                signature
            }
        })
        const { data:  { result } } = res
        if(~~result === 0) {
            dispatch({
                type: set_userInfo,
                data: {
                    avatar,
                    nickName,
                    signature
                }
            })
            return true
        } else {
            return false
        }
    }
}