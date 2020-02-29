// import {SET_SRC,SET_GOODCOUNT,SET_EMONEYCOUNT,SET_ESATRCOUNT,SET_NICKNAME} from '../constants/personalCenter'
import {
    set_login,
    set_userInfo
} from '../constants/login'
const INITIAL_STATE = {
    avatar:'',
    goodCount:1000,
    emoneyCount:100,
    estarCount:10,
    nickName: '',
    isChceked: '',
    isNamed: '',
    userId: Infinity,
    phone: '',
    signature: ''
}
export default function personalCenter(state = INITIAL_STATE, action){
    let {type, data} = action
    switch (type){
        case set_login:
            let { id, nickname, phone, avatar, realname, org, signature } = data
            return {
                ...state,
                avatar,
                userId: id,
                nickName: nickname,
                isNamed: realname,
                isChceked: org,
                phone,
                signature
            }
        case set_userInfo:
            return {
                ...state,
                ...data
            }
        default:
            return state
    }
}