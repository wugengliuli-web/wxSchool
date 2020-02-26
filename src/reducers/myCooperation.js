import {
    set_going,
    set_end
} from '../constants/myCooperation'
//存储用户信息的状态
const INITIAL_STATE = {
    going: [],
    end: []
}

export default function myCooperation(state = INITIAL_STATE, action) {
    const { type, data } = action
    switch (type) {
        case set_going:
            return {
                ...state,
                going: data
            }
        case set_end:
            return {
                ...state,
                end: data
            }
        default:
            return state
    }
}