import {
    set_activityType
} from '../constants/activityType'


export const setActivityType = data => {
    return {
        type: set_activityType,
        data
    }
}