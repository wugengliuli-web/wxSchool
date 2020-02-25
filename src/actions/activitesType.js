import { set_activitesType } from '../constants/activitesType'

export const setActivitesType = data => {
    return {
        type: set_activitesType,
        data
    }
}