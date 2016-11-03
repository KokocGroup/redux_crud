import {
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAIL,
    UPDATE_TASK_REQUEST,
    UPDATE_TASK_SUCCESS,
    UPDATE_TASK_FAIL,
    FILTER_COMPLETE_TASK,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAIL,
    GET_TASKS_REQUEST,
    GET_TASKS_SUCCESS,
    GET_TASKS_FAIL,
    TASK_ERROR_DISMISS,
    TASK_DELETE_ALERT,
    TASK_DELETE_DISMISS
} from '../constants/Task'
import {tasks} from '../rest-api'

export function addTask(data) {

    return (dispatch) => {

        dispatch({
            type: ADD_TASK_REQUEST
        });

        tasks.add(data).then((data) => {
            dispatch({
                type: ADD_TASK_SUCCESS,
                data: data
            })
        }).catch((err) => {
            dispatch({type: ADD_TASK_FAIL, error: err.message})
        });
    }

}

export function updateTask(task, data) {

    return (dispatch) => {
        dispatch({
            type: UPDATE_TASK_REQUEST
        });

        tasks.update(task.pk, data).then((data) => {
            dispatch({
                type: UPDATE_TASK_SUCCESS,
                data: data
            })
        }).catch((err) => {
            dispatch({type: UPDATE_TASK_FAIL, error: err.message})
        });
    }

}

export function getTasks(query) {

    return (dispatch) => {
        dispatch({
            type: GET_TASKS_REQUEST
        });

        tasks.all(query).then((data) => {
            dispatch({
                type: GET_TASKS_SUCCESS,
                data: data
            })
        }).catch((err) => {
            dispatch({type: GET_TASKS_FAIL, error: err.message})
        });
    }

}

export function completeTask(task) {

    return updateTask(task, {complete: !task.complete});

}

export function filterTask() {

    return {
        type: FILTER_COMPLETE_TASK,
    }

}

export function deleteTask(task) {

    return (dispatch) => {
        dispatch({
            type: DELETE_TASK_REQUEST
        });

        tasks.del(task.pk).then(() => {
            dispatch({
                type: DELETE_TASK_SUCCESS,
                pk: task.pk
            })
        }).catch((err) => {
            dispatch({type: DELETE_TASK_FAIL, error: err.message})
        });
    }

}

export function taskErrorDismiss() {

    return {
        type: TASK_ERROR_DISMISS
    }

}

export function taskDeleteAlert(task) {

    return {
        type: TASK_DELETE_ALERT,
        task: task
    }

}

export function taskDeleteDismiss() {

    return {
        type: TASK_DELETE_DISMISS
    }

}