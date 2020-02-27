import { 
    set_banner,
    set_searchPlaceholder,
    set_content,
    clear_content
 } from '../constants/home'
//存储用户信息的状态
const INITIAL_STATE = {
    bannerUrl: [], //轮播图的信息
    searchPlaceHolder: '',
    content: [],  //内容
    hasMore: true,
    pageIndex: 1,
    size: 6
}

export default function home(state = INITIAL_STATE, action) {
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
        case set_content:
            let { pageIndex } = action
            return {
                ...state,
                content: state.content.concat(data),
                hasMore: data.length < state.size ? false : true,
                pageIndex: pageIndex
            }
        case clear_content:
            return {
                ...state,
                content: [],
                hasMore: true,
                pageIndex: 0
            }
        default:
            return state
    }
}