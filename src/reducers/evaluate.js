
import {
    set_alreadyEvaluated,
    set_notEvaluated,
    set_evaluatedInput
} from '../constants/evaluate'
//存储用户信息的状态
const INITIAL_STATE = {
    alreadyEvaluated: [],  //已评价
    notEvaluated: []  //未评价
}

export default function evaluate(state = INITIAL_STATE, action) {
    const { type, data, index } = action
    switch (type) {
        case set_alreadyEvaluated:
            return {
                ...state,
                alreadyEvaluated: data
            }
        case set_notEvaluated:
            return {
                ...state,
                notEvaluated: data
            }
        case set_evaluatedInput:
            return {
                ...state,
                notEvaluated: state.notEvaluated.map((item, i) => {
                    if(index === i) {
                        item.evaluate = data
                    }
                    return item
                })
            }
        default:
            return state
    }
}