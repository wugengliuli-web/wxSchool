import Taro from '@tarojs/taro'
import {
    set_searchTeamAns,
    set_teamName
} from '../constants/searchTeam'
import { DEVELOP } from '../lib/url'


export const getSearchTeam = val => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP + 'getTeamName',
            method: 'POST',
            data: {
                info: val
            }
        })
        const { data: { data } } = res
        dispatch({
            type: set_searchTeamAns,
            data
        })
    }
}


export const setTeamName = val => {
    return {
        type: set_teamName,
        data: val
    }
}