import {
    set_studentIdCard
} from '../constants/uploadStudentIDCard'


export const setStudentIDCard = data => {
    return {
        type: set_studentIdCard,
        data
    }
}