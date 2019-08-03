export const CHANGE_WEIGHT = 'CHANGE_WEIGHT'
export const CHANGE_AGE = 'CHANGE_AGE'
export const CHANGE_HEIGHT = 'CHANGE_HEIGHT'
export const CHANGE_SEX = 'CHANGE_SEX'
export const INITIALIZE_FORM = 'INITIALIZE_FORM'
export const REQUEST_DATA = 'REQUEST_DATA'
export const RECEIVE_DATA_SUCCESS = 'RECEIVE_DATA_SUCCESS'
export const RECEIVE_DATA_FAILED = 'RECEIVE_DATA_FAILED'

// action creaters
export const changeWeight = weight => ({
    type: CHANGE_WEIGHT,
    weight,
})
export const changeAge = age => ({
    type: CHANGE_AGE,
    age,
})
export const changeHeight = height => ({
    type: CHANGE_HEIGHT,
    height,
})
export const changeSex = sex => ({
    type: CHANGE_SEX,
    sex,
})
export const initializeForm = () => ({
    type: INITIALIZE_FORM,
})
export const requestData = () => ({
    type: REQUEST_DATA,
})
export const receiveDataSuccess = currentBmr => ({
    type: RECEIVE_DATA_SUCCESS,
    currentBmr,
})
export const receiveDataFailed = () => ({
    type: RECEIVE_DATA_FAILED,
})