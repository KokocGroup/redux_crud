import React, {Component} from 'react'

export default class Task extends Component {
    onComplete(task, e) {
        e.preventDefault();
        this.props.completeTask(task);
    }

    onDelete(task, e) {
        e.preventDefault();
        this.props.deleteTask(task);
    }

    render() {
        const {tasks, filterComplete} = this.props;
        const styleLineThrough = {textDecoration: 'line-through'};
        let tasks_filter = !filterComplete ? tasks : tasks.filter((el) => !el.complete);

        return <div>
            {
                tasks_filter.map((el) => <div key={el.pk}>
                    <a href='#complete' style={el.complete ? styleLineThrough : null}
                       onClick={this.onComplete.bind(this, el)}>{el.text}</a>
                    <a href='#delete' style={{fontSize: 'smaller', color: 'red', marginLeft: '5px'}}
                       onClick={this.onDelete.bind(this, el)}>Удалить</a>
                </div>)
            }
        </div>
    }
}