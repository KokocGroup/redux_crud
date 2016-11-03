import React, {Component} from 'react'
import SweetAlert from 'sweetalert-react'

export default class TaskDeleteAlert extends Component {
    onDeleteTask(){
        const {task, deleteTask, taskDeleteDismiss} = this.props;
        deleteTask(task);
        taskDeleteDismiss();
    }

    render() {
        const {task, taskDeleteDismiss} = this.props;
        return <SweetAlert
            show={!!task}
            title='Удалить?'
            type='warning'
            showCancelButton
            onConfirm={::this.onDeleteTask}
            onCancel={taskDeleteDismiss}
            confirmButtonText='Да'
            cancelButtonText='Нет'
        />

    }
}