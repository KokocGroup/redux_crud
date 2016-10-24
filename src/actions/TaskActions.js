import {SET_YEAR} from '../constants/Task'

export function setYear(year) {

    return {
        type: SET_YEAR,
        payload: year
    }

}