import { set_schoolName } from '../constants/searchSchool'

export const setSchoolName = schoolName => {
    return {
        type: set_schoolName,
        data: schoolName
    }
}