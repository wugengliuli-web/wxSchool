import {
    set_searchTeamAns
} from '../constants/searchTeam'
//存储用户信息的状态
const INITIAL_STATE = {
    searchAns: []
}

export default function searchTeam(state = INITIAL_STATE, action) {
    let { type, data } = action
    switch (type) {
        case set_searchTeamAns:
            return {
                ...state,
                searchAns: data
            }
        default:
            return state
    }
}