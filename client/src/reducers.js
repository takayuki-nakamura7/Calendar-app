import { combineReducers } from 'redux'
import {
    CHANGE_AGE, CHANGE_HEIGHT, CHANGE_WEIGHT, CHANGE_SEX, INITIALIZE_FORM, REQUEST_DATA, RECEIVE_DATA_SUCCESS, RECEIVE_DATA_FAILED
} from './actions'


const initialState = {
    bmrForm: {  // BmrFormに入力されている文字列
        height: '',
        age: '',
        weight: '',
        sex: '',
    },
    bmr: {
        isFetching: false,  // サーバーから情報を取ってきている最中かどうか
        currentBmr: 1,
    },

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
            return initialState.bmrForm
        default:
            return state
    }
}

const currentBmrReducer = (state = initialState.bmr, action) => {
    switch (action.type) {
        case REQUEST_DATA:
            return {
                ...state,
                isFetching: true,
            }
        case RECEIVE_DATA_SUCCESS:
            return {
                ...state,
                isFetching: false,
                currentBmr: action.currentBmr.bmrResult,
            }
        case RECEIVE_DATA_FAILED:
            return {
                ...state,
                isFetching: false,
            }
        default:
            return state
    }
}

const rootReducer = combineReducers({
    form: bmrFormReducer,
    currentBmr: currentBmrReducer,
})

export default rootReducer