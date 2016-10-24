import {combineReducers} from 'redux'
import task from './task'
import user from './user'

export default combineReducers({
    task,
    user
})