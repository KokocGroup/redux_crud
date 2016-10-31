import React, {Component} from 'react'

export default class TaskForm extends Component {

    handleSubmit() {
        this.props.addTask(this.refs.textInput.value);
        this.refs.textInput.value = '';
    }

    render() {
        return <div>
            <div>
                <button onClick={this.props.getTasks}>Обновить</button>
                <input type='text' placeholder='Задача' ref='textInput'/>
                <button onClick={::this.handleSubmit}>Добавить</button>
            </div>
            <div>
                <label>
                    <input type='checkbox' checked={this.props.filterComplete} onClick={this.props.filterTask}/>
                    Не показывать завершенные
                </label>
            </div>
        </div>
    }
}
