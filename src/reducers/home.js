import { 
    set_banner,
    set_searchPlaceholder,
    get_content
 } from '../constants/home'
//存储用户信息的状态
const INITIAL_STATE = {
    bannerUrl: [], //轮播图的信息
    searchPlaceHolder: '',
    content: []  //内容
}

export default function login(state = INITIAL_STATE, action) {
    let { type, data } = action
    switch (type) {
        case set_banner:
            return {
                ...state,
                bannerUrl: data
            }
        case set_searchPlaceholder:
            return {
                ...state,
                searchPlaceHolder: data
            }
        case get_content:
            return {
                ...state,
                content: data
            }
        default:
            return state
    }
}