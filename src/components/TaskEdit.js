import React, {Component} from 'react'

export default class TaskEdit extends Component {

    // handleSubmit() {
    //     this.props.addTask(this.refs.textInput.value);
    //     this.refs.textInput.value = '';
    // }

    render() {
        return <div>
            <div>
                <input type='text' placeholder='Задача' ref='textInput'/>
                <button onClick={::this.handleSubmit}>Добавить</button>
            </div>
        </div>
    }
}
