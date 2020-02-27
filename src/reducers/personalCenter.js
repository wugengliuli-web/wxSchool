// import {SET_SRC,SET_GOODCOUNT,SET_EMONEYCOUNT,SET_ESATRCOUNT,SET_NICKNAME} from '../constants/personalCenter'
import {
    set_login
} from '../constants/login'
const INITIAL_STATE = {
    imgSrc:'',
    goodCount:1000,
    emoneyCount:100,
    estarCount:10,
    nickName: '',
    isChceked: '',
    isNamed: '',
    userId: Infinity
}
export default function personalCenter(state = INITIAL_STATE, action){
    let {type, data} = action
    switch (type){
        case set_login:
            let { id, nickname, phone, avatar, realname, org } = data
            return {
                ...state,
                imgSrc: avatar,
                userId: id,
                nickName: nickname,
                isNamed: realname,
                isChceked: org
            }
        default:
            return state
    }
}