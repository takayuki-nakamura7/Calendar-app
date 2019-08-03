export const CHANGE_WEIGHT = 'CHANGE_WEIGHT'
export const CHANGE_AGE = 'CHANGE_AGE'
export const CHANGE_HEIGHT = 'CHANGE_HEIGHT'
export const CHANGE_SEX = 'CHANGE_SEX'
export const INITIALIZE_FORM = 'INITIALIZE_FORM'

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