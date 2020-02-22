import {
    set_activitesContent
} from '../constants/activites'
//存储用户信息的状态
const INITIAL_STATE = {
    id: '',
    img: '',//活动图片
    title: '',  //活动标题
    tag: '',  //活动tag
    money: '',  //活动预算
    city: '', //活动地点
    startTime: '',  //开始时间
    endTime: '',  //结束时间
    browseTimes: '',  //浏览次数
    applicantsNum: '',  //申请人数
    logo: '',  //社团logo
    name: '',  //社团名
    introduce: '',  //社团介绍
    activityPlan: '',  //活动方案,
    associationTag: [],  //社团tag
    Recommend: [],  //相关推荐
}

export default function activites(state = INITIAL_STATE, action) {
    let { type, data } = action
    switch (type) {
        case set_activitesContent:
            return {
                ...state,
                ...data
            }
        default:
            return state
    }
}