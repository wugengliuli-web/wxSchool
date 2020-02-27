import {
    DEVELOP
} from '../lib/url'
import Taro from '@tarojs/taro'
import { set_login } from '../constants/login'

export const login = (tel, vCode) => {
    return async dispatch => {
        let res = await Taro.request({
            url: DEVELOP + 'user/login',
            method: 'POST',
            header: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            
            data: {
                phone: tel,
                code: vCode
            }
        })
        let { data: { result } } = res
        if(result === '0') {
            //如果是0代表登录成功
            let { data: { user: { id, nickname, phone, avatar = '', auth: { realname = '', org = '' } } } } = res
            
            await dispatch({
                type: set_login,
                data: {
                    id,
                    nickname,
                    phone,
                    avatar,
                    realname,
                    org
                }
            })
            return true
        } else {
            //如果非0 就去请求注册接口
            res = await Taro.request({
                url: DEVELOP + 'user/register',
                method: 'POST',
                header: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                data: {
                    phone: tel,
                    code: vCode
                }
            })
            let { data: { result } } = res
            if(result === '0') {
                let { data: { user: { id, nickname, phone, avatar = '', auth: { realname = '', org = '' } } } } = res
                await dispatch({
                    type: set_login,
                    data: {
                        id,
                        nickname,
                        phone,
                        avatar,
                        realname,
                        org
                    }
                })
                return true
            } else {
                return false
            }
        }
    }
}