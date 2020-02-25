import {
    set_identityAuthentication,
    set_major,
    set_post,
    set_departant
} from '../constants/identityAuthentication'
import {
    set_schoolName
} from '../constants/searchSchool'
import {
    set_activitesType
} from '../constants/activitesType'
import {
    set_teamName
} from '../constants/searchTeam'
import {
    set_studentIdCard
} from '../constants/uploadStudentIDCard'
//存储用户信息的状态
const INITIAL_STATE = {
    enrollmentYear: '',  //入学年份
    major: '',  //大学专业
    schoolName: '',  //学校名称
    studentIdCard: '',  //是否上传学生证,
    teamName: '',  //团队名称
    department: '',  //部门名称
    post: '',  //部门职位
    activitesType: []  //活动类型
}

export default function identityAuthentication(state = INITIAL_STATE, action) {
    const { type, data } = action
    switch (type) {
        case set_identityAuthentication:
            return {
                ...state,
                enrollmentYear: data
            }
        case set_major:
            return {
                ...state,
                major: data
            }
        case set_post:
            return {
                ...state,
                post: data
            }
        case set_departant:
            return {
                ...state,
                department: data
            }
        case set_teamName:
            return {
                ...state,
                teamName: data
            }
        case set_schoolName:
            return {
                ...state,
                schoolName: data
            }
        case set_activitesType:
            return {
                ...state,
                activitesType: data
            }
        case set_studentIdCard:
            return {
                ...state,
                studentIdCard: data
            }
        default:
            return state
    }
}