import React, {Component} from 'react'
import {Table, Button, Checkbox} from 'react-bootstrap'

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
                    <td><Checkbox checked={el.complete} onChange={this.onComplete.bind(this, el)}/></td>
                    <td style={el.complete ? styleLineThrough : null}>{el.title}</td>
                    <td>{el.description ? el.description : ''}</td>
                    <td><Button bsStyle='danger' bsSize='xsmall' onClick={this.onDelete.bind(this, el)}>Удалить</Button></td>
                </tr>)
            }
            </tbody>
        </Table>


    }
}