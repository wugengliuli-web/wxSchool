import {
    set_SearchContent,
    set_campusActivities,
    set_merchantSponsorship,
    set_dreamCrowdFinancing
} from '../constants/search'
//存储用户信息的状态
const INITIAL_STATE = {
    campusActivities: [],  //校园活动
    merchantSponsorship: [],  //商家赞助
    dreamCrowdFinancing: []  //梦想众筹
}

export default function search(state = INITIAL_STATE, action) {
    let { type } = action
    switch (type) {
        case set_SearchContent:
            let { contentType, data } = action
            if(contentType === 0) {
                return {
                    ...state,
                    campusActivities: data
                }
            } else if(contentType === 1) {
                return {
                    ...state,
                    merchantSponsorship: data
                }
            } else {
                return {
                    ...state,
                    dreamCrowdFinancing: data
                }
            }
        case set_campusActivities:
            let { data: campusActivities } = action
            return {
                ...state,
                campusActivities
            }
        case set_merchantSponsorship:
            let { data: merchantSponsorship } = action
            return {
                ...state,
                merchantSponsorship
            }
        case set_dreamCrowdFinancing:
            let { data: dreamCrowdFinancing } = action
            return {
                ...state,
                dreamCrowdFinancing
            }
        default:
            return state
    }
}