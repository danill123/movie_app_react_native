import { INCREASE_VALUE, DECREASE_VALUE } from '../actiontypes';

const initialState = {
    counter : 0
}

export default function(state=initialState, action) {
    switch (action.type) {
        case INCREASE_VALUE:
            return { ...state, counter : counter + 1 }
        case DECREASE_VALUE:
            return { ...state, counter : counter - 1 }
        default:
            return state
    }
}