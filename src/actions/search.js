import Taro from '@tarojs/taro'
import { DEVELOP } from '../lib/url'
import { 
    set_SearchContent,
    set_campusActivities,
    set_merchantSponsorship,
    set_dreamCrowdFinancing 
} from '../constants/search'


export const getSearchContent = (type, search, position) => {
    return async dispatch => {
        let res = await Taro.request({
            url: DEVELOP + 'getSearchContent',
            method: 'POST',
            data: {
                type,
                search,
                position
            }
        })
        let { data: { data } } = res
        dispatch({
            type: set_SearchContent,
            data,
            contentType: type
        })
    }
}


export const setCampusActivities = data => {
    return {
        type: set_campusActivities,
        data
    }
}

export const setMerchantSponsorship = data => {
    return {
        type: set_merchantSponsorship,
        data
    }
}

export const setDreamCrowdFinancing = data => {
    return {
        type: set_dreamCrowdFinancing,
        data
    }
}