import { combineReducers } from 'redux'
import { CHANGE_AGE, CHANGE_HEIGHT, CHANGE_WEIGHT, CHANGE_SEX, INITIALIZE_FORM } from './actions'

const initialState = {
    bmrForm: {  // AddFormに入力されている文字列
        height: '',
        age: '',
        weight: '',
        sex: '',
    },
    currentBmr: {
        isFetching: false,  // サーバーから情報を取ってきている最中かどうか
        currentBmr: '',
    },
    // dailyCal: {
    //     protein: '',
    //     fat: '',
    //     carbo: '',
    //     totalCal: ''
    // }
}

const bmrFormReducer = (state = initialState.bmrForm, action) => {
    switch (action.type) {
        case CHANGE_HEIGHT:
            return {
                ...state,
                height: action.height,
            }
        case CHANGE_AGE:
            return {
                ...state,
                age: action.age,
            }
        case CHANGE_WEIGHT:
            return {
                ...state,
                weight: action.weight,
            }
        case CHANGE_SEX:
            return {
                ...state,
                sex: action.sex,
            }
        case INITIALIZE_FORM:
            return initialState.form
        default:
            return state
    }
}
const currentBmrReducer = (state = initialState.currentBmr, action) => {
    switch (action.type) {
        default:
            return state
    }
}

const rootReducer = combineReducers({
    form: bmrFormReducer,
    currentBmr: currentBmrReducer,
})

export default rootReducer