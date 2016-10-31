import {
    ADD_TASK_REQUEST,
    ADD_TASK_SUCCESS,
    ADD_TASK_FAIL,
    COMPLETE_TASK_REQUEST,
    COMPLETE_TASK_SUCCESS,
    COMPLETE_TASK_FAIL,
    FILTER_COMPLETE_TASK,
    DELETE_TASK_REQUEST,
    DELETE_TASK_SUCCESS,
    DELETE_TASK_FAIL,
    GET_TASKS_REQUEST,
    GET_TASKS_SUCCESS,
    GET_TASKS_FAIL
} from '../constants/Task'

export function addTask(text) {

    return (dispatch) => {
        dispatch({
            type: ADD_TASK_REQUEST
        });

        let data = new FormData();
        data.append('text', text);

        fetch('/api/tasks/', {
            method: 'POST',
            credentials: 'same-origin',
            body: data
        }).then((res) => {
            if (res.ok) {
                return res.json();
            } else {
                return this.reject(res.statusText);
            }
        }).then((data) => {
            dispatch({
                type: ADD_TASK_SUCCESS,
                data: data
            })
        }).catch(() => {
            dispatch({type: ADD_TASK_FAIL});
        });
    }

}

export function completeTask(task) {

    return (dispatch) => {
        dispatch({
            type: COMPLETE_TASK_REQUEST
        });

        let data = new FormData();
        data.append('complete', !task.complete);

        fetch(`/api/tasks/${task.pk}/`, {
            method: 'PATCH',
            credentials: 'same-origin',
            body: data
        }).then((res) => {
            return res.json();
        }).then((data) => {
            dispatch({
                type: COMPLETE_TASK_SUCCESS,
                data: data
            })
        }).catch(() => {
            dispatch({type: COMPLETE_TASK_FAIL})
        });
    }

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

        fetch(`/api/tasks/${task.pk}/`, {method: 'DELETE', credentials: 'same-origin'}).then((res) => {
            if (res.ok) {
                dispatch({
                    type: DELETE_TASK_SUCCESS,
                    pk: task.pk
                })
            } else {
                dispatch({type: DELETE_TASK_FAIL})
            }
        }).catch(() => {
            dispatch({type: DELETE_TASK_FAIL})
        });
    }

}

export function getTasks() {

    return (dispatch) => {
        dispatch({
            type: GET_TASKS_REQUEST
        });

        fetch('/api/tasks/', {credentials: 'same-origin'}).then((res) => {
            return res.json();
        }).then((data) => {
            dispatch({
                type: GET_TASKS_SUCCESS,
                data: data
            })
        }).catch(() => {
            dispatch({type: GET_TASKS_FAIL})
        });
    }

}
