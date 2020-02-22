import {
    set_campusActivitiesMain,
    set_merchantSponsorshipMain,
    set_dreamCrowdFinancingMain
} from '../constants/sponsor'
//存储用户信息的状态
const INITIAL_STATE = {
    campusActivities: [],  //校园活动
    merchantSponsorship: [],  //商家赞助
    dreamCrowdFinancing: []  //梦想众筹
}

export default function sponsor(state = INITIAL_STATE, action) {
    let { type, data } = action
    switch (type) {
        case set_campusActivitiesMain:
            return {
                ...state,
                campusActivities: data
            }
        case set_merchantSponsorshipMain:
            return {
                ...state,
                merchantSponsorship: data
            }
        case set_dreamCrowdFinancingMain:
            return {
                ...state,
                dreamCrowdFinancing: data
            }
        default:
            return state
    }
}