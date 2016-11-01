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
    GET_TASKS_SUCCESS,
    GET_TASKS_FAIL,
    GET_TASKS_REQUEST
} from '../constants/Task'

const initialState = {
    filterComplete: false,
    count: 1,
    current: 1,
    results: [],
    fetching: false,
    error: ''
};

export default function tasks(state = initialState, action) {
    switch (action.type) {
        case ADD_TASK_REQUEST:
            return {...state, fetching: true, error: ''};

        case ADD_TASK_SUCCESS:
            return {...state, results: state.results.concat(action.data), fetching: false, error: ''};

        case ADD_TASK_FAIL:
            return {...state, error: action.error, fetching: false};

        case DELETE_TASK_REQUEST:
            return {...state, fetching: true, error: ''};

        case DELETE_TASK_SUCCESS:
            return {...state, results: state.results.filter((el) => el.pk != action.pk), fetching: false, error: ''};

        case DELETE_TASK_FAIL:
            return {...state, error: action.error, fetching: false};

        case UPDATE_TASK_REQUEST:
            return {...state, fetching: true, error: ''};

        case UPDATE_TASK_SUCCESS: {
            const tasks = state.results.slice();
            for (let t of tasks) {
                if (t.pk == action.data.pk) {
                    t.complete = action.data.complete
                }
            }
            return {...state, results: tasks};
        }

        case UPDATE_TASK_FAIL:
            return {...state, error: action.error, fetching: false};

        case FILTER_COMPLETE_TASK:
            return {...state, filterComplete: !state.filterComplete};

        case GET_TASKS_REQUEST:
            return {...state, fetching: true, error: ''};

        case GET_TASKS_SUCCESS:
            return {...state, results: action.data.results, fetching: false, error: ''};

        case GET_TASKS_FAIL:
            return {...state, error: action.error, fetching: false};

        default:
            return state;
    }
}