import {
    set_notRelease,
    set_hasRelease
} from '../constants/myRelease'
//存储用户信息的状态
const INITIAL_STATE = {
    hasRelease: [],
    notRelease: []
}

export default function myRelease(state = INITIAL_STATE, action) {
    const { type, data } = action
    switch (type) {
        case set_notRelease:
            return {
                ...state,
                notRelease: data
            }
        case set_hasRelease:
            return {
                ...state,
                hasRelease: data
            }
        default:
            return state
    }
}