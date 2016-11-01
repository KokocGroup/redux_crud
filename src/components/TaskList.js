import React, {Component} from 'react'
import {Table} from 'react-bootstrap'

export default class TaskList extends Component {
    onComplete(task, e) {
        e.preventDefault();
        this.props.completeTask(task);
    }

    onDelete(task, e) {
        e.preventDefault();
        this.props.deleteTask(task);
    }

    render() {
        const {tasks} = this.props;
        const styleLineThrough = {textDecoration: 'line-through'};

        return <Table striped bordered condensed hover>
    <thead>
      <tr>
          <th>#</th>
        <th>Заголовок</th>
        <th>Описание</th>
        <th>Действие</th>
      </tr>
    </thead>
    <tbody>
        {
                tasks.map((el) => <tr key={el.pk}>
                    <td>{el.complete}</td>
                    <td><a href='#complete' style={el.complete ? styleLineThrough : null} onClick={this.onComplete.bind(this, el)}>{el.title}</a></td>
                    <td>{el.description}</td>
                    <td><a href='#delete' style={{fontSize: 'smaller', color: 'red', marginLeft: '5px'}} onClick={this.onDelete.bind(this, el)}>Удалить</a></td>
                </tr>)
            }
    </tbody>
  </Table>









    }
}