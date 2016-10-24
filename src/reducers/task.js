const initialState = {
    count: 1,
    results: [
        {
            url: 'http://127.0.0.1:8000/api/tasks/1/',
            pk: 1,
            title: 'Первая задача',
            description: 'Описание первой задачи'
        },
        {
            url: 'http://127.0.0.1:8000/api/tasks/2/',
            pk: 2,
            title: 'Вторая задача',
            description: 'Описание второй задачи'
        }
    ],
    current: 1
};

export default function task(state = initialState) {

    return state;

    // switch (action.type) {
    //     case SET_YEAR:
    //         return {...state, year: action.payload};
    //
    //     default:
    //
    // }
}