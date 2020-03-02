import Taro from '@tarojs/taro'
import { DEVELOP } from '../lib/url'
import { 
    set_SearchContent,
    set_campusActivities,
    set_merchantSponsorship,
    set_dreamCrowdFinancing 
} from '../constants/search'
import { activityType, publishState } from '../lib/type'

export const getSearchContent = (type, search, position) => {
    return async dispatch => {
        let url = DEVELOP
        switch(type) {
            case 0:
                url = url + activityType.activity + '/search'
                break
            case 1:
                url = url + activityType.sponsorship + '/search'
                break
            case 2:
                url = url + activityType.cfactivity + '/search'
                break
        }
        let res = await Taro.request({
            url,
            data: {
                page: 1,
                size: 100,
                location: position.join('-'),
                keyword: search,
                state: publishState.PUBLISHED
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