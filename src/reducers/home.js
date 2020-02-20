import { set_banner } from '../constants/home'
//存储用户信息的状态
const INITIAL_STATE = {
    bannerUrl: [] //轮播图的信息
}

export default function login(state = INITIAL_STATE, action) {
    let { type, data } = action
    switch (type) {
        case set_banner:
            return {
                ...state,
                bannerUrl: data
            }
        default:
            return state
    }
}