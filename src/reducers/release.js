import {
    set_activityType
} from '../constants/activityType'
//存储用户信息的状态
const INITIAL_STATE = {
    activityType: []  //活动类型
}

export default function release(state = INITIAL_STATE, action) {
    let { type, data } = action
    switch (type) {
        case set_activityType:
            return {
                ...state,
                activityType: data
            }
        default:
            return state
    }
}