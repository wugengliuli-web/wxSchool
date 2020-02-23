import {SET_SRC,SET_GOODCOUNT,SET_EMONEYCOUNT,SET_ESATRCOUNT,SET_NICKNAME} from '../constants/personalCenter'
const INITIAL_STATE = {
    imgSrc:'../lib',
    goodCount:1000,
    emoneyCount:100,
    estarCount:10
}
export default function personalCenter(state = INITIAL_STATE, action){
    let {type, data} = action
    switch (type){
        case SET_SRC:
            return {
                ...state,
                imgSrc:data
            }
        case SET_GOODCOUNT:
            return {
                ...state,
                goodCount:data
            }
        case SET_EMONEYCOUNT:
            return {
                ...state,
                emoneyCount:data
            }
        case SET_ESATRCOUNT:
            return {
                ...state,
                estarCount:data
            }
        case SET_NICKNAME:
            return {
                ...state,
                nickName:data
            }
        default:
            return state
    }
}