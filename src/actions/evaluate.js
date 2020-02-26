import {
    set_alreadyEvaluated,
    set_notEvaluated,
    set_evaluatedInput
} from '../constants/evaluate'
import Taro from '@tarojs/taro'
import { DEVELOP } from '../lib/url'
export const getEvaluated = id => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP + 'getEvaluated',
            data: {
                id
            }
        })
        const { data: { data } } = res
        let alreadyEvaluated = []
        let notEvaluated = []
        data.forEach(item => {
            if(item.evaluate === '') {
                notEvaluated.push(item)
            } else {
                alreadyEvaluated.push(item)
            }
        })
        await dispatch({
            type: set_alreadyEvaluated,
            data: alreadyEvaluated
        })
        await dispatch({
            type: set_notEvaluated,
            data: notEvaluated
        })
    }
}

export const setEvaluated = (index, id, infoId, alreadyEvaluated, notEvaluated) => {
    return async dispatch => {
        const res = await Taro.request({
            url: DEVELOP + 'setEvaluated',
            data: {
                id,
                infoId
            }
        })
        const { data: { data } } = res
        if(data) {
            const [hasEvaluated] = notEvaluated.splice(index, 1)
            alreadyEvaluated.unshift(hasEvaluated)
            await dispatch({
                type: set_alreadyEvaluated,
                data: alreadyEvaluated
            })
            await dispatch({
                type: set_notEvaluated,
                data: notEvaluated
            })
        }
        return data
    }
}


export const changeInput = (index, data) => {
    return {
        type: set_evaluatedInput,
        index,
        data
    }
}